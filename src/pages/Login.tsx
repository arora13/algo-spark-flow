import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';

const emailRegex =
  // lightweight email check
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const MIN_PASSWORD = 6;

const Login = () => {
  const [tab, setTab] = React.useState<'login' | 'signup'>('login');

  // shared state across tabs so switching doesn’t wipe inputs
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  // field-level errors
  const [emailErr, setEmailErr] = React.useState<string | null>(null);
  const [passwordErr, setPasswordErr] = React.useState<string | null>(null);
  const [nameErr, setNameErr] = React.useState<string | null>(null);

  const { login, signup, user } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const validateLogin = () => {
    let ok = true;
    setEmailErr(null);
    setPasswordErr(null);
    setErr(null);

    if (!emailRegex.test(email.trim())) {
      setEmailErr('Please enter a valid email address.');
      ok = false;
    }
    if (password.length < MIN_PASSWORD) {
      setPasswordErr(`Password must be at least ${MIN_PASSWORD} characters.`);
      ok = false;
    }
    return ok;
  };

  const validateSignup = () => {
    let ok = validateLogin();
    setNameErr(null);

    if (!name.trim()) {
      setNameErr('Please enter your full name.');
      ok = false;
    }
    return ok;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setIsLoading(true);
    setErr(null);

    try {
      // Most contexts resolve on success and throw on error
      await login?.(email.trim(), password);
      navigate('/dashboard');
    } catch (e: any) {
      setErr(e?.message || 'Login failed. Check your email and password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup()) return;

    setIsLoading(true);
    setErr(null);

    try {
      await signup?.(email.trim(), password, name.trim());
      navigate('/dashboard');
    } catch (e: any) {
      setErr(e?.message || 'Signup failed. Please try a different email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setErr(null);
    setEmailErr(null);
    setPasswordErr(null);

    try {
      // Change these if your AuthContext expects specific demo creds
      await login?.('demo@algoflow.dev', 'demo1234');
      navigate('/dashboard');
    } catch (e: any) {
      setErr(e?.message || 'Demo login is disabled. Ask an admin to enable it.');
    } finally {
      setIsLoading(false);
    }
  };

  // On tab change, clear top-level error banners but keep field-level
  const onTabChange = (value: string) => {
    setTab(value as 'login' | 'signup');
    setErr(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
            <span className="text-white font-bold text-xl">AF</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl text-gray-900 mb-2">
            Welcome to AlgoFlow
          </h1>
          <p className="text-gray-600">
            Sign in to track your progress and access exclusive content
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-8">
            <Tabs value={tab} onValueChange={onTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {err && (
                <div
                  className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-200"
                  role="alert"
                  aria-live="assertive"
                >
                  {err}
                </div>
              )}

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-6" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`pl-10 ${emailErr ? 'border-red-300 focus-visible:ring-0' : ''}`}
                        required
                        autoComplete="email"
                        disabled={isLoading}
                      />
                    </div>
                    {emailErr && (
                      <p className="text-xs text-red-600 mt-1">{emailErr}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`pl-10 ${passwordErr ? 'border-red-300 focus-visible:ring-0' : ''}`}
                        required
                        autoComplete="current-password"
                        disabled={isLoading}
                      />
                    </div>
                    {passwordErr && (
                      <p className="text-xs text-red-600 mt-1">{passwordErr}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-primary hover:opacity-90 text-white rounded-full py-3 font-medium transition-all duration-200 hover:scale-105 disabled:opacity-60"
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>

                  <Button
                    type="button"
                    onClick={handleDemoLogin}
                    disabled={isLoading}
                    variant="outline"
                    className="w-full rounded-full py-3 font-medium mt-2"
                  >
                    {isLoading ? 'Please wait...' : 'Try Demo Login'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-6" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`pl-10 ${nameErr ? 'border-red-300 focus-visible:ring-0' : ''}`}
                        required
                        autoComplete="name"
                        disabled={isLoading}
                      />
                    </div>
                    {nameErr && (
                      <p className="text-xs text-red-600 mt-1">{nameErr}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`pl-10 ${emailErr ? 'border-red-300 focus-visible:ring-0' : ''}`}
                        required
                        autoComplete="email"
                        disabled={isLoading}
                      />
                    </div>
                    {emailErr && (
                      <p className="text-xs text-red-600 mt-1">{emailErr}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`pl-10 ${passwordErr ? 'border-red-300 focus-visible:ring-0' : ''}`}
                        required
                        autoComplete="new-password"
                        disabled={isLoading}
                      />
                    </div>
                    {passwordErr && (
                      <p className="text-xs text-red-600 mt-1">{passwordErr}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-primary hover:opacity-90 text-white rounded-full py-3 font-medium transition-all duration-200 hover:scale-105 disabled:opacity-60"
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                By signing up, you agree to our{' '}
                <a href="#" className="text-algo-blue hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-algo-blue hover:underline">Privacy Policy</a>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Demo credentials: click “Try Demo Login”, or use any email and password if your AuthContext allows it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
