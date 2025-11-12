import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function AdminSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/products`
        }
      });

      if (error) throw error;

      if (data.user) {
        toast.success('Account created! Your User ID is: ' + data.user.id);
        toast.info('Copy this ID to assign admin role in the backend');
        // Don't navigate yet - let them copy the ID
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create Admin Account</h1>
          <p className="text-muted-foreground mt-2">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link to="/admin/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>

        <div className="p-4 bg-muted rounded-lg text-sm">
          <p className="font-semibold mb-2">After signup:</p>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
            <li>Copy your User ID from the success message</li>
            <li>Open the backend and run this SQL:</li>
          </ol>
          <code className="block mt-2 p-2 bg-background rounded text-xs">
            INSERT INTO user_roles (user_id, role)<br/>
            VALUES ('YOUR_USER_ID', 'admin');
          </code>
        </div>
      </div>
    </div>
  );
}
