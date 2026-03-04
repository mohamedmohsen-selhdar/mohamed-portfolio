import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Case Studies & Results | Mohamed Mohsen Consulting",
    description: "Real-world examples of extreme organizational turnaround, cost reduction, and scalable growth.",
};

export default function CaseStudiesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
}
