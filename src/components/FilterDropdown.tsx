import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";

const filterOptions = [
  { id: "active", label: "Active", defaultChecked: true },
  { id: "suspended", label: "Suspended", defaultChecked: false },
  { id: "inactive", label: "Inactive", defaultChecked: false },
  { id: "new-added", label: "New Added", defaultChecked: false },
];

type FilterDropdownProps = {
  value?: Record<string, boolean>;
  onChange?: (value: Record<string, boolean>) => void;
};

export function FilterDropdown({ value, onChange }: FilterDropdownProps) {
  const [filters, setFilters] = useState(
    filterOptions.reduce((acc, option) => {
      acc[option.id] = option.defaultChecked;
      return acc;
    }, {} as Record<string, boolean>)
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (value) setFilters(value);
  }, [value]);

  const filteredOptions = filterOptions.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 bg-background z-50" align="start">
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-muted-foreground">Filter</h4>
          <Input
            placeholder="Search Roles"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9"
          />
          <div className="space-y-3">
            {filteredOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={filters[option.id]}
                  onCheckedChange={(checked) => {
                    const updated = { ...filters, [option.id]: !!checked };
                    setFilters(updated);
                    onChange?.(updated);
                  }
                  }
                />
                <Label
                  htmlFor={option.id}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
