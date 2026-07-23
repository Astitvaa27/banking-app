import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    summary: {
      income: 0,
      expense: 0,
      balance: 0,
    },
  });
}