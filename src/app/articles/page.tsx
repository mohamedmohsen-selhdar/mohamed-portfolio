"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function ArticlesIndex() {
    const [articles, setArticles] = useState<{ id: string, title: string, excerpt: string, created_at: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchArticles = async () => {
            const { data } = await supabase
                .from('articles')
                .select('id, title, excerpt, created_at')
                .eq('published', true)
                .order('created_at', { ascending: false });

            if (data) setArticles(data);
            setLoading(false);
        };
        fetchArticles();
    }, [supabase]);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            <main style={{ flexGrow: 1, paddingTop: '120px', paddingBottom: '6rem' }} className="container">
                <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                    Articles
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '4rem', maxWidth: '600px' }}>
                    Thoughts on industrial scaling, cost reduction, and brutal execution.
                </p>

                {loading ? (
                    <div style={{ padding: '2rem 0' }}>Loading library...</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', maxWidth: '800px' }}>
                        {articles.length === 0 && <p className="text-muted">No published articles yet.</p>}

                        {articles.map((article) => (
                            <Link href={`/articles/${article.id}`} key={article.id} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1.5rem', padding: '2rem', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'block' }}>
                                        {new Date(article.created_at).toLocaleDateString()}
                                    </span>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>{article.title}</h2>
                                    <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{article.excerpt}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
