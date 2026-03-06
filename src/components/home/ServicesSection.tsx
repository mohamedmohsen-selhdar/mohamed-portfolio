"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Check } from "lucide-react";

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
    const [activeIndex, setActiveIndex] = useState(0);
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

    // Helper to get checkmark list from what_you_get
    const getHighlights = (text: string) => {
        if (!text) return [];
        return text.split(/\\n|\n|<br\s*\/?>/g).filter(p => p.trim().length > 0);
    };

    if (loading && services.length === 0) return null;

    return (
        <section className="py-24 bg-[#0a0a0a] w-full text-white" id="services">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">

                {/* Section Header */}
                <div className="mb-16 md:mb-20 text-center flex flex-col items-center">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans tracking-tight font-bold mb-6">
                        Consulting Capabilities
                    </h2>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-3xl leading-relaxed">
                        From single strategy sessions to full-scale problem resolution, our expert methodologies deliver tangible results exactly when you need them.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 lg:gap-8 w-full mt-10">

                    {/* Left side: Vertical Tabs */}
                    <div className="flex flex-row md:flex-col w-full md:w-[280px] lg:w-[320px] overflow-x-auto hide-scrollbar shrink-0 pb-4 md:pb-0">
                        {services.map((service, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <button
                                    key={service.id}
                                    onClick={() => setActiveIndex(index)}
                                    className={`text-left px-5 py-5 transition-all duration-300 whitespace-nowrap md:whitespace-normal font-sans text-sm md:text-base lg:text-[1.05rem] rounded-none ${isActive
                                            ? "bg-[#18181b] border-l-[3px] border-white text-white font-medium"
                                            : "border-l-[3px] border-transparent text-zinc-500 hover:text-zinc-300"
                                        }`}
                                >
                                    {service.title}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right side: Content Card */}
                    <div className="flex-1 w-full min-h-[500px]">
                        {services.length > 0 && services[activeIndex] && (
                            <div className="bg-[#111111] border border-[#222222] rounded-2xl p-8 md:p-12 w-full h-full relative flex flex-col justify-between">

                                {/* Inner Top Right Button */}
                                <div className="absolute top-8 right-8 hidden md:block z-10">
                                    <button className="px-5 py-2.5 rounded-lg border border-[#333333] text-sm font-medium text-zinc-300 hover:text-white hover:border-white transition-all duration-300">
                                        Learn More
                                    </button>
                                </div>

                                <div className="w-full lg:w-[80%] pr-0 md:pr-12 relative z-10">
                                    {/* The title - First half white, second half gray */}
                                    {(() => {
                                        const words = services[activeIndex].title.split(" ");
                                        const half = Math.ceil(words.length / 2);
                                        const firstHalf = words.slice(0, half).join(" ");
                                        const secondHalf = words.slice(half).join(" ");
                                        return (
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-sans font-semibold mb-6 leading-tight tracking-tight">
                                                <span className="text-white block md:inline">{firstHalf} </span>
                                                <span className="text-zinc-500 block md:inline">{secondHalf}</span>
                                            </h3>
                                        );
                                    })()}

                                    {/* Description */}
                                    <div className="text-zinc-400 text-base md:text-lg leading-relaxed mb-10 mt-6 md:mt-10"
                                        dangerouslySetInnerHTML={{ __html: services[activeIndex].what_i_do.replace(/\\n/g, '<br/>') }}
                                    />

                                    {/* Features Checkmark List */}
                                    <div className="flex flex-col gap-4 mt-8 md:mt-12">
                                        {getHighlights(services[activeIndex].what_you_get).map((highlight, index) => (
                                            <div key={index} className="flex items-start gap-4">
                                                <Check className="w-5 h-5 text-white mt-1 shrink-0" />
                                                <div
                                                    className="text-zinc-300 text-base md:text-[1.05rem] leading-relaxed font-medium"
                                                    dangerouslySetInnerHTML={{ __html: highlight }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Background Image/Gradient Space placeholder on the right side */}
                                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#18181b] to-transparent opacity-50 z-0 pointer-events-none rounded-r-2xl hidden lg:block" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </section>
    );
}
