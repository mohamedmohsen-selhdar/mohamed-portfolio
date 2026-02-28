"use client";

import { motion } from "framer-motion";
import { caseStudies } from "@/data/content";

export default function CaseStudiesPage() {
    return (
        <main className="container section" style={{ paddingTop: '120px', minHeight: '100vh' }}>
            <div className="aura-bg" style={{ top: '20%', right: '20%' }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0em' }}>Case Studies</h1>
                <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '600px', marginBottom: '4rem' }}>
                    Real-world examples of operational transformation, cost reduction, and scalable growth.
                </p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                {caseStudies.map((study, i) => (
                    <motion.div
                        key={study.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '3rem' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '0.875rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.1em' }}>0{i + 1}</span>
                            <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>{study.title}</h2>
                        </div>
                        {study.company && <p style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>{study.company}</p>}
                        <p className="text-muted" style={{ lineHeight: 1.6, maxWidth: '800px' }}>{study.context}</p>
                    </motion.div>
                ))}
            </div>
        </main>
    );
}
