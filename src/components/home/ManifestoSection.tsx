"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const manifestoLines = [
    { text: "I don't just advise.", highlight: "advise" },
    { text: "I embed and execute.", highlight: "execute" },
    { text: "Execution over theory.", highlight: "Execution" },
    { text: "Profit over vanity metrics.", highlight: "Profit" }
];

export default function ManifestoSection() {
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        const currentLine = manifestoLines[currentLineIndex].text;

        let timeout: NodeJS.Timeout;

        if (isTyping) {
            if (displayedText.length < currentLine.length) {
                // Type next character
                timeout = setTimeout(() => {
                    setDisplayedText(currentLine.slice(0, displayedText.length + 1));
                }, 50); // Typing speed
            } else {
                // Finished typing line, wait then start deleting/vaporizing
                timeout = setTimeout(() => {
                    setIsTyping(false);
                }, 4000); // Wait on full sentence
            }
        } else {
            if (displayedText.length > 0) {
                // Delete/vaporize backward
                timeout = setTimeout(() => {
                    setDisplayedText(currentLine.slice(0, displayedText.length - 1));
                }, 30); // Deletion speed
            } else {
                // Finished deleting, move to next line
                setCurrentLineIndex((prev) => (prev + 1) % manifestoLines.length);
                setIsTyping(true);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayedText, isTyping, currentLineIndex]);

    // Function to beautifully wrap the highlighted word in damped red
    const renderStyledText = (text: string, highlight: string) => {
        if (!highlight) return <span>{text}</span>;

        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <span key={i} style={{ color: '#8b0000', textShadow: '0 0 10px rgba(139, 0, 0, 0.5)' }}>
                            {part}
                        </span>
                    ) : (
                        <span key={i}>{part}</span>
                    )
                )}
            </span>
        );
    };

    return (
        <section style={{
            backgroundColor: '#000000', // Pure black for the terminal/manifesto vibe
            color: '#ffffff',
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '4rem 2rem',
            overflow: 'hidden'
        }}>

            {/* Dynamic Animated Waves Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.15,
                pointerEvents: 'none',
                background: `
                    radial-gradient(circle at 50% 150%, var(--aura-intense) 0%, transparent 50%),
                    radial-gradient(circle at 0% 0%, var(--aura-color) 0%, transparent 30%)
                `,
                filter: 'blur(30px)'
            }} />

            {/* CSS Wave SVG overlay */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                overflow: 'hidden',
                lineHeight: 0,
                opacity: 0.1
            }}>
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: 'relative', display: 'block', width: 'calc(100% + 1.3px)', height: '150px' }}>
                    <motion.path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C56.71,118.92,137.38,131.52,216.7,118.89,252.17,113.25,287.41,105.5,321.39,56.44Z"
                        style={{ fill: 'white' }}
                        animate={{
                            d: [
                                "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C56.71,118.92,137.38,131.52,216.7,118.89,252.17,113.25,287.41,105.5,321.39,56.44Z",
                                "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C56.71,23.12,137.38,35.72,216.7,23.1,252.17,17.45,287.41,9.7,321.39-39.36Z",
                                "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C56.71,118.92,137.38,131.52,216.7,118.89,252.17,113.25,287.41,105.5,321.39,56.44Z"
                            ]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                </svg>
            </div>

            <div style={{ maxWidth: '1000px', width: '100%', position: 'relative', zIndex: 10 }}>

                {/* Minimal Label */}
                <div style={{ marginBottom: '4rem', display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.7 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666' }}>[ manifesto ]</span>
                    <div style={{ height: '1px', flex: 1, backgroundColor: '#333' }} />
                </div>

                {/* Typewriter Container */}
                <div style={{ minHeight: '150px' }}>
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em'
                    }}>
                        {renderStyledText(displayedText, manifestoLines[currentLineIndex].highlight)}
                        {/* Blinking Cursor */}
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            style={{ color: '#8b0000', fontWeight: 300, marginLeft: '4px' }}
                        >
                            |
                        </motion.span>
                    </h2>
                </div>

                {/* Bottom decorative element */}
                <div style={{ marginTop: '4rem', width: '40px', height: '2px', backgroundColor: '#8b0000' }} />

            </div>

        </section>
    );
}
