"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ShoppingBag, Smartphone, Ticket, Truck } from "lucide-react";

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
  { name: 'Bukalapak', value: 6, fill: '#3B82F6' },
  { name: 'Blibli', value: 5, fill: '#1E40AF' },
];

const buyerInsights = [
    { icon: ShoppingBag, label: "Puncak Belanja", value: "Jam 19-21 & Hari Gajian" },
    { icon: Ticket, label: "Pendorong Utama", value: "82% karena Promo & Diskon" },
    { icon: Smartphone, label: "Sensitivitas Harga", value: "65% membandingkan harga" },
    { icon: Truck, label: "Pengiriman Cepat", value: "55% batal jika estimasi lama" },
]

export function MarketInsights() {
    return (
        <section id="market-insights" className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Wawasan Pasar E-Commerce 2024</h2>
            <p className="text-center text-muted-foreground">Data terbaru untuk membantumu mengambil keputusan.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="rounded-xl shadow-md lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Proyeksi Gross Merchandise Value (GMV)</CardTitle>
                        <CardDescription>Pasar mulai dewasa, fokus bergeser dari 'bakar uang' ke profitabilitas. Pertumbuhan melambat ke 5% (YoY).</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold mb-4">US$56,5 M</p>
                        <div className="w-full h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={gmvData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}B`}/>
                                    <Tooltip />
                                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="rounded-xl shadow-md lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Wawasan Penting Pembeli Digital</CardTitle>
                        <CardDescription>Pola perilaku kunci yang mendorong penjualan.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-6">
                        {buyerInsights.map((insight) => (
                            <div key={insight.label} className="flex items-start gap-4">
                                <insight.icon className="w-8 h-8 text-primary mt-1" />
                                <div>
                                    <p className="font-semibold">{insight.label}</p>
                                    <p className="text-muted-foreground">{insight.value}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
             <Card className="rounded-xl shadow-md">
                <CardHeader>
                    <CardTitle>Siapa Raja di Pasar? (Estimasi Pangsa Pasar GMV 2024)</CardTitle>
                    <CardDescription>Integrasi Tokopedia & TikTok Shop menciptakan duopoli baru yang menantang dominasi Shopee.</CardDescription>
                </CardHeader>
                    <CardContent>
                    <div className="w-full h-64">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={marketShareData} cx="50%" cy="50%" innerRadius={80} outerRadius={110} dataKey="value" nameKey="name" paddingAngle={5}>
                                    {marketShareData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend iconSize={10} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}
