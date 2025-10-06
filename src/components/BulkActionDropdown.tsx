import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
      <PopoverContent className="w-44 p-2 bg-background z-50" align="start">
        <div className="space-y-1">
          <h4 className="px-2 py-1.5 text-xs text-muted-foreground">
            Menu actions
          </h4>
          
          <button className="w-full flex items-center gap-3 px-2 py-2 text-sm hover:bg-accent/40 rounded-md transition-colors">
            <EyeOff className="h-4 w-4" />
            <span>View All</span>
          </button>
          
          <button className="w-full flex items-center gap-3 px-2 py-2 text-sm text-[#10b981] hover:bg-accent/40 rounded-md transition-colors">
            <Edit2 className="h-4 w-4" />
            <span>Edit</span>
          </button>
          
          <button className="w-full flex items-center gap-3 px-2 py-2 text-sm text-destructive hover:bg-accent/40 rounded-md transition-colors">
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
