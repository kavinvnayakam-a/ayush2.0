
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
  Users, 
  Zap, 
  Filter, 
  BarChart3, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare,
  Sparkles,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  logoUrl?: string;
  salary?: string;
}

export default function JobPortalPage() {
  const [view, setView] = useState<'candidate' | 'recruiter'>('candidate');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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
    <main className="min-h-screen bg-white pt-24">
      {/* 1. TOP TOGGLE NAVIGATION */}
      <nav className="sticky top-24 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 mb-8">
        <div className="container mx-auto px-6 flex justify-between items-center">
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
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Hero Section */}
          <section className="container mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10 text-primary font-black text-[10px] tracking-widest uppercase">
                <Sparkles size={14} /> Career Opportunities in AYUSH
              </div>
              <h2 className="text-5xl lg:text-7xl font-[1000] text-slate-900 leading-none uppercase tracking-tighter">
                Find Your <span className="text-primary italic">Perfect Role</span> in Wellness
              </h2>
              <p className="text-xl font-bold text-slate-400 italic max-w-xl">
                Bridging ancient wisdom with modern careers. Discover roles in Healthcare, Education, and Manufacturing.
              </p>
              
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary shadow-sm">
                    <Globe size={24} />
                  </div>
                  <p className="text-sm font-bold text-slate-600 uppercase tracking-tight leading-tight">National<br/>Outreach</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-3 rounded-2xl text-accent shadow-sm">
                    <Search size={24} />
                  </div>
                  <p className="text-sm font-bold text-slate-600 uppercase tracking-tight leading-tight">Industry Specific<br/>Discovery</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6">
                <Button asChild size="lg" className="h-16 px-10 rounded-2xl bg-primary text-white font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-primary/20">
                  <Link href="/jobs/auth">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-16 px-10 rounded-2xl border-2 font-bold uppercase hover:bg-slate-50">
                  <Link href="/jobs/profile">Manage Profile</Link>
                </Button>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative z-10 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800" 
                  alt="Candidate Professional" 
                  className="w-full object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              {/* Floating Badges */}
              <div className="absolute -left-10 top-1/2 bg-white p-4 rounded-[1.5rem] shadow-2xl border border-slate-100 flex items-center gap-3 animate-float">
                <div className="bg-green-500 p-1.5 rounded-full text-white"><CheckCircle size={16}/></div>
                <div>
                  <p className="text-[10px] font-black text-slate-900 uppercase">Shortlisted</p>
                  <p className="text-[8px] font-bold text-slate-400">By top AYUSH brands</p>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Jobs Section */}
          <section className="bg-slate-50 py-24">
            <div className="container mx-auto px-6">
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
                    <Card key={job.id} className="group rounded-[2rem] bg-white border-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
                      <CardHeader className="relative pt-8">
                        <div className="flex justify-between items-start mb-4">
                          <div className="relative w-12 h-12 bg-slate-50 rounded-xl border p-2 flex items-center justify-center overflow-hidden">
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
                        <Button asChild className="w-full h-12 rounded-xl bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-primary transition-all text-xs">
                          <Link href={`/jobs`}>View & Apply <ChevronRight className="ml-1 h-4 w-4" /></Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed">
                  <p className="font-bold text-slate-400 italic">No recent jobs found. Check back soon!</p>
                </div>
              )}
              
              <div className="mt-12 text-center">
                <Button asChild variant="ghost" className="font-black text-primary uppercase tracking-widest hover:bg-primary/5">
                  <Link href="/jobs">Explore All Jobs <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-24 container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Verified Recruiters", desc: "Our screening process allows only verified AYUSH providers.", icon: <CheckCircle className="text-primary"/> },
                { title: "National Network", desc: "Connect with practitioners and centers across India.", icon: <Globe className="text-accent"/> },
                { title: "Direct Communication", desc: "Call or message recruiters directly for interview updates.", icon: <PhoneCall className="text-green-500"/> },
                { title: "Location Filters", desc: "Find wellness opportunities in your specific city or locality.", icon: <MapPin className="text-blue-500"/> },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-8 rounded-[2rem] border border-transparent hover:border-primary/20 transition-all group">
                  <div className="mb-6 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="font-black text-slate-900 uppercase tracking-tight mb-2">{item.title}</h4>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed italic">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Category & Types */}
          <section className="pb-24 px-6 container mx-auto grid md:grid-cols-2 gap-12">
            <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl">
              <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter flex items-center gap-3">
                <GraduationCap className="text-primary" /> Qualification based
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Doctorate (PhD/MD)', 'Masters', 'Bachelor Degree', 'Diploma', 'Certification'].map(q => (
                  <span key={q} className="px-5 py-2.5 bg-white/10 rounded-full text-xs font-black uppercase tracking-widest border border-white/10 hover:bg-white hover:text-slate-900 transition-colors cursor-default">
                    {q}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-primary p-10 rounded-[3rem] shadow-2xl text-white">
              <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter flex items-center gap-3">
                <Briefcase className="text-accent" /> Role Types
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Full time', 'Part time', 'Consultant', 'Research', 'Academic'].map(t => (
                  <span key={t} className="px-5 py-2.5 bg-white/20 rounded-full text-xs font-black uppercase tracking-widest border border-white/20 hover:bg-accent hover:text-white transition-colors cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* --- RECRUITER VIEW --- */}
      {view === 'recruiter' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <section className="container mx-auto px-6 py-12 lg:py-20 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10 text-primary font-black text-[10px] tracking-widest uppercase mb-6">
                <Users size={14} /> For Hiring Partners
              </div>
              <h1 className="text-5xl lg:text-7xl font-[1000] leading-[0.9] uppercase tracking-tighter mb-8 text-slate-900">
                Hire the Best <br/><span className="text-primary italic">AYUSH Talent</span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-6 mb-10">
                <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1">
                  <div className="bg-primary p-2 rounded-lg text-white">
                    <Users size={20} />
                  </div>
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-tight">Access to a large pool of certified candidates</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1">
                  <div className="bg-accent p-2 rounded-lg text-white">
                    <Zap size={20} />
                  </div>
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-tight">Reduce hiring time with smart matching</p>
                </div>
              </div>
              
              <div className="bg-white border-4 border-slate-50 rounded-[2rem] p-3 shadow-2xl flex flex-col sm:flex-row gap-2 max-w-lg mb-6">
                <input 
                  type="email" 
                  placeholder="Enter contact email" 
                  className="flex-1 px-6 py-4 outline-none font-bold text-lg"
                />
                <Button asChild className="h-16 px-10 rounded-[1.5rem] bg-primary text-white font-black uppercase tracking-widest shadow-xl">
                  <Link href="/admin/login">Post a Job</Link>
                </Button>
              </div>
              <p className="text-sm text-slate-400 font-bold italic">Currently serving the entire AYUSH ecosystem globally.</p>
            </div>

            <div className="relative flex justify-center items-center h-[500px]">
              <div className="absolute top-0 right-10 bg-white rounded-[2rem] shadow-2xl border-4 border-slate-50 p-3 w-48 z-10 transition-transform hover:scale-105 duration-500">
                 <div className="bg-slate-100 h-40 rounded-[1.5rem] mb-3 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200" alt="Consultant" className="w-full h-full object-cover" />
                 </div>
                 <p className="font-black text-sm uppercase tracking-tight">Vaidya Kumar</p>
                 <p className="text-[10px] text-primary uppercase tracking-widest font-black italic">Consultant</p>
              </div>
              <div className="bg-white rounded-[2.5rem] shadow-2xl border-8 border-slate-50 p-4 w-64 z-20 transition-transform hover:scale-105 duration-500">
                 <div className="bg-slate-100 h-64 rounded-[2rem] mb-4 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300" alt="Academic" className="w-full h-full object-cover" />
                 </div>
                 <p className="font-black uppercase tracking-tight">Dr. Janani</p>
                 <p className="text-xs text-accent font-black italic uppercase tracking-widest">Research Head</p>
              </div>
              <div className="absolute bottom-10 left-0 bg-white rounded-[2rem] shadow-2xl border-4 border-slate-50 p-3 w-48 z-10 transition-transform hover:scale-105 duration-500">
                 <div className="bg-slate-100 h-40 rounded-[1.5rem] mb-3 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=200" alt="Therapist" className="w-full h-full object-cover" />
                 </div>
                 <p className="font-black text-sm uppercase tracking-tight">Ranjith Manohar</p>
                 <p className="text-[10px] text-green-600 uppercase tracking-widest font-black italic">Yoga Master</p>
              </div>
            </div>
          </section>

          {/* Hiring Partners */}
          <section className="bg-slate-50 py-16 border-y border-slate-100">
            <div className="container mx-auto px-6 text-center">
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-10">Trusted By Industry Leaders</p>
              <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                {['AYUSH MINISTRY', 'CCRAS', 'CENTRAL COUNCIL', 'NATONAL INSTITUTE', 'VIBHA'].map((brand) => (
                  <span key={brand} className="text-xl font-black text-slate-900 tracking-tighter">{brand}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-24 space-y-32">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-20">
              <div className="flex-1 order-2 md:order-1">
                 <div className="bg-primary/5 h-80 rounded-[3rem] border-4 border-white shadow-inner flex items-center justify-center">
                    <Filter size={100} className="text-primary opacity-20" />
                 </div>
              </div>
              <div className="flex-1 order-1 md:order-2 space-y-6">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">Hire Based on <br/><span className="text-primary italic">Expertise & Location</span></h2>
                <p className="text-lg font-bold text-slate-400 italic leading-relaxed">
                  Looking for a specialized consultant in a specific region? Our advanced filters match candidate skills and locations to your exact requirements.
                </p>
              </div>
            </div>

            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-20">
              <div className="flex-1 space-y-6">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">Direct <br/><span className="text-accent italic">Candidate Access</span></h2>
                <p className="text-lg font-bold text-slate-400 italic leading-relaxed">
                  We bridge the gap instantly. Call or message candidates directly through our secure platform to accelerate your interview pipeline.
                </p>
              </div>
              <div className="flex-1 bg-slate-900 rounded-[3rem] p-16 text-white flex justify-center gap-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                <Phone size={80} className="text-primary" />
                <MessageSquare size={80} className="text-accent" />
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-24 bg-slate-50">
            <div className="container mx-auto max-w-4xl px-6">
              <h2 className="text-4xl font-black text-center mb-16 uppercase tracking-tighter">Frequently <br/><span className="text-primary italic">Asked Questions</span></h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-8 text-left transition-all group"
                    >
                      <span className="font-black text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors">{faq}</span>
                      {openFaq === idx ? <ChevronUp size={24} className="text-primary" /> : <ChevronDown size={24} className="text-slate-300" />}
                    </button>
                    {openFaq === idx && (
                      <div className="px-8 pb-8 text-slate-500 font-medium leading-relaxed italic animate-in fade-in duration-300">
                        Detailed answers are provided during the recruitment onboarding process. Generally, job posting is straightforward and requires basic organization verification to maintain portal integrity.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final Recruiter CTA */}
          <section className="py-32 bg-primary text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="container mx-auto max-w-3xl px-6 relative z-10 space-y-10">
              <div className="space-y-4">
                <p className="text-white/70 font-black uppercase tracking-[0.3em] text-sm">Grow Your Organization</p>
                <h2 className="text-5xl md:text-7xl font-[1000] text-white uppercase tracking-tighter leading-[0.9]">Start Hiring <br/>Today</h2>
              </div>
              <p className="text-xl font-bold text-white/60 italic">Post your openings and tap into an extensive pool of certified AYUSH professionals.</p>
              <Button asChild size="lg" className="h-20 px-16 rounded-[2rem] bg-white text-primary font-black text-xl uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                <Link href="/admin/login">Post A Job Free</Link>
              </Button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
