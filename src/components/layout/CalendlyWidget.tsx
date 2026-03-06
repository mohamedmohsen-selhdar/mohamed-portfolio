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
                    box-shadow: 0 0 25px rgba(153, 27, 27, 0.6) !important;
                    transition: all 0.3s ease !important;
                }
                .calendly-badge-content:hover {
                    box-shadow: 0 0 35px rgba(153, 27, 27, 0.8) !important;
                }
                `
            }} />
        </>
    );
}
