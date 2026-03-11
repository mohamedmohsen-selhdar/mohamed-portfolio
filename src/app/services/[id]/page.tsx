"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, TrendingUp, Briefcase } from "lucide-react";
import { services as localServices } from "@/data/content";

type ServiceData = {
    id: string;
    title: string;
    what_i_do: string;
    who_this_is_for?: string;
    when_to_hire_me?: string;
    what_you_get?: string;
    // Local fallback fields
    whatIDo?: string;
    deliverables?: string[];
    expectedImpact?: string[];
    projectsDelivered?: string;
    projectNames?: string[];
};

export default function ServiceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [service, setService] = useState<ServiceData | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchService = async () => {
            if (!params?.id) return;
            
            // 1. Try to find local match first (since it holds rich deliverables array)
            const localMatch = localServices.find(s => s.id === params.id);
            
            // 2. Fetch from Supabase
            const { data } = await supabase
                .from('services')
                .select('*')
                .eq('id', params.id as string)
                .single();

            // Merge logic: Prioritize Supabase dynamic content but fall back/enrich with local structured data 
            if (data) {
                setService({
                    ...localMatch, // Spread local for rich array fields
                    ...data, // Override with Supabase live DB edits
                });
            } else if (localMatch) {
                setService(localMatch as unknown as ServiceData);
            }
            
            setLoading(false);
        };
        fetchService();
    }, [params?.id]);

    if (loading) {
        return (
            <main className="container section flex justify-center items-center" style={{ minHeight: '100vh' }}>
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-10 w-10 border-t-2 border-b-2 border-red-800 rounded-full animate-spin mb-4" />
                    <p className="text-zinc-500" style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>Loading Service Details...</p>
                </div>
            </main>
        );
    }

    if (!service) {
        return (
            <main className="container section flex flex-col items-center justify-center text-center" style={{ minHeight: '100vh', paddingTop: '120px' }}>
                <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>Service Not Found</h1>
                <p className="text-zinc-400 mb-8" style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>The service you're looking for doesn't exist or has been removed.</p>
                <button onClick={() => router.push('/services')} className="pill hover:bg-white hover:text-black transition cursor-pointer" style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>
                    <ArrowLeft size={16} className="mr-2" /> Back to Services
                </button>
            </main>
        );
    }

    // Process Text for rendering HTML if came from Supabase rich text
    const renderHtml = (htmlContent: string | undefined, localFallback: string | undefined) => {
        if (htmlContent) {
             return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
        }
        return <p className="text-zinc-300 leading-relaxed text-lg" style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>{localFallback}</p>;
    }

    return (
        <main className="container section relative" style={{ paddingTop: '120px', minHeight: '100vh' }}>
            {/* Background Effects */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />
            
            <button 
                onClick={() => router.push('/services')} 
                className="mb-10 flex items-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                style={{ fontFamily: 'var(--font-cairo), sans-serif' }}
            >
                <ArrowLeft size={20} className="mr-2" />
                Back to all services
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-cairo), sans-serif', letterSpacing: '-0.02em' }}>
                    {service.title}
                </h1>
                
                <div className="aura-card p-8 md:p-12 mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4 border-b border-zinc-800 pb-4" style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>Overview</h2>
                    <div className="text-zinc-300 text-lg leading-relaxed space-y-4" style={{ fontFamily: 'var(--font-cairo), sans-serif', fontWeight: 400 }}>
                        {renderHtml(service.what_i_do, service.whatIDo)}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Deliverables / What You Get */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="aura-card p-8"
                    >
                        <div className="flex items-center mb-6">
                            <CheckCircle2 size={28} className="text-red-800 mr-3" />
                            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>Key Deliverables</h3>
                        </div>
                        
                        {service.what_you_get ? (
                            <div className="text-zinc-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: service.what_you_get }} style={{ fontFamily: 'var(--font-cairo), sans-serif' }} />
                        ) : (
                            <ul className="space-y-3">
                                {service.deliverables?.map((item, idx) => (
                                    <li key={idx} className="flex items-start text-zinc-300">
                                        <span className="text-red-800 mr-2 mt-1">•</span>
                                        <span style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </motion.div>

                    {/* Expected Impact */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="aura-card p-8"
                    >
                        <div className="flex items-center mb-6">
                            <TrendingUp size={28} className="text-red-800 mr-3" />
                            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>Expected Impact</h3>
                        </div>
                        
                        {service.when_to_hire_me && !service.expectedImpact ? (
                            <div className="text-zinc-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: service.when_to_hire_me }} style={{ fontFamily: 'var(--font-cairo), sans-serif' }} />
                        ) : !!service.expectedImpact ? (
                            <ul className="space-y-3">
                                {service.expectedImpact?.map((item, idx) => (
                                    <li key={idx} className="flex items-start text-zinc-300">
                                        <span className="text-red-800 mr-2 mt-1">•</span>
                                        <span style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-zinc-500 italic">No expected impact data specified.</p>
                        )}
                    </motion.div>
                </div>

                {/* Projects Delivered */}
                {service.projectsDelivered && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="aura-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between border-l-4 border-l-red-800"
                    >
                        <div className="mb-6 md:mb-0 md:mr-8 flex-1">
                            <h3 className="text-2xl font-bold text-white mb-4 flex items-center" style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>
                                <Briefcase size={24} className="mr-2 text-zinc-400" />
                                Track Record
                            </h3>
                            <p className="text-zinc-300 text-lg leading-relaxed" style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>
                                {service.projectsDelivered}
                            </p>
                        </div>
                        <div className="w-full md:w-1/3">
                            <h4 className="text-sm text-zinc-500 uppercase tracking-widest font-bold mb-3" style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>Example Projects</h4>
                            <ul className="space-y-2">
                                {service.projectNames?.map((name, idx) => (
                                    <li key={idx} className="bg-[#111111] border border-zinc-800 text-zinc-300 px-4 py-2 rounded-lg text-sm" style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </main>
    );
}
