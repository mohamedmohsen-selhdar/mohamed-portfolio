import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://mohamedmohsen.com'; // Adjust to actual production domain later

    // You can also dynamically fetch all Article IDs here to build dynamic URLs
    const lastModified = new Date();

    return [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/services`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/case-studies`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/articles`,
            lastModified,
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/free-templates`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];
}
