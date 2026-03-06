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

                {/* Asymmetric Bento Box Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[300px]">
                    {services.map((service, index) => {
                        const description = extractPreviewText(service.what_i_do);

                        // Create a benchmark UI Bento pattern 
                        // Large box every ~4 items
                        const isLarge = index === 0 || index === 3 || index === 7;

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`group flex flex-col p-8 rounded-[2rem] border border-[#222222] bg-[#111111] hover:bg-[#151515] transition-all duration-500 overflow-hidden relative cursor-pointer ${isLarge ? "md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2" : "col-span-1 row-span-1"
                                    }`}
                            >
                                {/* Futuristic Internal Glow effect */}
                                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-[#2a2a2a] to-transparent opacity-0 group-hover:opacity-20 blur-[50px] transition-opacity duration-700 pointer-events-none rounded-full" />

                                <div className={`flex items-center justify-between mb-8 ${isLarge ? 'md:mb-12' : ''}`}>
                                    <div className="h-12 w-12 rounded-xl bg-[#0a0a0a] border border-[#333333] flex items-center justify-center text-zinc-300 group-hover:border-white group-hover:text-white transition-all duration-300">
                                        <Box size={20} />
                                    </div>
                                    <div className="h-10 w-10 flex items-center justify-center text-zinc-600 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-300">
                                        <ArrowRight size={24} />
                                    </div>
                                </div>

                                <div className="mt-auto relative z-10">
                                    <h3 className={`font-sans font-bold text-white mb-4 ${isLarge ? 'text-3xl md:text-4xl leading-tight' : 'text-xl'}`}>
                                        {service.title}
                                    </h3>

                                    <p className={`font-sans text-zinc-400 leading-relaxed ${isLarge ? 'text-lg line-clamp-3' : 'text-sm line-clamp-2'}`}>
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
