"use client";

import { useEffect, useState } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SettingsPageContent() {
  const user = useCurrentUser();

  const [name, setName] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  async function updateProfile() {
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });

      if (res.ok) {
        toast.success("Profile updated successfully!");
        window.location.reload();
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  }

  async function updatePassword() {
    if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
    }

    try {
        const res = await fetch("/api/user/change-password", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            currentPassword,
            newPassword,
        }),
        });

        const data = await res.json();

        if (res.ok) {
        toast.success(data.message);

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        } else {
        toast.error(data.message);
        }
    } catch (error) {
        console.error(error);
        alert("Something went wrong.");
    }
  }

  async function logout() {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (res.ok) {
        toast.success("Logged out successfully.");

        router.push("/login");

        router.refresh();
      } else {
        toast.error("Failed to logout.");
      }
    } catch {
      toast.error("Something went wrong.");
    }
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings.
        </p>
      </div>

      {/* Profile Information */}
      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-6 text-xl font-semibold">
          Profile Information
        </h2>

        <div className="grid gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border bg-background px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              value={user?.email ?? ""}
              readOnly
              className="w-full rounded-lg border bg-background px-4 py-3"
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={updateProfile}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-6 text-xl font-semibold">
          Change Password
        </h2>

        <div className="grid gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Current Password
            </label>

            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-lg border bg-background px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border bg-background px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm New Password
            </label>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border bg-background px-4 py-3"
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={updatePassword}>
                Update Password
            </Button>
          </div>

          <div className="rounded-xl border border-destructive/20 bg-card p-6">
            <h2 className="text-xl font-semibold text-destructive">
              Danger Zone
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Logging out will end your current session.
            </p>

            <Button
              variant="destructive"
              className="mt-5"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}