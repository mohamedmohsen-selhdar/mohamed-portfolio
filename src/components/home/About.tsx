"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="container section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center', maxWidth: '1000px', width: '100%' }}>

                {/* Left Column: Text */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem', letterSpacing: '-0.02em' }}>
                        About Me
                    </h2>
                    <p style={{ fontSize: '1.25rem', lineHeight: 1.8, marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                        As a Business & Industrial Consultant, I help SMEs optimize operations, reduce costs, and accelerate growth. I deliver tailored strategies in process improvement, supply chain management, and financial planning, enabling small to medium-sized enterprises to enhance productivity and achieve sustainable profitability through expert, on-site, or remote analysis.
                    </p>
                    <p style={{ fontSize: '1.25rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
                        My approach is rooted in precision execution and lean methodologies, drawing from advanced optimization techniques to build resilient, scalable business frameworks.
                    </p>
                </motion.div>

                {/* Right Column: Photo */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ position: 'relative', width: '100%', aspectRatio: '3/4', borderRadius: '1rem', overflow: 'hidden' }}
                >
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-muted)'
                    }}>
                        {/* Fallback text if image cannot be loaded */}
                        [ Portrait Photo ]
                    </div>
                    <Image
                        src="/mohamed.jpg"
                        alt="Mohamed Mohsen"
                        fill
                        style={{ objectFit: 'cover', filter: 'grayscale(100%)' }}
                        priority
                    />
                </motion.div>

            </div>
        </section>
    );
}
