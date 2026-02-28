"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Menu } from "lucide-react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Body scroll lock
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isMenuOpen]);

    return (
        <div style={{ backgroundColor: '#050505', minHeight: '100vh', width: '100%', overflow: 'hidden', position: 'relative', perspective: '1500px' }}>

            {/* Background Image Layer */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: isMenuOpen ? 0.3 : 0, transition: 'opacity 0.6s ease' }}>
                <Image
                    src="/menu-bg.jpg"
                    alt="Precision Robotic Arm Background"
                    fill
                    style={{ objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)' }}
                    priority
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,5,0.95), transparent)' }} />
            </div>

            {/* Menu Links Layer (Left aligned) */}
            <div style={{
                position: 'fixed',
                left: 0,
                top: 0,
                height: '100vh',
                width: isMobile ? '80vw' : '40vw',
                zIndex: 5,
                padding: isMobile ? '3rem 2rem' : '5rem 4rem',
                display: 'flex',
                flexDirection: 'column',
                pointerEvents: isMenuOpen ? 'auto' : 'none',
                opacity: isMenuOpen ? 1 : 0,
                transition: 'opacity 0.5s ease',
                color: 'white'
            }}>
                <button
                    onClick={() => setIsMenuOpen(false)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem', fontWeight: 500, cursor: 'pointer', marginBottom: '4rem', opacity: 0.7, transition: 'opacity 0.3s' }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                >
                    <X size={24} /> Close
                </button>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1, justifyContent: 'center' }}>
                    {[
                        { name: 'Home', path: '/' },
                        { name: 'Services', path: '/services' },
                        { name: 'Case Studies', path: '/case-studies' },
                        { name: 'Free Templates', path: '/free-templates' }
                    ].map((item, i) => (
                        <div key={item.name} style={{ overflow: 'hidden' }}>
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={isMenuOpen ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                                transition={{ delay: isMenuOpen ? 0.2 + (i * 0.1) : 0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Link
                                    href={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    style={{
                                        fontSize: 'min(3.5rem, 10vw)',
                                        fontWeight: 800,
                                        letterSpacing: '-0.02em',
                                        color: 'white',
                                        textDecoration: 'none',
                                        display: 'block',
                                        transition: 'transform 0.3s ease, color 0.3s ease'
                                    }}
                                    className="menu-link-hover"
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        </div>
                    ))}
                </nav>
            </div>

            {/* Foreground Content Layer (The 3D Tilted Page) */}
            <motion.div
                animate={{
                    scale: isMenuOpen ? (isMobile ? 0.8 : 0.85) : 1,
                    x: isMenuOpen ? (isMobile ? '60vw' : '40vw') : 0,
                    y: isMenuOpen ? '5vh' : 0,
                    rotateY: isMenuOpen ? -15 : 0,
                    rotateZ: isMenuOpen ? -2 : 0,
                    borderRadius: isMenuOpen ? '32px' : '0px',
                    opacity: isMenuOpen ? 0.7 : 1,
                }}
                transition={{ type: "spring", stiffness: 180, damping: 25 }}
                style={{
                    backgroundColor: 'var(--background)',
                    minHeight: '100vh',
                    width: '100%',
                    position: 'relative',
                    zIndex: 10,
                    overflow: isMenuOpen ? 'hidden' : 'auto',
                    transformOrigin: 'right center',
                    boxShadow: isMenuOpen ? '-20px 0 50px rgba(0, 0, 0, 0.5)' : 'none',
                    pointerEvents: isMenuOpen ? 'none' : 'auto', // disable clicking background elements when menu is open
                }}
            >
                {/* Visual Overlay to act as a close trigger for the tilted page */}
                {isMenuOpen && (
                    <div
                        style={{ position: 'absolute', inset: 0, zIndex: 9999, cursor: 'pointer' }}
                        onClick={() => setIsMenuOpen(false)}
                        title="Close Menu"
                    />
                )}

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
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', opacity: isMenuOpen ? 0 : 1, transition: 'opacity 0.3s', color: 'var(--foreground)' }}
                        onClick={() => setIsMenuOpen(true)}
                        disabled={isMenuOpen}
                    >
                        <Menu size={20} />
                        Menu
                    </button>

                    <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', opacity: isMenuOpen ? 0 : 1, transition: 'opacity 0.3s', color: 'var(--foreground)' }}>
                        M.M.
                    </Link>
                </nav>

                {children}
            </motion.div>
        </div>
    );
}
