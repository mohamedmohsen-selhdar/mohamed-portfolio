"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

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
        quote: "Mohamed's strategic intervention completely transformed our operational efficiency. His ability to drill down to the core issues and implement sustainable processes is unmatched. He didn't just give us a report; he gave us a roadmap that we execute daily.",
        author: "Mr. Abdo Shoulah",
        role: "CEO",
        company: "RICHIE Furniture"
    },
    {
        id: 2,
        quote: "Working with Mohamed was a turning point for GP Plast. His insights into our supply chain and workflow optimization directly impacted our bottom line. He brings a rare combination of industrial expertise and practical execution.",
        author: "Peter Magdy",
        role: "CEO",
        company: "GP Plast"
    },
    {
        id: 3,
        quote: "The clarity and direction we gained from his consulting sessions were invaluable. He has a unique talent for taking complex business challenges and breaking them down into actionable, measurable steps that actually drive growth.",
        author: "Ayman Hosny",
        role: "CEO",
        company: "in&In"
    }
];

export default function TestimonialsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container" ref={containerRef}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--foreground)' }}
                    >
                        Client <span className="text-gradient">Impact</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-muted"
                        style={{ fontSize: '1.25rem', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0 auto' }}
                    >
                        Don't just take my word for it. Here's what industry leaders have to say about our collaborations.
                    </motion.p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: 0.2 + (index * 0.15) }}
                            style={{
                                background: 'var(--card-bg)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '24px',
                                padding: '3rem 2.5rem',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2rem',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                                cursor: 'default'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1), 0 0 20px var(--aura-color)';
                                e.currentTarget.style.borderColor = 'var(--aura-intense)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderColor = 'var(--card-border)';
                            }}
                        >
                            {/* Decorative Quote Mark */}
                            <div style={{ position: 'absolute', top: '1.5rem', right: '2rem', fontSize: '6rem', color: 'var(--card-border)', fontFamily: 'var(--font-playfair)', lineHeight: 1, zIndex: 0, pointerEvents: 'none' }}>
                                "
                            </div>

                            <div style={{ display: 'flex', gap: '4px', zIndex: 10 }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="var(--aura-intense)" color="var(--aura-intense)" />
                                ))}
                            </div>

                            <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--foreground)', zIndex: 10, flexGrow: 1, fontStyle: 'italic' }}>
                                "{testimonial.quote}"
                            </p>

                            <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1.5rem', zIndex: 10, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--aura-intense), var(--aura-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '1.25rem', fontFamily: 'var(--font-playfair)' }}>
                                    {testimonial.author.charAt(testimonial.author.startsWith('Mr. ') ? 4 : 0)}
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--foreground)', letterSpacing: '-0.01em' }}>{testimonial.author}</h4>
                                    <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                                        {testimonial.role} <span style={{ color: 'var(--aura-intense)' }}>@</span> {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
