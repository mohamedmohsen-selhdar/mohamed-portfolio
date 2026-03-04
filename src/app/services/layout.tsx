import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Services | Mohamed Mohsen Consulting",
    description: "End-to-end consulting spanning process engineering, supply chain excellence, and organizational design.",
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
}
