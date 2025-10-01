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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create New Member
          </DialogTitle>
          <p className="text-muted-foreground">
            Choose how you want to add a new member to the cooperative.
          </p>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          <Button
            variant="outline"
            className="w-full h-auto py-4 px-6 flex items-start gap-4 hover:bg-accent"
            onClick={() => onSelectOption("form")}
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-lg mb-1">Create via Form</h3>
              <p className="text-sm text-muted-foreground font-normal">
                Add a new member manually by filling out their details step by
                step
              </p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full h-auto py-4 px-6 flex items-start gap-4 hover:bg-accent"
            onClick={() => onSelectOption("upload")}
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-lg mb-1">Upload Document</h3>
              <p className="text-sm text-muted-foreground font-normal">
                Bulk add multiple members by uploading an Excel or CSV file.
              </p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full h-auto py-4 px-6 flex items-start gap-4 hover:bg-accent"
            onClick={() => onSelectOption("invite")}
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <Link2 className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-lg mb-1">Send Invite</h3>
              <p className="text-sm text-muted-foreground font-normal">
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
