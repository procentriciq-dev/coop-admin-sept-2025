import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

interface MemberFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MemberFormDialog({
  open,
  onOpenChange,
}: MemberFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            New Member Form
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 bg-primary">
              <AvatarFallback className="bg-primary text-primary-foreground">
                P
              </AvatarFallback>
            </Avatar>
            <Avatar className="h-12 w-12 bg-muted">
              <AvatarFallback>
                <Camera className="h-5 w-5 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input id="firstName" placeholder="Enter your name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <Input id="lastName" placeholder="Enter your name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input id="email" type="email" placeholder="Enter your name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="Enter your name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">
                Role <span className="text-destructive">*</span>
              </Label>
              <Select>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Enter your Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coordinator">
                    Executive Coordinator
                  </SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input id="occupation" placeholder="Enter your name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Enter gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" placeholder="Enter your name" />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="Enter your name" />
            </div>
          </div>

          <Button className="w-full bg-[#10b981] hover:bg-[#059669] text-white h-12">
            Add Member
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
