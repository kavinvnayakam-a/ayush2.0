'use client';

import React, { useEffect, useRef } from 'react';
import { Ticket, UserCheck, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { registerVisitorAction, type FormState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

function VisitorForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const initialState: FormState = { status: 'idle', message: '' };
  const [state, formAction] = useActionState(registerVisitorAction, initialState);

  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: 'Success!',
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.status === 'error') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
      <form ref={formRef} action={formAction} className="space-y-4">
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
        <Button type="submit" disabled={pending} className="w-full h-16 bg-[hsl(93,45%,44%)] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#ffa62f] transition-all mt-6 shadow-xl shadow-[hsl(93,45%,44%)]/20">
             {pending ? 'Booking...' : 'Confirm Your Free Pass'}
        </Button>
    </form>
  )
}


export default function VisitorPassPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[hsl(93,45%,44%)] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-[hsl(91,30%,96%)]">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full border border-slate-200 text-[hsl(93,45%,44%)] font-black text-[10px] tracking-[0.3em] uppercase mb-8 shadow-sm">
            <Ticket size={14} /> Arogya Expo 2026
          </div>
          <h1 className="text-6xl md:text-9xl font-[1000] text-[hsl(93,20%,15%)] uppercase tracking-tighter mb-6">
            Visitor <span className="text-[hsl(93,45%,44%)] italic">Pass</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-[hsl(93,20%,15%)]/60 max-w-4xl mx-auto leading-relaxed italic">
            "Your complimentary ticket to explore the future of holistic health and wellness."
          </p>
        </div>
      </section>

      {/* 2. FORM & INFO SECTION */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left Side: Info */}
          <div className="space-y-10">
            <div>
                <h2 className="text-3xl font-black text-[hsl(93,20%,15%)] uppercase tracking-tight mb-4">What's Included?</h2>
                <p className="text-slate-500 font-bold italic leading-relaxed">Your free visitor pass grants you access to key areas of the Arogya Expo. Immerse yourself in the world of AYUSH and discover innovations in wellness.</p>
            </div>

            <div className="space-y-4">
                 <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <UserCheck className="text-[hsl(93,45%,44%)] shrink-0 mt-0.5" size={24} />
                    <div>
                        <h4 className="font-black text-slate-800 uppercase">Expo Hall Access</h4>
                        <p className="text-sm font-bold text-slate-400">Explore over 100 stalls from leading AYUSH brands and startups.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <ShieldCheck className="text-[hsl(93,45%,44%)] shrink-0 mt-0.5" size={24} />
                    <div>
                        <h4 className="font-black text-slate-800 uppercase">Open Sessions & Demos</h4>
                        <p className="text-sm font-bold text-slate-400">Attend public talks, product launches, and live demonstrations.</p>
                    </div>
                 </div>
            </div>
            <div className="bg-[hsl(93,20%,15%)] text-white p-8 rounded-[2.5rem] shadow-xl">
                <h4 className="font-black text-white uppercase text-lg mb-2">Please Note</h4>
                <p className="text-white/70 text-sm font-medium leading-relaxed">This pass does not include access to the paid scientific sessions, delegate lunches, or workshops. To attend these, please register as a delegate.</p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-white border border-slate-100 shadow-2xl shadow-slate-100 rounded-[3rem] p-10">
             <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[hsl(93,45%,44%)]/10 rounded-2xl flex items-center justify-center text-[hsl(93,45%,44%)] mx-auto mb-4">
                <Ticket size={32} />
              </div>
              <h2 className="text-3xl font-black text-[hsl(93,20%,15%)] uppercase">Register for Free</h2>
              <p className="text-slate-500 font-bold italic">Fill in your details to receive your pass via email.</p>
            </div>
            <VisitorForm />
          </div>

        </div>
      </section>

    </main>
  );
}
