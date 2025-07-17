"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const gmvData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 32 },
  { name: 'Mar', value: 35 },
  { name: 'Apr', value: 38 },
  { name: 'May', value: 42 },
  { name: 'Jun', value: 45 },
];

const marketShareData = [
  { name: 'Shopee', value: 35 },
  { name: 'Tokopedia & TikTok', value: 30 },
  { name: 'Lazada', value: 15 },
  { name: 'Lainnya', value: 20 },
];

const COLORS = ['#FF8042', '#00C49F', '#8884d8', '#3B82F6'];

export function MarketInsights() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="rounded-xl shadow-md">
                <CardHeader>
                    <CardTitle>Estimasi GMV E-Commerce 2024</CardTitle>
                    <CardDescription>US$54 Miliar</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full h-40">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={gmvData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}B`}/>
                                <Tooltip />
                                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            <Card className="rounded-xl shadow-md">
                <CardHeader>
                    <CardTitle>Pangsa Pasar GMV (Estimasi 2025)</CardTitle>
                </CardHeader>
                 <CardContent>
                    <div className="w-full h-48">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={marketShareData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value" nameKey="name">
                                    {marketShareData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend iconSize={10} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
