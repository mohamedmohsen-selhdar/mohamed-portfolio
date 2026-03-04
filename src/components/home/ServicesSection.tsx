"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

type ServiceData = {
    id: string;
    title: string;
    what_i_do: string;
    deliverables: string[];
    expected_impact: string[];
    projects_delivered: string;
    project_names: string[];
};

export default function ServicesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [services, setServices] = useState<ServiceData[]>([]);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const fetchServices = async () => {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('created_at', { ascending: true });
            if (data) setServices(data);
            setLoading(false);
        };
        fetchServices();

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const activeService = services[activeIndex];

    if (loading && services.length === 0) return null;

    return (
        <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'var(--background)', color: 'var(--foreground)', paddingTop: '100px', paddingBottom: '100px' }}>
            <div className="container">

                {/* Header Sequence */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>
                        How I can help you
                    </h2>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                        (SERVICES)
                    </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr', gap: isMobile ? '4rem' : '8rem', alignItems: 'center' }}>

                    {/* Left Side: Service List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {mounted && services.map((service, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <button
                                    key={service.id}
                                    onClick={() => setActiveIndex(index)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1.5rem',
                                        padding: '2rem 1rem',
                                        borderBottom: index !== services.length - 1 ? '1px solid var(--card-border)' : 'none',
                                        borderLeft: isActive ? '4px solid var(--foreground)' : '4px solid transparent',
                                        background: 'transparent',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        opacity: isActive ? 1 : 0.4
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) e.currentTarget.style.opacity = '0.7';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) e.currentTarget.style.opacity = '0.4';
                                    }}
                                >
                                    <span style={{ fontSize: '0.875rem', fontWeight: 600, fontFamily: 'monospace' }}>
                                        (0{index + 1})
                                    </span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: isActive ? 800 : 500, letterSpacing: '-0.02em' }}>
                                        {service.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Side: Active Service Details Card */}
                    <div style={{ position: 'relative', minHeight: isMobile ? '500px' : '600px', height: isMobile ? 'auto' : '600px', width: '100%' }}>
                        <AnimatePresence mode="wait">
                            {mounted && (
                                <motion.div
                                    key={activeService.id}
                                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    style={{
                                        position: isMobile ? 'relative' : 'absolute',
                                        inset: isMobile ? undefined : 0,
                                        width: '100%',
                                        background: 'var(--card-bg)',
                                        border: '1px solid var(--card-border)',
                                        borderRadius: '32px',
                                        padding: isMobile ? '2.5rem' : '4rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {/* Abstract background gradient placeholder for the image aesthetic */}
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--aura-intense) 0%, transparent 60%)', opacity: 0.1, zIndex: 0 }} />

                                    <div style={{ position: 'relative', zIndex: 10 }}>
                                        <h3 style={{ fontSize: isMobile ? '2rem' : '3rem', fontWeight: 800, marginBottom: '2rem', letterSpacing: '-0.02em', color: 'var(--foreground)' }}>
                                            {activeService.title}
                                        </h3>

                                        <p className="text-xl leading-relaxed mb-8 opacity-90" dangerouslySetInnerHTML={{ __html: activeService.what_i_do }} />

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                                            {activeService.expected_impact.map((benefit: string, idx: number) => (
                                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--aura-color)' }} />
                                                    <span style={{ fontSize: '1.125rem', color: 'var(--foreground)' }}>{benefit}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--card-border)' }}>
                                            <p style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Track Record</p>
                                            <p className="text-sm uppercase tracking-wider opacity-60 mb-4">{activeService.projects_delivered}</p>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                                {activeService.project_names.map((project: string, idx: number) => (
                                                    <span key={idx} style={{ fontSize: '1rem', color: 'var(--foreground)', fontWeight: 600, paddingBottom: '0.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
                                                        {project}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
