import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function PasswordResetSuccess() {
  const navigate = useNavigate();
  
  // Auto-redirect to login after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100 overflow-hidden h-full">
        <img 
          src="/success.png" 
          alt="Success illustration" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side - Success Message */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="flex justify-center mb-6">
            <img src="/thelogo.png" alt="Logo" className="h-10" />
          </div>
          
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Password Reset Successful!</h1>
            <p className="text-muted-foreground">
              Your password has been successfully reset. You can now sign in with your new password.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting to login page in 5 seconds...
            </p>
          </div>
          
          <Button 
            asChild
            className="w-full bg-[#1DD3B0] hover:bg-[#1DD3B0]/90 text-white mt-6"
          >
            <Link to="/login">Back to Sign In</Link>
          </Button>
          
          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Didn't reset your password?{' '}
              <a href="/forgot-password" className="text-[#1DD3B0] hover:underline">
                Try again
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
