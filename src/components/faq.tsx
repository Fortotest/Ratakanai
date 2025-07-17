"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CardGlass } from "./card-glass";

const faqs = [
    {
        question: "Apa itu Petakan.ai?",
        answer: "Petakan.ai adalah platform simulasi strategi bisnis berbasis AI. Kami membantu UMKM, founder, dan marketer untuk menguji ide, memproyeksikan profit, dan menyusun rencana aksi yang logis sebelum mengambil risiko finansial."
    },
    {
        question: "Bagaimana AI di Petakan.ai bekerja?",
        answer: "AI kami menganalisis data yang Anda masukkan—seperti harga jual, biaya, dan model bisnis—lalu mensimulasikan berbagai skenario finansial. Hasilnya adalah proyeksi dan rekomendasi strategis yang didasarkan pada perhitungan, bukan sekadar tebakan."
    },
    {
        question: "Apakah data bisnis saya aman?",
        answer: "Tentu saja. Keamanan dan kerahasiaan data Anda adalah prioritas kami. Informasi yang Anda berikan hanya digunakan untuk keperluan simulasi dan tidak akan pernah dibagikan atau disimpan tanpa izin Anda."
    }
];

export function Faq() {
    return (
        <section id="faq" className="w-full py-12">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Masih bingung?</h2>
                <div className="max-w-3xl mx-auto">
                    <CardGlass>
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem value={`item-${index + 1}`} key={index} className="border-white/20">
                                    <AccordionTrigger className="text-lg text-left font-semibold">{faq.question}</AccordionTrigger>
                                    <AccordionContent className="text-base text-foreground/80">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardGlass>
                </div>
            </div>
        </section>
    );
}
