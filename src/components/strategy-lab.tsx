'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { optimizeStrategyRecommendations, OptimizeStrategyOutput } from '@/ai/flows/optimize-strategy-recommendations';
import { Loader2, Lightbulb } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const strategySchema = z.object({
  scenarioName: z.string().min(3, "Scenario name must be at least 3 characters."),
  industry: z.string().min(3, "Industry must be at least 3 characters."),
  targetAudience: z.string().min(3, "Target audience must be at least 3 characters."),
  marketShare: z.coerce.number().min(0).max(100),
  sellingPrice: z.coerce.number().min(0),
  buyingPrice: z.coerce.number().min(0),
  budgetSocialMedia: z.coerce.number().min(0).max(100),
  budgetSearchEngine: z.coerce.number().min(0).max(100),
  budgetEmailMarketing: z.coerce.number().min(0).max(100),
  budgetContentMarketing: z.coerce.number().min(0).max(100),
}).refine(data => data.sellingPrice >= data.buyingPrice, {
  message: "Selling price must be greater than or equal to buying price.",
  path: ["sellingPrice"],
});

type StrategyFormValues = z.infer<typeof strategySchema>;

const budgetChannels = [
    { id: 'budgetSocialMedia', name: 'Social Media', fieldName: 'budgetSocialMedia' },
    { id: 'budgetSearchEngine', name: 'Search Engine', fieldName: 'budgetSearchEngine' },
    { id: 'budgetEmailMarketing', name: 'Email Marketing', fieldName: 'budgetEmailMarketing' },
    { id: 'budgetContentMarketing', name: 'Content Marketing', fieldName: 'budgetContentMarketing' },
] as const;


