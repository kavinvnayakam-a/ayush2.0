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
import { collection, query, orderBy, addDoc, updateDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';
import { Briefcase, Plus, Users, Trash2, ExternalLink, ShieldCheck, Mail, Building2, LayoutDashboard, Edit3, Eye, Phone, MessageSquare, User, GraduationCap, History } from 'lucide-react';
import { useDoc } from '@/firebase/firestore/use-doc';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  salary: string;
  logoUrl?: string;
  bannerUrl?: string;
  createdAt: any;
}

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  userId: string;
  applicantName: string;
  applicantEmail: string;
  phone: string;
  whatsappNumber: string;
  resumeUrl: string;
  age: number;
  gender: string;
  skills: string;
  experience: string;
  status: string;
  appliedAt: any;
}

export default function AdminJobPortal() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [isPosting, setIsPosting] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewingApp, setViewApp] = useState<Application | null>(null);
  const [activeTab, setActiveTab] = useState('list');

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
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const jobData = {
      title: formData.get('title'),
      company: formData.get('company'),
      location: formData.get('location'),
      type: formData.get('type'),
      salary: formData.get('salary'),
      description: formData.get('description'),
      logoUrl: formData.get('logoUrl'),
      bannerUrl: formData.get('bannerUrl'),
    };

    try {
      if (editingJob) {
        await updateDoc(doc(firestore, 'jobs', editingJob.id), jobData);
        toast({ title: 'Job Updated', description: 'Listing changes saved.' });
        setEditingJob(null);
      } else {
        await addDoc(collection(firestore, 'jobs'), {
          ...jobData,
          createdAt: serverTimestamp(),
        });
        toast({ title: 'Job Posted!', description: 'The listing is now live.' });
        form.reset();
      }
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally {
      setIsPosting(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!firestore || !confirm('Delete this job listing?')) return;
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

        <Tabs 
          defaultValue="list" 
          className="w-full space-y-8" 
          value={activeTab} 
          onValueChange={(val) => {
            setActiveTab(val);
            if (val !== 'list') setEditingJob(null);
          }}
        >
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
                        <TableHead className="font-black uppercase text-xs text-center">Applicants</TableHead>
                        <TableHead className="font-black uppercase text-xs">Date Posted</TableHead>
                        <TableHead className="font-black uppercase text-xs text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobs?.map((job) => (
                        <TableRow key={job.id} className="font-semibold">
                          <TableCell className="font-bold text-primary">{job.title}</TableCell>
                          <TableCell>{job.company}</TableCell>
                          <TableCell className="text-center">
                            <Badge className="bg-slate-100 text-slate-600 border-none font-bold">
                              {applications?.filter(a => a.jobId === job.id).length || 0}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-xs">
                            {job.createdAt ? format(new Date(job.createdAt.seconds * 1000), 'MMM d, yyyy') : '...'}
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => setEditingJob(job)} className="text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg">
                              <Edit3 size={18} />
                            </Button>
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
                        <TableHead className="font-black uppercase text-xs text-right">Details</TableHead>
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
                            <Button variant="outline" size="sm" onClick={() => setViewApp(app)} className="rounded-lg font-bold">
                              <Eye className="mr-2 h-3 w-3" /> View Profile
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
        </Tabs>
      </div>

      {/* Edit Job Dialog */}
      <Dialog open={!!editingJob} onOpenChange={(open) => !open && setEditingJob(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-8 border-none shadow-2xl z-50">
          {editingJob && (
            <>
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-black uppercase">Edit Job Listing</DialogTitle>
                <DialogDescription className="font-bold italic">Modify details for {editingJob.title}</DialogDescription>
              </DialogHeader>
              <form onSubmit={handlePostJob} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Job Title</label>
                    <Input name="title" defaultValue={editingJob.title} className="h-12 rounded-xl" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Company Name</label>
                    <Input name="company" defaultValue={editingJob.company} className="h-12 rounded-xl" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Location</label>
                    <Input name="location" defaultValue={editingJob.location} className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Job Type</label>
                    <select name="type" defaultValue={editingJob.type} className="w-full h-12 rounded-xl border border-input bg-background px-3 text-sm focus:ring-2 focus:ring-primary outline-none">
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Salary Range</label>
                    <Input name="salary" defaultValue={editingJob.salary} className="h-12 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Description</label>
                  <Textarea name="description" defaultValue={editingJob.description} rows={6} className="rounded-2xl" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Logo URL</label>
                    <Input name="logoUrl" defaultValue={editingJob.logoUrl} className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Banner URL</label>
                    <Input name="bannerUrl" defaultValue={editingJob.bannerUrl} className="h-12 rounded-xl" />
                  </div>
                </div>
                <DialogFooter className="gap-4">
                  <Button type="button" variant="outline" onClick={() => setEditingJob(null)} className="h-14 px-8 rounded-xl font-bold uppercase">Cancel</Button>
                  <Button type="submit" disabled={isPosting} className="flex-1 h-14 bg-primary text-white font-black uppercase rounded-xl">
                    {isPosting ? 'Saving...' : 'Save Changes'}
                  </Button>
                </DialogFooter>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Candidate Details Dialog */}
      <Dialog open={!!viewingApp} onOpenChange={(open) => !open && setViewApp(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-0 border-none shadow-2xl z-50">
          {viewingApp && (
            <div className="p-8 md:p-12">
              <DialogHeader className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <User size={32} />
                  </div>
                  <div>
                    <DialogTitle className="text-3xl font-black uppercase text-foreground">{viewingApp.applicantName}</DialogTitle>
                    <DialogDescription className="text-primary font-bold italic">Applying for: {viewingApp.jobTitle}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Contact Info</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                        <Mail size={16} className="text-primary" /> {viewingApp.applicantEmail}
                      </div>
                      <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                        <Phone size={16} className="text-orange-500" /> {viewingApp.phone}
                      </div>
                      <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                        <MessageSquare size={16} className="text-green-500" /> {viewingApp.whatsappNumber}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Personal Details</h4>
                    <div className="flex gap-8">
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400">Age</p>
                        <p className="text-lg font-bold">{viewingApp.age}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400">Gender</p>
                        <p className="text-lg font-bold uppercase">{viewingApp.gender}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 h-full">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Skills & Tools</h4>
                    <p className="text-sm font-bold text-slate-600 leading-relaxed italic">{viewingApp.skills}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><History size={14} /> Professional Experience</h4>
                  <p className="text-sm font-medium text-slate-600 whitespace-pre-wrap leading-relaxed">{viewingApp.experience}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1 h-16 rounded-2xl bg-primary text-white font-black uppercase tracking-widest">
                  <a href={viewingApp.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2" /> Download Resume
                  </a>
                </Button>
                <Button variant="outline" onClick={() => setViewApp(null)} className="h-16 px-10 rounded-2xl font-bold uppercase">Close View</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
