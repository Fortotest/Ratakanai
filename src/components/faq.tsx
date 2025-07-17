"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
    {
        question: "What is Petakan.ai Simulator?",
        answer: "Petakan.ai Simulator is an AI-powered tool designed to help businesses analyze strategic scenarios, optimize budget allocation, and receive data-driven recommendations to improve market share and profitability."
    },
    {
        question: "How does the AI generate recommendations?",
        answer: "Our AI model analyzes the inputs you provide—such as your industry, target audience, budget, and pricing. It compares this information against vast datasets of market trends and business strategies to provide specific, actionable recommendations."
    },
    {
        question: "Is my data secure?",
        answer: "Yes, we prioritize your data's security and privacy. The information you provide is used solely for the purpose of generating your strategy recommendations and is not stored or shared."
    },
    {
        question: "Can I use this for any industry?",
        answer: "Absolutely. Our simulator is designed to be industry-agnostic. Whether you're in e-commerce, SaaS, retail, or any other sector, you can gain valuable insights."
    },
    {
        question: "What do the different budget channels represent?",
        answer: "The budget channels (Social Media, Search Engine, etc.) represent common digital marketing areas. Allocating your budget across these helps the AI understand your current marketing mix and suggest optimizations."
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
                            Have questions? We've got answers.
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
