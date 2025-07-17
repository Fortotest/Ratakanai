"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
        <section id="faq" className="w-full">
            <Card className="rounded-xl shadow-md">
                <CardHeader>
                    <CardTitle className="text-center text-3xl font-bold">Masih bingung?</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem value={`item-${index + 1}`} key={index}>
                                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-base text-gray-600">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </section>
    );
}
