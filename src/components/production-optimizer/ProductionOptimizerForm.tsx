'use client';

import { useState } from 'react';
import { useActions, useUIState } from 'ai/rsc';
import type { AI } from '@/app/(app)/actions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Wand2 } from 'lucide-react';
import type { SuggestProductionScheduleInput, SuggestProductionScheduleOutput } from '@/ai/flows/production-optimization';

export default function ProductionOptimizerForm() {
  const [formData, setFormData] = useState<SuggestProductionScheduleInput>({
    demandForecast: '',
    currentInventoryLevels: '',
    historicalSalesData: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SuggestProductionScheduleOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { suggestSchedule } = useActions<typeof AI>();
  const [, setMessages] = useUIState<typeof AI>();


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await suggestSchedule(formData);
      // Assuming `suggestSchedule` is an AI action that returns the UI
      // For now, let's assume it directly returns the data or we adapt it.
      // If it returns JSX, we'd set it using setMessages or similar.
      // For this example, let's say it returns the data directly or we call the flow.
      
      // This is a conceptual adaptation. The actual Genkit AI flow should be callable.
      // For this example, let's simulate getting the result and setting it.
      // In a real Genkit setup with @genkit-ai/next, the action might update UIState.
      // Here, we'll manually set `result` if the action can return data.
      // If `suggestSchedule` returns UI that should be rendered via `messages`, 
      // this part needs to be adapted to how `useActions` and `useUIState` are meant to work.
      // For now, let's assume `response` is the SuggestProductionScheduleOutput.
      // This might require the `suggestSchedule` action to be structured to return data.
      
      // If suggestSchedule from useActions returns the data:
      // setResult(response as SuggestProductionScheduleOutput);

      // If suggestSchedule populates useUIState:
      setMessages( (currentMessages: any) => [
        ...currentMessages,
        response, // Assuming response is the UI element from the AI action
      ]);
      // And we would extract data from the last message if it's structured that way.
      // This part is tricky without knowing exactly how the AI state management is implemented.
      // Let's assume for now the action returns data or we can extract it.
      // Since we are in a client component and calling an AI Action from useActions,
      // the result may be handled by updating the `messages` in `useUIState`.
      // We'll try to display a generic message for now or if `response` has a structure.
      
      // Let's simulate by assuming `response` contains the data or similar structure
      if (typeof response === 'object' && response && 'suggestedProductionSchedule' in response) {
        setResult(response as SuggestProductionScheduleOutput);
      } else {
        // If response is JSX, it's handled by UIState. We may not need to setResult here.
        // Or, we parse the last message added by the action.
        // For this example, if it's not an object with expected fields, we don't set `result`.
      }


    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error("Error in suggestSchedule:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-primary" />
          AI Production Optimizer
        </CardTitle>
        <CardDescription>
          Input your production data to receive an AI-optimized schedule.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="demandForecast">Demand Forecast</Label>
            <Textarea
              id="demandForecast"
              name="demandForecast"
              placeholder="Enter detailed demand forecast for the next production period..."
              value={formData.demandForecast}
              onChange={handleChange}
              rows={4}
              required
              className="resize-y"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentInventoryLevels">Current Inventory Levels</Label>
            <Textarea
              id="currentInventoryLevels"
              name="currentInventoryLevels"
              placeholder="Summarize current inventory levels for all relevant products..."
              value={formData.currentInventoryLevels}
              onChange={handleChange}
              rows={4}
              required
              className="resize-y"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="historicalSalesData">Historical Sales Data</Label>
            <Textarea
              id="historicalSalesData"
              name="historicalSalesData"
              placeholder="Provide historical sales data for the past year (volume, trends)..."
              value={formData.historicalSalesData}
              onChange={handleChange}
              rows={4}
              required
              className="resize-y"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4">
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Optimize Schedule
          </Button>
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
        </CardFooter>
      </form>

      {result && (
        <Card className="mt-6 bg-green-50 border-green-200">
          <CardHeader>
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
      )}
    </Card>
  );
}
