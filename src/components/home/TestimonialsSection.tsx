"use client";

import { StaggerTestimonials, TestimonialType } from "@/components/ui/stagger-testimonials";

const mockTestimonials: TestimonialType[] = [
    {
        tempId: 1,
        testimonial: "Mohamed's strategic intervention completely transformed our operational efficiency. His ability to drill down to the core issues and implement sustainable processes is unmatched.",
        by: "Mr. Abdo Shoulah",
        role: "CEO",
        company: "RICHIE Furniture",
    },
    {
        tempId: 2,
        testimonial: "Working with Mohamed was a turning point for GP Plast. His insights into our supply chain directly impacted our bottom line. He brings a rare combination of industrial expertise and practical execution.",
        by: "Peter Magdy",
        role: "CEO",
        company: "GP Plast",
    },
    {
        tempId: 3,
        testimonial: "The clarity and direction we gained from his consulting sessions were invaluable. He has a unique talent for taking complex business challenges and breaking them down into actionable steps.",
        by: "Ayman Hosny",
        role: "CEO",
        company: "in&In",
    },
    {
        tempId: 4,
        testimonial: "Every time we hit a production bottleneck, Mohamed's engineering frameworks help us map the exact root cause. We operate at a completely different efficiency level now.",
        by: "M.Saad",
        role: "CEO",
        company: "Alamain outdoor furniture",
    },
    {
        tempId: 5,
        testimonial: "He doesn't just provide consulting; he provides actual execution architecture. We scaled our regional distribution by 3X entirely through his optimization roadmaps.",
        by: "Mohamed El-sharkawy",
        role: "CEO",
        company: "APT Sharky",
    }
];

export default function TestimonialsSection() {
    return (
        <section className="py-24 bg-[#0a0a0a] overflow-hidden relative" id="testimonials">
            <div className="container mx-auto px-4 md:px-6 z-10 relative">
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-4xl md:text-6xl font-sans tracking-tight text-white font-bold mb-6">
                        Client Success
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Real-world transformations driven by precision methodologies and uncompromised standards.
                    </p>
                </div>
            </div>

            {/* Staggered Cards UI Demo Frame */}
            <div className="w-full flex justify-center items-center py-10 relative">
                <div className="w-full max-w-[1200px] mx-auto px-4 md:px-0">
                    <StaggerTestimonials initialTestimonials={mockTestimonials} />
                </div>
            </div>
        </section>
    );
}
