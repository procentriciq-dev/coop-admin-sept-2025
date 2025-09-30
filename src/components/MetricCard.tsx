import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative";
  icon: ReactNode;
  iconBgColor: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType,
  icon,
  iconBgColor,
}: MetricCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold mb-2">{value}</p>
          {change && (
            <span
              className={cn(
                "text-xs font-medium px-2 py-1 rounded",
                changeType === "positive"
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              )}
            >
              {change}
            </span>
          )}
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            iconBgColor
          )}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}
