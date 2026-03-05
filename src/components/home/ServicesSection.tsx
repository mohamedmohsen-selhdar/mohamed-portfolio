"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import {
    Box,
    Lock,
    Sparkles,
    Settings,
    Search,
    Layout,
    BarChart3,
    Network,
    Building2,
    LineChart,
    Factory,
    RefreshCcw,
    TrendingUp,
    Workflow,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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

    // Process Engineering / Operations
    if (t.includes("process") || t.includes("operation")) return <Workflow className="h-4 w-4 text-white" />;

    // Supply Chain
    if (t.includes("supply chain") || t.includes("logistics")) return <Network className="h-4 w-4 text-white" />;

    // Organization / HR
    if (t.includes("organiza") || t.includes("structure")) return <Building2 className="h-4 w-4 text-white" />;

    // Data / DDDM / Metrics
    if (t.includes("data") || t.includes("metric") || t.includes("dashboard")) return <BarChart3 className="h-4 w-4 text-white" />;

    // Cost / Pricing / Finance
    if (t.includes("cost") || t.includes("price") || t.includes("margin")) return <LineChart className="h-4 w-4 text-white" />;

    // Digital / Tech
    if (t.includes("digiti") || t.includes("tech") || t.includes("system")) return <Layout className="h-4 w-4 text-white" />;
    if (t.includes("erp")) return <Settings className="h-4 w-4 text-white" />;

    // Manufacturing / Factory
    if (t.includes("manufactur") || t.includes("factor") || t.includes("production")) return <Factory className="h-4 w-4 text-white" />;

    // Turnaround / Transformation
    if (t.includes("turnaround") || t.includes("transform")) return <RefreshCcw className="h-4 w-4 text-white" />;

    // Growth / Strategy
    if (t.includes("growth") || t.includes("strategy")) return <TrendingUp className="h-4 w-4 text-white" />;

    // Fallbacks
    const FALLBACK_ICONS = [
        <Box key="1" className="h-4 w-4 text-white" />,
        <Sparkles key="2" className="h-4 w-4 text-white" />,
        <Lock key="3" className="h-4 w-4 text-white" />,
        <Search key="4" className="h-4 w-4 text-white" />
    ];

    return FALLBACK_ICONS[index % FALLBACK_ICONS.length];
};

// We will use standard symmetric layout classes to prevent Tailwind JIT compilation failures.
// A clean 3-column grid is highly stable for any number of services.

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

    return (
        <section className="py-24 bg-black w-full text-white overflow-hidden relative" id="services">
            <div className="w-full max-w-[85rem] px-4 md:px-6 mx-auto relative z-10">
                <div className="mb-20 md:mb-32 flex flex-col items-start text-left max-w-3xl">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans tracking-tight text-white leading-none" style={{ fontWeight: 650 }}>
                        How I can help you
                    </h2>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-fr">
                    {services.map((service, index) => {
                        const icon = getIconForService(service.title, index);

                        // Extract clean text
                        let description = extractPreviewText(service.what_i_do);

                        const total = services.length;
                        const remainderLg = total % 3;
                        const remainderMd = total % 2;

                        let spanClass = "col-span-1 md:col-span-1 lg:col-span-2"; // default

                        // Fix last items in LG to prevent gaps
                        if (remainderLg === 1 && index === total - 1) {
                            spanClass = "col-span-1 md:col-span-1 lg:col-start-3 lg:col-span-2"; // center it
                        } else if (remainderLg === 2 && index >= total - 2) {
                            spanClass = "col-span-1 md:col-span-1 lg:col-span-3"; // split 50/50
                        }

                        // Fix last items in MD
                        if (remainderMd === 1 && index === total - 1) {
                            spanClass = spanClass.replace("md:col-span-1", "md:col-span-2");
                        }

                        return (
                            <GridItem
                                key={service.id}
                                className={spanClass}
                                icon={icon}
                                title={service.title}
                                description={description}
                            />
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

interface GridItemProps {
    className?: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}

const GridItem = ({ className = "", icon, title, description }: GridItemProps) => {
    return (
        <li className={cn("list-none group flex h-full", className)}>
            <div
                className="relative w-full h-full rounded-[1.25rem] border-[0.75px] border-zinc-800/80 p-2 md:rounded-[1.5rem] md:p-3 transition-colors duration-300 group-hover:border-zinc-700"
            >
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                />
                <div className="relative z-10 flex h-full min-h-[16rem] flex-col items-start text-left overflow-hidden rounded-xl border-[0.75px] border-zinc-800/60 bg-zinc-950 p-6 xl:p-8 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] transition-colors duration-300 group-hover:bg-zinc-900/50">
                    <div className="w-fit rounded-lg border border-zinc-700/50 bg-zinc-900 shadow-inner p-3 transition-transform duration-300 group-hover:bg-zinc-800 group-hover:scale-105 mb-auto flex items-center justify-center">
                        {icon}
                    </div>
                    <div className="w-full flex-1 flex flex-col justify-end mt-12">
                        <h3 className="text-xl md:text-[1.35rem] leading-tight font-sans tracking-[-0.02em] text-white font-semibold w-full mb-3">
                            {title}
                        </h3>
                        {/* Display full content without truncation */}
                        <p className="font-sans text-sm md:text-[0.95rem] leading-relaxed text-zinc-400 font-normal w-full">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </li>
    );
};
