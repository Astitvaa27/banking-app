import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/authUser";

import Account from "@/models/Account";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  req: Request,
  { params }: Params
) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const body = await req.json();

    const account = await Account.findOneAndUpdate(
      {
        _id: id,
        user: user._id,
      },
      body,
      {
        new: true,
      }
    );

    if (!account) {
      return NextResponse.json(
        { message: "Account not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(account);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: Params
) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const account = await Account.findOneAndDelete({
      _id: id,
      user: user._id,
    });

    if (!account) {
      return NextResponse.json(
        { message: "Account not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Account deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}