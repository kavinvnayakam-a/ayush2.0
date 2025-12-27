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

const visitorSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  number: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Please enter a valid mobile number." }),
  mailId: z.string().email({ message: "Please enter a valid email address." }),
  location: z.string().min(2, { message: "Location is required." }),
});

type VisitorFormValues = z.infer<typeof visitorSchema>;

interface VisitorFormProps {
  closeModal?: () => void;
  buttonText?: string;
}

export function VisitorForm({ closeModal, buttonText = "Confirm Booking" }: VisitorFormProps) {
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<VisitorFormValues>({
    resolver: zodResolver(visitorSchema),
    defaultValues: {
      name: '',
      number: '',
      mailId: '',
      location: '',
    },
  });

  const onSubmit = async (data: VisitorFormValues) => {
    try {
      if (!firestore) {
        throw new Error('Firestore is not initialized');
      }
      const visitorsRef = collection(firestore, 'visitor_passes');
      const mailRef = collection(firestore, 'mail');

      await addDoc(visitorsRef, {
        ...data,
        registrationDate: serverTimestamp(),
      });
      
      await addDoc(mailRef, {
        to: data.mailId,
        message: {
          subject: 'Your Free Visitor Pass for Arogya Expo 2026!',
          html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&display=swap');
              body {
                margin: 0;
                padding: 0;
                background-color: #f0f4f0;
              }
              .container {
                font-family: 'Cabin', sans-serif;
                background-color: #f0f4f0;
                color: #333;
                padding: 20px;
                text-align: center;
              }
              .content {
                max-width: 600px;
                margin: auto;
                background-color: white;
                border-radius: 2rem;
                padding: 40px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
              }
              @media (max-width: 600px) {
                .container { padding: 10px; }
                .content {
                  padding: 20px;
                  border-radius: 1rem;
                }
                .title {
                  font-size: 1.8rem !important;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="content">
                <img src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FArogya%202026%20logo.webp?alt=media&token=0ee2306d-e44e-4c15-b748-69491434e0f5" alt="Arogya Expo 2026 Logo" style="width: 180px; height: auto; max-width: 100%; margin: 0 auto 20px auto; display: block;">
                <h1 class="title" style="color: #6CA33F; font-size: 2.5rem; text-transform: uppercase; letter-spacing: -1px; margin: 0;">Registration Confirmed!</h1>
                <p style="font-size: 1.2rem; font-style: italic; color: #555; margin-top: 10px;">Hello ${data.name},</p>
                <p style="font-size: 1.1rem; line-height: 1.6;">Thank you for registering for the <strong>Arogya Expo 2026</strong>. We are thrilled to have you join us for this celebration of health, nature, and tradition.</p>
                
                <div style="background-color: #f7f9f5; border-radius: 1.5rem; padding: 20px; margin: 30px 0; text-align: left;">
                  <h3 style="color: #6CA33F; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 2px; border-bottom: 2px solid #e2ead9; padding-bottom: 10px; margin-bottom: 20px;">Event Details</h3>
                  <p style="margin: 10px 0; font-size: 1rem;"><strong>Date:</strong> January 09-12, 2026</p>
                  <p style="margin: 10px 0; font-size: 1rem;"><strong>Location:</strong> Heartfulness (Babuji Memorial Ashram), Manapakkam, Chennai</p>
                  <a href="https://maps.app.goo.gl/JhskuW5WSBJGonAv7" target="_blank" style="display: inline-block; margin-top: 15px; padding: 12px 24px; background-color: #6CA33F; color: white; text-decoration: none; border-radius: 12px; font-weight: bold;">Get Directions</a>
                </div>
                
                <p style="font-size: 1rem; color: #777;">Please show this email at the registration desk to receive your visitor pass. We look forward to seeing you there!</p>
                <p style="font-size: 0.9rem; color: #aaa; margin-top: 30px;">© ${new Date().getFullYear()} National Ayush Conclave. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
          `,
        }
      });

      toast({
          title: 'Success!',
          description: 'Registration successful! A confirmation email has been sent.',
      });
      form.reset();
      if (closeModal) {
        closeModal();
      }
    } catch (error: any) {
      console.error("Firestore Error:", error);
      toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message || 'Could not save your registration. Please try again later.',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-black uppercase tracking-widest ml-2 mb-1 block text-slate-400">Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-black uppercase tracking-widest ml-2 mb-1 block text-slate-400">Mobile Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+91 XXXXX XXXXX" {...field} />
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
              <FormLabel className="text-[10px] font-black uppercase tracking-widest ml-2 mb-1 block text-slate-400">Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-black uppercase tracking-widest ml-2 mb-1 block text-slate-400">Location</FormLabel>
              <FormControl>
                <Input placeholder="City / State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full h-16 bg-[hsl(93,45%,44%)] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#ffa62f] transition-all mt-6 shadow-xl shadow-[hsl(93,45%,44%)]/20">
          {form.formState.isSubmitting ? 'Booking...' : buttonText}
        </Button>
      </form>
    </Form>
  );
}
