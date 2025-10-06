import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface LogoutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost';
  className?: string;
  children?: React.ReactNode;
}

export function LogoutButton({ variant = 'outline', className = '', children }: LogoutButtonProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // Clear all authentication data
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      sessionStorage.removeItem('rememberedUser');
      
      // Close the dialog
      setShowDialog(false);
      
      // Show success message
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });
      
      // Wait a moment for the toast to show, then reload
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Force a full page reload to clear any cached state
      window.location.href = '/login';
      
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Error',
        description: 'Failed to log out. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button 
        variant={variant} 
        onClick={() => setShowDialog(true)}
        className={className}
        disabled={isLoading}
      >
        {children || 'Logout'}
      </Button>

      <AlertDialog open={showDialog} onOpenChange={!isLoading ? setShowDialog : undefined}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out of your account?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <Button 
              onClick={handleLogout}
              className="bg-[#1DD3B0] hover:bg-[#1DD3B0]/90"
              disabled={isLoading}
            >
              {isLoading ? 'Logging out...' : 'Logout'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default LogoutButton;
