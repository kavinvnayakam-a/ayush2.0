'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser, useMemoFirebase, useFirestore, useCollection } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { collection, query, orderBy, addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';
import { Briefcase, Plus, Users, Trash2, ExternalLink, ShieldCheck, Mail, Building2, LayoutDashboard } from 'lucide-react';
import { useDoc } from '@/firebase/firestore/use-doc';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import Image from 'next/image';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  logoUrl?: string;
  bannerUrl?: string;
  createdAt: any;
}

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  status: string;
  appliedAt: any;
  resumeUrl?: string;
}

export default function AdminJobPortal() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isPosting, setIsPosting] = useState(false);

  // RBAC
  const adminRoleRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'admin_roles', user.uid);
  }, [firestore, user]);
  const { data: adminRole } = useDoc(adminRoleRef);
  const isAdmin = user?.email === 'kavinvnayakam@gmail.com' || user?.email === 'mainadmin@shreevarma.org' || !!adminRole;

  // Data
  const jobsQuery = useMemoFirebase(() => {
    if (!firestore || !isAdmin) return null;
    return query(collection(firestore, 'jobs'), orderBy('createdAt', 'desc'));
  }, [firestore, isAdmin]);

  const appsQuery = useMemoFirebase(() => {
    if (!firestore || !isAdmin) return null;
    return query(collection(firestore, 'job_applications'), orderBy('appliedAt', 'desc'));
  }, [firestore, isAdmin]);

  const { data: jobs, isLoading: isLoadingJobs } = useCollection<Job>(jobsQuery);
  const { data: applications, isLoading: isLoadingApps } = useCollection<Application>(appsQuery);

  useEffect(() => {
    if (!isUserLoading && (!user || !isAdmin)) {
      router.push('/admin/login');
    }
  }, [user, isUserLoading, isAdmin, router]);

  const handlePostJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firestore) return;
    setIsPosting(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await addDoc(collection(firestore, 'jobs'), {
        title: formData.get('title'),
        company: formData.get('company'),
        location: formData.get('location'),
        type: formData.get('type'),
        salary: formData.get('salary'),
        description: formData.get('description'),
        logoUrl: formData.get('logoUrl'),
        bannerUrl: formData.get('bannerUrl'),
        createdAt: serverTimestamp(),
      });
      toast({ title: 'Job Posted!', description: 'The listing is now live.' });
      (e.target as HTMLFormElement).reset();
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally {
      setIsPosting(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!firestore || !confirm('Delete this job?')) return;
    try {
      await deleteDoc(doc(firestore, 'jobs', id));
      toast({ title: 'Job Deleted' });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    }
  };

  if (!isAdmin) return null;

  return (
    <main className="min-h-screen bg-slate-50 pt-24 sm:pt-32 pb-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-black text-foreground uppercase tracking-tight">Admin <span className="text-primary italic">Job Portal</span></h1>
            <p className="text-muted-foreground font-bold italic">Manage listings and review candidates</p>
          </div>
          <Button asChild variant="outline" className="mt-4 sm:mt-0 bg-white shadow-sm font-bold rounded-xl border-2">
            <a href="/admin/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" /> Main Dashboard</a>
          </Button>
        </header>

        <Tabs defaultValue="list" className="w-full space-y-8">
          <TabsList className="bg-white border p-1 rounded-2xl">
            <TabsTrigger value="list" className="rounded-xl px-6 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Active Jobs</TabsTrigger>
            <TabsTrigger value="post" className="rounded-xl px-6 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Post New Job</TabsTrigger>
            <TabsTrigger value="apps" className="rounded-xl px-6 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <Card className="rounded-[2.5rem] bg-white shadow-xl border-white">
              <CardHeader><CardTitle className="text-2xl font-black uppercase">Job Listings</CardTitle></CardHeader>
              <CardContent>
                <div className="border rounded-2xl overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="font-black uppercase text-xs">Job Title</TableHead>
                        <TableHead className="font-black uppercase text-xs">Company</TableHead>
                        <TableHead className="font-black uppercase text-xs">Applications</TableHead>
                        <TableHead className="font-black uppercase text-xs">Date Posted</TableHead>
                        <TableHead className="font-black uppercase text-xs text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobs?.map((job) => (
                        <TableRow key={job.id} className="font-semibold">
                          <TableCell className="font-bold text-primary">{job.title}</TableCell>
                          <TableCell>{job.company}</TableCell>
                          <TableCell>
                            <Badge className="bg-slate-100 text-slate-600 border-none font-bold">
                              {applications?.filter(a => a.jobId === job.id).length || 0}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-xs">
                            {job.createdAt ? format(new Date(job.createdAt.seconds * 1000), 'MMM d, yyyy') : '...'}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteJob(job.id)} className="text-destructive hover:bg-red-50 rounded-lg">
                              <Trash2 size={18} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="post">
            <Card className="rounded-[2.5rem] bg-white shadow-xl border-white max-w-3xl">
              <CardHeader>
                <CardTitle className="text-2xl font-black uppercase">Post Opportunity</CardTitle>
                <CardDescription className="font-bold italic">Fill in the details to publish a new job vacancy</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePostJob} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Job Title</label>
                      <Input name="title" placeholder="e.g. Ayurvedic Consultant" className="h-12 rounded-xl" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Company Name</label>
                      <Input name="company" placeholder="e.g. Shreevarma Ayurveda" className="h-12 rounded-xl" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Location</label>
                      <Input name="location" placeholder="e.g. Chennai" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Job Type</label>
                      <select name="type" className="w-full h-12 rounded-xl border border-input bg-background px-3 text-sm focus:ring-2 focus:ring-primary outline-none">
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                        <option>Internship</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Salary Range</label>
                      <Input name="salary" placeholder="e.g. 5L - 8L PA" className="h-12 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Description</label>
                    <Textarea name="description" rows={6} className="rounded-2xl" placeholder="Provide full job details..." required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Logo URL</label>
                      <Input name="logoUrl" placeholder="https://..." className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Banner URL</label>
                      <Input name="bannerUrl" placeholder="https://..." className="h-12 rounded-xl" />
                    </div>
                  </div>
                  <Button type="submit" disabled={isPosting} className="w-full h-16 bg-primary text-white font-black uppercase tracking-widest rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-primary/20 text-lg">
                    {isPosting ? 'Publishing...' : <><Plus className="mr-2" /> Publish Listing</>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="apps">
            <Card className="rounded-[2.5rem] bg-white shadow-xl border-white">
              <CardHeader><CardTitle className="text-2xl font-black uppercase">Candidate Applications</CardTitle></CardHeader>
              <CardContent>
                <div className="border rounded-2xl overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="font-black uppercase text-xs">Applicant</TableHead>
                        <TableHead className="font-black uppercase text-xs">Target Role</TableHead>
                        <TableHead className="font-black uppercase text-xs">Contact</TableHead>
                        <TableHead className="font-black uppercase text-xs">Applied On</TableHead>
                        <TableHead className="font-black uppercase text-xs text-right">Resume</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications?.map((app) => (
                        <TableRow key={app.id} className="font-semibold">
                          <TableCell className="font-bold">{app.applicantName}</TableCell>
                          <TableCell className="text-primary uppercase text-[10px] font-black">{app.jobTitle}</TableCell>
                          <TableCell className="text-muted-foreground text-xs">{app.applicantEmail}</TableCell>
                          <TableCell className="text-muted-foreground text-xs">
                            {app.appliedAt ? format(new Date(app.appliedAt.seconds * 1000), 'MMM d, h:mm a') : '...'}
                          </TableCell>
                          <TableCell className="text-right">
                            {app.resumeUrl ? (
                              <Button asChild variant="outline" size="sm" className="rounded-lg font-bold">
                                <a href={app.resumeUrl} target="_blank"><ExternalLink className="mr-2 h-3 w-3" /> View</a>
                              </Button>
                            ) : (
                              <span className="text-[10px] text-muted-foreground uppercase font-bold italic">No Link</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
