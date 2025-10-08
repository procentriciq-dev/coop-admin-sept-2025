import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Simple email validation
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return; // Don't proceed if validation fails
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call with 1 second delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store authentication state in localStorage
      const userData = { 
        email: formData.email,
        // Add any other user data you want to store
      };
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      
      // If rememberMe is true, store in sessionStorage for persistence
      if (formData.rememberMe) {
        sessionStorage.setItem('rememberedUser', JSON.stringify({
          email: formData.email,
          rememberMe: true
        }));
      } else {
        sessionStorage.removeItem('rememberedUser');
      }
      
      // Show success message
      toast({
        title: 'Success',
        description: 'Logged in successfully!',
      });
      
      // Navigate to dashboard after successful login
      navigate('/dashboard', { replace: true });
      
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Error',
        description: 'An error occurred during login. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row-reverse overflow-hidden">
      {/* Right side - Image (visible on larger screens) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100 overflow-hidden h-full">
        <img 
          src="/login.png" 
          alt="Login illustration" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-center mb-6">
            <img src="/thelogo.png" alt="Logo" className="h-10" />
          </div>
          
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-[#1DD3B0] hover:underline hover:text-[#1DD3B0]/90">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, rememberMe: !!checked }))
                  }
                  className="border-[#1DD3B0] data-[state=checked]:bg-[#1DD3B0] data-[state=checked]:text-white"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#1DD3B0] hover:bg-[#1DD3B0]/90 text-white" 
              disabled={isLoading || !formData.email || !formData.password || formData.password.length < 6}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

<div className="grid grid-cols-1 gap-4">
              <a
              href="http://localhost:3001/auth/google"
              style={{ textDecoration: 'none' }}
              >
              <Button variant="outline" type="button" disabled={isLoading} style={{ width: '100%' }}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 488 512" width="20" height="20">
              <path fill="#4285F4" d="M488 261.8C488 403.3 391.1 504 245.6 504 109.7 504 8 402.3 8 266.4c0-135.9 101.7-246.4 237.6-246.4 73.2 0 137.2 30.2 182.9 78.3l-74.2 71C317.9 123.2 284 107.3 245.6 107.3c-78.5 0-142.2 64-142.2 143.1s63.7 143.1 142.2 143.1c90.4 0 124.6-64.9 129.8-98.6H245.6v-80.3h242.4c2.3 13.4 3.7 27.2 3.7 46.2z"/>
              <path fill="#34A853" d="M245.6 504c66 0 121.5-21.7 162.1-58.6l-79.5-65.2c-22.7 15.1-51.7 23.5-82.6 23.5C163.2 403.7 99.5 349.3 80.1 290.9l-81.7 63.3C32.6 435.6 130.3 504 245.6 504z"/>
              <path fill="#FBBC05" d="M80.1 290.9C73.2 272.7 69.2 252.6 69.2 231.6s3.9-41.1 10.8-59.3l-81.7-63.3C13.6 153.3 8 208 8 266.4c0 58.4 5.6 113.1 69.2 154.5l81.7-63.3c-17.5-23-27.6-52.1-27.6-85.8z"/>
              <path fill="#EA4335" d="M245.6 107.3c42 0 70.1 18 86.2 33.2l64.5-63.1C375.5 34.8 318.8 8 245.6 8 130.3 8 32.6 76.4 10.9 229l81.7 63.3c19.4-58.4 83.1-112.8 153-112.8z"/>
              </svg>
              Google
              </Button>
              </a>
            </div>

            <p className="px-8 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#1DD3B0] hover:underline hover:text-[#1DD3B0]/90">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
