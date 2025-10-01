import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const roles = [
  "General Assembly",
  "Board of Directors (BOD)",
  "President",
  "Vice-President",
  "Secretary",
  "Assistant Secretary",
  "Treasurer",
  "Assistant Treasurer",
];

export function RolesDropdown() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRoles = roles.filter((role) =>
    role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          Roles <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 bg-background z-50" align="start">
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-muted-foreground">Roles</h4>
          <Input
            placeholder="Search Roles"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9"
          />
          <RadioGroup value={selectedRole} onValueChange={setSelectedRole}>
            <div className="space-y-3">
              {filteredRoles.map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <RadioGroupItem value={role} id={role} />
                  <Label
                    htmlFor={role}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {role}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
}
