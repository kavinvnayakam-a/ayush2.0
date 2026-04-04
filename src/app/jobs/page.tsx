'use client';

import React, { useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase, useUser, useDoc } from '@/firebase';
import { collection, query, orderBy, addDoc, serverTimestamp, doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Building2, Briefcase, ChevronRight, UserCircle, LogIn, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  logoUrl?: string;
  bannerUrl?: string;
  salary?: string;
}

export default function JobBoardPage() {
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Fetch User Profile to check for completeness
  const profileRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'seeker_profiles', user.uid);
  }, [firestore, user]);
  const { data: profile } = useDoc(profileRef);

  const jobsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'jobs'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: jobs, isLoading } = useCollection<Job>(jobsQuery);

  const filteredJobs = jobs?.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isProfileComplete = !!(profile && 
    profile.fullName && 
    profile.age && 
    profile.gender && 
    profile.phone && 
    profile.whatsappNumber && 
    profile.resumeUrl && 
    profile.skills && 
    profile.experience);

  const handleApply = async (job: Job) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to apply for this job.',
        variant: 'destructive',
      });
      return;
    }

    if (!isProfileComplete) {
      toast({
        title: 'Profile Incomplete',
        description: 'Please complete all mandatory fields in your profile before applying.',
        variant: 'destructive',
      });
      return;
    }

    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const confirmApplication = async () => {
    if (!firestore || !user || !selectedJob || !profile) return;

    try {
      // 1. Record Application
      await addDoc(collection(firestore, 'job_applications'), {
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        userId: user.uid,
        applicantName: profile.fullName,
        applicantEmail: user.email,
        phone: profile.phone,
        whatsappNumber: profile.whatsappNumber,
        resumeUrl: profile.resumeUrl,
        age: profile.age,
        gender: profile.gender,
        skills: profile.skills,
        experience: profile.experience,
        status: 'Pending',
        appliedAt: serverTimestamp(),
      });

      // 2. Send Confirmation Email to Applicant
      await addDoc(collection(firestore, 'mail'), {
        to: user.email,
        message: {
          subject: `Application Received: ${selectedJob.title}`,
          html: `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
              <h2 style="color: #6CA33F;">Application Submitted Successfully!</h2>
              <p>Hello <strong>${profile.fullName}</strong>,</p>
              <p>Thank you for applying for the position of <strong>${selectedJob.title}</strong> at <strong>${selectedJob.company}</strong> through the AyushConclave Job Portal.</p>
              <p>Our team will review your profile and get back to you if your qualifications match our requirements.</p>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Job Details:</strong></p>
                <p>Position: ${selectedJob.title}</p>
                <p>Company: ${selectedJob.company}</p>
                <p>Location: ${selectedJob.location}</p>
              </div>
              <p>Best regards,<br/>AyushConclave HR Team</p>
            </div>
          `,
        }
      });

      // 3. Send Notification Email to Admin (mainadmin@shreevarma.org)
      await addDoc(collection(firestore, 'mail'), {
        to: 'mainadmin@shreevarma.org',
        message: {
          subject: `New Job Application: ${selectedJob.title} - ${profile.fullName}`,
          html: `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
              <h2 style="color: #ffa62f;">New Candidate Application</h2>
              <p>A new application has been received for <strong>${selectedJob.title}</strong>.</p>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Candidate Details:</strong></p>
                <p>Name: ${profile.fullName}</p>
                <p>Email: ${user.email}</p>
                <p>Phone: ${profile.phone}</p>
                <p>WhatsApp: ${profile.whatsappNumber}</p>
                <p>Age: ${profile.age} | Gender: ${profile.gender}</p>
                <p>Resume: <a href="${profile.resumeUrl}">${profile.resumeUrl}</a></p>
                <p>Skills: ${profile.skills}</p>
              </div>
              <p>Review this application in the <a href="https://ayushconclave.com/admin/jobs">Admin Job Portal</a>.</p>
            </div>
          `,
        }
      });

      toast({
        title: 'Application Sent!',
        description: `You've successfully applied for ${selectedJob.title}. Confirmation emails have been sent.`,
      });
      setIsApplyModalOpen(false);
    } catch (e: any) {
      toast({
        title: 'Application Failed',
        description: e.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tight">Job <span className="text-primary italic">Portal</span></h1>
            <p className="text-muted-foreground font-bold italic">Bridging talent with ancient wisdom and modern health</p>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                {!isProfileComplete && (
                  <Badge variant="destructive" className="animate-pulse px-4 py-1.5 rounded-full font-black text-[10px] uppercase">
                    Profile Incomplete
                  </Badge>
                )}
                <Button asChild variant="outline" className="rounded-full font-bold px-6 border-2">
                  <Link href="/jobs/profile"><UserCircle className="mr-2 h-5 w-5" /> Profile</Link>
                </Button>
              </div>
            ) : (
              <Button asChild className="rounded-full font-black px-8 bg-primary hover:bg-accent transition-all">
                <Link href="/jobs/auth"><LogIn className="mr-2 h-5 w-5" /> Sign In</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-16">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input 
            placeholder="Search by Job Title or Company..." 
            className="h-16 pl-14 pr-6 rounded-2xl border-2 border-white shadow-xl bg-white/80 backdrop-blur-md text-lg focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Job Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary"></div>
            <p className="font-bold text-muted-foreground">Loading opportunities...</p>
          </div>
        ) : filteredJobs && filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="group rounded-[2.5rem] bg-white border-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {job.bannerUrl && (
                  <div className="relative h-32 w-full">
                    <Image src={job.bannerUrl} alt="Banner" fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                  </div>
                )}
                <CardHeader className="relative pt-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="relative w-16 h-16 bg-slate-50 rounded-2xl border p-2 flex items-center justify-center overflow-hidden">
                      {job.logoUrl ? (
                        <Image src={job.logoUrl} alt={job.company} fill className="object-contain p-2" />
                      ) : (
                        <Building2 className="text-slate-300 h-8 w-8" />
                      )}
                    </div>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-bold px-3 py-1 rounded-full uppercase text-[10px]">
                      {job.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-black text-foreground uppercase leading-tight group-hover:text-primary transition-colors">
                    {job.title}
                  </CardTitle>
                  <p className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                    <Building2 size={14} className="text-primary" /> {job.company}
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-orange-500" /> {job.location}
                    </div>
                    {job.salary && (
                      <div className="flex items-center gap-1.5">
                        <Briefcase size={14} className="text-primary" /> {job.salary}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 font-medium line-clamp-3 italic">
                    {job.description}
                  </p>
                  <Button 
                    onClick={() => handleApply(job)}
                    className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-primary transition-all group"
                  >
                    Apply Now <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 space-y-4">
            <Briefcase size={64} className="mx-auto text-slate-200" />
            <h3 className="text-2xl font-black text-slate-400 uppercase">No Jobs Found</h3>
            <p className="text-slate-400 italic">Try searching for a different keyword or check back later.</p>
          </div>
        )}
      </div>

      {/* Application Dialog */}
      <Dialog open={isApplyModalOpen} onOpenChange={setIsApplyModalOpen}>
        <DialogContent className="rounded-[2.5rem] p-10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase">Confirm Application</DialogTitle>
            <DialogDescription className="font-bold text-slate-500 italic mt-2">
              Apply for <span className="text-primary font-black uppercase">{selectedJob?.title}</span> at {selectedJob?.company}.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 my-6 space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-primary h-5 w-5 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-slate-600 leading-relaxed">
                By clicking "Confirm", your complete professional profile (Name, Phone, WhatsApp, Age, Gender, Skills, Experience, and Resume Link) will be shared with <strong>{selectedJob?.company}</strong> and the AyushConclave Admin team.
              </p>
            </div>
          </div>
          <DialogFooter className="gap-4">
            <Button variant="ghost" onClick={() => setIsApplyModalOpen(false)} className="font-bold uppercase">Cancel</Button>
            <Button onClick={confirmApplication} className="bg-primary text-white font-black uppercase px-8 rounded-xl">Confirm & Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
