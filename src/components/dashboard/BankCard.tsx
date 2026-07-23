"use client";

import { CreditCard } from "lucide-react";
import useAccounts from "@/hooks/useAccounts";

export default function BankCard() {
  const { accounts, loading } = useAccounts();

  if (loading) {
    return (
      <div className="flex h-[340px] items-center justify-center rounded-3xl border border-border">
        Loading...
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="flex h-[340px] items-center justify-center rounded-3xl border border-border">
        No Bank Accounts Found
      </div>
    );
  }

  return (
  <div className="w-full">
    <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
      {accounts.map((account) => (
        <div
          key={account._id}
          className={`relative h-[300px] w-[400px] min-w-[400px] snap-start overflow-hidden rounded-[30px] bg-gradient-to-br ${account.color} p-8 text-white shadow-2xl`}
        >
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10" />

          <div className="relative flex h-full flex-col justify-between">
            {/* Top */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Bank</p>
                <h2 className="text-2xl font-bold">
                  {account.bankName}
                </h2>
              </div>

              <CreditCard size={34} />
            </div>

            {/* Balance */}
            <div>
              <p className="text-sm opacity-80">
                Available Balance
              </p>

              <h1 className="mt-2 text-4xl font-bold">
                ₹{account.balance.toLocaleString()}
              </h1>
            </div>

            {/* Bottom */}
            <div>
              <div className="mb-6 text-xl tracking-[6px]">
                {account.accountNumber}
              </div>

              <div className="flex justify-between">
                <div>
                  <p className="text-xs uppercase opacity-70">
                    Card Holder
                  </p>

                  <h3 className="mt-1 font-semibold">
                    {account.holder}
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-xs uppercase opacity-70">
                    Expires
                  </p>

                  <h3 className="mt-1 font-semibold">
                    {account.expiry}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}