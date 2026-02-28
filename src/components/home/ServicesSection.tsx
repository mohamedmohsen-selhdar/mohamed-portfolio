"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services, ServiceData } from "@/data/content";
import { X, ArrowRight } from "lucide-react";

export default function ServicesSection() {
    const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

    return (
        <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                    Services
                </h2>
                <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '600px' }}>
                    Tap a card to flip and explore the methodology, deliverables, and impact.
                </p>
            </div>

            {/* Horizontal Scroll Track */}
            <div
                style={{
                    display: 'flex',
                    gap: '2rem',
                    overflowX: 'auto',
                    padding: '0 2rem 4rem 2rem',
                    scrollSnapType: 'x mandatory',
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch',
                }}
                className="hide-scrollbar"
            >
                {/* Add a spacer at the start to allow the first item to center if needed, or just let standard padding handle it */}
                <div style={{ minWidth: '10vw', flexShrink: 0 }} />

                {services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        layoutId={`card-container-${service.id}`}
                        onClick={() => setSelectedService(service)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            minWidth: '350px',
                            maxWidth: '400px',
                            height: '450px',
                            flexShrink: 0,
                            scrollSnapAlign: 'center',
                            cursor: 'pointer',
                            borderRadius: '24px',
                            background: 'var(--background)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: '2.5rem',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        className="aura-card"
                    >
                        {/* Number Indicator */}
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, opacity: 0.2, position: 'absolute', top: '2rem', right: '2rem' }}>
                            0{index + 1}
                        </div>

                        <motion.h3 layoutId={`title-${service.id}`} style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1.2 }}>
                            {service.title}
                        </motion.h3>

                        <div>
                            <p className="text-muted" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                {service.whatIDo}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff', fontWeight: 600 }}>
                                Explore <ArrowRight size={16} />
                            </div>
                        </div>
                    </motion.div>
                ))}

                <div style={{ minWidth: '40vw', flexShrink: 0 }} />
            </div>

            {/* Expanded Modal */}
            <AnimatePresence>
                {selectedService && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(20px)'
                        }}
                    >
                        <motion.div
                            layoutId={`card-container-${selectedService.id}`}
                            initial={{ rotateY: 90 }}
                            animate={{ rotateY: 0 }}
                            exit={{ rotateY: 90 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            style={{
                                width: '100%',
                                maxWidth: '800px',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                background: '#0a0a0a',
                                color: '#ffffff',
                                borderRadius: '24px',
                                padding: '4rem',
                                position: 'relative',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            }}
                            className="hide-scrollbar"
                        >
                            <button
                                onClick={() => setSelectedService(null)}
                                style={{ position: 'absolute', top: '2rem', right: '2rem', padding: '0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', color: 'white' }}
                                aria-label="Close"
                            >
                                <X size={24} />
                            </button>

                            <motion.h3 layoutId={`title-${selectedService.id}`} style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', letterSpacing: '-0.02em' }}>
                                {selectedService.title}
                            </motion.h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                <div>
                                    <h4 style={{ fontSize: '1.25rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', fontWeight: 700 }}>What I Do</h4>
                                    <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)' }}>{selectedService.whatIDo}</p>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', fontWeight: 700 }}>Deliverables</h4>
                                        <ul style={{ listStylePosition: 'inside', color: 'rgba(255,255,255,0.8)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {selectedService.deliverables.map((item, i) => <li key={i}>{item}</li>)}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', fontWeight: 700 }}>Expected Impact</h4>
                                        <ul style={{ listStylePosition: 'inside', color: 'rgba(255,255,255,0.8)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {selectedService.expectedImpact.map((item, i) => <li key={i}>{item}</li>)}
                                        </ul>
                                    </div>
                                </div>

                                <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                                    <h4 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 700 }}>Track Record</h4>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{selectedService.projectsDelivered}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{
                __html: `
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </section>
    );
}

