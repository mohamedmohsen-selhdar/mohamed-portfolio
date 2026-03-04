"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ArticleView({ params }: { params: { id: string } }) {
    const [article, setArticle] = useState<{ id: string, title: string, excerpt: string, content: string, created_at: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchArticle = async () => {
            const { data } = await supabase
                .from('articles')
                .select('*')
                .eq('id', params.id)
                .single();

            if (data) setArticle(data);
            setLoading(false);
        };
        fetchArticle();
    }, [params.id, supabase]);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flexGrow: 1, paddingTop: '120px', paddingBottom: '6rem', maxWidth: '800px', margin: '0 auto', width: '100%' }} className="container">
                <Link href="/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '3rem', fontWeight: 500 }}>
                    <ArrowLeft size={18} /> Back to Articles
                </Link>

                {loading ? (
                    <div style={{ padding: '2rem 0' }}>Loading article...</div>
                ) : !article ? (
                    <div style={{ padding: '2rem 0' }}>Article not found.</div>
                ) : (
                    <article>
                        <header style={{ marginBottom: '3rem' }}>
                            <span style={{ fontSize: '1rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1rem', fontWeight: 500 }}>
                                {new Date(article.created_at).toLocaleDateString()}
                            </span>
                            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                                {article.title}
                            </h1>
                            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.6, borderLeft: '4px solid var(--card-border)', paddingLeft: '1.5rem' }}>
                                {article.excerpt}
                            </p>
                        </header>

                        <div style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--foreground)', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-primary)' }}>
                            {article.content}
                        </div>
                    </article>
                )}
            </main>

            <Footer />
        </div>
    );
}
