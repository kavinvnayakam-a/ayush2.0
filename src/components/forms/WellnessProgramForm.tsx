
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

const wellnessSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  age: z.coerce.number().min(1, { message: "Please enter a valid age." }).max(120),
  locality: z.string().min(2, { message: "Locality is required." }),
  whatsappNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Please enter a valid WhatsApp number." }),
  mailId: z.string().email({ message: "Please enter a valid email address." }),
});

type WellnessFormValues = z.infer<typeof wellnessSchema>;

export function WellnessProgramForm() {
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<WellnessFormValues>({
    resolver: zodResolver(wellnessSchema),
    defaultValues: {
      name: '',
      age: 0,
      locality: '',
      whatsappNumber: '',
      mailId: '',
    },
  });

  const onSubmit = async (data: WellnessFormValues) => {
    try {
      if (!firestore) {
        throw new Error('Firestore is not initialized');
      }
      
      const registrationsRef = collection(firestore, 'wellness_registrations');
      
      await addDoc(registrationsRef, {
        ...data,
        registrationDate: serverTimestamp(),
      });

      toast({
        title: 'Registration Successful!',
        description: 'You have been registered for the Corporate Wellness Program.',
      });
      form.reset();
    } catch (error: any) {
      console.error("Firestore Error:", error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Could not submit your registration.',
      });
    }
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
        </div>

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
