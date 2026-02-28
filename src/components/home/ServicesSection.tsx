"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/content";

function useWindowWidth() {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        // Set initial width
        setWidth(window.innerWidth);
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return width;
}

export default function ServicesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [mounted, setMounted] = useState(false);
    const windowWidth = useWindowWidth();

    useEffect(() => {
        setMounted(true);
    }, []);

    const activeService = services[activeIndex];

    // Responsive configurations
    const isMobile = mounted && windowWidth > 0 && windowWidth < 1024;

    // For Desktop: A wide arc on the left side
    // For Mobile: A tight vertical stack with a slight curve
    const radius = isMobile ? 80 : 350;
    const angleStep = isMobile ? 35 : 24;
    const baseOffset = isMobile ? 20 : 100; // X-axis nudge to the right

    return (
        <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '80px', paddingBottom: '80px' }}>

            {/* Title (Always Visible) */}
            <div className="container" style={{ marginBottom: isMobile ? '2rem' : '4rem', zIndex: 10, position: 'relative', textAlign: isMobile ? 'center' : 'left' }}>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--foreground)' }}>
                    Services
                </h2>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr', gap: isMobile ? '2rem' : '4rem', alignItems: 'center', minHeight: '80vh' }}>

                {/* Left Side: Radial Menu */}
                <div style={{ position: 'relative', width: '100%', height: isMobile ? '300px' : '600px', display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start' }}>

                    {!isMobile && (
                        <div style={{ position: 'absolute', left: '-20%', top: '50%', transform: 'translateY(-50%)', width: '200px', height: '600px', background: 'radial-gradient(ellipse at left, var(--card-border) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />
                    )}

                    {/* Menu Pivot Container */}
                    <div style={{ position: 'absolute', left: isMobile ? '10%' : '0%', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                        {mounted && services.map((service, index) => {
                            const theta = (index - activeIndex) * angleStep;
                            const thetaRad = (theta * Math.PI) / 180;

                            // Wheel math
                            const x = Math.cos(thetaRad) * radius - radius + baseOffset;
                            const y = Math.sin(thetaRad) * radius;

                            const isActive = index === activeIndex;
                            // Hide items that circle too far out of view
                            const distance = Math.abs(index - activeIndex);
                            const isVisible = isMobile ? distance <= 1 : distance <= 3;

                            return (
                                <motion.button
                                    key={service.id}
                                    onClick={() => setActiveIndex(index)}
                                    animate={{
                                        x,
                                        y,
                                        scale: isActive ? 1.1 : 0.9,
                                        opacity: isVisible ? (isActive ? 1 : 0.4) : 0,
                                        pointerEvents: isVisible ? 'auto' : 'none'
                                    }}
                                    transition={{ type: "spring", stiffness: 260, damping: 25 }}
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        marginTop: '-24px', // Half height
                                        padding: '0.75rem 1.5rem',
                                        background: isActive ? 'var(--foreground)' : 'var(--card-bg)',
                                        color: isActive ? 'var(--background)' : 'var(--foreground)',
                                        border: isActive ? 'none' : '1px solid var(--card-border)',
                                        borderRadius: '9999px',
                                        fontWeight: 700,
                                        fontSize: isMobile ? '0.875rem' : '1.125rem',
                                        cursor: 'pointer',
                                        zIndex: isActive ? 20 : 10 - distance,
                                        whiteSpace: 'nowrap',
                                        boxShadow: isActive ? '0 10px 25px -5px rgba(128, 128, 128, 0.2)' : 'none',
                                        transformOrigin: 'left center'
                                    }}
                                >
                                    {service.title}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Right Side: Animated Content Screen */}
                <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
                    <AnimatePresence mode="wait">
                        {mounted && (
                            <motion.div
                                key={activeService.id}
                                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    background: 'var(--card-bg)',
                                    border: '1px solid var(--card-border)',
                                    borderRadius: '24px',
                                    padding: isMobile ? '2rem' : '4rem',
                                    width: '100%',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Subtle glowing gradient matching active service */}
                                <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(circle, var(--card-border) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />

                                <div style={{ position: 'relative', zIndex: 10 }}>
                                    <h3 style={{ fontSize: isMobile ? '2rem' : '3rem', fontWeight: 800, marginBottom: '2rem', letterSpacing: '-0.02em', color: 'var(--foreground)' }}>
                                        {activeService.title}
                                    </h3>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <h4 style={{ fontSize: '0.875rem', color: 'var(--foreground)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', fontWeight: 700 }}>What I Do</h4>
                                            <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
                                                {activeService.whatIDo}
                                            </p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                                            <div>
                                                <h4 style={{ fontSize: '0.875rem', color: 'var(--foreground)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', fontWeight: 700 }}>Deliverables</h4>
                                                <ul style={{ listStylePosition: 'outside', marginLeft: '1rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    {activeService.deliverables.map((item, i) => <li key={i}>{item}</li>)}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 style={{ fontSize: '0.875rem', color: 'var(--foreground)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', fontWeight: 700 }}>Expected Impact</h4>
                                                <ul style={{ listStylePosition: 'outside', marginLeft: '1rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    {activeService.expectedImpact.map((item, i) => <li key={i}>{item}</li>)}
                                                </ul>
                                            </div>
                                        </div>

                                        <div style={{ marginTop: '1rem', paddingTop: '2rem', borderTop: '1px solid var(--card-border)' }}>
                                            <h4 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 700 }}>Track Record</h4>
                                            <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--foreground)' }}>{activeService.projectsDelivered}</p>
                                        </div>
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

