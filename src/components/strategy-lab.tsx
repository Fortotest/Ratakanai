"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { optimizeStrategyRecommendations, OptimizeStrategyOutput, OptimizeStrategyInput } from '@/ai/flows/optimize-strategy-recommendations';
import { Loader2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

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
        <section id="strategy-lab" className="space-y-8">
            <Card className="rounded-xl shadow-md">
                <CardHeader>
                    <CardTitle>Data Bisnismu</CardTitle>
                    <CardDescription>Isi data ini agar AI bisa menganalisis strategimu.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="scenarioName">Nama Produk / Bisnis</Label>
                            <Input id="scenarioName" value={formState.scenarioName} onChange={handleInputChange} placeholder="Contoh: Sambal Roa Nona Manis" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="targetAudience">Target Pasar Utama</Label>
                            <Input id="targetAudience" value={formState.targetAudience} onChange={handleInputChange} placeholder="Contoh: Karyawan kantoran, suka pedas" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-xl shadow-md">
                <CardHeader>
                    <CardTitle>Model Bisnis & Strategi Harga</CardTitle>
                    <CardDescription>Pilih model yang paling sesuai, lalu atur harga dan biaya.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <Label className="font-semibold">Model Margin</Label>
                            <RadioGroup value={formState.marginModel} onValueChange={(v) => handleRadioChange('marginModel', v)} className="mt-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Untung Tipis" id="margin-thin" />
                                    <Label htmlFor="margin-thin">Untung Tipis</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Untung Tebal" id="margin-thick" />
                                    <Label htmlFor="margin-thick">Untung Tebal</Label>
                                </div>
                            </RadioGroup>
                        </div>
                         <div>
                            <Label className="font-semibold">Kekuatan Brand</Label>
                            <RadioGroup value={formState.brandStrength} onValueChange={(v) => handleRadioChange('brandStrength', v)} className="mt-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Baru Mulai" id="brand-new" />
                                    <Label htmlFor="brand-new">Baru Mulai</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Sudah Kuat" id="brand-strong" />
                                    <Label htmlFor="brand-strong">Sudah Kuat</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        {selectedBusinessModel && (
                             <Card className="bg-muted">
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
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold">Kalkulator Harga & Biaya per Produk</h3>
                             <div className="space-y-2">
                                <Label htmlFor="sellingPrice">Harga Jual</Label>
                                <Input id="sellingPrice" type="number" value={formState.sellingPrice} onChange={handleInputChange} placeholder="Rp 0" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="buyingPrice">Modal Produk (HPP)</Label>
                                <Input id="buyingPrice" type="number" value={formState.buyingPrice} onChange={handleInputChange} placeholder="Rp 0" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cac">Biaya Iklan (CAC)</Label>
                                <Input id="cac" type="number" value={formState.cac} onChange={handleInputChange} placeholder="Rp 0" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="otherCosts">Biaya Lain (%)</Label>
                                <Input id="otherCosts" type="number" value={formState.otherCosts} onChange={handleInputChange} placeholder="0%" />
                            </div>
                        </div>
                        <div className="space-y-4">
                             <h3 className="font-semibold">Biaya Tetap & Target Penjualan</h3>
                             <div className="space-y-2">
                                <Label htmlFor="fixedCosts">Biaya Tetap / Bulan</Label>
                                <Input id="fixedCosts" type="number" value={formState.fixedCosts} onChange={handleInputChange} placeholder="Rp 0" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="salesTarget">Target Jual / Bulan</Label>
                                <Input id="salesTarget" type="number" value={formState.salesTarget} onChange={handleInputChange} placeholder="0" />
                            </div>
                             <div className="space-y-4 mt-6">
                                <h3 className="font-semibold">Estimasi Profitabilitas</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label>Laba/unit</Label>
                                        <p className="font-bold">Rp {netProfitPerUnit.toLocaleString('id-ID')}</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Keuntungan bersih setelah semua biaya dari satu produk terjual.</p>
                                </div>
                                <div className="space-y-2">
                                     <div className="flex justify-between items-center">
                                        <Label>BEP (unit)</Label>
                                        <p className="font-bold">{breakEvenPoint}</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Jumlah produk yang harus terjual untuk balik modal setiap bulan.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="text-center">
                <Button size="lg" onClick={runSimulation} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
                <Card className="rounded-xl shadow-md">
                    <CardHeader>
                        <CardTitle>Rute Strategi dari Petakan.ai</CardTitle>
                        <CardDescription>AI sudah memetakan arah terbaik berdasarkan data dan strategi bisnismu. Tinggal jalanin.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Evaluasi AI</h3>
                            <p className="text-muted-foreground">{aiResult.evaluation}</p>
                        </div>
                         <div>
                            <h3 className="font-semibold text-lg mb-2">Langkah Nyata</h3>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                {aiResult.recommendations.map((rec, index) => (
                                    <li key={index}>{rec}</li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            )}

        </section>
    );
}