export function StrategyLab() {
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<OptimizeStrategyOutput | null>(null);
    const [submittedData, setSubmittedData] = useState<StrategyFormValues | null>(null);
    const { toast } = useToast();

    const form = useForm<StrategyFormValues>({
        resolver: zodResolver(strategySchema),
        defaultValues: {
            scenarioName: 'Q4 Growth Push',
            industry: 'E-commerce',
            targetAudience: 'Millennials',
            marketShare: 15,
            sellingPrice: 100,
            buyingPrice: 40,
            budgetSocialMedia: 40,
            budgetSearchEngine: 30,
            budgetEmailMarketing: 15,
            budgetContentMarketing: 15,
        },
    });

    const { watch } = form;
    const watchedValues = watch();
    
    const { profitPerUnit, totalBudget, budgetData, marketShareData } = useMemo(() => {
        const selling = watchedValues.sellingPrice || 0;
        const buying = watchedValues.buyingPrice || 0;
        const profit = selling - buying;
        
        const budgets = [watchedValues.budgetSocialMedia, watchedValues.budgetSearchEngine, watchedValues.budgetEmailMarketing, watchedValues.budgetContentMarketing];
        const total = budgets.reduce((acc, b) => acc + (b || 0), 0);

        const bData = budgetChannels.map((channel, index) => ({
            name: channel.name,
            value: budgets[index] || 0,
            fill: `hsl(var(--chart-${index + 1}))`,
        })).filter(d => d.value > 0);
        
        const share = watchedValues.marketShare || 0;
        const mData = [
            { name: 'Your Market Share', value: share, fill: 'hsl(var(--chart-1))' },
            { name: 'Competitors', value: 100 - share, fill: 'hsl(var(--chart-2))' },
        ];

        return { profitPerUnit: profit, totalBudget: total, budgetData: bData, marketShareData: mData };
    }, [watchedValues]);
    
    const onSubmit = async (data: StrategyFormValues) => {
        setIsLoading(true);
        setResults(null);
        setSubmittedData(data);

        try {
            const aiInput = {
                scenarioName: data.scenarioName,
                industry: data.industry,
                targetAudience: data.targetAudience,
                marketShare: data.marketShare,
                sellingPrice: data.sellingPrice,
                buyingPrice: data.buyingPrice,
                budgetAllocation: {
                    socialMedia: data.budgetSocialMedia,
                    searchEngine: data.budgetSearchEngine,
                    emailMarketing: data.budgetEmailMarketing,
                    contentMarketing: data.budgetContentMarketing,
                }
            };
            const aiResults = await optimizeStrategyRecommendations(aiInput);
            setResults(aiResults);
        } catch (error) {
            console.error("Error fetching AI recommendations:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch AI recommendations. Please try again later.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="strategy-lab" className="py-12 md:py-24">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Strategy Laboratory</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Input your business parameters to get AI-powered recommendations for growth and optimization.
                        </p>
                    </div>
                </div>

                <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:gap-12 lg:max-w-none lg:grid-cols-2 mt-12">
                    <Card className="rounded-xl shadow-md">
                        <CardHeader>
                            <CardTitle>Your Strategy</CardTitle>
                            <CardDescription>Define your current business strategy and goals.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <FormField control={form.control} name="scenarioName" render={({ field }) => ( <FormItem><FormLabel>Scenario Name</FormLabel><FormControl><Input placeholder="e.g. Q4 Growth" {...field} /></FormControl><FormMessage /></FormItem> )} />
                                        <FormField control={form.control} name="industry" render={({ field }) => ( <FormItem><FormLabel>Industry</FormLabel><FormControl><Input placeholder="e.g. SaaS" {...field} /></FormControl><FormMessage /></FormItem> )} />
                                    </div>
                                    <FormField control={form.control} name="targetAudience" render={({ field }) => ( <FormItem><FormLabel>Target Audience</FormLabel><FormControl><Input placeholder="e.g. Small Businesses" {...field} /></FormControl><FormMessage /></FormItem> )} />
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                                        <FormField control={form.control} name="sellingPrice" render={({ field }) => ( <FormItem><FormLabel>Selling Price ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />
                                        <FormField control={form.control} name="buyingPrice" render={({ field }) => ( <FormItem><FormLabel>Buying Price ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />
                                        <Card className="flex flex-col justify-center items-center bg-muted/50 p-3 rounded-xl h-[72px]">
                                            <CardDescription className="text-xs">Profit / Unit</CardDescription>
                                            <CardTitle className="text-2xl font-bold">${profitPerUnit >= 0 ? profitPerUnit.toFixed(2) : '0.00'}</CardTitle>
                                        </Card>
                                    </div>
                                    
                                    <div>
                                        <Label>Budget Allocation (Total: {totalBudget}%)</Label>
                                        {totalBudget > 100 && <p className="text-sm text-destructive">Warning: Total budget exceeds 100%.</p>}
                                        <div className="space-y-4 pt-2">
                                            {budgetChannels.map(channel => (
                                                <FormField key={channel.id} control={form.control} name={channel.fieldName}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <div className="flex justify-between items-center"><FormLabel>{channel.name}</FormLabel><span className='text-sm font-medium'>{field.value}%</span></div>
                                                            <FormControl><Slider onValueChange={(value) => field.onChange(value[0])} value={[field.value]} max={100} step={1} /></FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <FormField control={form.control} name="marketShare" render={({ field }) => (
                                        <FormItem>
                                            <div className="flex justify-between items-center"><FormLabel>Current Market Share</FormLabel><span className='text-sm font-medium'>{field.value}%</span></div>
                                            <FormControl><Slider onValueChange={(value) => field.onChange(value[0])} value={[field.value]} max={100} step={1} /></FormControl>
                                        </FormItem>
                                    )} />
                                    
                                    <Button type="submit" disabled={isLoading || totalBudget > 100} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                        {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : 'Get AI Recommendations'}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>

                    <div className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                             <Card className="rounded-xl shadow-md">
                                <CardHeader><CardTitle>Market Share</CardTitle></CardHeader>
                                <CardContent>
                                    <ChartContainer config={{}} className="mx-auto aspect-square h-[200px]">
                                        <PieChart>
                                            <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" hideLabel />} />
                                            <Pie data={marketShareData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} strokeWidth={2} >
                                                {marketShareData.map((entry) => ( <Cell key={entry.name} fill={entry.fill} /> ))}
                                            </Pie>
                                            <Legend content={<p className='text-center text-2xl font-bold'>{watchedValues.marketShare}%</p>}/>
                                        </PieChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                            <Card className="rounded-xl shadow-md">
                                <CardHeader><CardTitle>Budget Allocation</CardTitle></CardHeader>
                                <CardContent>
                                    <ChartContainer config={{}} className="mx-auto aspect-square h-[200px]">
                                        <PieChart>
                                            <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                                            <Pie data={budgetData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} labelLine={false}
                                                label={(props) => {
                                                    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
                                                    if (percent === 0) return null;
                                                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                                                    return ( percent > 0.05 ? <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className='text-xs font-bold'> {`${(percent * 100).toFixed(0)}%`} </text> : null);
                                                }}>
                                                {budgetData.map((entry) => ( <Cell key={entry.name} fill={entry.fill} /> ))}
                                            </Pie>
                                        </PieChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </div>
                        
                        {(isLoading || results) && (
                            <Card className="rounded-xl shadow-md">
                                <CardHeader>
                                    <CardTitle>Scenario Results & Recommendations</CardTitle>
                                    {submittedData && <CardDescription>For scenario: "{submittedData.scenarioName}"</CardDescription>}
                                </CardHeader>
                                <CardContent>
                                    {isLoading && (
                                        <div className="flex flex-col items-center justify-center gap-4 p-8">
                                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                            <p className="text-muted-foreground">AI is analyzing your strategy...</p>
                                        </div>
                                    )}
                                    {results && (
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="font-semibold flex items-center gap-2 mb-2"><Lightbulb className="text-primary"/> AI Recommendations</h3>
                                                <ul className="list-disc space-y-2 pl-5 text-sm">
                                                    {results.recommendations.map((rec, index) => (
                                                        <li key={index}>{rec}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            {submittedData && (
                                                <div>
                                                    <h3 className="font-semibold mb-2">Submitted Budget</h3>
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead>Channel</TableHead>
                                                                <TableHead className="text-right">Budget %</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            <TableRow><TableCell>Social Media</TableCell><TableCell className="text-right">{submittedData.budgetSocialMedia}%</TableCell></TableRow>
                                                            <TableRow><TableCell>Search Engine</TableCell><TableCell className="text-right">{submittedData.budgetSearchEngine}%</TableCell></TableRow>
                                                            <TableRow><TableCell>Email Marketing</TableCell><TableCell className="text-right">{submittedData.budgetEmailMarketing}%</TableCell></TableRow>
                                                            <TableRow><TableCell>Content Marketing</TableCell><TableCell className="text-right">{submittedData.budgetContentMarketing}%</TableCell></TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
