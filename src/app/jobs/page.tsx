'use client';

import React, { useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  CheckCircle, 
  Search, 
  MapPin, 
  PhoneCall, 
  Globe,
  MessageSquare,
  Phone,
  Filter,
  Zap,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Users,
  ChevronRight,
  Building2,
  X,
  ArrowRight
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

  const roles = [
    'Ayurvedic Consultant', 'Yoga Instructor', 'Panchakarma Tech', 'Wellness Sales', 
    'Research Associate', 'Clinical Pharmacist', 'Manufacturing Head', 'Quality Control'
  ];

  const locations = [
    'Chennai', 'Tiruvallur', 'Vellore', 'Tiruchirappalli', 'Madurai', 
    'Coimbatore', 'Erode', 'Tiruppur', 'Namakkal', 'Kanchipuram'
  ];

  const faqs = [
    "Are there any charges for creating a Recruiter profile and posting jobs?",
    "How do I create a Recruiter profile on the website?",
    "Do I need to verify my account before posting the job?",
    "How do I post Jobs on the website?",
    "Why is my job under review?",
    "Which cities and states do we serve currently?"
  ];

  return (
    <main className="min-h-screen bg-white font-sans">
      {/* 1. NAVIGATION / TOGGLE BAR - Moved to top-0 because global header is hidden */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 py-4 shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl">
          <div className="flex flex-col">
            <Link href="/" className="flex flex-col">
              <h1 className="text-2xl font-black text-primary tracking-tighter uppercase leading-none">Ayush <span className="italic text-accent">Jobs</span></h1>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Holistic Career Growth</p>
            </Link>
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
        <div className="pt-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-5xl lg:text-7xl font-extrabold leading-tight text-slate-900">
                Entry level Sales, Service and Manufacturing jobs
              </h2>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Globe size={24} />
                  </div>
                  <p className="text-sm font-medium text-slate-600">Use app in English<br/>and Tamil</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-lg text-accent">
                    <Search size={24} />
                  </div>
                  <p className="text-sm font-medium text-slate-600">Discover jobs from<br/>multiple industries</p>
                </div>
              </div>

              <div className="flex items-center gap-6 p-4 border border-slate-200 rounded-2xl w-fit">
                <div className="w-24 h-24 bg-slate-200 flex items-center justify-center rounded-lg">
                  <span className="text-[10px] text-center text-slate-500 font-black">QR CODE</span>
                </div>
                <p className="text-sm text-slate-600 max-w-[200px] font-bold leading-tight">
                  Scan the QR code with your mobile to download <strong>Ayush Jobs app</strong> & get instant updates
                </p>
              </div>
            </div>

            {/* Hero Illustration Area */}
            <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
              <div className="relative z-10">
                 <img 
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600" 
                  alt="Candidate using app" 
                  className="rounded-3xl shadow-2xl"
                />
                {/* Floating Badges */}
                <div className="absolute -left-10 top-1/2 bg-white p-3 rounded-xl shadow-lg border border-orange-100 flex items-center gap-2 animate-bounce">
                  <div className="bg-orange-400 p-1 rounded-full text-white"><CheckCircle size={14}/></div>
                  <div>
                    <p className="text-[10px] font-bold text-orange-500 italic">Shortlisted</p>
                    <p className="text-[8px] text-slate-500 leading-tight">Your profile is shortlisted<br/>by a recruiter</p>
                  </div>
                </div>
                <div className="absolute -right-6 top-1/4 bg-white p-3 rounded-xl shadow-lg border border-green-100 flex items-center gap-2">
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
            <div className="max-w-7xl mx-auto text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 uppercase">Explore Sales, Service and Manufacturing jobs</h3>
            </div>
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Verified Recruiters", desc: "Our screening process allows only verified job providers.", icon: <CheckCircle className="text-primary"/> },
                { title: "Use in Tamil", desc: "You can use the app easily in your mother tongue.", icon: <Globe className="text-accent"/> },
                { title: "Talk to HRs Directly", desc: "Call recruiters directly to know your interview status.", icon: <PhoneCall className="text-green-500"/> },
                { title: "Location Features", desc: "Find jobs nearby using advanced map & distance filters.", icon: <MapPin className="text-purple-500"/> },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4">{item.icon}</div>
                  <h4 className="font-bold mb-2 text-slate-900">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Dynamic Recent Openings Feed */}
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
                  <Card key={job.id} className="group rounded-[2.5rem] bg-white border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col border-2">
                    <CardHeader className="relative pt-8">
                      <div className="flex justify-between items-start mb-4">
                        <div className="relative w-12 h-12 bg-slate-50 rounded-xl border p-2 flex items-center justify-center overflow-hidden shadow-inner">
                          {job.logoUrl ? (
                            <Image src={job.logoUrl} alt={job.company} fill className="object-contain p-2" />
                          ) : (
                            <Building2 className="text-slate-300 h-6 w-6" />
                          )}
                        </div>
                        <Badge className="bg-primary/10 text-primary border-none font-black px-3 py-1 rounded-full uppercase text-[9px]">
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
                      <p className="text-xs text-slate-500 font-bold line-clamp-2 italic leading-relaxed">
                        {job.description}
                      </p>
                      <Button onClick={() => setSelectedJob(job)} className="w-full h-12 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-primary transition-all text-xs shadow-lg shadow-slate-200">
                        View Details <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                <p className="font-black text-slate-400 italic uppercase">No recent jobs found. Check back soon!</p>
              </div>
            )}
          </section>

          {/* Category Section */}
          <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 italic underline decoration-primary underline-offset-8">Qualification based jobs</h3>
              <div className="flex flex-wrap gap-3">
                {['Bachelor Degree', 'Diploma', 'ITI', '12th Pass', '10th & Below'].map(q => (
                  <span key={q} className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700">{q}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 italic underline decoration-primary underline-offset-8">Job Types</h3>
              <div className="flex flex-wrap gap-3">
                {['Full time', 'Part time', 'Contract', 'Temporary'].map(t => (
                  <span key={t} className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">{t}</span>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* --- RECRUITER VIEW --- */}
      {view === 'recruiter' && (
        <div className="pt-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-slate-900">
                Entry level Sales, Service and Manufacturing jobs
              </h1>
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-primary p-2 rounded-lg text-white shadow-md">
                    <Users size={20} />
                  </div>
                  <p className="text-sm font-medium text-slate-700">Get access to a large pool of candidates</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-accent p-2 rounded-lg text-white shadow-md">
                    <Zap size={20} />
                  </div>
                  <p className="text-sm font-medium text-slate-700">Reduce hiring time & employ the best</p>
                </div>
              </div>
              
              <div className="bg-white border rounded-xl p-2 shadow-sm flex flex-col sm:flex-row gap-2 max-w-lg mb-4">
                <input 
                  type="tel" 
                  placeholder="Enter your mobile number" 
                  className="flex-1 px-4 py-3 outline-none"
                />
                <Button asChild className="bg-primary text-white px-8 py-6 rounded-lg font-bold hover:bg-slate-900 transition">
                  <Link href="/admin/login">Register Now</Link>
                </Button>
              </div>
              <div className="space-y-1">
                <Link href="/admin/login" className="text-primary font-bold underline flex items-center gap-2 text-sm">
                  <Briefcase size={14} /> Click here for Enterprise login
                </Link>
                <p className="text-sm text-slate-500 italic">We are currently live only in Tamil Nadu</p>
              </div>
            </div>

            {/* Hero Visuals */}
            <div className="relative flex justify-center items-center">
               <img 
                src="https://firebasestorage.googleapis.com/v0/b/studio-2309061503-7e9f2.firebasestorage.app/o/Jobportal%2Fimg-2.webp?alt=media&token=89560f30-8516-4925-9765-7eb711ca4161" 
                alt="Ayush Jobs Recruiter Hero" 
                className="w-full h-auto max-w-xl object-contain"
              />
            </div>
          </section>

          {/* Hiring Partners */}
          <section className="bg-slate-50 py-10 border-y">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <p className="text-2xl font-bold mb-8 italic text-slate-400">Our Hiring Partners</p>
              <div className="flex flex-wrap justify-center gap-10 grayscale opacity-70">
                {['SHREEVARMA', 'AYUR.AI', 'NASYA', 'VIBHA', 'MINISTRY', 'PCR HERBALS'].map((brand) => (
                  <span key={brand} className="text-xl font-black text-slate-400 tracking-widest">{brand}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Feature Highlights */}
          <section className="py-20 space-y-32">
            {/* Locality */}
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 order-2 md:order-1">
                 <div className="bg-primary/5 h-80 rounded-3xl flex items-center justify-center">
                    <Filter size={80} className="text-primary opacity-20" />
                 </div>
              </div>
              <div className="flex-1 order-1 md:order-2">
                <h2 className="text-4xl font-bold mb-4 text-slate-900">Hire candidates based on their location</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Want to hire candidates from a particular locality? Our advanced filters can help you find candidates suiting your requirements in any specific locality.
                </p>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                <h2 className="text-4xl font-bold mb-4 text-slate-900">Candidates can contact you directly</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  We prompt the users to connect with you directly over call allowing for a faster screening & hiring process.
                </p>
              </div>
              <div className="flex-1 bg-slate-900 rounded-[3rem] p-16 text-white flex justify-center gap-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                <Phone size={80} className="text-primary" />
                <MessageSquare size={80} className="text-accent" />
              </div>
            </div>

            {/* Vernacular */}
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 order-2 md:order-1 flex justify-center">
                <div className="flex gap-4">
                  <div className="bg-white border-4 border-slate-50 shadow-xl px-8 py-4 rounded-xl text-xl font-bold text-slate-900">English</div>
                  <div className="bg-white border-4 border-slate-50 shadow-xl px-8 py-4 rounded-xl text-xl font-bold text-primary">தமிழ்</div>
                </div>
              </div>
              <div className="flex-1 order-1 md:order-2">
                <h2 className="text-4xl font-bold mb-4 text-slate-900">Easy-to-use vernacular app, more local candidates</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Our easy-to-use vernacular app helps more regional job seekers to register, thereby giving you a larger database of candidates to choose from.
                </p>
              </div>
            </div>
          </section>

          {/* Benefit Cards */}
          <section className="bg-slate-50 py-20">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900">
                We help you find the best candidates who fit your requirements
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: "Easier & faster screening", desc: "Candidate Match Score can help you easily find the best candidates for your requirement." },
                  { title: "2x faster hiring", desc: "Directly contact the best talent through our various communication channels to complete your hiring 2x faster." },
                  { title: "Filters to find the best candidates", desc: "Filters based on skills, education & salary expectation can help you find candidates." }
                ].map((benefit, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl border hover:shadow-lg transition">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary mb-6">
                      <BarChart3 size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Roles & Location Cloud */}
          <section className="py-20 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-20">
                <h2 className="text-3xl font-bold mb-8 uppercase tracking-tighter">Hire for 50+ different roles</h2>
                <div className="flex flex-wrap gap-3">
                  {roles.map(role => (
                    <span key={role} className="bg-white/10 px-6 py-2 rounded-full border border-white/20 text-sm font-medium hover:bg-white hover:text-slate-900 transition cursor-default">
                      {role}
                    </span>
                  ))}
                </div>
                <Button asChild className="mt-10 bg-white text-slate-900 px-8 py-6 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition">
                    <Link href="/admin/login">REGISTER FOR FREE</Link>
                </Button>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4 uppercase tracking-tighter">Hire from any locality</h2>
                <p className="text-slate-400 mb-8 max-w-2xl font-medium italic">
                  Our platform provide you with the opportunity to search for professional talent in any specific locality and hire the best candidates.
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  {locations.map(loc => (
                    <span key={loc} className="text-lg font-bold border-b-2 border-white/30 hover:border-white transition cursor-pointer uppercase tracking-widest">
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 text-slate-900">FAQs</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between py-6 text-left font-bold text-lg hover:text-primary transition"
                  >
                    {faq}
                    {openFaq === idx ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </button>
                  {openFaq === idx && (
                    <div className="pb-6 text-slate-500 leading-relaxed italic">
                      Answers to these questions are available in our recruiter help documentation. Generally, registration is free and involves email verification.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-24 bg-primary/5 text-center border-t">
            <div className="max-w-3xl mx-auto px-6">
              <p className="text-primary font-bold mb-4 uppercase tracking-widest">Looking for best professionals to join your company?</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Post a job and get applications from the best candidates</h2>
              <p className="text-slate-600 text-lg mb-10">Our platform has an extensive pool of registered talent looking for job opportunities.</p>
              <Button asChild className="bg-primary text-white px-12 py-8 rounded-2xl font-black text-xl hover:bg-slate-900 shadow-xl transform hover:-translate-y-1 transition">
                <Link href="/admin/login">REGISTER FOR FREE</Link>
              </Button>
            </div>
          </section>
        </div>
      )}

      {/* --- JOB DETAILS DIALOG --- */}
      <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 border-none rounded-[3rem] overflow-hidden shadow-2xl z-[60]">
          {selectedJob && (
            <>
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

              <div className="flex-1 min-h-0 pt-12">
                <ScrollArea className="h-full">
                  <div className="p-8 md:p-12 space-y-8">
                    <div className="space-y-2">
                      <DialogHeader className="p-0 text-left">
                        <DialogTitle className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight leading-none">
                          {selectedJob.title}
                        </DialogTitle>
                        <DialogDescription className="text-primary font-black text-lg flex items-center gap-2 italic">
                          <Building2 size={18} /> {selectedJob.company}
                        </DialogDescription>
                      </DialogHeader>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="bg-primary/10 p-2 rounded-lg text-primary"><MapPin size={18} /></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Location</span>
                          <span className="text-sm font-black text-slate-700">{selectedJob.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="bg-accent/10 p-2 rounded-lg text-accent"><Briefcase size={18} /></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Salary</span>
                          <span className="text-sm font-black text-slate-700">{selectedJob.salary || 'Competitive'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="bg-blue-50 p-2 rounded-lg text-blue-500"><Zap size={18} /></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Job Type</span>
                          <span className="text-sm font-black text-slate-700">{selectedJob.type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                          <div className="w-8 h-px bg-slate-200" /> Job Description
                        </h4>
                        <div className="p-8 rounded-[2.5rem] bg-white border-2 border-slate-50 text-slate-600 leading-relaxed text-sm font-bold italic whitespace-pre-wrap">
                          {selectedJob.description}
                        </div>
                      </div>

                      {selectedJob.requirements && (
                        <div className="space-y-4">
                          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                            <div className="w-8 h-px bg-slate-200" /> Candidate Requirements
                          </h4>
                          <div className="p-8 rounded-[2.5rem] bg-primary/5 border-2 border-primary/10 text-slate-700 leading-relaxed text-sm font-black whitespace-pre-wrap">
                            {selectedJob.requirements}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollArea>
              </div>

              <DialogFooter className="p-6 md:p-8 bg-white border-t border-slate-100 shrink-0 gap-4 flex-row items-center justify-between">
                <Button variant="ghost" onClick={() => setSelectedJob(null)} className="h-14 px-8 rounded-2xl font-black uppercase text-slate-400 hover:text-slate-600 text-xs">
                  Close
                </Button>
                <Button asChild className="flex-1 h-14 bg-primary text-white font-black uppercase tracking-widest rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-primary/20">
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
