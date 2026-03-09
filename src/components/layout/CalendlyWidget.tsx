"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function CalendlyWidget() {
    useEffect(() => {
        // Initialize if script happens to already be loaded
        // @ts-ignore
        if (typeof window !== "undefined" && window.Calendly) {
            // @ts-ignore
            window.Calendly.initBadgeWidget({ url: 'https://calendly.com/mohamedmohsen-tamken/30min', text: 'Book 30 min Meeting', color: '#991b1b', textColor: '#ffffff', branding: true });
        }
    }, []);

    return (
        <>
            <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
            <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                strategy="lazyOnload"
                onLoad={() => {
                    // @ts-ignore
                    if (window.Calendly) {
                        // @ts-ignore
                        window.Calendly.initBadgeWidget({ url: 'https://calendly.com/mohamedmohsen-tamken/30min', text: 'Book 30 min Meeting', color: '#991b1b', textColor: '#ffffff', branding: true });
                    }
                }}
            />
            <style dangerouslySetInnerHTML={{
                __html: `
                .calendly-badge-content {
                    box-shadow: 0 0 35px rgba(153, 27, 27, 0.9), inset 0 0 10px rgba(255, 255, 255, 0.1) !important;
                    transition: all 0.3s ease !important;
                    position: relative;
                }
                .calendly-badge-content:hover {
                    box-shadow: 0 0 50px rgba(153, 27, 27, 1), inset 0 0 15px rgba(255, 255, 255, 0.2) !important;
                }
                
                /* Flowing Glowing Bubbles */
                .calendly-badge-content::before,
                .calendly-badge-content::after {
                    content: '';
                    position: absolute;
                    bottom: 25px;
                    background: radial-gradient(circle at 30% 30%, rgba(255, 150, 150, 0.9), rgba(153, 27, 27, 1));
                    box-shadow: 0 0 12px rgba(153, 27, 27, 1);
                    border-radius: 50%;
                    opacity: 0;
                    pointer-events: none;
                    z-index: -1;
                }
                
                .calendly-badge-content::before {
                    width: 14px;
                    height: 14px;
                    left: 25%;
                    animation: float-bubble 3.5s infinite ease-out;
                }
                
                .calendly-badge-content::after {
                    width: 10px;
                    height: 10px;
                    left: 65%;
                    animation: float-bubble-alt 2.8s infinite ease-out;
                    animation-delay: 1.5s;
                }
                
                @keyframes float-bubble {
                    0% { transform: translateY(0) scale(0.5); opacity: 0; }
                    20% { opacity: 1; }
                    60% { transform: translateY(-50px) translateX(-20px) scale(1.3); opacity: 0.6; }
                    100% { transform: translateY(-90px) translateX(15px) scale(0.1); opacity: 0; }
                }
                
                @keyframes float-bubble-alt {
                    0% { transform: translateY(0) scale(0.5); opacity: 0; }
                    20% { opacity: 0.9; }
                    60% { transform: translateY(-40px) translateX(25px) scale(1.5); opacity: 0.5; }
                    100% { transform: translateY(-70px) translateX(-15px) scale(0.1); opacity: 0; }
                }
                `
            }} />
        </>
    );
}
