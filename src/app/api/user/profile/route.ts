import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/authUser";

import User from "@/models/User";

export async function PATCH(req: Request) {
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

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        name: body.name,
      },
      {
        new: true,
      }
    );

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}