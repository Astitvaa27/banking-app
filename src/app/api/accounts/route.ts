import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/authUser";

import Account from "@/models/Account";

export async function GET() {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json([], { status: 200 });
    }

    const accounts = await Account.find({
      user: user._id,
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json(accounts);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server Error" },
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

    const account = await Account.create({
      ...body,
      user: user._id,
    });

    return NextResponse.json(account, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}