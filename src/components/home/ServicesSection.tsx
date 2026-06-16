"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Box } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { services as localServices } from "@/data/content";

type ServiceData = {
    id: string;
    title: string;
    what_i_do: string;
    who_this_is_for?: string;
    when_to_hire_me?: string;
    what_you_get?: string;
    whatIDo?: string; // local fallback field
};

export default function ServicesSection() {
    const [services, setServices] = useState<ServiceData[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data } = await supabase
                    .from('services')
                    .select('*')
                    .order('created_at', { ascending: true });

                if (data && data.length > 0) {
                    setServices(data);
                } else {
                    setServices(localServices as any[]);
                }
            } catch (error) {
                console.error("Error fetching services, falling back to local:", error);
                setServices(localServices as any[]);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    // Helper to extract clean text for preview - Standardized to use regex for consistency between server and client
    const extractPreviewText = (html: string) => {
        if (!html) return "";
        return html
            .replace(/<[^>]+>/g, ' ')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/\\n/g, ' ')
            .replace(/\n/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    };

    if (loading) return null;
    if (services.length === 0) return null;

    return (
        <section className="py-24 bg-[#0a0a0a] w-full text-white relative overflow-hidden" id="services">
            {/* Background glow for depth */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#222222] pb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans tracking-tight text-white font-bold leading-tight mb-4">
                            How I Can Help You
                        </h2>
                        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl">
                            Specialized interventions designed to architect scalable growth, optimize complex operations, and fundamentally transform your industrial outputs.
                        </p>
                    </div>
                </div>

                {/* Services Grid matching main /services page */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {services.map((service, index) => {
                        const description = extractPreviewText(service.what_i_do || service.whatIDo || "");

                        return (
                            <Link key={service.id} href={`/services/${service.id}`} style={{ textDecoration: 'none' }}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="aura-card"
                                    style={{ padding: '2rem', cursor: 'pointer', height: '100%' }}
                                >
                                    <div style={{ minHeight: '120px' }}>
                                        <h2 style={{ fontFamily: 'var(--font-cairo), sans-serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'white' }}>
                                            {service.title}
                                        </h2>
                                        <p className="text-muted" style={{ fontFamily: 'var(--font-cairo), sans-serif', fontWeight: 400, marginBottom: '1.5rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {description}
                                        </p>
                                    </div>
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

