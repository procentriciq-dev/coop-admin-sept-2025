import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface UploadDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadDocumentDialog({
  open,
  onOpenChange,
}: UploadDocumentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Upload Bulk Document
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-lg bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Drag and drop your file (s) here
              </p>
              <p className="text-xs text-muted-foreground">
                • Max file size 2MB
              </p>
            </div>

            <div className="flex items-center gap-3 justify-center">
              <div className="h-px bg-border flex-1" />
              <span className="text-sm text-muted-foreground">or</span>
              <div className="h-px bg-border flex-1" />
            </div>

            <Button variant="outline" className="mx-auto">
              Browse Files
            </Button>

            <p className="text-xs text-muted-foreground">
              Only support .csv, Excel, .xlsx jpg, .png .svg and zip files
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
