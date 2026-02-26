"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { caseStudies } from "@/data/content";

export default function CaseStudiesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'));
                        setActiveIndex(index);
                    }
                });
            },
            {
                root: containerRef.current,
                rootMargin: "-40% 0px -40% 0px", // Strict center trigger
                threshold: 0
            }
        );

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="section container" style={{ position: 'relative' }}>
            <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                    Case Studies
                </h2>
                <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                    Scroll to tune into real-world transformations.
                </p>
            </div>

            <div
                ref={containerRef}
                style={{
                    height: '70vh',
                    overflowY: 'auto',
                    scrollSnapType: 'y mandatory',
                    scrollBehavior: 'smooth',
                    position: 'relative',
                    padding: '35vh 0', // padding to allow first and last items to reach the center
                }}
                className="hide-scrollbar mask-edges"
            >
                {/* Visual Tuner Line representing the center "frequency" */}
                <div style={{ position: 'sticky', top: '50%', transform: 'translateY(-50%)', height: '2px', background: 'var(--aura-intense)', width: '100%', zIndex: 0, opacity: 0.3 }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15vh' }}>
                    {caseStudies.map((study, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <motion.div
                                key={study.id}
                                ref={(el: HTMLDivElement | null) => { itemRefs.current[index] = el; }} // Note: explicit return is not required but ensures assigning doesn't return value in arrow fn type definition if strict null checks enabled
                                data-index={index}
                                animate={{
                                    scale: isActive ? 1.05 : 0.9,
                                    opacity: isActive ? 1 : 0.2,
                                    filter: isActive ? 'blur(0px)' : 'blur(4px)'
                                }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    scrollSnapAlign: 'center',
                                    zIndex: isActive ? 10 : 1,
                                    position: 'relative',
                                    padding: '2rem 3rem',
                                    background: isActive ? 'rgba(255,255,255,0.03)' : 'transparent',
                                    border: isActive ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                                    borderRadius: '24px',
                                    transition: 'all 0.4s ease'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <span style={{ fontSize: '1.5rem', color: isActive ? 'var(--foreground)' : 'var(--text-muted)', fontWeight: 800, transition: 'color 0.4s' }}>0{index + 1}</span>
                                    <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800 }}>{study.title}</h3>
                                </div>

                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        transition={{ duration: 0.4 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <p style={{ color: 'var(--aura-color)', fontWeight: 600, marginBottom: '2rem', fontSize: '1.125rem' }}>{study.company}</p>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
                                            <div>
                                                <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem', color: '#f87171', marginBottom: '1rem', fontWeight: 700 }}>Core Problem</h4>
                                                <p className="text-muted" style={{ marginBottom: '1rem', fontStyle: 'italic', borderLeft: '3px solid rgba(255,255,255,0.1)', paddingLeft: '1rem' }}>"{study.context}"</p>
                                                <ul style={{ color: 'var(--text-muted)', listStylePosition: 'inside', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    {study.coreProblem.map((item, i) => <li key={i}>{item}</li>)}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem', color: '#10b981', marginBottom: '1rem', fontWeight: 700 }}>Measurable Impact</h4>
                                                <p style={{ marginBottom: '1rem', fontWeight: 600 }}>Intervention: {study.intervention}</p>
                                                <ul style={{ listStylePosition: 'inside', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    {study.measurableImpact.map((item, i) => (
                                                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                                            <span style={{ color: '#10b981' }}>✓</span> {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .mask-edges {
                    mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
                    -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
                }
            `}} />
        </section>
    );
}

