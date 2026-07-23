import { Landmark } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 p-2 text-white shadow-lg">
        <Landmark size={22} />
      </div>

      <div>
        <h1 className="text-xl font-bold tracking-tight">
          VaultX
        </h1>

        <p className="text-xs text-muted-foreground">
          Smart Banking
        </p>
      </div>
    </div>
  );
}