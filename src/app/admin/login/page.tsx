"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        let authError;

        if (isSignUp) {
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password
            });
            authError = signUpError;
            if (!authError) {
                setError("Signup complete. Check your email to verify (if enabled), or simply switch to Login.");
                setLoading(false);
                setIsSignUp(false);
                return;
            }
        } else {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            authError = signInError;
        }

        if (authError) {
            setError(authError.message);
            setLoading(false);
        } else if (!isSignUp) {
            router.push("/admin/dashboard");
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--background)' }}>
            <div style={{ padding: '2.5rem', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1rem', width: '100%', maxWidth: '400px' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--foreground)' }}>
                    Admin {isSignUp ? "Signup" : "Login"}
                </h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.875rem' }}>
                    Access the portfolio control center.
                </p>

                {error && <div style={{ padding: '0.75rem', background: 'rgba(255, 0, 0, 0.1)', border: '1px solid var(--damped-red)', borderRadius: '0.5rem', color: 'var(--damped-red)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>{error}</div>}

                <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--foreground)' }}>Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-subtle)', background: 'transparent', color: 'var(--foreground)', fontSize: '1rem' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--foreground)' }}>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-subtle)', background: 'transparent', color: 'var(--foreground)', fontSize: '1rem' }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{ marginTop: '0.5rem', padding: '0.875rem', borderRadius: '0.5rem', background: 'var(--foreground)', color: 'var(--background)', fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'opacity 0.2s', opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Processing...' : (isSignUp ? 'Create Admin Account' : 'Sign In')}
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.875rem', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        {isSignUp ? "Already have an account? Login here." : "Need an account? Sign up here."}
                    </button>
                </form>
            </div>
        </div>
    );
}
