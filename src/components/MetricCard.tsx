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
    <Card className="p-5 border rounded-[8px] shadow-sm">
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center shadow-sm",
            iconBgColor
          )}
        >
          {icon}
        </div>
      </div>
      <div className="mt-6">
        <p className="text-[12px] text-muted-foreground mb-2">{title}</p>
        <div className="flex items-center gap-2">
          <p className="text-[22px] leading-none font-semibold">{value}</p>
          {change && (
            <span
              className={cn(
                "text-[10px] font-medium px-2 py-[2px] rounded-full",
                changeType === "positive"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-orange-100 text-orange-700"
              )}
            >
              {change}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
