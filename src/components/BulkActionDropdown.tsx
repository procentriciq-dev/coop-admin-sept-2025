import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, EyeOff, Edit2, Trash2 } from "lucide-react";

export function BulkActionDropdown() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="hover:bg-transparent">
          Bulk Action <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 bg-background z-50 rounded-xl" align="start">
        <div className="space-y-3">
          <h4 className="text-sm text-muted-foreground">Roles</h4>
          <div className="rounded-lg border p-2">
            <div className="space-y-2">
              <label className="flex items-center gap-3 text-sm">
                <input type="radio" name="role" defaultChecked className="accent-[#3C1642]" />
                <span>General Assembly</span>
              </label>
              <label className="flex items-center gap-3 text-sm">
                <input type="radio" name="role" className="accent-[#3C1642]" />
                <span>Board of Directors (BOD)</span>
              </label>
              <label className="flex items-center gap-3 text-sm">
                <input type="radio" name="role" className="accent-[#3C1642]" />
                <span>President</span>
              </label>
              <label className="flex items-center gap-3 text-sm">
                <input type="radio" name="role" className="accent-[#3C1642]" />
                <span>Vice-President</span>
              </label>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
