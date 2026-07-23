import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/authUser";

import Transaction from "@/models/Transaction";
import Account from "@/models/Account";

import { transactionSchema } from "@/lib/validators/transactionValidator";

export async function GET() {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const transactions = await Transaction.find({
      user: user._id,
    })
      .populate("fromAccount", "bankName")
      .populate("toAccount", "bankName")
      .sort({ date: -1 });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const parsed = transactionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        parsed.error.flatten(),
        { status: 400 }
      );
    }

    const data = parsed.data;

    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      switch (data.type) {
        case "Income": {
          const account = await Account.findOne({
            _id: data.toAccount,
            user: user._id,
          }).session(session);

          if (!account) {
            throw new Error("Destination account not found");
          }

          account.balance += data.amount;

          await account.save({ session });

          break;
        }

        case "Expense": {
          const account = await Account.findOne({
            _id: data.fromAccount,
            user: user._id,
          }).session(session);

          if (!account) {
            throw new Error("Source account not found");
          }

          if (account.balance < data.amount) {
            throw new Error("Insufficient balance");
          }

          account.balance -= data.amount;

          await account.save({ session });

          break;
        }

        case "Transfer": {
          const source = await Account.findOne({
            _id: data.fromAccount,
            user: user._id,
          }).session(session);

          const destination = await Account.findOne({
            _id: data.toAccount,
            user: user._id,
          }).session(session);

          if (!source || !destination) {
            throw new Error("Account not found");
          }

          if (source.balance < data.amount) {
            throw new Error("Insufficient balance");
          }

          source.balance -= data.amount;
          destination.balance += data.amount;

          await source.save({ session });
          await destination.save({ session });

          break;
        }
      }

      const transaction = await Transaction.create(
        [
          {
            ...data,
            user: user._id,
          },
        ],
        { session }
      );

      await session.commitTransaction();

      return NextResponse.json(transaction[0], {
        status: 201,
      });
    } catch (err: any) {
      await session.abortTransaction();

      return NextResponse.json(
        {
          message: err.message,
        },
        {
          status: 400,
        }
      );
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}