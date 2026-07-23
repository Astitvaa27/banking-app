"use client";

import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  accountSchema,
  type AccountInput,
} from "@/lib/validators/account";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import CardPreview from "./CardPreview";
import ColorPicker from "./ColorPicker";

interface Props {
  onSuccess?: () => void;
  initialData?: Partial<AccountInput>;
  accountId?: string;
  mode?: "create" | "edit";
}

export default function AccountForm({
  onSuccess,
  initialData,
  accountId,
  mode = "create",
}: Props) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountInput>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
        bankName: initialData?.bankName ?? "",
        holder: initialData?.holder ?? "",
        accountNumber: initialData?.accountNumber ?? "",
        balance: initialData?.balance ?? 0,
        expiry: initialData?.expiry ?? "12/30",
        accountType: initialData?.accountType ?? "Savings",
        color: initialData?.color ?? "from-blue-600 to-violet-700",
    },
  });

  useEffect(() => {
    register("accountType");
    register("color");
  }, [register]);

  const form = watch();

  const onSubmit: SubmitHandler<AccountInput> = async (data) => {
    console.log("Submitting...", data);

    try {
      setLoading(true);

      const res = await fetch(
        mode === "create"
            ? "/api/accounts"
            : `/api/accounts/${accountId}`,
        {
            method: mode === "create" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log(result);

      if (!res.ok) {
        throw new Error(result.message || "Request failed");
      }

      alert(
        mode === "create"
            ? "Account Created 🎉"
            : "Account Updated 🎉"
      );

      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      <input type="hidden" {...register("accountType")} />
      <input type="hidden" {...register("color")} />

      <CardPreview
        bankName={form.bankName}
        holder={form.holder}
        accountNumber={form.accountNumber}
        balance={Number(form.balance ?? 0)}
        expiry={form.expiry}
        color={form.color}
      />

      <div>
        <Label>Bank Name</Label>
        <Input
          {...register("bankName")}
          placeholder="HDFC Bank"
        />
        <p className="text-sm text-red-500">
          {errors.bankName?.message}
        </p>
      </div>

      <div>
        <Label>Account Holder</Label>
        <Input
          {...register("holder")}
          placeholder="Astitva Mhatre"
        />
      </div>

      <div>
        <Label>Account Number</Label>
        <Input
            disabled={mode === "edit"}
            {...register("accountNumber")}
        />
      </div>

      <div>
        <Label>Balance</Label>
        <Input
            disabled={mode === "edit"}
            type="number"
            {...register("balance", {
                valueAsNumber: true,
            })}
        />
      </div>

      <div>
        <Label>Expiry</Label>
        <Input
          {...register("expiry")}
        />
      </div>

      <ColorPicker
        value={form.color}
        onChange={(value) =>
          setValue("color", value, {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
      />

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
        >
        {loading
            ? mode === "create"
            ? "Creating..."
            : "Updating..."
            : mode === "create"
            ? "Create Account"
            : "Update Account"}
      </Button>
    </form>
  );
}