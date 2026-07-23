"use client";

import { CreditCard } from "lucide-react";

interface Props {
  bankName: string;
  holder: string;
  accountNumber: string;
  balance: number;
  expiry: string;
  color: string;
}

export default function CardPreview({
  bankName,
  holder,
  accountNumber,
  balance,
  expiry,
  color,
}: Props) {
  return (
    <div
      className={`rounded-3xl bg-gradient-to-br ${color} p-6 text-white shadow-xl transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">
            Bank
          </p>

          <h2 className="text-xl font-bold">
            {bankName || "VaultX Bank"}
          </h2>
        </div>

        <CreditCard />
      </div>

      <div className="mt-8">
        <p className="text-sm opacity-80">
          Balance
        </p>

        <h1 className="text-4xl font-bold">
          ₹
          {Number(balance || 0).toLocaleString()}
        </h1>
      </div>

      <div className="mt-8 tracking-[5px] text-lg">
        {accountNumber || "XXXX XXXX XXXX"}
      </div>

      <div className="mt-8 flex justify-between">
        <div>
          <p className="text-xs opacity-70">
            HOLDER
          </p>

          <h3>{holder || "Your Name"}</h3>
        </div>

        <div className="text-right">
          <p className="text-xs opacity-70">
            EXPIRES
          </p>

          <h3>{expiry || "12/30"}</h3>
        </div>
      </div>
    </div>
  );
}