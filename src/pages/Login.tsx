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
  const [currentTab, setCurrentTab] = React.useState<'login' | 'signup'>('login');

  // Keep user inputs when switching tabs - no one likes retyping stuff! 😤
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [isThinking, setIsThinking] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Individual field errors - we'll show these per field
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [passwordError, setPasswordError] = React.useState<string | null>(null);
  const [nameError, setNameError] = React.useState<string | null>(null);

  const { login, signup, user } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  // Check if login looks good before we try it
  const checkLoginForm = () => {
    let looksGood = true;
    setEmailError(null);
    setPasswordError(null);
    setErrorMessage(null);

    if (!emailRegex.test(userEmail.trim())) {
      setEmailError('Hmm, that email doesn\'t look quite right 🤔');
      looksGood = false;
    }
    if (userPassword.length < MIN_PASSWORD) {
      setPasswordError(`Password needs at least ${MIN_PASSWORD} characters (security first! 🔒)`);
      looksGood = false;
    }
    return looksGood;
  };

  // Check signup form - same as login but with name
  const checkSignupForm = () => {
    let looksGood = checkLoginForm();
    setNameError(null);

    if (!userName.trim()) {
      setNameError('We\'d love to know your name! 😊');
      looksGood = false;
    }
    return looksGood;
  };

  // The login magic happens here ✨
  const doTheLoginThing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkLoginForm()) return;

    setIsThinking(true);
    setErrorMessage(null);

    try {
      // Try to log them in - fingers crossed! 🤞
      await login?.(userEmail.trim(), userPassword);
      navigate('/dashboard');
    } catch (error: any) {
      setErrorMessage(error?.message || 'Oops! Something went wrong. Double-check your email and password! 😅');
    } finally {
      setIsThinking(false);
    }
  };

  // Create a new account - welcome to the family! 🎉
  const createNewAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkSignupForm()) return;

    setIsThinking(true);
    setErrorMessage(null);

    try {
      await signup?.(userEmail.trim(), userPassword, userName.trim());
      navigate('/dashboard');
    } catch (error: any) {
      setErrorMessage(error?.message || 'Hmm, that didn\'t work. Maybe try a different email? 🤷‍♀️');
    } finally {
      setIsThinking(false);
    }
  };



  // When switching tabs, clear the main error but keep field errors
  const switchTab = (value: string) => {
    setCurrentTab(value as 'login' | 'signup');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
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
            <Tabs value={currentTab} onValueChange={switchTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {errorMessage && (
                <div
                  className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-200"
                  role="alert"
                  aria-live="assertive"
                >
                  {errorMessage}
                </div>
              )}

              <TabsContent value="login">
                <form onSubmit={doTheLoginThing} className="space-y-6" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className={`pl-10 ${emailError ? 'border-red-300 focus-visible:ring-0' : ''}`}
                        required
                        autoComplete="email"
                        disabled={isThinking}
                      />
                    </div>
                    {emailError && (
                      <p className="text-xs text-red-600 mt-1">{emailError}</p>
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
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        className={`pl-10 ${passwordError ? 'border-red-300 focus-visible:ring-0' : ''}`}
                        required
                        autoComplete="current-password"
                        disabled={isThinking}
                      />
                    </div>
                    {passwordError && (
                      <p className="text-xs text-red-600 mt-1">{passwordError}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isThinking}
                    className="w-full bg-gradient-primary hover:opacity-90 text-white rounded-full py-3 font-medium transition-all duration-200 hover:scale-105 disabled:opacity-60"
                  >
                    {isThinking ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={createNewAccount} className="space-y-6" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className={`pl-10 ${nameError ? 'border-red-300 focus-visible:ring-0' : ''}`}
                        required
                        autoComplete="name"
                        disabled={isThinking}
                      />
                    </div>
                    {nameError && (
                      <p className="text-xs text-red-600 mt-1">{nameError}</p>
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
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className={`pl-10 ${emailError ? 'border-red-300 focus-visible:ring-0' : ''}`}
                        required
                        autoComplete="email"
                        disabled={isThinking}
                      />
                    </div>
                    {emailError && (
                      <p className="text-xs text-red-600 mt-1">{emailError}</p>
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
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        className={`pl-10 ${passwordError ? 'border-red-300 focus-visible:ring-0' : ''}`}
                        required
                        autoComplete="new-password"
                        disabled={isThinking}
                      />
                    </div>
                    {passwordError && (
                      <p className="text-xs text-red-600 mt-1">{passwordError}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isThinking}
                    className="w-full bg-gradient-primary hover:opacity-90 text-white rounded-full py-3 font-medium transition-all duration-200 hover:scale-105 disabled:opacity-60"
                  >
                    {isThinking ? 'Creating account...' : 'Create Account'}
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

      </div>
    </div>
  );
};

export default Login;
