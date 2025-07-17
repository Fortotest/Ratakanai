"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const scenarioResultData = [
  { name: 'Meta Ads', value: 50 },
  { name: 'Google Ads', value: 30 },
  { name: 'TikTok Ads', value: 20 },
];

const COLORS = ['#FF8042', '#00C49F', '#8884d8'];

export function StrategyLab() {
  const [profit, setProfit] = useState<number | null>(null);
  const [sellingPrice, setSellingPrice] = useState('');
  const [buyingPrice, setBuyingPrice] = useState('');

  const calculateProfit = () => {
    const sp = parseFloat(sellingPrice);
    const bp = parseFloat(buyingPrice);
    if (!isNaN(sp) && !isNaN(bp)) {
      setProfit(sp - bp);
    }
  };

  const resetProfitCalc = () => {
    setSellingPrice('');
    setBuyingPrice('');
    setProfit(null);
  };
  
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        {/* Profit Calculator Card */}
        <Card className="rounded-xl shadow-md">
          <CardHeader>
            <CardTitle>Kalkulator Profit Bisnis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="selling-price">Harga Jual</Label>
              <Input id="selling-price" type="number" placeholder="0" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buying-price">Harga Beli</Label>
              <Input id="buying-price" type="number" placeholder="0" value={buyingPrice} onChange={(e) => setBuyingPrice(e.target.value)} />
            </div>
            {profit !== null && (
              <p className="text-lg font-bold">Profit: Rp {profit.toLocaleString('id-ID')}</p>
            )}
            <div className="flex gap-4">
              <Button onClick={calculateProfit}>Hitung</Button>
              <Button variant="outline" onClick={resetProfitCalc}>Reset</Button>
            </div>
          </CardContent>
        </Card>

        {/* Strategy Lab Card */}
        <Card className="rounded-xl shadow-md">
          <CardHeader>
            <CardTitle>Laboratorium Strategi</CardTitle>
            <CardDescription>Masukkan parameter untuk menjalankan simulasi.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="scenario-name">Nama Skenario</Label>
              <Input id="scenario-name" placeholder="Contoh: Peluncuran Q4" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industri</Label>
              <Select>
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Pilih Industri" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="fnb">F&B</SelectItem>
                  <SelectItem value="electronics">Elektronik</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="target-audience">Target Audiens</Label>
               <Select>
                <SelectTrigger id="target-audience">
                  <SelectValue placeholder="Pilih Audiens" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="genz">Gen Z</SelectItem>
                  <SelectItem value="millennials">Milenial</SelectItem>
                  <SelectItem value="family">Keluarga</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="budget-slider">Budget Iklan (bulanan)</Label>
                <Slider defaultValue={[50]} max={100} step={1} id="budget-slider" />
            </div>
            <div className="space-y-4">
                <Label>Alokasi Kanal</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="meta-ads">Meta Ads (%)</Label>
                        <Input id="meta-ads" type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="google-ads">Google Ads (%)</Label>
                        <Input id="google-ads" type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tiktok-ads">TikTok Ads (%)</Label>
                        <Input id="tiktok-ads" type="number" placeholder="0" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="product-price">Harga Produk</Label>
                    <Input id="product-price" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="discount">Diskon (%)</Label>
                    <Input id="discount" type="number" placeholder="0" />
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-8">
        {/* Scenario Result Card */}
        <Card className="rounded-xl shadow-md">
            <CardHeader>
                <CardTitle>Hasil Skenario</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="w-full h-64">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={scenarioResultData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                                {scenarioResultData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Kanal</TableHead>
                                <TableHead>ROAS</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Meta Ads</TableCell>
                                <TableCell>4.5x</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Google Ads</TableCell>
                                <TableCell>6.2x</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell>TikTok Ads</TableCell>
                                <TableCell>3.8x</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>

        {/* AI Recommendation Card */}
        <Card className="rounded-xl shadow-md">
          <CardHeader>
            <CardTitle>Rekomendasi AI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Berdasarkan alokasi budget dan target industri Fashion, kami merekomendasikan untuk meningkatkan budget di TikTok Ads sebesar 15% untuk menjangkau audiens Gen Z yang lebih luas. Pertimbangkan juga untuk membuat konten video pendek yang fokus pada tren terkini untuk meningkatkan engagement.
            </p>
            <div className="flex gap-4 mt-6">
                <Button>Simpan Skenario</Button>
                <Button variant="outline">Jalankan Skenario Baru</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
