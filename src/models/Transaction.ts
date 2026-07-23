import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITransaction extends Document {
  user: mongoose.Types.ObjectId;
  fromAccount?: mongoose.Types.ObjectId;
  toAccount?: mongoose.Types.ObjectId;

  type: "Income" | "Expense" | "Transfer";

  amount: number;

  category:
    | "Food"
    | "Shopping"
    | "Travel"
    | "Bills"
    | "Salary"
    | "Investment"
    | "Entertainment"
    | "Healthcare"
    | "Other";

  description: string;

  status: "Completed" | "Pending" | "Failed";

  date: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fromAccount: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      default: null,
    },

    toAccount: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      default: null,
    },

    type: {
      type: String,
      enum: ["Income", "Expense", "Transfer"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      enum: [
        "Food",
        "Shopping",
        "Travel",
        "Bills",
        "Salary",
        "Investment",
        "Entertainment",
        "Healthcare",
        "Other",
      ],
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Completed", "Pending", "Failed"],
      default: "Completed",
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction: Model<ITransaction> =
  mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;