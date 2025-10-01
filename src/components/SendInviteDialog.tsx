import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, MessageCircle, Copy, Send } from "lucide-react";

interface SendInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SendInviteDialog({
  open,
  onOpenChange,
}: SendInviteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create New Member
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Choose how you want to add a new member to the cooperative.
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="space-y-4">
            <div className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Send className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Send Invite</h3>
                  <p className="text-sm text-muted-foreground">
                    Bulk add members by the form, Excel upload, or
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inviteEmail">Send Invite to:</Label>
              <Input
                id="inviteEmail"
                type="email"
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Share via:</p>
            <div className="grid grid-cols-5 gap-3">
              <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#0088cc] flex items-center justify-center">
                  <Send className="h-5 w-5 text-white rotate-45" />
                </div>
                <span className="text-xs">Telegram</span>
              </button>

              <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs">WhatsApp</span>
              </button>

              <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Copy className="h-5 w-5" />
                </div>
                <span className="text-xs">Copy Link</span>
              </button>

              <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#10b981] flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs">Messages</span>
              </button>

              <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="text-xs">Email</span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
