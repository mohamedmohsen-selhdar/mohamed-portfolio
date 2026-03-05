"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Box, Lock, Sparkles, Settings, Search, Layout } from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceData = {
    id: string;
    title: string;
    what_i_do: string;
};

const ICONS = [
    <Box key="1" className="h-4 w-4 text-white/80" />,
    <Settings key="2" className="h-4 w-4 text-white/80" />,
    <Lock key="3" className="h-4 w-4 text-white/80" />,
    <Sparkles key="4" className="h-4 w-4 text-white/80" />,
    <Search key="5" className="h-4 w-4 text-white/80" />,
    <Layout key="6" className="h-4 w-4 text-white/80" />
];

const AREAS = [
    "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
    "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
];

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
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-balance">
                        How I can help you
                    </h2>
                    <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase">
                        (SERVICES)
                    </p>
                </div>

                <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
                    {services.map((service, index) => {
                        const icon = ICONS[index % ICONS.length];
                        const area = AREAS[index % AREAS.length];
                        const description = stripHtml(service.what_i_do).substring(0, 100) + "...";

                        return (
                            <GridItem
                                key={service.id}
                                area={area}
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
    area: string;
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
    return (
        <li className={cn("min-h-[14rem] list-none", area)}>
            <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-zinc-800 p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-zinc-900 bg-zinc-950 p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className="w-fit rounded-lg border-[0.75px] border-zinc-800 bg-black p-2">
                            {icon}
                        </div>
                        <div className="space-y-3 mt-8 md:mt-16">
                            <h3 className="pt-0.5 text-xl leading-[1.375rem] font-bold font-sans tracking-[-0.02em] md:text-2xl md:leading-[1.875rem] text-balance text-white">
                                {title}
                            </h3>
                            <h2 className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-zinc-400 font-medium">
                                {description}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};
