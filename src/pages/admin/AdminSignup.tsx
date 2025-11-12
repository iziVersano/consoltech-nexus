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
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('User ID copied to clipboard!');
  };

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
        setUserId(data.user.id);
        toast.success('Account created successfully!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create Admin Account</h1>
          <p className="text-muted-foreground mt-2">Sign up to get started</p>
        </div>

        {userId ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h2 className="font-semibold text-green-600 mb-2">✓ Account Created!</h2>
              <p className="text-sm text-muted-foreground mb-3">Your User ID:</p>
              <div className="flex gap-2">
                <code className="flex-1 p-2 bg-background rounded text-xs break-all">
                  {userId}
                </code>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => copyToClipboard(userId)}
                >
                  Copy
                </Button>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg text-sm space-y-3">
              <p className="font-semibold">Next Steps:</p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Copy your User ID above (click the Copy button)</li>
                <li>Click "Open Backend" below</li>
                <li>Run this SQL command:</li>
              </ol>
              <code className="block p-3 bg-background rounded text-xs overflow-x-auto">
                INSERT INTO user_roles (user_id, role)<br/>
                VALUES ('{userId}', 'admin');
              </code>
              <Button
                className="w-full mt-3"
                onClick={() => window.open('about:blank', '_blank')}
              >
                Open Backend
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/admin/login')}
              >
                Go to Login
              </Button>
            </div>
          </div>
        ) : (
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
        )}

        {!userId && (
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/admin/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
