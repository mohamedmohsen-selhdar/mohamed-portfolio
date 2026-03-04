"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { FileEdit, Plus, Trash2, LogOut } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import Quill to prevent SSR missing-document errors
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

type Article = {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    cover_image: string;
    published: boolean;
    created_at: string;
};

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
];

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

        // Force light mode explicitly for the admin dashboard
        document.documentElement.classList.add('light');
        return () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme !== 'light') {
                document.documentElement.classList.remove('light');
            }
        };
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
            cover_image: editingArticle.cover_image || null,
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
            setEditingArticle({ title: "", excerpt: "", content: "", cover_image: "", published: false });
        }
    };

    if (loading && articles.length === 0) {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', color: '#0f172a' }}>Loading Admin Workspace...</div>;
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a' }}>

            {/* Topbar */}
            <header style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Portfolio Command Center</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={handleLogout}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid #cbd5e1', color: '#64748b', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}
                    >
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
            </header>

            <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: editingArticle ? '1fr 2fr' : '1fr', gap: '2rem' }}>

                {/* Articles List / Sidebar */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Articles Database</h2>
                        <button
                            onClick={() => openEditor()}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#2563eb', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', border: 'none', fontWeight: 600, boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)' }}
                        >
                            <Plus size={16} /> New Article
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {articles.length === 0 && <p style={{ color: '#64748b' }}>No articles found.</p>}
                        {articles.map(article => (
                            <div key={article.id} style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>{article.title}</h3>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
                                        {new Date(article.created_at).toLocaleDateString()} • {article.published ? <span style={{ color: '#16a34a' }}>Published</span> : <span style={{ color: '#ea580c' }}>Draft</span>}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => openEditor(article)} style={{ background: '#f1f5f9', border: 'none', color: '#334155', borderRadius: '0.5rem', cursor: 'pointer', padding: '0.5rem' }}><FileEdit size={18} /></button>
                                    <button onClick={() => handleDelete(article.id)} style={{ background: '#fef2f2', border: 'none', color: '#ef4444', borderRadius: '0.5rem', cursor: 'pointer', padding: '0.5rem' }}><Trash2 size={18} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Editor Panel */}
                {editingArticle && (
                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '1rem', padding: '2rem', height: 'fit-content', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{editingArticle.id ? 'Edit Article' : 'Compose Content'}</h2>
                            <button onClick={() => setEditingArticle(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.875rem' }}>Close Editor</button>
                        </div>

                        {statusMessage && <div style={{ padding: '0.75rem', background: '#eff6ff', color: '#2563eb', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 500 }}>{statusMessage}</div>}

                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Headline / Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={editingArticle.title || ""}
                                        onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', fontSize: '1rem' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Cover Image URL (Optional)</label>
                                    <input
                                        type="url"
                                        value={editingArticle.cover_image || ""}
                                        placeholder="https://example.com/image.jpg"
                                        onChange={(e) => setEditingArticle({ ...editingArticle, cover_image: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', fontSize: '1rem' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Excerpt (Brief Summary)</label>
                                <textarea
                                    rows={3}
                                    value={editingArticle.excerpt || ""}
                                    onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', fontSize: '1rem', resize: 'vertical' }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Full Content</label>
                                <div style={{ background: '#ffffff', borderRadius: '0.5rem', overflow: 'hidden' }} className="quill-wrapper">
                                    <ReactQuill
                                        theme="snow"
                                        value={editingArticle.content || ""}
                                        onChange={(val) => setEditingArticle({ ...editingArticle, content: val })}
                                        modules={modules}
                                        formats={formats}
                                        style={{ height: '400px', paddingBottom: '40px' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem' }}>
                                <input
                                    type="checkbox"
                                    id="published"
                                    checked={editingArticle.published || false}
                                    onChange={(e) => setEditingArticle({ ...editingArticle, published: e.target.checked })}
                                    style={{ width: '1.25rem', height: '1.25rem', accentColor: '#2563eb' }}
                                />
                                <label htmlFor="published" style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a', cursor: 'pointer' }}>Publish to live website</label>
                            </div>

                            <button
                                type="submit"
                                style={{ marginTop: '1rem', padding: '1rem', borderRadius: '0.5rem', background: '#0f172a', color: '#ffffff', fontWeight: 600, cursor: 'pointer', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)' }}
                            >
                                Save Article to Database
                            </button>
                        </form>

                        {/* Custom CSS overrides for Quill in this dashboard specifically to match styling */}
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            .quill-wrapper .ql-toolbar {
                                border-top-left-radius: 0.5rem;
                                border-top-right-radius: 0.5rem;
                                border-color: #cbd5e1;
                                background-color: #f8fafc;
                            }
                            .quill-wrapper .ql-container {
                                border-bottom-left-radius: 0.5rem;
                                border-bottom-right-radius: 0.5rem;
                                border-color: #cbd5e1;
                                font-size: 1.125rem;
                                font-family: inherit;
                            }
                            .quill-wrapper .ql-editor {
                                min-height: 350px;
                            }
                        `}} />
                    </div>
                )}
            </main>
        </div>
    );
}
