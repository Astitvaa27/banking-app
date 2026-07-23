import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/authUser";

import User from "@/models/User";

export async function PATCH(req: Request) {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await req.json();

    const user = await User.findById(currentUser._id);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return NextResponse.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}