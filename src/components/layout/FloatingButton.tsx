"use client";

import { motion } from "framer-motion";

export default function FloatingButton() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 100,
                display: 'inline-block'
            }}
        >
            {/* Glowing button effect */}
            <div style={{
                position: 'absolute',
                inset: '-4px',
                background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
                filter: 'blur(15px)',
                opacity: 0.8,
                borderRadius: '9999px',
                animation: 'pulse-strong 2s infinite alternate'
            }} />

            <a
                href="https://calendar.app.google/vQrdfsKvhWWTtgBG9"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    position: 'relative',
                    display: 'inline-block',
                    background: '#ffffff',
                    color: '#000000',
                    fontWeight: 800,
                    fontSize: '1.125rem',
                    padding: '1rem 2rem',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    boxShadow: '0 10px 25px -5px rgba(255, 255, 255, 0.4)',
                    transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                Book Free 30 Min Consulting
            </a>

            <style dangerouslySetInnerHTML={{
                __html: `
  @keyframes pulse-strong {
    0% { opacity: 0.5; filter: blur(10px); }
    100% { opacity: 1; filter: blur(20px); }
  }
`}} />
        </motion.div>
    );
}
