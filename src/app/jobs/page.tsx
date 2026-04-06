
'use client';

import React, { useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Building2, 
  Briefcase, 
  ChevronRight, 
  Globe, 
  CheckCircle, 
  PhoneCall, 
  Phone,
  Users, 
  Zap, 
  Filter, 
  BarChart3, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Smartphone,
  X,
  History,
  Mail,
  User,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements?: string;
  logoUrl?: string;
  bannerUrl?: string;
  salary?: string;
}

export default function JobPortalPage() {
  const [view, setView] = useState<'candidate' | 'recruiter'>('candidate');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const firestore = useFirestore();

  // Fetch recent jobs for the candidate view
  const jobsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'jobs'), orderBy('createdAt', 'desc'), limit(6));
  }, [firestore]);

  const { data: recentJobs, isLoading: isLoadingJobs } = useCollection<Job>(jobsQuery);

  const faqs = [
    "Are there any charges for creating a Recruiter profile and posting jobs?",
    "How do I create a Recruiter profile on the website?",
    "Do I need to verify my account before posting the job?",
    "How do I post Jobs on the website?",
    "Why is my job under review?",
    "Which cities and states do we serve currently?"
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* 1. TOP TOGGLE NAVIGATION */}
      <nav className="fixed top-24 left-0 right-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-primary tracking-tighter uppercase leading-none">Ayush <span className="italic text-accent">Jobs</span></h1>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Holistic Career Growth</p>
          </div>
          <div className="flex bg-slate-100 rounded-full p-1 border shadow-inner">
            <button 
              onClick={() => setView('candidate')}
              className={`px-6 py-2 text-xs font-black uppercase tracking-widest rounded-full transition-all ${view === 'candidate' ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-primary'}`}
            >
              Candidate
            </button>
            <button 
              onClick={() => setView('recruiter')}
              className={`px-6 py-2 text-xs font-black uppercase tracking-widest rounded-full transition-all ${view === 'recruiter' ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-primary'}`}
            >
              Recruiter
            </button>
          </div>
        </div>
      </nav>

      {/* --- CANDIDATE VIEW --- */}
      {view === 'candidate' && (
        <div className="pt-40 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Hero Section */}
          <section className="container mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row items-center max-w-7xl">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-slate-900">
                Global Career in <br/><span className="text-primary italic">Ayush & Wellness</span>
              </h2>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary shadow-sm">
                    <Globe size={24} />
                  </div>
                  <p className="text-sm font-medium text-slate-600">Use portal in English<br/>and Tamil</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-lg text-accent shadow-sm">
                    <Search size={24} />
                  </div>
                  <p className="text-sm font-medium text-slate-600">Discover jobs from<br/>multiple industries</p>
                </div>
              </div>

              <div className="flex items-center gap-6 p-4 border border-slate-200 rounded-2xl w-fit bg-slate-50/50">
                <div className="w-24 h-24 bg-white border-2 border-dashed border-slate-200 flex flex-col items-center justify-center rounded-lg text-slate-300">
                  <Smartphone size={32} className="mb-1" />
                  <span className="text-[10px] font-black uppercase">App Link</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-600 max-w-[200px] font-bold">
                    Scan the QR code with your mobile to get <strong>Ayush Jobs</strong> instant updates
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto font-black text-primary uppercase text-xs tracking-widest">
                    <Link href="/jobs/profile">Update Profile Now <ArrowRight size={14} className="ml-1" /></Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Illustration Area */}
            <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
              <div className="relative z-10">
                 <img 
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800" 
                  alt="Candidate Professional" 
                  className="rounded-[3rem] shadow-2xl border-8 border-white"
                />
                {/* Floating Badges */}
                <div className="absolute -left-10 top-1/2 bg-white p-4 rounded-xl shadow-lg border border-orange-100 flex items-center gap-2 animate-float">
                  <div className="bg-orange-400 p-1 rounded-full text-white"><CheckCircle size={14}/></div>
                  <div>
                    <p className="text-[10px] font-bold text-orange-500 italic">Shortlisted</p>
                    <p className="text-[8px] text-slate-500 leading-tight">Your profile is shortlisted<br/>by a recruiter</p>
                  </div>
                </div>
                <div className="absolute -right-6 top-1/4 bg-white p-4 rounded-xl shadow-lg border border-green-100 flex items-center gap-2">
                  <div className="bg-green-500 p-1 rounded-full text-white"><CheckCircle size={14}/></div>
                  <div>
                    <p className="text-[10px] font-bold text-green-600 italic">Congrats!</p>
                    <p className="text-[8px] text-slate-500 leading-tight">Your application is sent<br/>successfully!</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="bg-slate-50 py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-slate-900">Explore Sales, Service and Manufacturing jobs</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { title: "Verified Recruiters", desc: "Our screening process allows only verified AYUSH providers.", icon: <CheckCircle className="text-primary"/> },
                  { title: "Use in Tamil", desc: "You can use the portal easily in your mother tongue.", icon: <Globe className="text-accent"/> },
                  { title: "Talk to HRs Directly", desc: "Call recruiters directly to know your interview status.", icon: <PhoneCall className="text-green-500"/> },
                  { title: "Location Features", desc: "Find jobs nearby using advanced map & distance filters.", icon: <MapPin className="text-blue-500"/> },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="mb-4 w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">{item.icon}</div>
                    <h4 className="font-bold mb-2 text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed italic">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Jobs dynamic Section */}
          <section className="py-24 container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">Recent <span className="text-primary italic">Openings</span></h2>
              <div className="w-24 h-1.5 bg-accent mx-auto rounded-full" />
            </div>

            {isLoadingJobs ? (
              <div className="flex justify-center py-20">
                <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary"></div>
              </div>
            ) : recentJobs && recentJobs.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentJobs.map((job) => (
                  <Card key={job.id} className="group rounded-[2rem] bg-white border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col border-2">
                    <CardHeader className="relative pt-8">
                      <div className="flex justify-between items-start mb-4">
                        <div className="relative w-12 h-12 bg-slate-50 rounded-xl border p-2 flex items-center justify-center overflow-hidden shadow-inner">
                          {job.logoUrl ? (
                            <Image src={job.logoUrl} alt={job.company} fill className="object-contain p-2" />
                          ) : (
                            <Building2 className="text-slate-300 h-6 w-6" />
                          )}
                        </div>
                        <Badge className="bg-primary/10 text-primary border-none font-bold px-3 py-1 rounded-full uppercase text-[10px]">
                          {job.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-black text-slate-900 uppercase leading-tight group-hover:text-primary transition-colors">
                        {job.title}
                      </CardTitle>
                      <p className="text-xs font-bold text-slate-400 flex items-center gap-2 mt-1">
                        <Building2 size={12} className="text-primary" /> {job.company}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-1">
                      <div className="flex flex-wrap gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <div className="flex items-center gap-1">
                          <MapPin size={12} className="text-accent" /> {job.location}
                        </div>
                        {job.salary && (
                          <div className="flex items-center gap-1">
                            <Briefcase size={12} className="text-primary" /> {job.salary}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium line-clamp-2 italic">
                        {job.description}
                      </p>
                      <Button onClick={() => setSelectedJob(job)} className="w-full h-12 rounded-xl bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-primary transition-all text-xs">
                        View Details <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                <p className="font-bold text-slate-400 italic">No recent jobs found. Check back soon!</p>
              </div>
            )}
          </section>

          {/* Category Section */}
          <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 border-t border-slate-100">
            <div>
              <h3 className="text-2xl font-bold mb-6 italic underline decoration-primary underline-offset-8">Qualification based jobs</h3>
              <div className="flex flex-wrap gap-3">
                {['Masters', 'Bachelor Degree', 'Diploma', 'ITI', '12th Pass', '10th & Below'].map(q => (
                  <span key={q} className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700">{q}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 italic underline decoration-accent underline-offset-8">Job Types</h3>
              <div className="flex flex-wrap gap-3">
                {['Full time', 'Part time', 'Consultant', 'Contract', 'Internship'].map(t => (
                  <span key={t} className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">{t}</span>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* --- RECRUITER VIEW --- */}
      {view === 'recruiter' && (
        <div className="pt-40 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-slate-900 tracking-tight">
                Hire the Best <br/><span className="text-primary italic">AYUSH Talent</span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary shadow-md">
                    <Users size={20} />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Get access to a large pool of candidates</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-lg text-accent shadow-md">
                    <Zap size={20} />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Reduce hiring time & employ the best</p>
                </div>
              </div>
              
              <div className="bg-white border rounded-[1.5rem] p-2 shadow-sm flex flex-col sm:flex-row gap-2 max-w-lg mb-4">
                <input 
                  type="email" 
                  placeholder="Enter organization email" 
                  className="flex-1 px-4 py-3 outline-none rounded-xl"
                />
                <Button asChild className="bg-primary text-white px-8 py-6 rounded-xl font-bold hover:bg-slate-900 transition shadow-lg">
                  <Link href="/admin/login">Post a Job</Link>
                </Button>
              </div>
              <div className="space-y-1">
                <Link href="/admin/login" className="text-primary font-bold underline flex items-center gap-2 text-sm">
                  <Briefcase size={14} /> Click here for Hiring Partner login
                </Link>
                <p className="text-sm text-gray-500 italic">Currently live globally for all AYUSH organizations</p>
              </div>
            </div>

            {/* Hero Visuals */}
            <div className="relative flex justify-center items-center h-[500px]">
              <div className="absolute top-0 right-10 bg-white rounded-2xl shadow-xl border p-2 w-48 z-10 transition-transform hover:scale-105">
                 <div className="bg-gray-200 h-40 rounded-xl mb-2 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200" alt="Consultant" className="w-full h-full object-cover" />
                 </div>
                 <p className="font-bold text-sm">Vaidya Kumar</p>
                 <p className="text-[10px] text-primary uppercase tracking-tighter font-semibold italic">Sales Executive</p>
              </div>
              <div className="bg-white rounded-2xl shadow-2xl border p-2 w-64 z-20 transition-transform hover:scale-105">
                 <div className="bg-gray-200 h-64 rounded-xl mb-3 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300" alt="Academic" className="w-full h-full object-cover" />
                 </div>
                 <p className="font-bold">Dr. Janani</p>
                 <p className="text-xs text-accent font-black italic">Research Head</p>
              </div>
              <div className="absolute bottom-10 left-0 bg-white rounded-2xl shadow-xl border p-2 w-48 z-10 transition-transform hover:scale-105">
                 <div className="bg-gray-200 h-40 rounded-xl mb-2 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=200" alt="Therapist" className="w-full h-full object-cover" />
                 </div>
                 <p className="font-bold text-sm">Ranjith Manohar</p>
                 <p className="text-[10px] text-green-600 uppercase tracking-tighter font-semibold italic">Wellness Expert</p>
              </div>
              <div className="absolute bottom-20 right-0 bg-white rounded-full shadow-lg border px-4 py-2 flex items-center gap-2">
                <span className="font-bold text-primary">500+</span>
                <span className="text-[10px] text-gray-500 leading-none">Partners</span>
              </div>
            </div>
          </section>

          {/* --- HIRING PARTNERS --- */}
          <section className="bg-gray-50 py-10 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <p className="text-2xl font-bold mb-8 italic text-slate-400">Our Trusted Hiring Partners</p>
              <div className="flex flex-wrap justify-center gap-10 grayscale opacity-50">
                {['SHREEVARMA', 'AYUR.AI', 'NASYA', 'VIBHA', 'AYUSH', 'MINISTRY'].map((brand) => (
                  <span key={brand} className="text-xl font-black text-slate-400 tracking-widest">{brand}</span>
                ))}
              </div>
            </div>
          </section>

          {/* --- FEATURE HIGHLIGHTS --- */}
          <section className="py-24 space-y-32">
            {/* Locality */}
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 order-2 md:order-1">
                 <div className="bg-primary/5 h-80 rounded-3xl flex items-center justify-center border border-primary/10">
                    <Filter size={80} className="text-primary opacity-20" />
                 </div>
              </div>
              <div className="flex-1 order-1 md:order-2 space-y-4">
                <h2 className="text-4xl font-black text-slate-900 leading-tight uppercase tracking-tight">Hire based on <span className="text-primary italic">Expertise & Location</span></h2>
                <p className="text-gray-600 text-lg leading-relaxed italic">
                  Looking for a specialized consultant in a specific region? Our advanced filters help you find the best candidates suiting your requirements in any specific locality globally.
                </p>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 space-y-4">
                <h2 className="text-4xl font-black text-slate-900 leading-tight uppercase tracking-tight">Candidates can <br/><span className="text-accent italic">Contact you Directly</span></h2>
                <p className="text-gray-600 text-lg leading-relaxed italic">
                  We bridge the gap instantly. Call or message candidates directly through our secure platform allowing for a faster screening and hiring process.
                </p>
              </div>
              <div className="flex-1 bg-slate-900 rounded-[3rem] p-12 text-white flex justify-center gap-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                <Phone size={60} className="text-primary" />
                <MessageSquare size={60} className="text-accent" />
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="py-24 bg-slate-50">
            <div className="container mx-auto max-w-4xl px-6">
              <h2 className="text-4xl font-black text-center mb-16 uppercase tracking-tighter">Frequently <br/><span className="text-primary italic">Asked Questions</span></h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-6 text-left transition-all group"
                    >
                      <span className="font-bold text-slate-900 group-hover:text-primary transition-colors">{faq}</span>
                      {openFaq === idx ? <ChevronUp size={20} className="text-primary" /> : <ChevronDown size={20} className="text-slate-300" />}
                    </button>
                    {openFaq === idx && (
                      <div className="px-6 pb-6 text-slate-500 font-medium leading-relaxed italic animate-in fade-in duration-300">
                        Detailed answers are provided during the recruitment onboarding process. Generally, job posting is straightforward and requires basic organization verification.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FINAL Recruiter CTA */}
          <section className="py-24 bg-primary text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="max-w-3xl mx-auto px-6 relative z-10">
              <p className="text-white/70 font-bold mb-4 uppercase tracking-[0.2em] text-sm">Build Your Dream Team</p>
              <h2 className="text-4xl md:text-6xl font-[1000] text-white mb-8 tracking-tighter leading-none uppercase">Start Hiring <br/>Certified Talent</h2>
              <Button asChild size="lg" className="bg-white text-primary px-12 py-8 rounded-[1.5rem] font-black text-xl hover:scale-105 transition-all shadow-2xl">
                <Link href="/admin/login">Post A Job Free</Link>
              </Button>
            </div>
          </section>
        </div>
      )}

      {/* Footer (Simplified local version if needed, or stick to global) */}
      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-1 flex flex-col">
            <h4 className="text-xl font-bold mb-4 uppercase tracking-tighter">Ayush <span className="text-primary italic">Jobs</span></h4>
            <p className="text-slate-400 text-sm italic">SRCM World Headquarters,<br/>Manapakkam, Chennai,<br/>Tamil Nadu 600089</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-primary uppercase text-xs tracking-widest">Resources</h4>
            <ul className="text-slate-400 text-sm space-y-2 font-medium italic">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-accent uppercase text-xs tracking-widest">Connect</h4>
            <p className="text-slate-400 text-sm italic">support@arogyaayurconclave.org</p>
          </div>
          <div className="text-xs text-slate-500 flex items-end">
            <p>© {new Date().getFullYear()} Ayush Conclave. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* --- JOB DETAILS DIALOG --- */}
      <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 border-none rounded-[3rem] overflow-hidden shadow-2xl z-[60]">
          {selectedJob && (
            <>
              {/* Custom Header with Banner Background */}
              <div className="relative h-40 md:h-56 shrink-0">
                {selectedJob.bannerUrl ? (
                  <Image src={selectedJob.bannerUrl} alt="Banner" fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80" />
                )}
                <div className="absolute inset-0 bg-black/20" />
                
                <div className="absolute -bottom-8 left-8">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl p-4 shadow-2xl border-4 border-white flex items-center justify-center overflow-hidden">
                    {selectedJob.logoUrl ? (
                      <Image src={selectedJob.logoUrl} alt={selectedJob.company} fill className="object-contain p-4" />
                    ) : (
                      <Building2 className="text-slate-200 h-12 w-12" />
                    )}
                  </div>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 min-h-0 pt-12">
                <ScrollArea className="h-full">
                  <div className="p-8 md:p-12 space-y-8">
                    <div className="space-y-2">
                      <DialogHeader className="p-0 text-left">
                        <DialogTitle className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight leading-none">
                          {selectedJob.title}
                        </DialogTitle>
                        <DialogDescription className="text-primary font-bold text-lg flex items-center gap-2 italic">
                          <Building2 size={18} /> {selectedJob.company}
                        </DialogDescription>
                      </DialogHeader>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="bg-primary/10 p-2 rounded-lg text-primary"><MapPin size={18} /></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Location</span>
                          <span className="text-sm font-bold text-slate-700">{selectedJob.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="bg-accent/10 p-2 rounded-lg text-accent"><Briefcase size={18} /></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Salary</span>
                          <span className="text-sm font-bold text-slate-700">{selectedJob.salary || 'Competitive'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="bg-blue-50 p-2 rounded-lg text-blue-500"><Zap size={18} /></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Job Type</span>
                          <span className="text-sm font-bold text-slate-700">{selectedJob.type}</span>
                        </div>
                      </div>
                    </div>

                    {/* Body Text */}
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                          <div className="w-8 h-px bg-slate-200" /> Job Description
                        </h4>
                        <div className="p-6 rounded-3xl bg-white border-2 border-slate-50 text-slate-600 leading-relaxed text-sm font-medium italic whitespace-pre-wrap">
                          {selectedJob.description}
                        </div>
                      </div>

                      {selectedJob.requirements && (
                        <div className="space-y-4">
                          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <div className="w-8 h-px bg-slate-200" /> Candidate Requirements
                          </h4>
                          <div className="p-6 rounded-3xl bg-primary/5 border-2 border-primary/10 text-slate-700 leading-relaxed text-sm font-bold whitespace-pre-wrap">
                            {selectedJob.requirements}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollArea>
              </div>

              {/* Sticky Footer */}
              <DialogFooter className="p-6 md:p-8 bg-white border-t border-slate-100 shrink-0 gap-4 flex-row items-center justify-between">
                <Button variant="ghost" onClick={() => setSelectedJob(null)} className="h-14 px-8 rounded-xl font-bold uppercase text-slate-400 hover:text-slate-600">
                  Close
                </Button>
                <Button asChild className="flex-1 h-14 bg-primary text-white font-black uppercase tracking-widest rounded-xl hover:bg-slate-900 transition-all shadow-xl shadow-primary/20">
                  <Link href={`/jobs/profile`}>Confirm & Apply Now</Link>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
