
'use client';

import React, { useEffect, useState } from 'react';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Save, UserCircle, FileText, Phone, Mail, Sparkles, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/firebase';

export default function SeekerProfilePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsLoading] = useState(false);

  const profileRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'seeker_profiles', user.uid);
  }, [firestore, user]);

  const { data: profile, isLoading: isProfileLoading } = useDoc(profileRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/jobs/auth');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/jobs');
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firestore || !user) return;

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const data = {
      fullName: formData.get('fullName'),
      email: user.email,
      phone: formData.get('phone'),
      resumeUrl: formData.get('resumeUrl'),
      skills: formData.get('skills'),
      updatedAt: serverTimestamp(),
    };

    try {
      await setDoc(doc(firestore, 'seeker_profiles', user.uid), data, { merge: true });
      toast({ title: 'Profile Updated', description: 'Your details have been saved successfully.' });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally {
      setIsLoading(false);
    }
  };

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tight">Your <span className="text-primary italic">Profile</span></h1>
            <p className="text-muted-foreground font-bold italic">Keep your candidate details updated</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="rounded-full border-2 font-black px-8">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>

        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Col: Main Form */}
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[3rem] bg-white border-white shadow-xl p-4">
                <CardHeader>
                  <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
                    <UserCircle className="text-primary" /> Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                      <Input name="fullName" defaultValue={profile?.fullName || user.displayName || ''} className="h-12 rounded-xl" required />
                    </div>
                    <div className="space-y-2 opacity-60 cursor-not-allowed">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                      <Input value={user.email || ''} className="h-12 rounded-xl bg-slate-50" readOnly />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input name="phone" defaultValue={profile?.phone || ''} placeholder="+91 XXXXX XXXXX" className="h-12 pl-12 rounded-xl" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[3rem] bg-white border-white shadow-xl p-4">
                <CardHeader>
                  <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
                    <FileText className="text-orange-500" /> Professional Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Resume URL (Drive/Dropbox Link)</label>
                    <Input name="resumeUrl" defaultValue={profile?.resumeUrl || ''} placeholder="https://..." className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Key Skills & Experience</label>
                    <Textarea name="skills" defaultValue={profile?.skills || ''} rows={5} className="rounded-2xl" placeholder="Summarize your expertise..." />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Col: Save & Status */}
            <div className="lg:col-span-4 space-y-8">
              <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">Action Center</h3>
                <p className="text-sm font-bold text-white/60 italic mb-10">Make sure your resume link is public and accessible by the hiring team.</p>
                <Button type="submit" disabled={isSaving} className="w-full h-16 bg-primary text-white font-black uppercase tracking-widest rounded-2xl hover:bg-accent transition-all">
                  {isSaving ? 'Saving...' : <><Save className="mr-2" /> Save Profile</>}
                </Button>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-white border border-white shadow-lg space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Sparkles size={20} />
                  <span className="text-xs font-black uppercase tracking-widest">Profile Status</span>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase text-slate-400">Completeness</span>
                    <span className="text-xs font-black text-primary">{(profile?.fullName && profile?.resumeUrl) ? '100%' : '50%'}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-1000" style={{ width: (profile?.fullName && profile?.resumeUrl) ? '100%' : '50%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
