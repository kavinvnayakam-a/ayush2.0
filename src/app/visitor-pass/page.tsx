'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Ticket, UserCheck, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { z } from 'zod';

const VisitorSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    number: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Please enter a valid mobile number." }),
    mailId: z.string().email({ message: "Please enter a valid email address." }),
    location: z.string().min(2, { message: "Location is required." }),
});


function VisitorForm() {
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
        if (!firestore) {
          throw new Error('Firestore is not initialized');
        }
        const visitorsRef = collection(firestore, 'visitor_passes');
        const mailRef = collection(firestore, 'mail');
        
        await addDoc(visitorsRef, {
            ...validatedFields.data,
            registrationDate: serverTimestamp(),
        });

        await addDoc(mailRef, {
          to: validatedFields.data.mailId,
          message: {
            subject: 'Your Free Visitor Pass for Arogya Expo 2026!',
            html: `
            <div style="font-family: 'Cabin', sans-serif; background-color: #E2EAD9; color: #333; padding: 40px; text-align: center;">
              <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 2rem; padding: 40px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
                <img src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FArogya%202026%20logo.webp?alt=media&token=0ee2306d-e44e-4c15-b748-69491434e0f5" alt="Arogya Expo Logo" style="width: 150px; margin-bottom: 20px;">
                <h1 style="color: #6CA33F; font-size: 2.5rem; text-transform: uppercase; letter-spacing: -1px; margin: 0;">Registration Confirmed!</h1>
                <p style="font-size: 1.2rem; font-style: italic; color: #555; margin-top: 10px;">Hello ${validatedFields.data.name},</p>
                <p style="font-size: 1.1rem; line-height: 1.6;">Thank you for registering for the <strong>Arogya Expo 2026</strong>. We are thrilled to have you join us for this celebration of health, nature, and tradition.</p>
                
                <div style="background-color: #f7f9f5; border-radius: 1.5rem; padding: 20px; margin: 30px 0; text-align: left;">
                  <h3 style="color: #6CA33F; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 2px; border-bottom: 2px solid #e2ead9; padding-bottom: 10px; margin-bottom: 20px;">Event Details</h3>
                  <p style="margin: 10px 0; font-size: 1rem;"><strong>Date:</strong> January 09-12, 2026</p>
                  <p style="margin: 10px 0; font-size: 1rem;"><strong>Location:</strong> Heartfulness (Babuji Memorial Ashram), Manapakkam, Chennai</p>
                </div>
                
                <p style="font-size: 1rem; color: #777;">Please show this email at the registration desk to receive your visitor pass. We look forward to seeing you there!</p>
                <p style="font-size: 0.9rem; color: #aaa; margin-top: 30px;">© ${new Date().getFullYear()} National Ayush Conclave. All rights reserved.</p>
              </div>
            </div>
            `,
          }
        });

        toast({
            title: 'Success!',
            description: 'Registration successful! A confirmation email has been sent.',
        });
        formRef.current?.reset();
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
             {isSubmitting ? 'Booking...' : 'Confirm Your Free Pass'}
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
