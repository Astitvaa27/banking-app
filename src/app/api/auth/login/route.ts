import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import {
  comparePassword,
  generateToken,
} from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials.",
        },
        { status: 401 }
      );
    }

    const isMatch = await comparePassword(
      password,
      user.password
    );

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials.",
        },
        { status: 401 }
      );
    }

    const token = generateToken(user._id.toString());

    const response = NextResponse.json({
      success: true,
      message: "Login Successful",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server Error",
      },
      { status: 500 }
    );
  }
}