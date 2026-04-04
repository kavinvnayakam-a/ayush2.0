
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, UserPlus, LogIn, Mail, Lock, User } from 'lucide-react';

export default function SeekerAuthPage() {
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/jobs');
      toast({ title: 'Welcome back!', description: 'Redirecting to jobs...' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Login Failed', description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      router.push('/jobs/profile');
      toast({ title: 'Account Created', description: 'Complete your profile to apply for jobs.' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Signup Failed', description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 pt-32">
      <div className="max-w-md w-full">
        <div className="text-center mb-10 space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-4xl font-black text-foreground uppercase tracking-tight">Candidate <span className="text-primary italic">Portal</span></h1>
          <p className="text-muted-foreground font-bold italic">Secure access to your job applications</p>
        </div>

        <Card className="rounded-[2.5rem] bg-white shadow-2xl border-white p-2">
          <CardContent className="pt-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-slate-100 p-1 mb-8">
                <TabsTrigger value="login" className="rounded-xl font-black uppercase text-xs">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="rounded-xl font-black uppercase text-xs">Create Account</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input name="email" type="email" placeholder="name@example.com" className="h-12 pl-12 rounded-xl" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input name="password" type="password" placeholder="••••••••" className="h-12 pl-12 rounded-xl" required />
                    </div>
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full h-14 bg-primary text-white font-black uppercase tracking-widest rounded-xl hover:bg-accent transition-all">
                    {isLoading ? 'Signing In...' : <><LogIn className="mr-2 h-5 w-5" /> Sign In</>}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input name="name" type="text" placeholder="Your Name" className="h-12 pl-12 rounded-xl" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input name="email" type="email" placeholder="name@example.com" className="h-12 pl-12 rounded-xl" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Create Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input name="password" type="password" placeholder="Min. 6 characters" className="h-12 pl-12 rounded-xl" required minLength={6} />
                    </div>
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full h-14 bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl hover:bg-primary transition-all">
                    {isLoading ? 'Creating Account...' : <><UserPlus className="mr-2 h-5 w-5" /> Sign Up</>}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
