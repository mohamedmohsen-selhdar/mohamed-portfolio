"use client";

import { motion } from "framer-motion";

const certificates = [
    "Six Sigma green belt",
    "Supply chain MITx Micro Master",
    "IBM Data Analysis"
];

export default function CertificatesMarquee() {
    return (
        <section className="py-16" style={{ borderBottom: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-cairo), sans-serif' }}>
                    Certifications & Credentials
                </h2>
            </div>
            
            {/* Infinite Marquee */}
            <div style={{ overflow: 'hidden', padding: '1.5rem 0', display: 'flex', whiteSpace: 'nowrap', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '150px', background: 'linear-gradient(to right, var(--background), transparent)', zIndex: 10 }} />
                <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '150px', background: 'linear-gradient(to left, var(--background), transparent)', zIndex: 10 }} />

                <div
                    style={{
                        display: 'flex',
                        gap: '5rem',
                        paddingRight: '5rem',
                        animation: 'scrollCert 20s linear infinite',
                        width: 'max-content'
                    }}
                >
                    {/* Duplicate the array 4 times to ensure seamless infinite scrolling without blank spaces */}
                    {[...certificates, ...certificates, ...certificates, ...certificates].map((cert, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}
                        >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800">
                                <circle cx="12" cy="8" r="6"></circle>
                                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                            </svg>
                            <span
                                className="glow-on-hover-marquee"
                                style={{
                                    fontSize: '1.4rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    fontFamily: 'var(--font-cairo), sans-serif',
                                    color: 'var(--foreground)'
                                }}
                            >
                                {cert}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes scrollCert {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-25% - 1.25rem)); } 
        }
      `}} />
        </section>
    );
}
