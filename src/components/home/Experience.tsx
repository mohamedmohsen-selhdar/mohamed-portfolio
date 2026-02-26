"use client";

import { motion } from "framer-motion";

const experiences = [
    { company: "Tamken Consulting", role: "Founder & Managing Director", date: "Current", location: "Egypt" },
    { company: "Various SMEs", role: "Business Design Consultant", date: "2020 - 2023", location: "Remote" },
    { company: "Manufacturing Co.", role: "Supply Chain Analyst", date: "2018 - 2020", location: "Cairo" }
];

export default function Experience() {
    return (
        <section id="experience" className="container section">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}
            >
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#a5b4fc', color: '#312e81', padding: '1rem 2rem', borderRadius: '9999px', fontWeight: 600, fontSize: '1.25rem', marginBottom: '4rem' }}>
                    Experience & Expertise
                </div>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '1000px', margin: '0 auto' }}>
                {/* Table Header */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr', paddingBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.4)', color: '#b4a0f8', fontWeight: 500, fontSize: '1rem' }}>
                    <div>Company</div>
                    <div>Role</div>
                    <div>Date</div>
                    <div>Location</div>
                </div>

                {/* Table Rows */}
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 2fr 1.5fr 1fr',
                            padding: '1.5rem 0',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            alignItems: 'center',
                            fontSize: '1.125rem'
                        }}
                    >
                        <div style={{ fontWeight: 500 }}>{exp.company}</div>
                        <div style={{ color: 'var(--text-muted)' }}>{exp.role}</div>
                        <div style={{ color: 'var(--text-muted)' }}>{exp.date}</div>
                        <div style={{ color: 'var(--text-muted)' }}>{exp.location}</div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
