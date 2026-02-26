"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const roles = [
    "business consultant.",
    "problem solver.",
    "industrial expert."
];

export default function Hero() {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="container" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            paddingTop: '80px',
            overflow: 'hidden'
        }}>
            {/* Background Aura */}
            <div className="aura-bg" />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', width: '100%', maxWidth: '1200px', zIndex: 10 }}>

                {/* Left Side: Text & CTA */}
                <div style={{ position: 'relative' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{
                            fontSize: 'clamp(3rem, 6vw, 5rem)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            letterSpacing: '-0.04em',
                            marginBottom: '2rem',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <span>Hi, I'm</span>
                        <span>Mohamed,</span>

                        {/* Vertical Text Swapper */}
                        <div style={{ height: '1.2em', position: 'relative', overflow: 'hidden', marginTop: '0.2em' }}>
                            <AnimatePresence mode="popLayout">
                                <motion.span
                                    key={currentRoleIndex}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -50, opacity: 0 }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-gradient"
                                    style={{ position: 'absolute', whiteSpace: 'nowrap' }}
                                >
                                    {roles[currentRoleIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{ fontSize: '1.25rem', lineHeight: 1.6, maxWidth: '500px', marginBottom: '3rem' }}
                        className="text-muted"
                    >
                        I help SMEs optimize operations, reduce costs, and accelerate growth through precision execution.
                    </motion.p>

                    {/* Floating button moved to FloatingButton.tsx */}

                    {/* Animated Arrow pointing right */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        style={{ position: 'absolute', right: '-10%', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}
                    >
                        <svg width="200" height="80" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                                d="M10 40 Q 100 10 190 40"
                                stroke="white"
                                strokeWidth="2"
                                strokeDasharray="5 5"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
                            />
                            <motion.path
                                d="M180 30 L 195 41 L 180 50"
                                stroke="white"
                                strokeWidth="2"
                                fill="none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 3 }}
                            />
                        </svg>
                    </motion.div>
                </div>

                {/* Right Side: Portrait Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{
                        position: 'relative',
                        width: '80%', /* Made slightly smaller */
                        margin: '0 auto',
                        aspectRatio: '3/4',
                        borderRadius: '2rem',
                        overflow: 'hidden',
                        /* Blend it into the dark background */
                        maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
                    }}
                >
                    <Image
                        src="/hero-photo2.jpg"
                        alt="Mohamed Mohsen Portrait"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        priority
                    />
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes pulse {
          0% { opacity: 0.4; }
          100% { opacity: 0.8; }
        }
      `}} />
        </section>
    );
}
