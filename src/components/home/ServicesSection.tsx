"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Box } from "lucide-react";
import { motion } from "framer-motion";

type ServiceData = {
    id: string;
    title: string;
    what_i_do: string;
    who_this_is_for: string;
    when_to_hire_me: string;
    what_you_get: string;
};

export default function ServicesSection() {
    const [services, setServices] = useState<ServiceData[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchServices = async () => {
            const { data } = await supabase
                .from('services')
                .select('*')
                .order('created_at', { ascending: true });

            if (data) setServices(data);
            setLoading(false);
        };
        fetchServices();
    }, []);

    // Helper to extract clean text for preview
    const extractPreviewText = (html: string) => {
        if (!html) return "";
        if (typeof document === 'undefined') {
            return html.replace(/<[^>]+>/g, ' ').replace(/\\n/g, ' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
        }
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return (doc.body.textContent || "").replace(/\\n/g, ' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    };

    if (loading && services.length === 0) return null;

    return (
        <section className="py-24 bg-[#0a0a0a] w-full text-white relative overflow-hidden" id="services">
            {/* Background glow for depth */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#222222] pb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans tracking-tight text-white font-bold leading-tight mb-4">
                            Capabilities
                        </h2>
                        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl">
                            Specialized interventions designed to architect scalable growth, optimize complex operations, and fundamentally transform your industrial outputs.
                        </p>
                    </div>
                </div>

                {/* Uniform Glass Box Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const description = extractPreviewText(service.what_i_do);

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`group flex flex-col p-10 lg:p-12 rounded-[2rem] transition-all duration-500 overflow-hidden relative cursor-pointer min-h-[350px]`}
                                style={{
                                    backdropFilter: 'blur(10px) saturate(180%)',
                                    WebkitBackdropFilter: 'blur(10px) saturate(180%)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                {/* Futuristic Internal Glow effect */}
                                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-[#ffffff] to-transparent opacity-0 group-hover:opacity-10 blur-[50px] transition-opacity duration-700 pointer-events-none rounded-full" />

                                <div className={`flex items-center justify-between mb-8`}>
                                    <div className="h-14 w-14 rounded-xl bg-transparent border border-white/20 flex items-center justify-center text-zinc-300 group-hover:border-white group-hover:text-white transition-all duration-300">
                                        <Box size={24} />
                                    </div>
                                    <div className="h-10 w-10 flex items-center justify-center text-zinc-400 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-300">
                                        <ArrowRight size={24} />
                                    </div>
                                </div>

                                <div className="mt-auto relative z-10 flex-1 flex flex-col justify-end">
                                    <h3 style={{ fontFamily: 'var(--font-cairo), sans-serif' }} className={`font-bold text-white mb-4 text-2xl md:text-3xl leading-tight`}>
                                        {service.title}
                                    </h3>

                                    <p style={{ fontFamily: 'var(--font-cairo), sans-serif', fontWeight: 400 }} className={`text-zinc-300 bg-transparent leading-relaxed text-base line-clamp-3`}>
                                        {description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
