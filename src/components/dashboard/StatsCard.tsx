import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color,
}: Props) {
  return (
    <Card className="rounded-3xl border border-border bg-card shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <CardContent className="flex items-center justify-between p-7">

        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-foreground">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color} shadow-lg`}
        >
          <Icon
            className="text-white"
            size={30}
          />
        </div>

      </CardContent>

    </Card>
  );
}