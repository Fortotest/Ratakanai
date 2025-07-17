// src/ai/flows/optimize-strategy-recommendations.ts
'use server';

/**
 * @fileOverview Provides AI-driven recommendations to optimize a business strategy.
 *
 * - optimizeStrategyRecommendations - A function that generates recommendations based on business inputs.
 * - OptimizeStrategyInput - The input type for the optimizeStrategyRecommendations function.
 * - OptimizeStrategyOutput - The return type for the optimizeStrategyRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeStrategyInputSchema = z.object({
  scenarioName: z.string().describe('The name of the scenario being analyzed.'),
  industry: z.string().describe('The industry the business operates in.'),
  targetAudience: z.string().describe('The target audience for the business.'),
  budgetAllocation: z
    .record(z.string(), z.number())
    .describe(
      'A map of channel names to budget allocations (as numbers, which will be treated as percentages).' + 
      'Example: { \"socialMedia\": 30, \"searchEngine\": 40, \"emailMarketing\": 30 }'
    ),
  marketShare: z.number().describe('Current market share of the business (as a percentage).'),
  sellingPrice: z.number().describe('The selling price of the product or service.'),
  buyingPrice: z.number().describe('The buying price of the product or service.'),
});

export type OptimizeStrategyInput = z.infer<typeof OptimizeStrategyInputSchema>;

const OptimizeStrategyOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of AI-driven recommendations to optimize the business strategy.'),
});

export type OptimizeStrategyOutput = z.infer<typeof OptimizeStrategyOutputSchema>;

export async function optimizeStrategyRecommendations(
  input: OptimizeStrategyInput
): Promise<OptimizeStrategyOutput> {
  return optimizeStrategyRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeStrategyPrompt',
  input: {schema: OptimizeStrategyInputSchema},
  output: {schema: OptimizeStrategyOutputSchema},
  prompt: `Given the following business scenario, provide a list of actionable recommendations to optimize the business strategy for increased market share and profitability.

Scenario Name: {{{scenarioName}}}
Industry: {{{industry}}}
Target Audience: {{{targetAudience}}}
Budget Allocation: {{#each budgetAllocation}}{{{@key}}}: {{{this}}}% {{/each}}
Market Share: {{{marketShare}}}%
Selling Price: {{{sellingPrice}}}
Buying Price: {{{buyingPrice}}}

Consider the current budget allocation, market share, selling price, and buying price to identify potential areas for improvement. Recommendations should be specific and directly related to the provided information.
`,
});

const optimizeStrategyRecommendationsFlow = ai.defineFlow(
  {
    name: 'optimizeStrategyRecommendationsFlow',
    inputSchema: OptimizeStrategyInputSchema,
    outputSchema: OptimizeStrategyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
