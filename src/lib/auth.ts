import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string) {
  return jwt.sign(
    {
      id: userId,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}