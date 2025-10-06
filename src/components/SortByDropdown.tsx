import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Check, Calendar as CalendarIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const sortOptions = [
  { id: "name", label: "Name A → Z", hasSubmenu: false },
  { id: "date", label: "Date", hasSubmenu: true },
  { id: "id", label: "ID", hasSubmenu: false },
  { id: "status", label: "Status", hasSubmenu: false },
  { id: "role", label: "Role", hasSubmenu: false },
];

const dateRanges = [
  { id: "today", label: "Today", date: "12 Jan" },
  { id: "yesterday", label: "Yesterday", date: "10 Jan" },
  { id: "this-week", label: "This Week", date: "Jan 10-16" },
  { id: "last-week", label: "Last Week", date: "Jan 16-24" },
  { id: "last-month", label: "Last Month", date: "Jan 1-31" },
  { id: "custom", label: "Custom Range", date: "" },
];

type SortByDropdownProps = {
  value?: string;
  onChange?: (value: string) => void;
  onDateRangeChange?: (range: { from?: Date; to?: Date } | null) => void;
};

export function SortByDropdown({ value, onChange, onDateRangeChange }: SortByDropdownProps) {
  const [sortBy, setSortBy] = useState(value ?? "date");
  const [showDateSubmenu, setShowDateSubmenu] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("today");
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  useEffect(() => {
    if (value && value !== sortBy) setSortBy(value);
  }, [value]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onChange?.(value);
    if (value === "date") {
      setShowDateSubmenu(true);
    } else {
      setShowDateSubmenu(false);
    }
  };

  const handleDateRangeSelect = (rangeId: string) => {
    setSelectedDateRange(rangeId);
    if (rangeId === "custom") {
      setShowCalendar(true);
    } else {
      setShowCalendar(false);
      onDateRangeChange?.(null);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="hover:bg-transparent hover:text-current">
          Sort By <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4 bg-background z-50 rounded-lg shadow-lg border" align="start" sideOffset={8}>
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-muted-foreground">Sort By</h4>
          
          {!showCalendar ? (
            <RadioGroup value={sortBy} onValueChange={handleSortChange}>
              <div className="space-y-3">
                {sortOptions.map((option) => (
                  <div key={option.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label
                          htmlFor={option.id}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                      {option.hasSubmenu && (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    
                    {option.id === "date" && showDateSubmenu && (
                      <div className="ml-6 mt-3 space-y-2 border-l border-border pl-4">
                        {dateRanges.map((range) => (
                          <div
                            key={range.id}
                            className={cn(
                              "flex items-center justify-between py-2 px-3 cursor-pointer border",
                              range.id === "custom" ? "rounded-none" : "rounded-md",
                              selectedDateRange === range.id && "bg-accent border-transparent"
                            )}
                            onClick={() => handleDateRangeSelect(range.id)}
                          >
                            <div className="flex items-center gap-2">
                              {range.id === "custom" ? (
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                              )}
                              <div>
                                <p className="text-sm">{range.label}</p>
                                {range.date && (
                                  <p className="text-xs text-muted-foreground">
                                    {range.date}
                                  </p>
                                )}
                              </div>
                            </div>
                            {selectedDateRange === range.id && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </RadioGroup>
          ) : (
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-[11px] text-muted-foreground">Input field</Label>
                <div className="relative">
                  <Input className="h-8 pr-8 text-sm" />
                  <CalendarIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                </div>
              </div>

              <div className="rounded-md border p-2">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={(range: any) => {
                    setDateRange(range);
                    onDateRangeChange?.(range);
                  }}
                  className="rounded-md"
                  classNames={{
                    table: "w-full border-collapse space-y-0",
                    row: "flex w-full mt-1",
                    head_cell: "text-muted-foreground rounded w-7 font-normal text-[10px]",
                    cell: "h-7 w-7 text-center text-[12px] p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                    day: "h-7 w-7 p-0 font-normal",
                    caption_label: "text-xs font-medium",
                    months: "flex flex-col",
                  }}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  className="h-8 flex-1 text-destructive hover:text-destructive"
                  onClick={() => {
                    setShowCalendar(false);
                    setDateRange({ from: undefined, to: undefined });
                    onDateRangeChange?.(null);
                  }}
                >
                  REMOVE
                </Button>
                <Button
                  className="h-8 flex-1 bg-[#10b981] hover:bg-[#059669] text-white"
                  onClick={() => setShowCalendar(false)}
                >
                  DONE
                </Button>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
