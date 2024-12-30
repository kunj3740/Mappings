import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { GOOGLE_CLIENT_ID } from '@/config';
import { AuthForm } from '@/components/auth/AuthForm';
import { authenticateWithGoogle } from '@/lib/auth';

export function SignUp() {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      toast.loading('Creating account with Google...');
      const { token } = await authenticateWithGoogle(credentialResponse.credential);
      localStorage.setItem('token', token);
      toast.success('Account created successfully with Google!');
      navigate('/blogs');
    } catch (error) {
      toast.error('Google authentication failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <div className="w-full max-w-md">
          <AuthForm 
            type="signup"
            onGoogleAuth={() => {
              const googleLoginButton = document.querySelector('[role="button"]');
              if (googleLoginButton instanceof HTMLElement) {
                googleLoginButton.click();
              }
            }}
          />
          <div className="hidden">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error('Google sign-in failed. Please try again.')}
              useOneTap
            />
          </div>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}