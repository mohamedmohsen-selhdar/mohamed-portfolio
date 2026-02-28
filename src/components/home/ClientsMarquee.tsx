"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const clients = [
    "RICHIE", "Egypt Gold", "Contistahl", "EIPAL",
    "Harmony", "MITCO", "TRONIX", "GIZ"
];

function AnimatedCounter({ value, label, prefix = "" }: { value: number; label: string; prefix?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const motionValue = useSpring(0, { stiffness: 50, damping: 20 });

    useEffect(() => {
        if (inView) {
            motionValue.set(value);
        }
    }, [inView, value, motionValue]);

    const displayValue = useTransform(motionValue, (latest) => Math.round(latest));

    return (
        <div ref={ref}>
            <h3 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {prefix}
                <motion.span>{displayValue}</motion.span>
            </h3>
            <p className="text-muted" style={{ fontSize: '1.25rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
        </div>
    );
}

export default function ClientsMarquee() {
    return (
        <section className="section" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(255, 255, 255, 0.02)' }}>
            <div className="container">

                {/* Success Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center', marginBottom: '4rem' }}>
                    <AnimatedCounter value={70} label="Clients" prefix="+" />
                    <AnimatedCounter value={197} label="Implemented Projects" />
                    <AnimatedCounter value={23} label="Different Industry" />
                </div>
            </div>

            {/* Infinite Marquee */}
            <div style={{ overflow: 'hidden', padding: '2rem 0', display: 'flex', whiteSpace: 'nowrap', position: 'relative' }}>
                {/* Gradient edge masks for smooth fade-out effect */}
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '150px', background: 'linear-gradient(to right, var(--background), transparent)', zIndex: 10 }} />
                <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '150px', background: 'linear-gradient(to left, var(--background), transparent)', zIndex: 10 }} />

                {/* Marquee Content */}
                <div
                    style={{
                        display: 'flex',
                        gap: '4rem',
                        paddingRight: '4rem',
                        animation: 'scroll 30s linear infinite',
                        width: 'max-content'
                    }}
                >
                    {/* We duplicate the array to make the loop seamless */}
                    {[...clients, ...clients, ...clients].map((client, index) => (
                        <span
                            key={index}
                            style={{
                                fontSize: '2rem',
                                fontWeight: 700,
                                color: 'rgba(255, 255, 255, 0.4)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em'
                            }}
                        >
                            {client}
                        </span>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-33.33% - 1.33rem)); } /* Shifts by one third (one original array length) */
        }
      `}} />
        </section>
    );
}
