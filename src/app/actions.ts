'use server';

import { z } from 'zod';
import { addVisitor } from '@/services/visitors';
import { revalidatePath } from 'next/cache';

const VisitorSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    number: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Please enter a valid mobile number." }),
    mailId: z.string().email({ message: "Please enter a valid email address." }),
    location: z.string().min(2, { message: "Location is required." }),
});

export type FormState = {
    message: string;
    status: 'success' | 'error' | 'idle';
};

export async function registerVisitorAction(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    
    const validatedFields = VisitorSchema.safeParse({
        name: formData.get('name'),
        number: formData.get('mobile'),
        mailId: formData.get('mailId'),
        location: formData.get('location'),
    });

    if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        return {
            status: 'error',
            message: fieldErrors.name?.[0] || fieldErrors.number?.[0] || fieldErrors.mailId?.[0] || fieldErrors.location?.[0] || 'Validation failed.',
        };
    }

    try {
        await addVisitor(validatedFields.data);
        revalidatePath('/');
        revalidatePath('/register');
        revalidatePath('/admin/dashboard');
        return { 
            status: 'success', 
            message: 'Registration successful! See you at the Expo.' 
        };
    } catch (error: any) {
        console.error(error);
        return { 
            status: 'error', 
            message: error.message || 'Something went wrong. Please try again.' 
        };
    }
}
