"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const manifestoLines = [
    { text: "We don't build slide decks.", highlight: "" },
    { text: "We build machines.", highlight: "machines" },
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

            {/* Subtle grid/grain background overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.2,
                pointerEvents: 'none'
            }} />

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
                        letterSpacing: '-0.02em',
                        fontFamily: 'monospace' // Enforce terminal feel
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
