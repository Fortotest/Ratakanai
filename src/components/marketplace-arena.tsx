"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, Zap, Gem, Search } from "lucide-react";

const platforms = [
    {
        icon: Briefcase,
        name: "TikTok & Tokopedia",
        title: "Kombinasi Konten + Checkout Seketika",
        subtitle: "Kanal untuk Shoppertainment & Pembelian Impulsif",
        strategy: [
            "Kuasai konten pendek yang nempel di FYP",
            "Manfaatkan Live Selling + kolaborasi influencer",
            "Integrasi checkout langsung dari konten",
        ],
        fitFor: "Produk lifestyle, murah-meriah, atau tren cepat. Target anak muda (18–34), impulsif, FOMO-driven.",
        color: "text-green-500",
    },
    {
        icon: Zap,
        name: "Shopee",
        title: "Platform Perang Harga & Volume Besar",
        subtitle: "Raksasa Pasar Massal & Promo Agresif",
        strategy: [
            "Manfaatkan flash sale & campaign harian",
            "Main di harga kompetitif + voucher",
            "Gunakan iklan Shopee Ads buat dorong visibility",
        ],
        fitFor: "Produk mass market, margin tipis, brand baru yang butuh traffic.",
        color: "text-orange-500",
    },
    {
        icon: Gem,
        name: "Lazada & Blibli",
        title: "Panggung Brand Premium & Customer Trust",
        subtitle: "Benteng untuk Brand & Audiens Berkualitas",
        strategy: [
            "Fokus ke pengalaman belanja: packaging, garansi, testimoni",
            "Bangun citra premium lewat visual dan deskripsi produk",
            "Mainkan brand trust lewat rating, LazMall, atau curated collection",
        ],
        fitFor: "Produk bernilai tinggi, lifestyle premium, brand lokal yang udah punya equity.",
        color: "text-purple-500",
    },
    {
        icon: Search,
        name: "Meta & Google Ads",
        title: "Targeting Presisi & Scale Demand",
        subtitle: "Kanal untuk Konversi Terukur & Lead Generation",
        strategy: [
            "Gunakan pixel & event tracking buat retargeting",
            "Scale campaign dari awareness → consideration → conversion",
            "Cocok dipakai bareng landing page dan WhatsApp funnel",
        ],
        fitFor: "Bisnis direct-to-consumer (DTC), brand niche, produk solusi spesifik.",
        color: "text-blue-500",
    }
]

export function MarketplaceArena() {
    return (
        <section id="marketplace-arena" className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Arena Pertempuran Marketplace</h2>
            <p className="text-center text-muted-foreground">Pilih medan perang yang tepat untuk produkmu.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {platforms.map((platform) => (
                     <Card key={platform.name} className="rounded-xl shadow-md">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <platform.icon className={`w-10 h-10 ${platform.color}`} />
                                <div>
                                    <CardTitle className="text-xl">{platform.name}</CardTitle>
                                    <p className="font-semibold text-primary">{platform.title}</p>
                                </div>
                            </div>
                            <CardDescription className="pt-2">{platform.subtitle}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-sm mb-2">Strategi Utama:</h4>
                                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                                    {platform.strategy.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                             <div>
                                <h4 className="font-semibold text-sm mb-2">Cocok untuk:</h4>
                                <p className="text-sm text-muted-foreground">{platform.fitFor}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
