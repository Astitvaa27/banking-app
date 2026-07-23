"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import useAccounts from "@/hooks/useAccounts";

import {
  transactionSchema,
  type TransactionInput,
} from "@/lib/validators/transactionValidator";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TransactionFormProps {
  onSuccess: () => void;
}

const incomeCategories = [
  "Salary",
  "Investment",
  "Other",
] as const;

const expenseCategories = [
  "Food",
  "Shopping",
  "Travel",
  "Bills",
  "Entertainment",
  "Healthcare",
  "Other",
] as const;

const transferCategories = [
  "Other",
] as const;

export default function TransactionForm({
  onSuccess,
}: TransactionFormProps) {
  const { accounts } = useAccounts();

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TransactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "Expense",
      amount: 0,
      category: "Food",
      description: "",
      status: "Completed",
      date: new Date(),
    },
  });

  const type = watch("type");

  const categories = useMemo(() => {
    switch (type) {
      case "Income":
        return incomeCategories;

      case "Transfer":
        return transferCategories;

      default:
        return expenseCategories;
    }
  }, [type]);

  async function onSubmit(data: TransactionInput) {
    try {
        const res = await fetch("/api/transactions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok) {
        throw new Error(result.error || "Failed to add transaction");
        }

        onSuccess();
    } catch (error) {
        console.error(error);

        toast.error(
        error instanceof Error
            ? error.message
            : "Something went wrong"
        );
    }
  }

  return (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-5"
  >
    {/* Transaction Type */}
    <div>
      <label className="mb-2 block text-sm font-medium">
        Transaction Type
      </label>

      <Select
        value={type}
        onValueChange={(value) =>
          setValue("type", value as TransactionInput["type"])
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="Income">Income</SelectItem>
          <SelectItem value="Expense">Expense</SelectItem>
          <SelectItem value="Transfer">Transfer</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Amount */}
    <div>
      <label className="mb-2 block text-sm font-medium">
        Amount
      </label>

      <Input
        type="number"
        step="0.01"
        {...register("amount", {
          valueAsNumber: true,
        })}
      />

      {errors.amount && (
        <p className="mt-1 text-sm text-red-500">
          {errors.amount.message}
        </p>
      )}
    </div>

    {/* Category */}
    <div>
      <label className="mb-2 block text-sm font-medium">
        Category
      </label>

      <Select
        value={watch("category")}
        onValueChange={(value) =>
          setValue(
            "category",
            value as TransactionInput["category"]
          )
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>

        <SelectContent>
          {categories.map((category) => (
            <SelectItem
              key={category}
              value={category}
            >
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {errors.category && (
        <p className="mt-1 text-sm text-red-500">
          {errors.category.message}
        </p>
      )}
    </div>

    {/* From Account */}
    {type !== "Income" && (
      <div>
        <label className="mb-2 block text-sm font-medium">
          From Account
        </label>

        <Select
          value={watch("fromAccount") ?? ""}
          onValueChange={(value) =>
            setValue("fromAccount", value as TransactionInput["fromAccount"])
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select account" />
          </SelectTrigger>

          <SelectContent>
            {accounts.map((account) => (
              <SelectItem
                key={account._id}
                value={account._id}
              >
                {account.bankName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors.fromAccount && (
          <p className="mt-1 text-sm text-red-500">
            {errors.fromAccount.message}
          </p>
        )}
      </div>
    )}

    {/* To Account */}
    {type !== "Expense" && (
      <div>
        <label className="mb-2 block text-sm font-medium">
          To Account
        </label>

        <Select
          value={watch("toAccount") ?? ""}
          onValueChange={(value) =>
            setValue("toAccount", value as TransactionInput["toAccount"])
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select account" />
          </SelectTrigger>

          <SelectContent>
            {accounts.map((account) => (
              <SelectItem
                key={account._id}
                value={account._id}
              >
                {account.bankName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors.toAccount && (
          <p className="mt-1 text-sm text-red-500">
            {errors.toAccount.message}
          </p>
        )}
      </div>
    )}

    {/* Description */}
    <div>
      <label className="mb-2 block text-sm font-medium">
        Description
      </label>

      <Input
        {...register("description")}
        placeholder="Enter description"
      />
    </div>

    {/* Date */}
    <div>
      <label className="mb-2 block text-sm font-medium">
        Date
      </label>

      <Input
        type="date"
        {...register("date", {
          valueAsDate: true,
        })}
      />
    </div>

    <Button
      type="submit"
      disabled={isSubmitting}
      className="w-full"
    >
      {isSubmitting ? "Adding..." : "Add Transaction"}
    </Button>
  </form>
);
}