import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { LockIcon, MailIcon, UserIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { authenticateUser, authenticateAsGuest } from '@/lib/auth';
import type { SignupInput } from '@/types/auth';

interface AuthFormProps {
  type: 'signin' | 'signup';
  onGoogleAuth: () => void;
}

export function AuthForm({ type, onGoogleAuth }: AuthFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupInput>({
    name: '',
    username: '',
    password: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    try {
      toast.loading('Authenticating...');
      const jwt = await authenticateUser(type, formData);
      localStorage.setItem('token', jwt);
      toast.success('Authentication successful!');
      navigate('/blogs');
    } catch (error) {
      toast.error('Authentication failed. Please try again.');
    }
  };

  const handleGuestLogin = async () => {
    try {
      toast.loading('Logging in as guest...');
      const jwt = await authenticateAsGuest();
      localStorage.setItem('token', jwt);
      toast.success('Logged in as guest!');
      navigate('/blogs');
    } catch (error) {
      toast.error('Guest login failed. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {type === 'signin' ? 'Welcome Back' : 'Create Account'}
        </CardTitle>
        <CardDescription>
          {type === 'signin' 
            ? 'Sign in to your account to continue'
            : 'Fill in your details to create a new account'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {type === 'signup' && (
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                className="pl-9"
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              name="username"
              type="email"
              placeholder="john@example.com"
              className="pl-9"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="pl-9"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Button className="w-full" onClick={handleSubmit}>
            {type === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleGuestLogin}
          >
            Continue as Guest
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={onGoogleAuth}
          >
            Continue with Google
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}