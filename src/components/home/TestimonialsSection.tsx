"use client";

import { motion } from "framer-motion";

interface Testimonial {
    id: number;
    quote: string;
    author: string;
    role: string;
    company: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "Mohamed's strategic intervention completely transformed our operational efficiency. His ability to drill down to the core issues and implement sustainable processes is unmatched.",
        author: "Mr. Abdo Shoulah",
        role: "CEO",
        company: "RICHIE Furniture"
    },
    {
        id: 2,
        quote: "Working with Mohamed was a turning point for GP Plast. His insights into our supply chain directly impacted our bottom line. He brings a rare combination of industrial expertise and practical execution.",
        author: "Peter Magdy",
        role: "CEO",
        company: "GP Plast"
    },
    {
        id: 3,
        quote: "The clarity and direction we gained from his consulting sessions were invaluable. He has a unique talent for taking complex business challenges and breaking them down into actionable steps.",
        author: "Ayman Hosny",
        role: "CEO",
        company: "in&In"
    }
];

export default function TestimonialsSection() {
    return (
        <section className="py-24 bg-[#0a0a0a] overflow-hidden relative" id="testimonials">
            <div className="container mx-auto px-4 md:px-6 z-10 relative">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-4xl md:text-6xl font-sans tracking-tight text-white font-bold mb-6">
                        Client Success
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Real-world transformations driven by precision methodologies and uncompromised standards.
                    </p>
                </div>
            </div>

            {/* Seamless Infinite Marquee Wrapper */}
            <div className="relative w-full flex overflow-x-hidden group">
                {/* Gradient Fades for Left and Right Edges */}
                <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

                <div className="animate-marquee flex gap-10 px-5 items-center justify-center min-w-full">
                    {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 w-[350px] md:w-[450px] p-8 md:p-10 rounded-2xl bg-[#111111] border border-[#222222] hover:border-zinc-500 transition-colors duration-500 relative cursor-default"
                        >
                            <span className="absolute top-6 left-6 text-6xl text-zinc-800 font-serif leading-none mt-2">"</span>
                            <div className="relative z-10">
                                <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-8 mt-6">
                                    {t.quote}
                                </p>
                                <div className="flex items-center gap-4 border-t border-[#222222] pt-6 mt-auto">
                                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-white uppercase">
                                        {t.author.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">{t.author}</h4>
                                        <p className="text-zinc-500 text-sm">{t.role}, {t.company}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .animate-marquee {
                    animation: marquee 35s linear infinite;
                }
                .group:hover .animate-marquee {
                    animation-play-state: paused;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                `
            }} />
        </section>
    );
}
