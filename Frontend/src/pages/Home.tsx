import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to Your App
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Get started by signing in or creating a new account
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/signin">
            <Button size="lg">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline" size="lg">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}