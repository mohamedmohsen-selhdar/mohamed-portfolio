"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";



const loopWords = [
    "Mohamed mohsen.",
    "business consultant.",
    "industrial expert.",
    "problem solver.",
    "solution architect."
];

const TypewriterLoop = ({ words }: { words: string[] }) => {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];
        let timeout: NodeJS.Timeout;

        if (!isDeleting) {
            if (text.length < currentWord.length) {
                timeout = setTimeout(() => {
                    setText(currentWord.slice(0, text.length + 1));
                }, 80); // Typing speed
            } else {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, 2000); // Pause before deleting
            }
        } else {
            if (text.length > 0) {
                timeout = setTimeout(() => {
                    setText(currentWord.slice(0, text.length - 1));
                }, 40); // Deleting speed
            } else {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
            }
        }
        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex, words]);

    return (
        <span style={{ display: 'inline-block' }}>
            <span className="text-gradient">
                {text}
            </span>
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                style={{
                    display: 'inline-block',
                    width: '3px',
                    height: '1.1em',
                    backgroundColor: 'var(--foreground)',
                    verticalAlign: 'middle',
                    marginLeft: '6px'
                }}
            />
        </span>
    );
};

export default function Hero() {
    const [dots, setDots] = useState<{ x: number, y: number, size: number, delay: number }[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        // Generate random dots on client side to avoid hydration mismatch
        const newDots = Array.from({ length: 20 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            delay: Math.random() * 5
        }));
        setDots(newDots);
    }, []);

    const [isLightMode, setIsLightMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsLightMode(true);
            document.documentElement.classList.add('light');
        }
    }, []);

    const toggleTheme = () => {
        if (isLightMode) {
            document.documentElement.classList.remove('light');
            localStorage.setItem('theme', 'dark');
            setIsLightMode(false);
        } else {
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
            setIsLightMode(true);
        }
    };



    return (
        <section id="home" className="container" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            paddingTop: '80px',
            overflow: 'hidden',
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
            transition: 'background-color 0.3s ease, color 0.3s ease'
        }}>
            {/* Floating Dots */}
            {dots.map((dot, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.8, 0.2]
                    }}
                    transition={{
                        duration: Math.random() * 3 + 4,
                        repeat: Infinity,
                        delay: dot.delay,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'absolute',
                        left: `${dot.x}%`,
                        top: `${dot.y}%`,
                        width: `${dot.size}px`,
                        height: `${dot.size}px`,
                        backgroundColor: 'var(--foreground)',
                        borderRadius: '50%',
                        zIndex: 1
                    }}
                />
            ))}

            {/* Glowing Floating Theme Toggle */}
            <motion.button
                onClick={toggleTheme}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                style={{
                    position: 'absolute',
                    top: isMobile ? '20px' : '40px',
                    right: isMobile ? '20px' : '3%',
                    zIndex: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.75rem',
                    borderRadius: '50%',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    color: 'var(--foreground)',
                    cursor: 'pointer',
                    boxShadow: isLightMode
                        ? '0 0 15px rgba(250, 200, 0, 0.5), 0 0 30px rgba(250, 200, 0, 0.2)'
                        : '0 0 15px rgba(0, 150, 255, 0.3), 0 0 30px rgba(0, 150, 255, 0.1)',
                    transition: 'box-shadow 0.3s ease'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle Theme"
            >
                {isLightMode ? <Moon size={24} /> : <Sun size={24} />}
            </motion.button>

            {/* Background Aura (Moved to Left) */}
            <div className="aura-bg" style={{ left: '0%', transform: 'translate(-20%, -50%)', width: '80vw', height: '80vw' }} />

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2rem' : '4rem', alignItems: 'center', width: '100%', maxWidth: '1200px', zIndex: 10, textAlign: isMobile ? 'center' : 'left' }}>

                {/* Left Side: Text & CTA */}
                <div style={{ position: 'relative' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 800,
                            lineHeight: 1.2,
                            letterSpacing: '-0.02em',
                            marginBottom: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            flexWrap: 'wrap',
                            alignItems: isMobile ? 'center' : 'flex-start'
                        }}
                    >
                        {/* Typewriter Loop */}
                        <div style={{ display: 'block', minHeight: '1.2em' }}>
                            <TypewriterLoop words={loopWords} />
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
                        style={{ position: 'absolute', right: '-10%', top: '50%', transform: 'translateY(-50%)', opacity: 0.4, display: isMobile ? 'none' : 'block' }}
                    >
                        <svg width="200" height="80" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                                d="M10 40 Q 100 10 190 40"
                                stroke="var(--foreground)"
                                strokeWidth="2"
                                strokeDasharray="5 5"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
                            />
                            <motion.path
                                d="M180 30 L 195 41 L 180 50"
                                stroke="var(--foreground)"
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
                        /* Reverted to opaque image */
                    }}
                >
                    <Image
                        src="/hero-photo3.jpg"
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
