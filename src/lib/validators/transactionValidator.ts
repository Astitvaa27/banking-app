import { z } from "zod";

const categories = [
  "Food",
  "Shopping",
  "Travel",
  "Bills",
  "Salary",
  "Investment",
  "Entertainment",
  "Healthcare",
  "Other",
] as const;

export const transactionSchema = z
  .object({
    fromAccount: z.string().optional(),

    toAccount: z.string().optional(),

    type: z.enum([
      "Income",
      "Expense",
      "Transfer",
    ]),

    amount: z
      .number({
        error: "Amount is required",
      })
      .positive("Amount must be greater than 0"),

    category: z.enum(categories),

    description: z
      .string()
      .max(200)
      .optional()
      .default(""),

    status: z
      .enum([
        "Completed",
        "Pending",
        "Failed",
      ])
      .default("Completed"),

    date: z.coerce.date(),
  })
  .superRefine((data, ctx) => {
    switch (data.type) {
      case "Income":
        if (!data.toAccount) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["toAccount"],
            message: "Account is required",
          });
        }
        break;

      case "Expense":
        if (!data.fromAccount) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["fromAccount"],
            message: "Account is required",
          });
        }
        break;

      case "Transfer":
        if (!data.fromAccount) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["fromAccount"],
            message: "Source account is required",
          });
        }

        if (!data.toAccount) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["toAccount"],
            message: "Destination account is required",
          });
        }

        if (
          data.fromAccount &&
          data.toAccount &&
          data.fromAccount === data.toAccount
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["toAccount"],
            message: "Source and destination accounts must be different",
          });
        }
        break;
    }
  });

export type TransactionInput = z.input<typeof transactionSchema>;
export type TransactionSchema = z.output<typeof transactionSchema>;