"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
    Briefcase,
    Workflow,
    Network,
    Building2,
    BarChart3,
    LineChart,
    Layout,
    Settings,
    Factory,
    RefreshCcw,
    TrendingUp,
    Box
} from "lucide-react";

type ServiceData = {
    id: string;
    title: string;
    what_i_do: string;
    who_this_is_for: string;
    when_to_hire_me: string;
    what_you_get: string;
};

// Smart icon mapping based on keywords in the service title
const getIconForService = (title: string, index: number) => {
    const t = title.toLowerCase();

    if (t.includes("process") || t.includes("operation")) return <Workflow className="h-6 w-6 transition-colors duration-300" />;
    if (t.includes("supply chain") || t.includes("logistics")) return <Network className="h-6 w-6 transition-colors duration-300" />;
    if (t.includes("organiza") || t.includes("structure")) return <Building2 className="h-6 w-6 transition-colors duration-300" />;
    if (t.includes("data") || t.includes("metric") || t.includes("dashboard")) return <BarChart3 className="h-6 w-6 transition-colors duration-300" />;
    if (t.includes("cost") || t.includes("price") || t.includes("margin")) return <LineChart className="h-6 w-6 transition-colors duration-300" />;
    if (t.includes("digiti") || t.includes("tech") || t.includes("system")) return <Layout className="h-6 w-6 transition-colors duration-300" />;
    if (t.includes("erp")) return <Settings className="h-6 w-6 transition-colors duration-300" />;
    if (t.includes("manufactur") || t.includes("factor") || t.includes("production")) return <Factory className="h-6 w-6 transition-colors duration-300" />;
    if (t.includes("turnaround") || t.includes("transform")) return <RefreshCcw className="h-6 w-6 transition-colors duration-300" />;
    if (t.includes("growth") || t.includes("strategy")) return <TrendingUp className="h-6 w-6 transition-colors duration-300" />;

    const fallbacks = [
        <Briefcase key="0" className="h-6 w-6 transition-colors duration-300" />,
        <Box key="1" className="h-6 w-6 transition-colors duration-300" />,
    ];
    return fallbacks[index % fallbacks.length];
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
            return html
                .replace(/<[^>]+>/g, ' ')
                .replace(/\\n/g, ' ')
                .replace(/\n/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        }
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return (doc.body.textContent || "")
            .replace(/\\n/g, ' ')
            .replace(/\n/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    };

    if (loading && services.length === 0) return null;

    return (
        <section className="py-24 bg-black w-full text-white" id="services">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <div className="mb-16 md:mb-20">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans tracking-tight text-white font-bold leading-tight">
                        How I can help you
                    </h2>
                </div>

                {/* Traditional Simple Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                    {services.map((service, index) => {
                        const icon = getIconForService(service.title, index);
                        const description = extractPreviewText(service.what_i_do);

                        return (
                            <div
                                key={service.id}
                                className="group flex flex-col p-8 rounded-3xl border border-zinc-800 bg-zinc-950/50 hover:bg-slate-900/40 hover:border-yellow-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] cursor-pointer"
                            >
                                <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 text-zinc-300 group-hover:bg-yellow-600/10 group-hover:border-yellow-600/30 group-hover:text-yellow-500 transition-all duration-300">
                                    {icon}
                                </div>
                                <h3 className="text-xl md:text-2xl font-sans font-semibold text-white mb-4 group-hover:text-yellow-500 transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="font-sans text-base text-zinc-400 leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
