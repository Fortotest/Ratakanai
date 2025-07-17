"use client";

import { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { optimizeStrategyRecommendations, OptimizeStrategyOutput, OptimizeStrategyInput } from '@/ai/flows/optimize-strategy-recommendations';
import { Loader2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CardGlass } from './card-glass';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

type BusinessModel = {
    title: string;
    description: string;
    recommendation: string;
};

const businessModels: { [key: string]: { [key: string]: BusinessModel } } = {
    'Untung Tipis': {
        'Baru Mulai': { title: 'The Hustler', description: 'Fokus pada volume penjualan tinggi dan perputaran cepat. Strategi harga kompetitif adalah kunci.', recommendation: 'Rekomendasi: TikTok Shop, Shopee.' },
        'Sudah Kuat': { title: 'Market Leader', description: 'Dominasi pasar dengan skala besar dan efisiensi operasional. Pertahankan pangsa pasar.', recommendation: 'Rekomendasi: Shopee, Tokopedia.' },
    },
    'Untung Tebal': {
        'Baru Mulai': { title: 'Spesialis Niche', description: 'Targetkan segmen spesifik dengan produk unik. Branding dan cerita produk jadi ujung tombak.', recommendation: 'Rekomendasi: Instagram, Website (Shopify).' },
        'Sudah Kuat': { title: 'Merek Premium', description: 'Jual nilai dan status, bukan cuma produk. Pengalaman pelanggan harus premium.', recommendation: 'Rekomendasi: Website, Lazada LazMall.' },
    }
};

export function StrategyLab() {
    const [isLoading, setIsLoading] = useState(false);
    const [aiResult, setAiResult] = useState<OptimizeStrategyOutput | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [formState, setFormState] = useState({
        scenarioName: 'Sambal Roa Nona Manis',
        targetAudience: 'Karyawan kantoran, suka pedas',
        marginModel: 'Untung Tebal',
        brandStrength: 'Baru Mulai',
        sellingPrice: 90000,
        buyingPrice: 8998,
        cac: 19998,
        otherCosts: 4,
        fixedCosts: 10000000,
        salesTarget: 998,
        marketingBudget: 20000000,
        budgetAllocation: {
            "Video Content & Ads": 25,
            "KOL & Afiliasi": 25,
            "Promosi & Diskon": 25,
            "Kanal Lainnya": 25,
        }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [id]: ['otherCosts', 'fixedCosts', 'salesTarget', 'marketingBudget', 'sellingPrice', 'buyingPrice', 'cac'].includes(id) ? parseFloat(value) || 0 : value,
        }));
    };
    
    const handleRadioChange = (name: string, value: string) => {
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    
    const selectedBusinessModel = useMemo(() => {
        return businessModels[formState.marginModel]?.[formState.brandStrength];
    }, [formState.marginModel, formState.brandStrength]);
    
    const netProfitPerUnit = useMemo(() => {
        const otherCostAmount = formState.sellingPrice * (formState.otherCosts / 100);
        return formState.sellingPrice - formState.buyingPrice - formState.cac - otherCostAmount;
    }, [formState.sellingPrice, formState.buyingPrice, formState.cac, formState.otherCosts]);

    const breakEvenPoint = useMemo(() => {
        if (netProfitPerUnit <= 0) return 'N/A';
        const bep = formState.fixedCosts / netProfitPerUnit;
        return Math.ceil(bep);
    }, [formState.fixedCosts, netProfitPerUnit]);
    
    
    const runSimulation = async () => {
        setIsLoading(true);
        setError(null);
        setAiResult(null);

        const marketShare = 3; // Placeholder for market share

        const input: OptimizeStrategyInput = {
            scenarioName: formState.scenarioName,
            industry: 'F&B', // Placeholder
            targetAudience: formState.targetAudience,
            budgetAllocation: formState.budgetAllocation,
            marketShare: marketShare,
            sellingPrice: formState.sellingPrice,
            buyingPrice: formState.buyingPrice
        };

        try {
            const result = await optimizeStrategyRecommendations(input);
            setAiResult(result);
        } catch (e: any) {
            console.error(e);
            setError("Gagal menjalankan simulasi. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="strategy-lab" className="space-y-12">
            <CardGlass className="p-8">
                <CardHeader className="p-0">
                    <CardTitle className="text-2xl">Data Bisnismu</CardTitle>
                    <CardDescription>Isi data ini agar AI bisa menganalisis strategimu.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 mt-6 p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <Label htmlFor="scenarioName">Nama Produk / Bisnis</Label>
                            <Input id="scenarioName" value={formState.scenarioName} onChange={handleInputChange} placeholder="Contoh: Sambal Roa Nona Manis" className="bg-white/80 dark:bg-black/50" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="targetAudience">Target Pasar Utama</Label>
                            <Input id="targetAudience" value={formState.targetAudience} onChange={handleInputChange} placeholder="Contoh: Karyawan kantoran, suka pedas" className="bg-white/80 dark:bg-black/50" />
                        </div>
                    </div>
                </CardContent>
            </CardGlass>

            <CardGlass className="p-8">
                <CardHeader className="p-0">
                    <CardTitle className="text-2xl">Model Bisnis & Strategi Harga</CardTitle>
                    <CardDescription>Pilih model yang paling sesuai, lalu atur harga dan biaya.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6 p-0">
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <Label className="font-semibold text-lg">Model Margin</Label>
                            <RadioGroup value={formState.marginModel} onValueChange={(v) => handleRadioChange('marginModel', v)} className="mt-4 space-y-2">
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="Untung Tipis" id="margin-thin" />
                                    <Label htmlFor="margin-thin" className="text-base">Untung Tipis</Label>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="Untung Tebal" id="margin-thick" />
                                    <Label htmlFor="margin-thick" className="text-base">Untung Tebal</Label>
                                </div>
                            </RadioGroup>
                        </div>
                         <div>
                            <Label className="font-semibold text-lg">Kekuatan Brand</Label>
                            <RadioGroup value={formState.brandStrength} onValueChange={(v) => handleRadioChange('brandStrength', v)} className="mt-4 space-y-2">
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="Baru Mulai" id="brand-new" />
                                    <Label htmlFor="brand-new" className="text-base">Baru Mulai</Label>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="Sudah Kuat" id="brand-strong" />
                                    <Label htmlFor="brand-strong" className="text-base">Sudah Kuat</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        {selectedBusinessModel && (
                             <Card className="bg-primary/10 border-primary/20 rounded-2xl">
                                <CardHeader>
                                    <CardTitle>{selectedBusinessModel.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm">{selectedBusinessModel.description}</p>
                                    <p className="text-sm font-semibold mt-2">{selectedBusinessModel.recommendation}</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="font-semibold text-lg">Kalkulator Harga & Biaya per Produk</h3>
                             <div className="space-y-2">
                                <Label htmlFor="sellingPrice">Harga Jual</Label>
                                <Input id="sellingPrice" type="number" value={formState.sellingPrice} onChange={handleInputChange} placeholder="Rp 0" className="bg-white/80 dark:bg-black/50"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="buyingPrice">Modal Produk (HPP)</Label>
                                <Input id="buyingPrice" type="number" value={formState.buyingPrice} onChange={handleInputChange} placeholder="Rp 0" className="bg-white/80 dark:bg-black/50"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cac">Biaya Iklan (CAC)</Label>
                                <Input id="cac" type="number" value={formState.cac} onChange={handleInputChange} placeholder="Rp 0" className="bg-white/80 dark:bg-black/50"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="otherCosts">Biaya Lain (%)</Label>
                                <Input id="otherCosts" type="number" value={formState.otherCosts} onChange={handleInputChange} placeholder="0%" className="bg-white/80 dark:bg-black/50"/>
                            </div>
                        </div>
                        <div className="space-y-6">
                             <h3 className="font-semibold text-lg">Biaya Tetap & Target Penjualan</h3>
                             <div className="space-y-2">
                                <Label htmlFor="fixedCosts">Biaya Tetap / Bulan</Label>
                                <Input id="fixedCosts" type="number" value={formState.fixedCosts} onChange={handleInputChange} placeholder="Rp 0" className="bg-white/80 dark:bg-black/50"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="salesTarget">Target Jual / Bulan</Label>
                                <Input id="salesTarget" type="number" value={formState.salesTarget} onChange={handleInputChange} placeholder="0" className="bg-white/80 dark:bg-black/50"/>
                            </div>
                             <div className="space-y-6 mt-6 rounded-2xl bg-black/5 p-4">
                                <h3 className="font-semibold text-lg">Estimasi Profitabilitas</h3>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center">
                                            <Label>Laba/unit</Label>
                                            <p className="font-bold text-lg">Rp {netProfitPerUnit.toLocaleString('id-ID')}</p>
                                        </div>
                                        <p className="text-xs text-foreground/80">Keuntungan bersih setelah semua biaya dari satu produk terjual.</p>
                                    </div>
                                    <div className="space-y-1">
                                         <div className="flex justify-between items-center">
                                            <Label>BEP (unit)</Label>
                                            <p className="font-bold text-lg">{breakEvenPoint}</p>
                                        </div>
                                        <p className="text-xs text-foreground/80">Jumlah produk yang harus terjual untuk balik modal setiap bulan.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </CardGlass>

            <div className="text-center py-8">
                <Button size="lg" onClick={runSimulation} disabled={isLoading} className="rounded-full px-12 py-7 text-xl shadow-lg shadow-primary/30">
                    {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    {isLoading ? 'Menjalankan Simulasi...' : '⚡ Jalankan Simulasi AI'}
                </Button>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {aiResult && (
                <CardGlass className="p-8">
                    <CardHeader className="p-0 text-center">
                        <CardTitle className="text-2xl">Rute Strategi dari Petakan.ai</CardTitle>
                        <CardDescription>AI sudah memetakan arah terbaik berdasarkan data dan strategi bisnismu. Tinggal jalanin.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8 mt-6 p-0">
                        <div>
                            <h3 className="font-semibold text-xl mb-3 text-center">Evaluasi AI</h3>
                            <p className="text-foreground/80 text-center max-w-3xl mx-auto">{aiResult.evaluation}</p>
                        </div>
                         <div>
                            <h3 className="font-semibold text-xl mb-4 text-center">Langkah Nyata</h3>
                            <ul className="list-disc pl-5 space-y-3 text-foreground/80 max-w-3xl mx-auto">
                                {aiResult.recommendations.map((rec, index) => (
                                    <li key={index} className="text-lg">{rec}</li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </CardGlass>
            )}

        </section>
    );
}
