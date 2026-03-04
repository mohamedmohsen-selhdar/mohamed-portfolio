import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Articles & Frameworks | Mohamed Mohsen Consulting",
    description: "Thoughts on industrial scaling, cost reduction, and brutal execution.",
};

export default function ArticlesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
}
