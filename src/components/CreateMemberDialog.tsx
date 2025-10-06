import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Link2 } from "lucide-react";

interface CreateMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectOption: (option: "form" | "upload" | "invite") => void;
}

export function CreateMemberDialog({
  open,
  onOpenChange,
  onSelectOption,
}: CreateMemberDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-[16px] font-semibold">
            Create New Member
          </DialogTitle>
          <p className="text-[12px] text-muted-foreground">
            Choose how you want to add a new member to the cooperative.
          </p>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          <Button
            variant="outline"
            className="w-full h-auto py-3 px-4 flex items-start gap-3 rounded-xl hover:bg-[#1DD3B0] hover:text-white"
            onClick={() => onSelectOption("form")}
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium text-[14px] mb-0.5">Create via Form</h3>
              <p className="text-[12px] text-muted-foreground font-normal">
                Add a new member manually by filling out their details step by
                step
              </p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full h-auto py-3 px-4 flex items-start gap-3 rounded-xl hover:bg-[#1DD3B0] hover:text-white"
            onClick={() => onSelectOption("upload")}
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <Upload className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium text-[14px] mb-0.5">Upload Document</h3>
              <p className="text-[12px] text-muted-foreground font-normal">
                Bulk add multiple members by uploading an Excel or CSV file.
              </p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full h-auto py-3 px-4 flex items-start gap-3 rounded-xl hover:bg-[#1DD3B0] hover:text-white"
            onClick={() => onSelectOption("invite")}
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <Link2 className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium text-[14px] mb-0.5">Send Invite</h3>
              <p className="text-[12px] text-muted-foreground font-normal">
                Invite members to join by entering their email and sending them
                a signup link.
              </p>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
