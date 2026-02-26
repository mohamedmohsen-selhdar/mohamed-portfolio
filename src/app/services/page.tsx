"use client";

import { motion } from "framer-motion";
import { services } from "@/data/content";

export default function ServicesPage() {
    return (
        <main className="container section" style={{ paddingTop: '120px', minHeight: '100vh' }}>
            <div className="aura-bg" style={{ top: '20%', left: '20%' }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0em' }}>Services</h1>
                <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '600px', marginBottom: '4rem' }}>
                    End-to-end consulting spanning process engineering, supply chain excellence, and organizational design.
                </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                {services.map((service, i) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                        className="aura-card"
                        style={{ padding: '2rem' }}
                    >
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>{service.title}</h2>
                        <p className="text-muted" style={{ marginBottom: '1.5rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {service.whatIDo}
                        </p>
                    </motion.div>
                ))}
            </div>
        </main>
    );
}
