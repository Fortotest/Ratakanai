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
      'Example: { "socialMedia": 30, "searchEngine": 40, "emailMarketing": 30 }'
    ),
  marketShare: z.number().describe('Current market share of the business (as a percentage).'),
  sellingPrice: z.number().describe('The selling price of the product or service.'),
  buyingPrice: z.number().describe('The buying price of the product or service.'),
});

export type OptimizeStrategyInput = z.infer<typeof OptimizeStrategyInputSchema>;

const OptimizeStrategyOutputSchema = z.object({
  evaluation: z.string().describe("AI's overall evaluation of the business strategy's viability and key risks."),
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
  prompt: `You are an expert Business Strategy Analyst for the Indonesian e-commerce market. Your goal is to provide a sharp, actionable analysis for founders and marketers.

Analyze the following business scenario. Provide:
1.  A concise, honest evaluation of the strategy. If the projection shows a loss or is high-risk, state it clearly and explain why.
2.  A list of prioritized, actionable recommendations to improve profitability and market position.

SCENARIO:
- Scenario Name: {{{scenarioName}}}
- Industry: {{{industry}}}
- Target Audience: {{{targetAudience}}}
- Budget Allocation: {{#each budgetAllocation}}{{{@key}}}: {{{this}}}% {{/each}}
- Current Market Share: {{{marketShare}}}%
- Selling Price: {{{sellingPrice}}}
- Buying Price (HPP): {{{buyingPrice}}}

Context: The Indonesian e-commerce market is dominated by Shopee and Tokopedia/TikTok, driven by 'shoppertainment' and aggressive promotions. Consumers are price-sensitive.

Based on this, generate your evaluation and recommendations. Be direct and insightful.
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
