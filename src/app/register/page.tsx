'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Ticket, 
  CheckCircle2, 
  PhoneCall, 
  Users2, 
  AlertCircle, 
  ArrowRight,
  Info,
  UserCheck,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { z } from 'zod';

const REGISTRATION_LINK = "https://www.arogyaayurconclave.org/#/buyTickets/selectTickets?day=1&lang=en";

const VisitorSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    number: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Please enter a valid mobile number." }),
    mailId: z.string().email({ message: "Please enter a valid email address." }),
    location: z.string().min(2, { message: "Location is required." }),
});

const standardPrices = [
  { category: "UG Students", price: "2,000", subtitle: "Budding Professionals" },
  { category: "PG / PhD Scholars", price: "2,000", subtitle: "Research Excellence" },
  { category: "Practitioners / Faculty", price: "2,500", subtitle: "Experienced Experts" },
  { category: "Spot Registration", price: "3,500", subtitle: "4-Day Access", highlight: true },
];

const nasyaPrices = [
  { category: "UG Students", price: "2,000" },
  { category: "PG Students", price: "2,000" },
  { category: "PHD / Faculty", price: "2,000" },
];

function VisitorForm({ closeModal }: { closeModal: () => void }) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);

    const validatedFields = VisitorSchema.safeParse({
        name: formData.get('name'),
        number: formData.get('mobile'),
        mailId: formData.get('mailId'),
        location: formData.get('location'),
    });

    if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        toast({
            variant: 'destructive',
            title: 'Validation Error',
            description: fieldErrors.name?.[0] || fieldErrors.number?.[0] || fieldErrors.mailId?.[0] || fieldErrors.location?.[0] || 'Please check your inputs.',
        });
        setIsSubmitting(false);
        return;
    }

    try {
        const visitorsRef = collection(firestore, 'visitor_passes');
        await addDoc(visitorsRef, {
            ...validatedFields.data,
            registrationDate: serverTimestamp(),
        });
        toast({
            title: 'Success!',
            description: 'Registration successful! See you at the Expo.',
        });
        formRef.current?.reset();
        closeModal();
    } catch (error: any) {
        console.error("Firestore Error:", error);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not save your registration. Please try again later.',
        });
    } finally {
        setIsSubmitting(false);
    }
  };


  return (
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="text-[10px] font-black uppercase tracking-widest ml-2 mb-1 block text-slate-400">Full Name</label>
            <Input name="name" type="text" placeholder="Enter your name" required />
        </div>
        <div>
            <label className="text-[10px] font-black uppercase tracking-widest ml-2 mb-1 block text-slate-400">Mobile Number</label>
            <Input name="mobile" type="tel" placeholder="+91 XXXXX XXXXX" required />
        </div>
        <div>
            <label className="text-[10px] font-black uppercase tracking-widest ml-2 mb-1 block text-slate-400">Email Address</label>
            <Input name="mailId" type="email" placeholder="your@email.com" required />
        </div>
        <div>
            <label className="text-[10px] font-black uppercase tracking-widest ml-2 mb-1 block text-slate-400">Location</label>
            <Input name="location" type="text" placeholder="City / State" required />
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full h-16 bg-[hsl(93,45%,44%)] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#ffa62f] transition-all mt-6 shadow-xl shadow-[hsl(93,45%,44%)]/20">
             {isSubmitting ? 'Booking...' : 'Confirm Booking'}
        </Button>
    </form>
  )
}


