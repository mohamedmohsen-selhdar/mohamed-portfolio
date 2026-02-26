"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLightMode, setIsLightMode] = useState(false);

    useEffect(() => {
        // Check for saved theme
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
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                padding: '1.5rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 50,
                background: 'rgba(12, 12, 12, 0.7)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}
        >
            <button
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Menu size={20} />
                Menu
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <button
                    onClick={toggleTheme}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                    aria-label="Toggle Theme"
                >
                    {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'var(--foreground)', color: 'var(--background)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                    M.M.
                </Link>
            </div>
        </motion.nav>
    );
}
