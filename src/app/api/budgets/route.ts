import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/authUser";

import Budget from "@/models/Budget";

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

    const budgets = await Budget.find({
      userId: user._id,
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json(budgets);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
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

    const budget = await Budget.create({
      userId: user._id,
      category: body.category,
      limit: Number(body.limit),
      month: body.month,
      year: body.year,
    });

    return NextResponse.json(budget);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}