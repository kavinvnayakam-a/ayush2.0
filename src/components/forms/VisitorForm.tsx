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
    <title>Registration Confirmed</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cabin:wght@400;700&display=swap');
        
        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        @media screen and (max-width: 600px) {
            .content-table {
                width: 100% !important;
                border-radius: 16px !important;
            }
            .mobile-padding {
                padding: 20px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f0f4f0; font-family: 'Cabin', Arial, Helvetica, sans-serif;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f0f4f0; padding: 20px;">
        <tr>
            <td align="center">
                <table class="content-table" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 32px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
                    
                    <tr>
                        <td align="center" style="padding: 40px 20px 20px 20px;">
                            <img src="https://firebasestorage.googleapis.com/v0/b/shreevarma-media/o/Logos%2FMail%20Tempalte.png?alt=media&token=d597f9e9-acfe-4250-bc7e-ab7274918080" 
                                 alt="Arogya Expo 2026" 
                                 width="200" 
                                 style="display: block; width: 200px; max-width: 80%; height: auto; border: 0;">
                        </td>
                    </tr>

                    <tr>
                        <td align="center" class="mobile-padding" style="padding: 0 50px;">
                            <h1 style="color: #6CA33F; font-size: 30px; text-transform: uppercase; margin: 0; letter-spacing: -0.5px; font-weight: 700; line-height: 1.2;">Registration Confirmed!</h1>
                            <p style="font-size: 18px; font-style: italic; color: #555; margin: 20px 0 0 0;">Hello ${data.name},</p>
                            <p style="font-size: 16px; line-height: 1.6; color: #444; margin-top: 15px;">Thank you for registering for the <strong>Arogya Expo 2026</strong>. We are thrilled to have you join us for this celebration of health, nature, and tradition.</p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" class="mobile-padding" style="padding: 30px 50px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f7f9f5; border-radius: 24px; text-align: left;">
                                <tr>
                                    <td style="padding: 30px;">
                                        <h3 style="color: #6CA33F; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; border-bottom: 2px solid #e2ead9; padding-bottom: 10px; margin: 0 0 20px 0; font-weight: 700;">Event Details</h3>
                                        
                                        <p style="margin: 12px 0; font-size: 16px; color: #333;">
                                            <strong style="color: #6CA33F;">Date:</strong> January 09-12, 2026
                                        </p>
                                        <p style="margin: 12px 0; font-size: 16px; color: #333;">
                                            <strong style="color: #6CA33F;">Location:</strong> Heartfulness (Babuji Memorial Ashram), Manapakkam, Chennai
                                        </p>
                                        
                                        <div style="margin-top: 25px;">
                                            <a href="https://maps.app.goo.gl/ekNUDN2mFC8utAGf8" 
                                               target="_blank" 
                                               style="display: inline-block; padding: 14px 28px; background-color: #6CA33F; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 15px;">
                                               Get Directions
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" class="mobile-padding" style="padding: 0 50px 40px 50px;">
                            <p style="font-size: 14px; color: #888; margin: 0; line-height: 1.5;">Please show this email at the registration desk to receive your visitor pass.</p>
                            <div style="border-top: 1px solid #eee; margin: 30px 0;"></div>
                            <p style="font-size: 12px; color: #bbb; margin: 0;">© ${new Date().getFullYear()} National Ayush Conclave. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
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
