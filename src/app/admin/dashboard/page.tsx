"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { FileEdit, Plus, Trash2, LogOut } from "lucide-react";

type Article = {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    published: boolean;
    created_at: string;
};

export default function AdminDashboard() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
    const [statusMessage, setStatusMessage] = useState("");

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        checkUser();
        fetchArticles();
    }, []);

    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            router.push("/admin/login");
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    const fetchArticles = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setArticles(data);
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingArticle) return;

        setStatusMessage("Saving...");

        const isNew = !editingArticle.id;

        const articleData = {
            title: editingArticle.title,
            excerpt: editingArticle.excerpt || "",
            content: editingArticle.content || "",
            published: editingArticle.published || false,
        };

        if (isNew) {
            const { error } = await supabase.from('articles').insert([articleData]);
            if (error) setStatusMessage(`Error: ${error.message}`);
            else {
                setStatusMessage("Article created!");
                setEditingArticle(null);
                fetchArticles();
            }
        } else {
            const { error } = await supabase.from('articles').update(articleData).eq('id', editingArticle.id);
            if (error) setStatusMessage(`Error: ${error.message}`);
            else {
                setStatusMessage("Article updated!");
                setEditingArticle(null);
                fetchArticles();
            }
        }

        setTimeout(() => setStatusMessage(""), 3000);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this article?")) return;

        const { error } = await supabase.from('articles').delete().eq('id', id);
        if (!error) {
            fetchArticles();
        } else {
            alert(`Error deleting: ${error.message}`);
        }
    };

    const openEditor = (article?: Article) => {
        if (article) {
            setEditingArticle(article);
        } else {
            setEditingArticle({ title: "", excerpt: "", content: "", published: false });
        }
    };

    if (loading && articles.length === 0) {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Admin Workspace...</div>;
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>

            {/* Topbar */}
            <header style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--card-bg)' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Portfolio Command Center</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={handleLogout}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}
                    >
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
            </header>

            <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: editingArticle ? '1fr 2fr' : '1fr', gap: '2rem' }}>

                {/* Articles List / Sidebar */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Articles Database</h2>
                        <button
                            onClick={() => openEditor()}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--foreground)', color: 'var(--background)', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', border: 'none', fontWeight: 600 }}
                        >
                            <Plus size={16} /> New Article
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {articles.length === 0 && <p className="text-muted">No articles found.</p>}
                        {articles.map(article => (
                            <div key={article.id} style={{ padding: '1.5rem', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>{article.title}</h3>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                                        {new Date(article.created_at).toLocaleDateString()} • {article.published ? <span style={{ color: 'green' }}>Published</span> : <span style={{ color: 'orange' }}>Draft</span>}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => openEditor(article)} style={{ background: 'transparent', border: 'none', color: 'var(--foreground)', cursor: 'pointer', padding: '0.5rem' }}><FileEdit size={18} /></button>
                                    <button onClick={() => handleDelete(article.id)} style={{ background: 'transparent', border: 'none', color: 'var(--damped-red)', cursor: 'pointer', padding: '0.5rem' }}><Trash2 size={18} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Editor Panel */}
                {editingArticle && (
                    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1rem', padding: '2rem', height: 'fit-content' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{editingArticle.id ? 'Edit Article' : 'Compose Content'}</h2>
                            <button onClick={() => setEditingArticle(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.875rem' }}>Close Editor</button>
                        </div>

                        {statusMessage && <div style={{ padding: '0.75rem', background: 'rgba(0, 150, 255, 0.1)', color: '#0096ff', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>{statusMessage}</div>}

                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Headline / Title</label>
                                <input
                                    type="text"
                                    required
                                    value={editingArticle.title || ""}
                                    onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-subtle)', background: 'transparent', color: 'var(--foreground)', fontSize: '1rem' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Excerpt (Brief Summary)</label>
                                <textarea
                                    rows={3}
                                    value={editingArticle.excerpt || ""}
                                    onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-subtle)', background: 'transparent', color: 'var(--foreground)', fontSize: '1rem', resize: 'vertical' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Full Content (Markdown Supported)</label>
                                <textarea
                                    required
                                    rows={15}
                                    value={editingArticle.content || ""}
                                    onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-subtle)', background: 'transparent', color: 'var(--foreground)', fontSize: '1rem', resize: 'vertical', fontFamily: 'monospace' }}
                                />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <input
                                    type="checkbox"
                                    id="published"
                                    checked={editingArticle.published || false}
                                    onChange={(e) => setEditingArticle({ ...editingArticle, published: e.target.checked })}
                                    style={{ width: '1.25rem', height: '1.25rem' }}
                                />
                                <label htmlFor="published" style={{ fontSize: '1rem', fontWeight: 500 }}>Publish to live website</label>
                            </div>

                            <button
                                type="submit"
                                style={{ marginTop: '1rem', padding: '1rem', borderRadius: '0.5rem', background: 'var(--foreground)', color: 'var(--background)', fontWeight: 600, cursor: 'pointer', border: 'none' }}
                            >
                                Save Article to Database
                            </button>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
}
