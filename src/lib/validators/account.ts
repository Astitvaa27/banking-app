import { z } from "zod";

export const accountSchema = z.object({
  bankName: z.string().min(2, "Bank name is required"),

  holder: z.string().min(2, "Account holder is required"),

  accountNumber: z.string().min(4, "Invalid account number"),

  balance: z.number().min(0),

  expiry: z.string().min(4),

  accountType: z.enum([
    "Savings",
    "Current",
    "Salary",
  ]),

  color: z.string(),
});

export type AccountInput = z.input<typeof accountSchema>;
export type AccountSchema = z.output<typeof accountSchema>;