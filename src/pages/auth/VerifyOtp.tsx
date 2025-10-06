import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTime, setResendTime] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  
  const email = location.state?.email || '';
  
  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendTime > 0) {
      const timer = setTimeout(() => setResendTime(resendTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTime]);
  
  const handleResendOtp = async () => {
    if (resendTime > 0) return;
    
    try {
      // Simulate API call to resend OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResendTime(30);
      toast({
        title: 'Success',
        description: 'Verification code has been resent.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to resend verification code. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate OTP (in a real app, this would be validated on the server)
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setErrors({ otp: 'Please enter a valid 6-digit code' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would verify the OTP with your backend
      // If successful, navigate to reset password page
      navigate('/reset-password', { 
        state: { 
          email,
          otp: otpString 
        } 
      });
      
    } catch (error) {
      console.error('OTP verification error:', error);
      toast({
        title: 'Error',
        description: 'Invalid verification code. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100 overflow-hidden h-full">
        <img 
          src="/verify.png" 
          alt="Verify OTP illustration" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-center mb-6">
            <img src="/thelogo.png" alt="Logo" className="h-10" />
          </div>
          
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Verify Your Email</h1>
            <p className="text-muted-foreground">
              We've sent a verification code to <span className="font-medium">{email || 'your email'}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <div className="flex justify-between space-x-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="text-center h-14 text-lg font-mono"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              {errors.otp && (
                <p className="text-sm text-red-500">{errors.otp}</p>
              )}
              
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Didn't receive a code?{' '}
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendTime > 0}
                    className={`text-[#1DD3B0] hover:underline ${resendTime > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {resendTime > 0 ? `Resend in ${resendTime}s` : 'Resend Code'}
                  </button>
                </p>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#1DD3B0] hover:bg-[#1DD3B0]/90 text-white"
              disabled={isLoading || otp.some(digit => !digit)}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>

            <div className="text-center text-sm">
              <Link to="/login" className="text-[#1DD3B0] hover:underline">
                Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
