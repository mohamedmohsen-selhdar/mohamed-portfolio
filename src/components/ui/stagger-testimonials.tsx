"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export type TestimonialType = {
    tempId: number;
    testimonial: string;
    by: string;
    role: string;
    company: string;
};

export const StaggerTestimonials: React.FC<{ initialTestimonials: TestimonialType[] }> = ({ initialTestimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

    const handleMove = (newDirection: number) => {
        setDirection(newDirection);
        if (newDirection > 0) {
            setCurrentIndex((prev) => (prev + 1) % initialTestimonials.length);
        } else {
            setCurrentIndex((prev) => (prev - 1 + initialTestimonials.length) % initialTestimonials.length);
        }
    };

    // Autoplay Loop
    useEffect(() => {
        const interval = setInterval(() => {
            handleMove(1);
        }, 6000); // Loops every 6 seconds
        return () => clearInterval(interval);
    }, [currentIndex]);

    const activeTestimonial = initialTestimonials[currentIndex];

    // Animation variants for card slide/fade
    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 30 : -30,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (dir: number) => ({
            x: dir < 0 ? 30 : -30,
            opacity: 0
        })
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4">
            <div className="relative min-h-[320px] md:min-h-[280px] flex items-center justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="w-full aura-card p-8 md:p-12 relative flex flex-col justify-between"
                        style={{
                            borderLeft: '4px solid #8b0000',
                            background: 'rgba(25, 25, 25, 0.45)',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        {/* Large Quote Icon Watermark */}
                        <div className="absolute top-6 right-8 text-[#8b0000]/10 pointer-events-none">
                            <Quote size={80} strokeWidth={1} />
                        </div>

                        <div className="relative z-10">
                            {/* Quote text */}
                            <p 
                                className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-100 italic mb-8"
                                style={{ fontFamily: 'var(--font-cairo), sans-serif' }}
                            >
                                "{activeTestimonial.testimonial}"
                            </p>
                        </div>

                        {/* Author info */}
                        <div className="relative z-10 flex items-center gap-4 border-t border-zinc-800/60 pt-6">
                            <div className="h-12 w-12 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center text-zinc-200 font-bold text-lg">
                                {activeTestimonial.by.charAt(0)}
                            </div>
                            <div>
                                <h4 
                                    className="text-lg font-bold text-white leading-none mb-1"
                                    style={{ fontFamily: 'var(--font-cairo), sans-serif' }}
                                >
                                    {activeTestimonial.by}
                                </h4>
                                <p 
                                    className="text-sm text-zinc-400"
                                    style={{ fontFamily: 'var(--font-cairo), sans-serif' }}
                                >
                                    {activeTestimonial.role}, <span className="text-[#ef4444] font-medium">{activeTestimonial.company}</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-8">
                {/* Dot Indicators */}
                <div className="flex gap-2">
                    {initialTestimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className={cn(
                                "h-2 rounded-full transition-all duration-300",
                                index === currentIndex 
                                    ? "w-8 bg-[#ef4444]" 
                                    : "w-2 bg-zinc-700 hover:bg-zinc-500"
                            )}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Arrow Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={() => handleMove(-1)}
                        className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300",
                            "bg-[#111111] border border-zinc-800 text-zinc-400",
                            "hover:border-[#8b0000]/60 hover:bg-[#8b0000]/10 hover:text-[#ef4444] hover:shadow-[0_0_15px_rgba(139,0,0,0.4)]",
                            "focus-visible:outline-none"
                        )}
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => handleMove(1)}
                        className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300",
                            "bg-[#111111] border border-zinc-800 text-zinc-400",
                            "hover:border-[#8b0000]/60 hover:bg-[#8b0000]/10 hover:text-[#ef4444] hover:shadow-[0_0_15px_rgba(139,0,0,0.4)]",
                            "focus-visible:outline-none"
                        )}
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};
