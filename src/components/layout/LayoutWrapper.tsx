"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { X, Menu } from "lucide-react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div style={{ backgroundColor: '#000', minHeight: '100vh', width: '100%', overflow: 'hidden', position: 'relative' }}>
            {/* Background Menu Layer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '2rem',
                            color: 'white'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem', fontWeight: 500, cursor: 'pointer', zIndex: 60 }}
                            >
                                <X size={24} /> Close
                            </button>
                        </div>

                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '4rem', paddingLeft: '4rem' }}>
                            {['Home', 'About', 'Experience', 'Contact'].map((item, i) => (
                                <motion.div
                                    key={item}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                                >
                                    <a href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} style={{ fontSize: '4rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'white', textDecoration: 'none' }}>
                                        {item}
                                    </a>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Foreground Content Layer */}
            <motion.div
                animate={{
                    scale: isMenuOpen ? 0.9 : 1,
                    y: isMenuOpen ? '5vh' : 0,
                    rotateZ: isMenuOpen ? -3 : 0,
                    borderRadius: isMenuOpen ? '2rem' : 0,
                    opacity: isMenuOpen ? 0.7 : 1,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                style={{
                    backgroundColor: 'var(--background)',
                    minHeight: '100vh',
                    width: '100%',
                    position: 'relative',
                    zIndex: 10,
                    overflow: isMenuOpen ? 'hidden' : 'auto',
                    transformOrigin: 'top center',
                    boxShadow: isMenuOpen ? '0 25px 50px -12px rgba(255, 255, 255, 0.1)' : 'none',
                }}
            >
                {/* Navigation Bar inside the scaled wrapper */}
                <nav
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        padding: '1.5rem 2rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        zIndex: 50,
                    }}
                >
                    <button
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', opacity: isMenuOpen ? 0 : 1, transition: 'opacity 0.3s' }}
                        onClick={() => setIsMenuOpen(true)}
                        disabled={isMenuOpen}
                    >
                        <Menu size={20} />
                        Menu
                    </button>

                    <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', opacity: isMenuOpen ? 0 : 1, transition: 'opacity 0.3s' }}>
                        M.M.
                    </Link>
                </nav>

                {children}
            </motion.div>
        </div>
    );
}
