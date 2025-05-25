// src/ai/flows/production-optimization.ts
'use server';
/**
 * @fileOverview An AI agent that suggests optimal production schedules.
 *
 * - suggestProductionSchedule - A function that suggests optimal production schedules based on demand forecasts, current inventory levels, and historical sales data.
 * - SuggestProductionScheduleInput - The input type for the suggestProductionSchedule function.
 * - SuggestProductionScheduleOutput - The return type for the suggestProductionSchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProductionScheduleInputSchema = z.object({
  demandForecast: z
    .string()
    .describe("A detailed demand forecast for the next production period."),
  currentInventoryLevels: z
    .string()
    .describe("A summary of current inventory levels for all relevant products."),
  historicalSalesData: z
    .string()
    .describe("Historical sales data for the past year, including sales volume and trends."),
});
export type SuggestProductionScheduleInput = z.infer<typeof SuggestProductionScheduleInputSchema>;

const SuggestProductionScheduleOutputSchema = z.object({
  suggestedProductionSchedule: z
    .string()
    .describe("A detailed production schedule that minimizes waste, improves fulfillment ratio, and minimizes holding costs, based on the input data."),
  reasoning: z
    .string()
    .describe("Explanation of the reasoning behind the suggested production schedule."),
});
export type SuggestProductionScheduleOutput = z.infer<typeof SuggestProductionScheduleOutputSchema>;

export async function suggestProductionSchedule(input: SuggestProductionScheduleInput): Promise<SuggestProductionScheduleOutput> {
  return suggestProductionScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProductionSchedulePrompt',
  input: {schema: SuggestProductionScheduleInputSchema},
  output: {schema: SuggestProductionScheduleOutputSchema},
  prompt: `You are an expert production manager. Analyze the following data to create an optimal production schedule.

Demand Forecast: {{{demandForecast}}}
Current Inventory Levels: {{{currentInventoryLevels}}}
Historical Sales Data: {{{historicalSalesData}}}

Based on this data, suggest a production schedule that minimizes waste, improves fulfillment ratio, and minimizes holding costs. Explain the reasoning behind your suggestions.

Production Schedule:`, // The LLM will complete this prompt with the production schedule.
});

const suggestProductionScheduleFlow = ai.defineFlow(
  {
    name: 'suggestProductionScheduleFlow',
    inputSchema: SuggestProductionScheduleInputSchema,
    outputSchema: SuggestProductionScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
