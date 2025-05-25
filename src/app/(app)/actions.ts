'use server';

import { createAI, getMutableAIState, render } from 'ai/rsc';
import { z } from 'zod';
import { suggestProductionSchedule, type SuggestProductionScheduleInput, type SuggestProductionScheduleOutput } from '@/ai/flows/production-optimization';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

async function submitOptimizerForm(formData: SuggestProductionScheduleInput): Promise<SuggestProductionScheduleOutput | { error: string }> {
  'use server';
  try {
    const result = await suggestProductionSchedule(formData);
    return result;
  } catch (error) {
    console.error("Error calling suggestProductionSchedule flow:", error);
    return { error: error instanceof Error ? error.message : "An unexpected error occurred during optimization." };
  }
}

export interface ServerMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClientMessage {
  id: string;
  role: 'user' | 'assistant';
  display: React.ReactNode;
}


export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    suggestSchedule: async (formData: SuggestProductionScheduleInput) : Promise<React.ReactNode | SuggestProductionScheduleOutput> => {
      'use server';
      const aiState = getMutableAIState<typeof AI>();
      
      // Update AI state with user message.
      aiState.update([
        ...aiState.get(),
        {
          role: 'user',
          content: `Optimize production with forecast: ${formData.demandForecast}, inventory: ${formData.currentInventoryLevels}, sales: ${formData.historicalSalesData}`,
        },
      ]);

      const result = await submitOptimizerForm(formData);

      if ('error' in result) {
         const errorResultUI = (
          <Card className="mt-6 bg-red-50 border-red-200">
            <CardHeader className="flex flex-row items-center gap-2">
               <AlertCircle className="h-5 w-5 text-red-600" />
              <CardTitle className="text-red-700">Optimization Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-700">{result.error}</p>
            </CardContent>
          </Card>
        );
        aiState.done([
          ...aiState.get(),
          { role: 'assistant', content: `Error: ${result.error}` }
        ]);
        // Return the UI directly for the client form to handle potentially
        // Or, the client form can rely on the message stream from useUIState
        return errorResultUI; 
      }

      const resultUI = (
        <Card className="mt-6 bg-green-50 border-green-200">
          <CardHeader className="flex flex-row items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <CardTitle className="text-green-700">Optimized Production Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-green-600">Suggested Schedule:</h4>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{result.suggestedProductionSchedule}</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-600">Reasoning:</h4>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{result.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      );
      
      aiState.done([
        ...aiState.get(),
        { role: 'assistant', content: JSON.stringify(result) }
      ]);
      
      // Returning the UI for immediate display, or the data for the form to handle.
      // Given the setup, returning the data might be cleaner for the form's state.
      return result; // Return data so ProductionOptimizerForm can set its local state
    }
  },
  initialAIState: [],
  initialUIState: [],
});
