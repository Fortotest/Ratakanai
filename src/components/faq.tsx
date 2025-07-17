"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
    },
    {
        question: "Untuk industri apa saja Petakan.ai bisa digunakan?",
        answer: "Saat ini, fokus utama kami adalah e-commerce dan produk digital. Namun, model kalkulasi kami cukup fleksibel untuk digunakan oleh berbagai jenis bisnis yang ingin memvalidasi profitabilitas dan strategi pemasarannya."
    },
    {
        question: "Apakah hasil simulasinya 100% akurat?",
        answer: "Simulasi kami memberikan proyeksi yang sangat terukur berdasarkan data yang Anda berikan. Anggap ini sebagai peta yang sangat andal, bukan bola kristal. Keakuratan di dunia nyata akan bergantung pada eksekusi dan faktor pasar lainnya, namun ini adalah langkah awal terbaik untuk mengurangi risiko."
    }
];

export function Faq() {
    return (
        <section id="faq" className="w-full py-12 md:py-24 bg-card">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Frequently Asked Questions</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Punya pertanyaan? Kami punya jawaban logis.
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-w-3xl mt-12">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem value={`item-${index + 1}`} key={index}>
                                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
