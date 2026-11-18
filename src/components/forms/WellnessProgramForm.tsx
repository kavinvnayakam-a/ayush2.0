'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const wellnessSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  age: z.coerce.number().min(1, { message: "Please enter a valid age." }).max(120),
  gender: z.enum(["Male", "Female", "Other"], { required_error: "Please select gender." }),
  locality: z.string().min(2, { message: "Locality is required." }),
  whatsappNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Please enter a valid WhatsApp number." }),
  mailId: z.string().email({ message: "Please enter a valid email address." }),
});

type WellnessFormValues = z.infer<typeof wellnessSchema>;

export function WellnessProgramForm() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const router = useRouter();

  const form = useForm<WellnessFormValues>({
    resolver: zodResolver(wellnessSchema),
    defaultValues: {
      name: '',
      age: 0,
      gender: undefined,
      locality: '',
      whatsappNumber: '',
      mailId: '',
    },
  });

  const onSubmit = (data: WellnessFormValues) => {
    if (!firestore) return;
    
    const registrationsRef = collection(firestore, 'wellness_registrations');
    const mailRef = collection(firestore, 'mail');
    
    // 1. Save Registration (Non-blocking)
    addDoc(registrationsRef, {
      ...data,
      registrationDate: serverTimestamp(),
    }).catch(async (err) => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: registrationsRef.path,
        operation: 'create',
        requestResourceData: data,
      }));
    });

    // 2. Send Confirmation Email (Non-blocking) - Updated Date to April 19
    addDoc(mailRef, {
      to: data.mailId,
      message: {
        subject: 'Corporate Wellness Program - Registration Confirmed',
        html: `
          <!DOCTYPE html>
          <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #6CA33F;">Registration Successful!</h2>
              <p>Hello <strong>${data.name}</strong>,</p>
              <p>Thank you for registering for the <strong>Corporate Wellness Program</strong> at National Ayush Conclave 2026.</p>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Event Details:</strong></p>
                <p>Date: April 19, 2026</p>
                <p>Location: Babuji Memorial Ashram, Manapakkam, Chennai</p>
              </div>
              <p>We look forward to seeing you there!</p>
              <p style="font-size: 12px; color: #888;">Note: This is an automated confirmation email. Please do not reply.</p>
            </div>
          </body>
          </html>
        `,
      }
    }).catch(() => {
      // Silently fail mail errors or handle separately
    });

    toast({
      title: 'Registration Submitted!',
      description: 'Redirecting to confirmation...',
    });

    // 3. Redirect to Thank You page
    router.push('/wellness-program/thank-you');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-400">Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" className="h-14 rounded-2xl border-slate-200" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-400">Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-14 rounded-2xl border-slate-200">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-400">Age</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Age" className="h-14 rounded-2xl border-slate-200" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="locality"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-400">Locality</FormLabel>
                <FormControl>
                  <Input placeholder="City / Area" className="h-14 rounded-2xl border-slate-200" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="whatsappNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-400">WhatsApp Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+91 XXXXX XXXXX" className="h-14 rounded-2xl border-slate-200" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mailId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest ml-1 text-slate-400">Mail ID</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" className="h-14 rounded-2xl border-slate-200" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          disabled={form.formState.isSubmitting} 
          className="w-full h-16 bg-[hsl(93,45%,44%)] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#ffa62f] transition-all shadow-xl shadow-[hsl(93,45%,44%)]/20 text-lg"
        >
          {form.formState.isSubmitting ? 'Registering...' : (
            <span className="flex items-center gap-2">
              Register Now <Send size={20} />
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
}
