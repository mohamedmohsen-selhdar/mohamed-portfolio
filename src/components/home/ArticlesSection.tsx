"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Article = {
    id: string;
    title: string;
    excerpt: string;
    created_at: string;
};

export default function ArticlesSection() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchLatestArticles = async () => {
            const { data } = await supabase
                .from('articles')
                .select('id, title, excerpt, created_at')
                .eq('published', true)
                .order('created_at', { ascending: false })
                .limit(3);

            if (data) setArticles(data);
            setLoading(false);
        };
        fetchLatestArticles();
    }, [supabase]);

    if (loading || articles.length === 0) return null; // Only show if published articles exist

    return (
        <section className="section" style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
                    <div>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                            Thoughts & Frameworks
                        </h2>
                        <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '600px' }}>
                            Writing on operations, growth, and execution.
                        </p>
                    </div>

                    <Link href="/articles" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--foreground)', textDecoration: 'none' }}>
                        View all <ArrowRight size={18} />
                    </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {articles.map((article, i) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            style={{
                                background: 'var(--card-bg)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '1.5rem',
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%'
                            }}
                        >
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'block' }}>
                                {new Date(article.created_at).toLocaleDateString()}
                            </span>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.3 }}>
                                <Link href={`/articles/${article.id}`} style={{ color: 'var(--foreground)', textDecoration: 'none' }}>
                                    {article.title}
                                </Link>
                            </h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: 1.6, flexGrow: 1, marginBottom: '2rem' }}>
                                {article.excerpt}
                            </p>
                            <Link href={`/articles/${article.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--foreground)', textDecoration: 'none', borderBottom: '1px solid var(--foreground)', paddingBottom: '0.25rem', alignSelf: 'flex-start' }}>
                                Read Article
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
