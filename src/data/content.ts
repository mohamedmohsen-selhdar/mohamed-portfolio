// Automatically generated from content.md

export interface ServiceData {
    id: string;
    title: string;
    whatIDo: string;
    deliverables: string[];
    expectedImpact: string[];
    projectsDelivered: string;
    projectNames: string[];
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

export const services: ServiceData[] = [
    {
        "id": "business-process-engineering",
        "title": "Business Process Engineering",
        "whatIDo": "I analyze how your business actually operates — not how it’s documented.  \nI map end-to-end processes (sales → planning → procurement → production → delivery → finance), identify bottlenecks, remove waste, and redesign workflows to increase speed, clarity, and accountability.\n\nI don’t optimize tasks — I redesign systems.",
        "deliverables": [
            "Current-state process maps (as-is)",
            "Optimized future-state workflows (to-be)",
            "Clear RACI matrices",
            "Standard Operating Procedures (SOPs)",
            "KPI structure linked to each process",
            "Process governance model"
        ],
        "expectedImpact": [
            "20–40% cycle time reduction",
            "Clear accountability across departments",
            "Fewer operational conflicts",
            "Higher productivity per employee",
            "Better coordination between sales, operations, and finance"
        ],
        "projectsDelivered": "35+ projects across furniture, plastics, chemicals, engineering, food, and metal industries.",
        "projectNames": ["RICHIE Furniture Restructuring", "GP Plast Process Optimization", "in&In Workflow Redesign"]
    },
    {
        "id": "supply-chain-excellence",
        "title": "Supply Chain Excellence",
        "whatIDo": "I redesign supply chains to become predictable, data-driven, and scalable.  \nFrom demand planning and procurement strategy to production planning and inventory optimization — I align operations with business strategy.",
        "deliverables": [
            "Demand forecasting model",
            "Inventory policy (Min-Max, safety stock, reorder point)",
            "Production planning framework",
            "Supplier evaluation & segmentation model",
            "Capacity analysis & line balancing",
            "Supply chain KPIs dashboard"
        ],
        "expectedImpact": [
            "15–30% inventory reduction",
            "Higher OTIF (On-Time-In-Full) performance",
            "Reduced stockouts",
            "Improved cash flow",
            "Controlled production variability"
        ],
        "projectsDelivered": "25+ supply chain transformation projects, including supplier integration projects supported by international development entities.",
        "projectNames": ["USAID-Supported Supplier Integration", "Mid-Level Manufacturer Supply Overhaul", "Plastics Component Sourcing Strategy"]
    },
    {
        "id": "organizational-design-development",
        "title": "Organizational Design & Development",
        "whatIDo": "I restructure organizations to fit their growth stage.  \nI redesign hierarchy, reporting lines, role clarity, and performance systems to eliminate chaos and founder-dependency.",
        "deliverables": [
            "Optimized organizational structure",
            "Role charters & job descriptions",
            "KPI-based performance framework",
            "Delegation matrix",
            "Governance and decision-rights structure"
        ],
        "expectedImpact": [
            "Reduced operational confusion",
            "Faster decision-making",
            "Higher employee ownership",
            "Reduced dependency on owner",
            "Scalable growth model"
        ],
        "projectsDelivered": "30+ restructuring and org design projects for SMEs and medium-sized factories (30–200 employees).",
        "projectNames": ["Factory-Wide Hierarchical Redesign", "Executive Delegation Matrix Implementation", "Founder-Dependency Reduction Program"]
    },
    {
        "id": "data-driven-decision-making-dddm",
        "title": "Data-Driven Decision Making (DDDM)",
        "whatIDo": "I transform raw operational data into executive dashboards and decision frameworks.  \nI build KPI systems that link operational metrics to profitability and strategy.",
        "deliverables": [
            "KPI architecture design",
            "Data collection structure",
            "Power BI dashboards",
            "Financial and operational ratio analysis",
            "Management review framework"
        ],
        "expectedImpact": [
            "Visibility over real profitability",
            "Faster corrective action",
            "Reduced hidden losses",
            "Clear performance tracking across departments"
        ],
        "projectsDelivered": "40+ dashboarding and KPI system implementations.",
        "projectNames": ["Enterprise Data Architecture Design", "Real-Time Profitability Dashboard Suite", "Executive KPI Tracking System"]
    },
    {
        "id": "business-digitization",
        "title": "Business Digitization",
        "whatIDo": "I convert manual, Excel-based, and fragmented workflows into structured digital systems.  \nFrom ERP design logic to workflow automation — I design systems that fit SMEs without overcomplexity.",
        "deliverables": [
            "Process-based ERP logic structure",
            "AppSheet / system workflow builds",
            "Automated reporting systems",
            "Client order tracking portals",
            "Digital documentation system"
        ],
        "expectedImpact": [
            "Reduced manual errors",
            "Faster information flow",
            "Improved traceability",
            "Increased operational transparency"
        ],
        "projectsDelivered": "20+ digitization and automation projects.",
        "projectNames": ["Process-Based ERP Logic Design", "End-to-End Automation Blueprint", "Manual Workflow Digitization Rollout"]
    },
    {
        "id": "product-costing-pricing-structure",
        "title": "Product Costing & Pricing Structure",
        "whatIDo": "I design accurate costing systems that reveal true product margins.  \nI apply activity-based costing and capacity analysis to uncover hidden losses.",
        "deliverables": [
            "Full cost breakdown per product",
            "Activity-Based Costing model",
            "Machine and labor cost allocation",
            "Break-even analysis",
            "Pricing strategy alignment"
        ],
        "expectedImpact": [
            "Clear profit visibility",
            "Elimination of underpriced products",
            "Margin improvement (typically 8–20%)",
            "Stronger pricing negotiations"
        ],
        "projectsDelivered": "50+ costing and pricing restructuring projects across manufacturing sectors.",
        "projectNames": ["Activity-Based Costing Overhaul", "Product Line Margin Visibility System", "Factory Overhead Allocation Matrix"]
    },
    {
        "id": "cost-reduction-projects",
        "title": "Cost Reduction Projects",
        "whatIDo": "I lead structured cost-reduction initiatives without harming operational stability.  \nI target waste, inefficiency, capacity loss, procurement leakage, and process gaps.",
        "deliverables": [
            "Cost diagnostic report",
            "Waste analysis",
            "Capacity utilization assessment",
            "Procurement optimization plan",
            "Implementation roadmap"
        ],
        "expectedImpact": [
            "10–25% operational cost reduction",
            "Improved gross margin",
            "Stronger cash position",
            "Sustainable efficiency gains"
        ],
        "projectsDelivered": "30+ cost optimization initiatives, including projects that transformed loss-making operations into double-digit profitability.",
        "projectNames": ["Manufacturing Plant Waste Reduction", "Procurement Spend Optimization Strategy", "Capacity Utilization Turnaround"]
    }
];

export const caseStudies: CaseStudyData[] = [
    {
        "id": "business-process-engineering-case-study",
        "title": "Business Process Engineering Case Study",
        "company": "Furniture Manufacturing Company – 85 Employees",
        "context": "A fast-growing outdoor furniture manufacturer was suffering from delayed deliveries, frequent production conflicts, and internal blame between sales and operations.",
        "coreProblem": [
            "No clear process ownership",
            "Sales confirming orders without production visibility",
            "Informal planning",
            "No documented workflows",
            "Founder intervening daily to resolve conflicts"
        ],
        "intervention": "I conducted full end-to-end process mapping from order intake to dispatch. Identified 17 bottlenecks and 9 accountability overlaps. Redesigned workflow structure and governance model.",
        "keyDeliverables": [
            "As-is and To-be process maps",
            "Order confirmation control gate",
            "Planning & capacity alignment framework",
            "SOP library (production, procurement, sales handover)",
            "Department-level KPIs",
            "RACI matrix"
        ],
        "measurableImpact": [
            "32% reduction in order cycle time",
            "On-time delivery increased from 61% to 88%",
            "Daily escalation cases reduced by 70%",
            "Founder intervention reduced to weekly review only"
        ]
    },
    {
        "id": "supply-chain-excellence-case-study",
        "title": "Supply Chain Excellence Case Study",
        "company": "Plastic Injection Factory – 120 Employees",
        "context": "Inventory value was increasing while stockouts were frequent. Cash flow was tightening despite high sales.",
        "coreProblem": [
            "No demand forecasting",
            "Raw material purchasing based on intuition",
            "No safety stock logic",
            "Production planning reactive, not proactive"
        ],
        "intervention": "Implemented structured supply chain control model based on demand variability and lead times.",
        "keyDeliverables": [
            "Forecasting model (rolling 3-month)",
            "SKU segmentation (A/B/C classification)",
            "Safety stock & reorder point system",
            "Capacity vs demand analysis",
            "Supply chain KPI dashboard"
        ],
        "measurableImpact": [
            "24% inventory reduction",
            "Stockouts reduced by 63%",
            "Cash cycle improved by 18 days",
            "OTIF improved from 68% to 91%"
        ]
    },
    {
        "id": "organizational-design-case-study",
        "title": "Organizational Design Case Study",
        "company": "Food Processing Company – 60 Employees",
        "context": "The business was profitable but chaotic. Every decision passed through the owner.",
        "coreProblem": [
            "Undefined reporting lines",
            "Overlapping roles",
            "No delegation structure",
            "Performance not measurable"
        ],
        "intervention": "Redesigned the organization to support scaling.",
        "keyDeliverables": [
            "New organizational structure",
            "Clear role charters",
            "KPI-linked job descriptions",
            "Delegation & authority matrix",
            "Monthly management review framework"
        ],
        "measurableImpact": [
            "Decision-making time reduced by 40%",
            "Owner workload reduced by 50%",
            "Internal conflicts significantly minimized",
            "Revenue increased 18% within 9 months due to operational stability"
        ]
    },
    {
        "id": "data-driven-decision-making-dddm-case-study",
        "title": "Data-Driven Decision Making (DDDM) Case Study",
        "company": "Chemical Manufacturing Company",
        "context": "Management had revenue data but no clarity on real profitability per product line.",
        "coreProblem": [
            "Data scattered across Excel sheets",
            "No cost linkage",
            "No KPI hierarchy",
            "Reactive decisions"
        ],
        "intervention": "Designed unified KPI architecture and executive dashboard system.",
        "keyDeliverables": [
            "Integrated data structure",
            "Power BI executive dashboard",
            "Profitability analysis per SKU",
            "Variance analysis framework",
            "Monthly performance review structure"
        ],
        "measurableImpact": [
            "Identified 3 loss-making product lines",
            "Gross margin improved by 12% in 6 months",
            "Management decision cycle reduced from monthly to weekly",
            "Clear profitability visibility established"
        ]
    },
    {
        "id": "business-digitization-case-study",
        "title": "Business Digitization Case Study",
        "company": "Engineering Fabrication Workshop",
        "context": "Operations were tracked manually through WhatsApp and paper sheets.",
        "coreProblem": [
            "Lost job orders",
            "No production tracking",
            "No real-time visibility",
            "Frequent customer complaints"
        ],
        "intervention": "Designed a simplified digital workflow system.",
        "keyDeliverables": [
            "Process-based digital order tracking system",
            "Production stage monitoring",
            "Client tracking portal",
            "Automated daily reporting",
            "Digital document control"
        ],
        "measurableImpact": [
            "75% reduction in order miscommunication",
            "Real-time production visibility",
            "Customer satisfaction increased significantly",
            "Administrative time reduced by 35%"
        ]
    },
    {
        "id": "product-costing-case-study",
        "title": "Product Costing Case Study",
        "company": "Sheet Metal Factory",
        "context": "The company was winning projects but consistently facing margin pressure.",
        "coreProblem": [
            "Pricing based on market guessing",
            "No accurate labor & machine allocation",
            "Hidden indirect costs"
        ],
        "intervention": "Designed full Activity-Based Costing model.",
        "keyDeliverables": [
            "Machine hour cost calculation",
            "Labor cost allocation logic",
            "Overhead distribution framework",
            "Break-even model",
            "Pricing simulation tool"
        ],
        "measurableImpact": [
            "Discovered 14% hidden underpricing",
            "Adjusted pricing strategy",
            "Gross margin improved from 9% to 19%",
            "Bidding accuracy increased significantly"
        ]
    },
    {
        "id": "cost-reduction-project-case-study",
        "title": "Cost Reduction Project Case Study",
        "company": "Multi-Line Manufacturing SME",
        "context": "The company was operating at a financial loss despite strong sales.",
        "coreProblem": [
            "Low capacity utilization",
            "Procurement inefficiencies",
            "High rework rate",
            "Poor production planning"
        ],
        "intervention": "Led structured cost optimization initiative.",
        "keyDeliverables": [
            "Capacity utilization analysis",
            "Waste mapping",
            "Procurement renegotiation plan",
            "Process rebalancing",
            "Implementation roadmap"
        ],
        "measurableImpact": [
            "21% cost reduction in 8 months",
            "Company moved from -6% loss to 14% net profit margin",
            "Revenue increased 41%",
            "Cash flow stabilized"
        ]
    }
];
