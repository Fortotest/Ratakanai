"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ShoppingBag, Smartphone, Ticket, Truck } from "lucide-react";
import { CardGlass } from './card-glass';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const gmvData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 32 },
  { name: 'Mar', value: 35 },
  { name: 'Apr', value: 38 },
  { name: 'May', value: 42 },
  { name: 'Jun', value: 45 },
];

const marketShareData = [
  { name: 'Tokopedia & TikTok', value: 39, fill: '#00C49F' },
  { name: 'Shopee', value: 37, fill: '#FF8042' },
  { name: 'Lazada', value: 10, fill: '#8884d8' },
  { name: 'Bukalapak', value: 6, fill: '#6C5DD3' },
  { name: 'Blibli', value: 5, fill: '#5B67F3' },
];

const buyerInsights = [
    { icon: ShoppingBag, label: "Puncak Belanja", value: "Jam 19-21 & Hari Gajian" },
    { icon: Ticket, label: "Pendorong Utama", value: "82% karena Promo & Diskon" },
    { icon: Smartphone, label: "Sensitivitas Harga", value: "65% membandingkan harga" },
    { icon: Truck, label: "Pengiriman Cepat", value: "55% batal jika estimasi lama" },
]

export function MarketInsights() {
    return (
        <section id="market-insights" className="space-y-12">
            <div className='text-center'>
                <h2 className="text-3xl md:text-4xl font-bold">Wawasan Pasar E-Commerce 2024</h2>
                <p className="mt-2 text-lg text-foreground/80">Data terbaru untuk membantumu mengambil keputusan.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CardGlass className="lg:col-span-1 p-8">
                    <CardHeader className="p-0">
                        <CardTitle>Proyeksi GMV</CardTitle>
                        <CardDescription>Pasar mulai dewasa, fokus bergeser ke profitabilitas.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                        <p className="text-5xl font-bold mb-4 text-primary">US$56,5 M</p>
                        <div className="w-full h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={gmvData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}B`}/>
                                    <Tooltip contentStyle={{
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '1rem',
                                        border: '1px solid rgba(255, 255, 255, 0.2)'
                                    }}/>
                                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </CardGlass>
                 <CardGlass className="lg:col-span-2 p-8">
                    <CardHeader className="p-0">
                        <CardTitle>Wawasan Penting Pembeli Digital</CardTitle>
                        <CardDescription>Pola perilaku kunci yang mendorong penjualan.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-x-8 gap-y-6 mt-6 p-0">
                        {buyerInsights.map((insight) => (
                            <div key={insight.label} className="flex items-start gap-4">
                                <insight.icon className="w-8 h-8 text-accent mt-1 shrink-0" />
                                <div>
                                    <p className="font-semibold text-lg">{insight.label}</p>
                                    <p className="text-foreground/80">{insight.value}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </CardGlass>
            </div>
             <CardGlass className="p-8">
                <CardHeader className="p-0 text-center">
                    <CardTitle className="text-2xl">Siapa Raja di Pasar? (Estimasi Pangsa Pasar GMV 2024)</CardTitle>
                    <CardDescription>Integrasi Tokopedia & TikTok Shop menciptakan duopoli baru.</CardDescription>
                </CardHeader>
                <CardContent className="p-0 mt-6">
                    <div className="w-full h-80">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={marketShareData} cx="50%" cy="50%" innerRadius={90} outerRadius={130} dataKey="value" nameKey="name" paddingAngle={5}>
                                    {marketShareData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} stroke="none"/>
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '1rem',
                                    border: '1px solid rgba(255, 255, 255, 0.2)'
                                }} />
                                <Legend iconSize={12} wrapperStyle={{fontSize: "14px"}}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </CardGlass>
        </section>
    )
}
