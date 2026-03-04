"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Box, Lock, Sparkles, Settings, Search, Layout } from "lucide-react";

type ServiceData = {
    id: string;
    title: string;
    what_i_do: string;
};

const ICONS = [Box, Lock, Sparkles, Settings, Search, Layout];

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

    if (loading && services.length === 0) return null;

    // Helper to strip HTML from what_i_do for the small description
    const stripHtml = (html: string) => {
        if (typeof document === 'undefined') return html.replace(/<[^>]+>/g, '');
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    return (
        <section className="py-24 bg-black w-full text-white overflow-hidden relative" id="services">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="mb-12 md:mb-20">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
                        How I can help you
                    </h2>
                    <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase">
                        (SERVICES)
                    </p>
                </div>

                <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-6">
                    {services.map((service, index) => {
                        const Icon = ICONS[index % ICONS.length];
                        const description = stripHtml(service.what_i_do).substring(0, 100) + "...";

                        // Create bento grid layout based on index
                        let gridClass = "md:col-span-12";
                        if (index === 0) gridClass = "md:col-span-4 md:row-span-2"; // Tall left
                        else if (index === 1) gridClass = "md:col-span-4 md:row-span-3"; // Taller middle
                        else if (index === 2) gridClass = "md:col-span-4 md:row-span-2"; // Tall right
                        else if (index === 3) gridClass = "md:col-span-4 md:row-span-1"; // Bottom left
                        else if (index === 4) gridClass = "md:col-span-8 md:row-span-1"; // Bottom wide right
                        else gridClass = "md:col-span-4 md:row-span-1"; // Fallback

                        // Handle just 3-4 items gracefully
                        if (services.length <= 3) {
                            gridClass = "md:col-span-4 md:row-span-1 min-h-[300px]";
                        }

                        return (
                            <li
                                key={service.id}
                                className={`relative flex flex-col justify-between rounded-2xl border border-white/5 bg-zinc-950 p-6 md:p-8 min-h-[250px] list-none ${gridClass}`}
                            >
                                <GlowingEffect
                                    spread={40}
                                    glow={true}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                    borderWidth={1.5}
                                />

                                <div className="relative z-10 flex justify-between flex-col h-full">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 shadow-sm mb-12">
                                        <Icon className="h-5 w-5 text-white/80" />
                                    </div>

                                    <div className="mt-auto">
                                        <h3 className="text-xl md:text-2xl font-bold font-sans text-white mb-3">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-[90%]">
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
