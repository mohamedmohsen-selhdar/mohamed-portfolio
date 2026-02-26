"use client";

import { Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '4rem 0',
            marginTop: '4rem',
            background: 'rgba(12, 12, 12, 0.5)'
        }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center' }}>
                    Let's build something <span className="text-gradient">sustainable</span> together.
                </h2>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <a
                        href="#"
                        className="aura-card"
                        style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={24} />
                    </a>
                    <a
                        href="mailto:contact@example.com"
                        className="aura-card"
                        style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}
                        aria-label="Email"
                    >
                        <Mail size={24} />
                    </a>
                </div>

                <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                    © {new Date().getFullYear()} Mohamed Mohsen. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
