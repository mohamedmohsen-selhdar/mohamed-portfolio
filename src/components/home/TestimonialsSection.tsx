"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    const [activeIndex, setActiveIndex] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);

        // Auto-advance
        // const interval = setInterval(() => {
        //     setActiveIndex((prev) => (prev + 1) % testimonials.length);
        // }, 6000);
        // return () => clearInterval(interval);
    }, []);

    const handleNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
    const handlePrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    const activeQuote = testimonials[activeIndex];

    return (
        <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', alignItems: 'center', backgroundColor: 'var(--background)' }}>
            <div className="container">

                <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>

                    {/* Minimal Section Label */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                    >
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Testimonials</span>
                        <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--card-border)' }} />
                    </motion.div>

                    {/* Massive Typography Quote Container */}
                    <div style={{ position: 'relative', minHeight: isMobile ? '350px' : '250px' }}>

                        {/* Huge decorative quote mark fixed in background */}
                        <span style={{ position: 'absolute', top: '-4rem', left: '-2rem', fontSize: '10rem', color: 'var(--card-bg)', lineHeight: 1, zIndex: 0, pointerEvents: 'none', fontFamily: 'serif' }}>"</span>

                        <AnimatePresence mode="wait">
                            {mounted && (
                                <motion.div
                                    key={activeQuote.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ position: 'relative', zIndex: 10 }}
                                >
                                    <h3 style={{
                                        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                                        fontWeight: 500,
                                        lineHeight: 1.4,
                                        letterSpacing: '-0.01em',
                                        color: 'var(--foreground)'
                                    }}>
                                        {activeQuote.quote}
                                    </h3>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Credit Block & Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--card-border)', paddingTop: '2rem' }}>

                        {/* Author Info */}
                        <div style={{ position: 'relative', overflow: 'hidden', height: '60px', flex: 1 }}>
                            <AnimatePresence mode="wait">
                                {mounted && (
                                    <motion.div
                                        key={activeQuote.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.4 }}
                                        style={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
                                    >
                                        <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                                            {activeQuote.author}
                                        </p>
                                        <p className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                            {activeQuote.role} • {activeQuote.company}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Navigation Controls */}
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={handlePrev}
                                style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', transition: 'all 0.3s ease', cursor: 'pointer' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--foreground)';
                                    e.currentTarget.style.color = 'var(--background)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'var(--foreground)';
                                }}
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={handleNext}
                                style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', transition: 'all 0.3s ease', cursor: 'pointer' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--foreground)';
                                    e.currentTarget.style.color = 'var(--background)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'var(--foreground)';
                                }}
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
