const fs = require('fs');

const content = fs.readFileSync('content.md', 'utf-8');

// The markdown file escapes parentheses like 1\)
const unescapedContent = content.replace(/\\\)/g, ')');

const [servicesSection, caseStudiesSection] = unescapedContent.split('__Case studies __');

const servicesRaw = (servicesSection || "").split(/(?=\d+\)\s)/).slice(1);
const caseStudiesRaw = (caseStudiesSection || "").split(/(?=\d+\)\s)/).slice(1);

function parseList(text) {
    if (!text) return [];
    return text.split('\n').filter(line => line.trim().startsWith('-')).map(line => line.replace(/^- /, '').replace(/__/g, '').replace(/\\/g, '').trim());
}

const services = servicesRaw.map(s => {
    const titleMatch = s.match(/\d+\)\s(.+)/);
    const title = titleMatch ? titleMatch[1].replace(/__/g, '').replace(/\\/g, '').trim() : '';

    const whatIDoMatch = s.match(/__What I Do__([\s\S]*?)__Deliverables__/i);
    const whatIDo = whatIDoMatch ? whatIDoMatch[1].replace(/__/g, '').replace(/\\/g, '').trim() : '';

    const deliverablesMatch = s.match(/__Deliverables__([\s\S]*?)__Expected Impact__/i);
    const deliverables = parseList(deliverablesMatch ? deliverablesMatch[1] : "");

    const impactMatch = s.match(/__Expected Impact__([\s\S]*?)__Projects Delivered__/i);
    const expectedImpact = parseList(impactMatch ? impactMatch[1] : "");

    const projectsMatch = s.match(/__Projects Delivered__([\s\S]*)/i);
    const projectsDelivered = projectsMatch ? projectsMatch[1].replace(/__/g, '').replace(/\\/g, '').trim() : '';

    return {
        id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title,
        whatIDo,
        deliverables,
        expectedImpact,
        projectsDelivered
    };
}).filter(s => s.title);

const caseStudies = caseStudiesRaw.map(c => {
    const lines = c.split('\n').map(l => l.trim()).filter(l => l);

    const titleLine = lines[0].replace(/__/g, '').replace(/\\/g, '').replace(/^\d+\)\s/, '').trim();

    // The second line is usually the company context (e.g. "Furniture Manufacturing Company – 85 Employees")
    let company = '';
    let contextIdx = lines.findIndex(l => l.includes('Context'));
    if (contextIdx > 0) {
        company = lines.slice(1, contextIdx).join(' ').replace(/__/g, '').replace(/\\/g, '').trim();
    }

    const getSectionText = (startToken, endToken) => {
        const start = lines.findIndex(l => l.includes(startToken));
        if (start === -1) return '';
        const end = endToken ? lines.findIndex((l, i) => i > start && l.includes(endToken)) : lines.length;
        const endIndex = end === -1 ? lines.length : end;

        return lines.slice(start + 1, endIndex).join('\n').replace(/__/g, '').replace(/\\/g, '').trim();
    };

    const getList = (startToken, endToken) => {
        const text = getSectionText(startToken, endToken);
        return parseList(text);
    };

    const context = getSectionText('Context', 'Core Problem').replace(/\n/g, ' ');
    const coreProblem = getList('Core Problem', 'Intervention');
    const intervention = getSectionText('Intervention', 'Key Deliverables').replace(/\n/g, ' ');
    const keyDeliverables = getList('Key Deliverables', 'Measurable Impact');
    const measurableImpact = getList('Measurable Impact', null);

    return {
        id: titleLine.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title: titleLine,
        company,
        context,
        coreProblem,
        intervention,
        keyDeliverables,
        measurableImpact
    };
}).filter(c => c.title);

const tsContent = `// Automatically generated from content.md

export interface ServiceData {
    id: string;
    title: string;
    whatIDo: string;
    deliverables: string[];
    expectedImpact: string[];
    projectsDelivered: string;
}

export interface CaseStudyData {
    id: string;
    title: string;
    company: string;
    context: string;
    coreProblem: string[];
    intervention: string;
    keyDeliverables: string[];
    measurableImpact: string[];
}

export const services: ServiceData[] = ${JSON.stringify(services, null, 4)};

export const caseStudies: CaseStudyData[] = ${JSON.stringify(caseStudies, null, 4)};
`;

fs.writeFileSync('src/data/content.ts', tsContent);
console.log('Successfully wrote src/data/content.ts. Found', services.length, 'services and', caseStudies.length, 'case studies.');
