import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDB } from "./mongodb";
import User from "@/models/User";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      id: string;
    };

    await connectDB();

    const user = await User.findById(decoded.id).select("-password");

    return user;
  } catch {
    return null;
  }
}