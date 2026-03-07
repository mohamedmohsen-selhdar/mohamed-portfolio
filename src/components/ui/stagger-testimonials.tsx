"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const SQRT_5000 = Math.sqrt(5000);

export type TestimonialType = {
    tempId: number;
    testimonial: string;
    by: string;
    role: string;
    company: string;
};

interface TestimonialCardProps {
    position: number;
    testimonial: TestimonialType;
    handleMove: (steps: number) => void;
    cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
    position,
    testimonial,
    handleMove,
    cardSize
}) => {
    const isCenter = position === 0;

    return (
        <div
            onClick={() => handleMove(position)}
            className={cn(
                "absolute left-1/2 top-1/2 cursor-pointer border p-10 md:p-14 transition-all duration-500 ease-in-out flex flex-col justify-between",
                isCenter
                    ? "z-10 bg-[#111111] text-white border-zinc-500"
                    : "z-0 bg-[#0a0a0a] text-zinc-500 border-[#222222] hover:border-[#333333]"
            )}
            style={{
                width: cardSize,
                height: cardSize,
                clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
                transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
                boxShadow: isCenter ? "0px 6px 0px 4px rgba(153, 27, 27, 0.4)" : "0px 0px 0px 0px transparent"
            }}
        >
            <span
                className={cn(
                    "absolute block origin-top-right rotate-45",
                    isCenter ? "bg-zinc-500" : "bg-[#222222]"
                )}
                style={{
                    right: -2,
                    top: 48,
                    width: SQRT_5000,
                    height: 1
                }}
            />
            <div className="relative z-10">
                <div className="mb-6 h-16 w-16 rounded-full border border-[#333333] flex items-center justify-center bg-zinc-800" style={{ boxShadow: isCenter ? "3px 3px 0px rgba(153, 27, 27, 0.7)" : "none" }}>
                    <span className="text-2xl font-bold font-sans text-zinc-300 uppercase" style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>
                        {testimonial.by.charAt(0)}
                    </span>
                </div>
                <h3
                    className={cn(
                        "text-lg md:text-2xl font-bold leading-relaxed",
                        isCenter ? "text-white" : "text-zinc-400"
                    )}
                    style={{ fontFamily: 'var(--font-cairo), sans-serif' }}
                >
                    "{testimonial.testimonial}"
                </h3>
            </div>

            <div className={cn(
                "mt-8 border-t pt-6",
                isCenter ? "border-[#333333]" : "border-[#1a1a1a]"
            )}>
                <p
                    className={cn(
                        "text-xl font-bold",
                        isCenter ? "text-white" : "text-zinc-500"
                    )}
                    style={{ fontFamily: 'var(--font-cairo), sans-serif' }}
                >
                    {testimonial.by}
                </p>
                <p
                    className={cn(
                        "text-base mt-1",
                        isCenter ? "text-zinc-400" : "text-zinc-600 font-normal"
                    )}
                    style={{ fontFamily: 'var(--font-cairo), sans-serif', fontWeight: 400 }}
                >
                    {testimonial.role}, {testimonial.company}
                </p>
            </div>
        </div>
    );
};

export const StaggerTestimonials: React.FC<{ initialTestimonials: TestimonialType[] }> = ({ initialTestimonials }) => {
    const [cardSize, setCardSize] = useState(380);
    const [testimonialsList, setTestimonialsList] = useState(initialTestimonials);

    const handleMove = (steps: number) => {
        const newList = [...testimonialsList];
        if (steps > 0) {
            for (let i = steps; i > 0; i--) {
                const item = newList.shift();
                if (!item) return;
                newList.push({ ...item, tempId: Math.random() });
            }
        } else {
            for (let i = steps; i < 0; i++) {
                const item = newList.pop();
                if (!item) return;
                newList.unshift({ ...item, tempId: Math.random() });
            }
        }
        setTestimonialsList(newList);
    };

    useEffect(() => {
        const updateSize = () => {
            const { matches } = window.matchMedia("(min-width: 640px)");
            setCardSize(matches ? 460 : 360);
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // Autoplay Loop
    useEffect(() => {
        const interval = setInterval(() => {
            handleMove(1);
        }, 5000); // loops every 5 seconds
        return () => clearInterval(interval);
    }, [testimonialsList]);

    return (
        <div
            className="relative w-full overflow-hidden bg-transparent"
            style={{ height: 600 }}
        >
            {testimonialsList.map((testimonial, index) => {
                const position = testimonialsList.length % 2
                    ? index - (testimonialsList.length + 1) / 2
                    : index - testimonialsList.length / 2;
                return (
                    <TestimonialCard
                        key={testimonial.tempId}
                        testimonial={testimonial}
                        handleMove={handleMove}
                        position={position}
                        cardSize={cardSize}
                    />
                );
            })}

            {/* Navigation Layer */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-4 z-20">
                <button
                    onClick={() => handleMove(-1)}
                    className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300",
                        "bg-[#111111] border border-[#333333] text-zinc-400",
                        "hover:border-[rgba(153,27,27,0.6)] hover:bg-[rgba(153,27,27,0.1)] hover:text-[#ef4444] hover:shadow-[0_0_15px_rgba(153,27,27,0.5)]",
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
                        "bg-[#111111] border border-[#333333] text-zinc-400",
                        "hover:border-[rgba(153,27,27,0.6)] hover:bg-[rgba(153,27,27,0.1)] hover:text-[#ef4444] hover:shadow-[0_0_15px_rgba(153,27,27,0.5)]",
                        "focus-visible:outline-none"
                    )}
                    aria-label="Next testimonial"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Gradient overlays to naturally fade out edges on large screens */}
            <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        </div>
    );
};
