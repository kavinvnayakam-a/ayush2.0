'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating informational page content based on a user-provided prompt.
 *
 * The flow takes a prompt as input and returns generated text content suitable for populating a webpage.
 *
 * @interface GeneratePageContentInput - Defines the input schema for the generatePageContent flow, which includes a single 'prompt' field.
 * @interface GeneratePageContentOutput - Defines the output schema for the generatePageContent flow, which includes a single 'content' field containing the generated text.
 *
 * @function generatePageContent - An async function that takes a GeneratePageContentInput and returns a Promise of GeneratePageContentOutput.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePageContentInputSchema = z.object({
  prompt: z.string().describe('A prompt to generate content for the informational page.'),
});
export type GeneratePageContentInput = z.infer<typeof GeneratePageContentInputSchema>;

const GeneratePageContentOutputSchema = z.object({
  content: z.string().describe('The generated content for the informational page.'),
});
export type GeneratePageContentOutput = z.infer<typeof GeneratePageContentOutputSchema>;

export async function generatePageContent(input: GeneratePageContentInput): Promise<GeneratePageContentOutput> {
  return generatePageContentFlow(input);
}

const generatePageContentPrompt = ai.definePrompt({
  name: 'generatePageContentPrompt',
  input: {schema: GeneratePageContentInputSchema},
  output: {schema: GeneratePageContentOutputSchema},
  prompt: `You are an AI assistant designed to help populate informational pages with relevant content.\n  Based on the user's prompt, generate informative and engaging content suitable for a webpage.\n  Prompt: {{{prompt}}}`, 
});

const generatePageContentFlow = ai.defineFlow(
  {
    name: 'generatePageContentFlow',
    inputSchema: GeneratePageContentInputSchema,
    outputSchema: GeneratePageContentOutputSchema,
  },
  async input => {
    const {output} = await generatePageContentPrompt(input);
    return output!;
  }
);
