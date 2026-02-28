"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { caseStudies } from "@/data/content";
import { ChevronLeft, ChevronRight } from "lucide-react";

function useWindowWidth() {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        setWidth(window.innerWidth);
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return width;
}

export default function CaseStudiesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [mounted, setMounted] = useState(false);
    const windowWidth = useWindowWidth();

    useEffect(() => {
        setMounted(true);
    }, []);

    const nextCard = () => {
        setActiveIndex((prev) => (prev + 1) % caseStudies.length);
    };

    const prevCard = () => {
        setActiveIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
    };

    const study = caseStudies[activeIndex];
    const isMobile = mounted && windowWidth > 0 && windowWidth < 768;

    return (
        <section className="section container" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                    Case Studies
                </h2>
                <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                    Swipe through real-world transformations.
                </p>
            </div>

            <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', margin: '0 auto', perspective: '1200px' }}>

                {/* Visual Indicators (Dots) */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    {caseStudies.map((_, i) => (
                        <div
                            key={i}
                            style={{
                                width: activeIndex === i ? '24px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                background: activeIndex === i ? '#fff' : 'rgba(255,255,255,0.2)',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevCard}
                    style={{ position: 'absolute', left: isMobile ? '0' : '-4rem', top: '50%', transform: 'translateY(-50%)', zIndex: 30, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: isMobile ? '40px' : '56px', height: isMobile ? '40px' : '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', backdropFilter: 'blur(10px)' }}
                >
                    <ChevronLeft size={isMobile ? 20 : 28} />
                </button>
                <button
                    onClick={nextCard}
                    style={{ position: 'absolute', right: isMobile ? '0' : '-4rem', top: '50%', transform: 'translateY(-50%)', zIndex: 30, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: isMobile ? '40px' : '56px', height: isMobile ? '40px' : '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', backdropFilter: 'blur(10px)' }}
                >
                    <ChevronRight size={isMobile ? 20 : 28} />
                </button>

                {/* Flip Card Container */}
                <div style={{ position: 'relative', width: '100%', minHeight: isMobile ? '800px' : '500px' }}>
                    <AnimatePresence mode="wait">
                        {mounted && (
                            <motion.div
                                key={activeIndex}
                                initial={{ rotateY: 90, opacity: 0, scale: 0.95 }}
                                animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                                exit={{ rotateY: -90, opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }} /* Custom fluid cubic-bezier for physical feel */
                                style={{
                                    width: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '24px',
                                    padding: isMobile ? '2.5rem 1.5rem' : '4rem 5rem',
                                    backfaceVisibility: 'hidden',
                                    boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2rem' }}>
                                    <span style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.1)', fontWeight: 900, letterSpacing: '-0.05em' }}>0{activeIndex + 1}</span>
                                    <div>
                                        <h3 style={{ fontSize: isMobile ? '1.5rem' : '2.25rem', fontWeight: 800, lineHeight: 1.2 }}>{study.title}</h3>
                                        <p style={{ color: 'var(--aura-intense)', fontWeight: 700, marginTop: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.875rem' }}>{study.company}</p>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '3rem' : '4rem' }}>
                                    <div>
                                        <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem', color: '#ffffff', marginBottom: '1.25rem', fontWeight: 700 }}>Core Problem</h4>
                                        <p className="text-muted" style={{ marginBottom: '1.5rem', fontStyle: 'italic', borderLeft: '2px solid rgba(255,255,255,0.2)', paddingLeft: '1.5rem', lineHeight: 1.7 }}>"{study.context}"</p>
                                        <ul style={{ color: 'var(--text-muted)', listStylePosition: 'outside', marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', lineHeight: 1.6 }}>
                                            {study.coreProblem.map((item, i) => <li key={i}>{item}</li>)}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem', color: '#ffffff', marginBottom: '1.25rem', fontWeight: 700 }}>Measurable Impact</h4>
                                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.5rem' }}>
                                            <p style={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>INTERVENTION</p>
                                            <p style={{ fontSize: '1.125rem', marginTop: '0.5rem', fontWeight: 500 }}>{study.intervention}</p>
                                        </div>
                                        <ul style={{ listStylePosition: 'outside', marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', lineHeight: 1.6 }}>
                                            {study.measurableImpact.map((item, i) => (
                                                <li key={i} style={{ color: '#ffffff' }}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

