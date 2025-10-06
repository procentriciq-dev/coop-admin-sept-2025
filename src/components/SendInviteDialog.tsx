import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, MessageCircle, Copy, Send, Loader2 } from "lucide-react";

interface SendInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInviteSent?: (email: string) => void;
}

const INVITE_LINK = "https://app.tently.co/join/cooperative";

export function SendInviteDialog({
  open,
  onOpenChange,
  onInviteSent,
}: SendInviteDialogProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInvite = async () => {
    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Invitation Sent",
        description: `An invitation has been sent to ${email}`,
      });
      
      onInviteSent?.(email);
      setEmail("");
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = (platform: string) => {
    let url = "";
    const message = `Join our cooperative on Tently! ${INVITE_LINK}`;
    
    switch (platform) {
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(INVITE_LINK)}&text=${encodeURIComponent('Join our cooperative on Tently!')}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        break;
      case 'email':
        url = `mailto:?subject=Join our cooperative on Tently&body=${encodeURIComponent(message)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(INVITE_LINK);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
          title: "Link Copied",
          description: "Invitation link has been copied to clipboard.",
        });
        return;
      default:
        return;
    }
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareOptions = [
    { 
      id: 'telegram', 
      label: 'Telegram', 
      icon: <Send className="h-5 w-5 text-white rotate-45" />,
      bgColor: 'bg-[#0088cc]',
    },
    { 
      id: 'whatsapp', 
      label: 'WhatsApp', 
      icon: <MessageCircle className="h-5 w-5 text-white" />,
      bgColor: 'bg-[#25D366]',
    },
    { 
      id: 'copy', 
      label: copied ? 'Copied!' : 'Copy Link', 
      icon: <Copy className="h-5 w-5" />,
      bgColor: 'bg-muted',
    },
    { 
      id: 'messages', 
      label: 'Messages', 
      icon: <MessageCircle className="h-5 w-5 text-white" />,
      bgColor: 'bg-[#10b981]',
    },
    { 
      id: 'email', 
      label: 'Email', 
      icon: <Mail className="h-5 w-5" />,
      bgColor: 'bg-muted',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Invite New Member
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Invite members to join your cooperative via email or shareable link.
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="inviteEmail">Email Address</Label>
              <div className="flex gap-2">
                <Input
                  id="inviteEmail"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
                />
                <Button 
                  onClick={handleInvite}
                  disabled={isLoading || !email.trim()}
                  className="min-w-[100px]"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Send Invite'
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                We'll send an email with an invitation link to join your cooperative.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or share via
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-5 gap-3">
              {shareOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleShare(option.id)}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors"
                  disabled={isLoading}
                >
                  <div className={`w-12 h-12 rounded-full ${option.bgColor} flex items-center justify-center`}>
                    {option.icon}
                  </div>
                  <span className="text-xs">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
