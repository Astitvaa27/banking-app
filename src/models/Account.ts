import mongoose, { Schema, models, model } from "mongoose";

const AccountSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bankName: {
      type: String,
      required: true,
    },

    accountType: {
      type: String,
      default: "Savings",
    },

    balance: {
      type: Number,
      default: 0,
    },

    accountNumber: {
      type: String,
      required: true,
    },

    holder: {
      type: String,
      required: true,
    },

    expiry: {
      type: String,
      default: "12/30",
    },

    color: {
      type: String,
      default: "from-blue-600 to-violet-700",
    },
  },
  {
    timestamps: true,
  }
);

export default models.Account || model("Account", AccountSchema);