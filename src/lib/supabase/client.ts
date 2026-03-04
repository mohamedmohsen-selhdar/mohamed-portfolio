import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qmhgckkqksnxwmxqllkp.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaGdja2txa3NueHdteHFsbGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MzA0OTgsImV4cCI6MjA4NzAwNjQ5OH0.5OM-6Uc83bIOhW_FCzQv2N63wxbfqXXlNgJ4aReLiRs'
    )
}