export default function RegistrationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white selection:bg-[hsl(93,45%,44%)] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-[hsl(91,30%,96%)]">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full border border-slate-200 text-[hsl(93,45%,44%)] font-black text-[10px] tracking-[0.3em] uppercase mb-8 shadow-sm">
            <Ticket size={14} /> Delegate Passes 2026
          </div>
          <h1 className="text-6xl md:text-9xl font-[1000] text-[hsl(93,20%,15%)] uppercase tracking-tighter mb-6">
            Regis<span className="text-[hsl(93,45%,44%)] italic">tration</span>
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-lg font-bold text-slate-500">
             <div className="flex items-center gap-2 bg-[hsl(93,45%,44%)]/10 text-[hsl(93,45%,44%)] px-6 py-3 rounded-2xl border border-[hsl(93,45%,44%)]/20">
                <Users2 size={20} /> Bulk Concessions Available
             </div>
             <a href="tel:+919585567891" className="flex items-center gap-2 hover:text-[hsl(93,45%,44%)] transition-colors">
                <PhoneCall size={20} className="text-[#ffa62f]" /> +91 9994211666
             </a>
          </div>
        </div>
      </section>

      {/* 2. FREE VISITOR PASS SECTION (NEW) */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-[hsl(93,20%,15%)] to-[hsl(93,20%,25%)] rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#ffa62f] flex items-center justify-center text-white shrink-0 animate-pulse">
                <UserCheck size={32} />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Visitor Entry is <span className="text-[#ffa62f]">Free</span></h3>
                <p className="text-white/60 font-bold italic">Explore the Expo, stalls, and open sessions at no cost.</p>
              </div>
            </div>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="h-16 px-10 rounded-2xl bg-white text-[hsl(93,20%,15%)] font-black uppercase tracking-widest hover:bg-[#ffa62f] hover:text-white transition-all shadow-lg"
            >
              Get Free Pass
            </Button>
          </div>
        </div>
      </section>

      {/* 3. PRICING GRID */}
      <section className="py-24 container mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-[hsl(93,20%,15%)] uppercase tracking-tight mb-4">Select Your <span className="text-[hsl(93,45%,44%)]">Category</span></h2>
            <p className="text-slate-500 font-bold italic">All categories include breakfast, lunch, and refreshments as part of the registration.</p>
          </div>
          <div className="flex items-center gap-2 bg-[#ffa62f]/10 text-[#ffa62f] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-[#ffa62f]/20">
             <Info size={14} /> Rates Inclusive of 18% GST
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {standardPrices.map((item, i) => (
            <div key={i} className={`p-10 rounded-[3rem] border-2 transition-all flex flex-col ${item.highlight ? 'bg-[hsl(93,20%,15%)] border-[hsl(93,20%,15%)] text-white shadow-2xl shadow-[hsl(93,45%,44%)]/20' : 'bg-white border-slate-100 hover:border-[hsl(93,45%,44%)]/30'}`}>
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${item.highlight ? 'text-[#ffa62f]' : 'text-slate-400'}`}>
                {item.subtitle}
              </span>
              <h3 className="text-2xl font-black uppercase leading-tight mb-8">{item.category}</h3>
              
              <div className="mt-auto">
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-sm font-black opacity-60">₹</span>
                  <span className="text-5xl font-black tracking-tighter">{item.price}</span>
                </div>
                <Button 
                  asChild
                  className={`w-full h-14 rounded-2xl font-black uppercase tracking-widest transition-transform hover:scale-105 ${item.highlight ? 'bg-[hsl(93,45%,44%)] hover:bg-[#ffa62f]' : 'bg-[hsl(93,45%,44%)] text-white hover:bg-[#ffa62f]'}`}
                >
                  <a href={REGISTRATION_LINK} target="_blank" rel="noopener noreferrer">Register</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. NASYA SPECIAL DISCOUNT */}
      <section className="pb-32 container mx-auto px-6">
        <div className="bg-[hsl(93,45%,44%)] rounded-[4rem] p-10 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.2em] mb-6">
                NASYA Members Exclusive
              </div>
              <h2 className="text-5xl md:text-7xl font-[1000] uppercase tracking-tighter leading-none mb-8">
                Avail <span className="text-[#ffa62f] italic">15%</span> <br/>Discount
              </h2>
              <div className="space-y-4">
                <p className="text-xl font-bold opacity-80 italic">Special rates for our valued NASYA community members across all student and faculty categories.</p>
                <div className="flex items-center gap-3 text-white/60">
                  <AlertCircle size={20} />
                  <span className="text-sm font-bold uppercase tracking-widest">Verification required at check-in</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[3rem] p-8 md:p-12 space-y-6">
              {nasyaPrices.map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0">
                  <span className="text-lg font-black uppercase tracking-tight">{item.category}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold opacity-60">₹</span>
                    <span className="text-2xl font-black leading-none">{item.price}</span>
                  </div>
                </div>
              ))}
              <Button asChild className="w-full h-16 bg-white text-[hsl(93,45%,44%)] rounded-2xl font-black uppercase tracking-widest hover:bg-[#ffa62f] hover:text-white transition-all text-lg">
                <a href={REGISTRATION_LINK} target="_blank" rel="noopener noreferrer">NASYA Registration</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. IMPORTANT NOTES */}
      <section className="pb-32 container mx-auto px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h4 className="text-xl font-black text-[hsl(93,20%,15%)] uppercase tracking-tight flex items-center gap-3">
               <div className="w-8 h-1 bg-[#ffa62f] rounded-full" /> Oral Presentations
            </h4>
            <div className="space-y-4">
              <a href={REGISTRATION_LINK} target="_blank" className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white transition-colors">
                <span className="font-bold text-[hsl(93,20%,15%)] uppercase text-sm">UG/PG/PhD Students</span>
                <ArrowRight size={20} className="text-[hsl(93,45%,44%)] group-hover:translate-x-1 transition-transform" />
              </a>
              <a href={REGISTRATION_LINK} target="_blank" className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white transition-colors">
                <span className="font-bold text-[hsl(93,20%,15%)] uppercase text-sm">Practitioners & Faculty</span>
                <ArrowRight size={20} className="text-[hsl(93,45%,44%)] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="bg-[hsl(91,30%,96%)] p-10 rounded-[3rem] border border-white">
            <h4 className="text-xl font-black text-[hsl(93,20%,15%)] uppercase tracking-tight mb-6">Terms of Service</h4>
            <ul className="space-y-4">
              {[
                "Only registered participants can present papers.",
                "Registration includes all conference meals.",
                "Certificates will be issued post-event.",
                "Registration fee is non-refundable."
              ].map((note, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[hsl(93,45%,44%)] shrink-0 mt-1" size={18} />
                  <span className="text-sm font-bold text-slate-500">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* VISITOR MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[hsl(93,20%,15%)]/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl overflow-hidden">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X size={24} />
            </button>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[hsl(93,45%,44%)]/10 rounded-2xl flex items-center justify-center text-[hsl(93,45%,44%)] mx-auto mb-4">
                <Ticket size={32} />
              </div>
              <h2 className="text-3xl font-black text-[hsl(93,20%,15%)] uppercase">Visitor Pass</h2>
              <p className="text-slate-500 font-bold italic">Secure your free entry to the Arogya Expo</p>
            </div>
            <VisitorForm closeModal={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}

    </main>
  );
}
