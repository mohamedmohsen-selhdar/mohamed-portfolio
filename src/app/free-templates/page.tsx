"use client";

import { motion } from "framer-motion";

export default function FreeTemplatesPage() {
    return (
        <main className="container section" style={{ paddingTop: '120px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div className="aura-bg" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1rem' }}>Free Templates</h1>
                <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
                    A collection of high-value standard operating procedures, costing matrices, and KPI dashboards. Coming soon.
                </p>
                <div style={{ padding: '1rem 2rem', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '99px', display: 'inline-block', backdropFilter: 'blur(10px)' }}>
                    Generating Resources...
                </div>
            </motion.div>
        </main>
    );
}
