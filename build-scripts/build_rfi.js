const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType, PageNumber, PageBreak, TableOfContents, ExternalHyperlink
} = require("docx");

// ---- palette ----
const NAVY = "1F2A44";
const TEAL = "0E7C7B";
const LIGHT = "E8F1F2";
const GREY = "5A5A5A";
const HDR = "CFE3E3";

const border = { style: BorderStyle.SINGLE, size: 1, color: "BFD3D3" };
const borders = { top: border, bottom: border, left: border, right: border };

const CONTENT_W = 9360;

// ---- helpers ----
function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(text)] });
}
function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(text)] });
}
function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 160, line: 276 },
    children: [new TextRun({ text, ...opts })],
  });
}
function runs(arr, spacingAfter = 160) {
  return new Paragraph({ spacing: { after: spacingAfter, line: 276 }, children: arr });
}
function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 80, line: 276 },
    children: Array.isArray(text) ? text : [new TextRun(text)],
  });
}
function placeholder(text) {
  // bracketed, italic, teal — visually flags items needing capture-team input
  return new TextRun({ text, italics: true, color: TEAL });
}

function cell(content, { w, shade, headerCell = false } = {}) {
  const children = Array.isArray(content) ? content : [
    new Paragraph({ children: [new TextRun({ text: content, bold: headerCell, color: headerCell ? "FFFFFF" : undefined })] })
  ];
  return new TableCell({
    borders,
    width: { size: w, type: WidthType.DXA },
    shading: shade ? { fill: shade, type: ShadingType.CLEAR } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children,
  });
}

function infoTable(rows) {
  const lw = 3000, rw = CONTENT_W - lw;
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [lw, rw],
    rows: rows.map(([k, v]) =>
      new TableRow({
        children: [
          cell([new Paragraph({ children: [new TextRun({ text: k, bold: true, color: NAVY })] })], { w: lw, shade: LIGHT }),
          cell(Array.isArray(v) ? v : [new Paragraph({ children: v && v.__run ? [v] : [new TextRun(v)] })], { w: rw }),
        ],
      })
    ),
  });
}

const doc = new Document({
  creator: "Alpha Omega Integration LLC",
  title: "RFI Response — AI-Enabled Salesforce Case Management for DoW",
  styles: {
    default: { document: { run: { font: "Arial", size: 21 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: NAVY },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 0,
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: TEAL, space: 4 } } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 23, bold: true, font: "Arial", color: TEAL },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
    ],
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [
        { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 540, hanging: 260 } } } }] },
    ],
  },
  sections: [
    // ===== COVER =====
    {
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      children: [
        new Paragraph({ spacing: { before: 1400, after: 0 },
          children: [new TextRun({ text: "ALPHA OMEGA", bold: true, size: 56, color: NAVY })] }),
        new Paragraph({ spacing: { after: 600 },
          children: [new TextRun({ text: "Total Mission Automation", size: 26, color: TEAL, italics: true })] }),
        new Paragraph({ shading: { fill: NAVY, type: ShadingType.CLEAR }, spacing: { before: 0, after: 0 },
          children: [new TextRun({ text: "  Response to Sources Sought / Request for Information", bold: true, size: 30, color: "FFFFFF" })] }),
        new Paragraph({ shading: { fill: NAVY, type: ShadingType.CLEAR }, spacing: { before: 0, after: 400 },
          children: [new TextRun({ text: "  AI-Enabled Salesforce Case Management & Workflow Automation", size: 24, color: "FFFFFF" })] }),
        new Paragraph({ spacing: { after: 120 },
          children: [new TextRun({ text: "Prepared for: U.S. Department of War (DoW)", bold: true, size: 24 })] }),
        runs([new TextRun({ text: "Solicitation / RFI No.: ", bold: true }), placeholder("[insert RFI/notice number]")]),
        runs([new TextRun({ text: "Submitted by: ", bold: true }), new TextRun("Alpha Omega Integration LLC")]),
        runs([new TextRun({ text: "Date: ", bold: true }), new TextRun("June 25, 2026")]),
        new Paragraph({ spacing: { before: 500, after: 120 },
          children: [new TextRun({ text: "Company & Submission Information", bold: true, size: 24, color: NAVY })] }),
        infoTable([
          ["Company", [new Paragraph({ children: [new TextRun("Alpha Omega Integration LLC")] })]],
          ["Headquarters", [new Paragraph({ children: [new TextRun("8150 Leesburg Pike, Vienna, VA 22182")] })]],
          ["Website", [new Paragraph({ children: [new ExternalHyperlink({ children: [new TextRun({ text: "www.alphaomega.com", style: "Hyperlink" })], link: "https://www.alphaomega.com" })] })]],
          ["UEI / CAGE", [new Paragraph({ children: [placeholder("[insert UEI and CAGE code]")] })]],
          ["Business size / socioeconomic status", [new Paragraph({ children: [placeholder("[insert size status and any set-aside designations]")] })]],
          ["Primary NAICS", [new Paragraph({ children: [placeholder("[insert applicable NAICS, e.g., 541512]")] })]],
          ["Point of contact", [new Paragraph({ children: [new TextRun("Rob Brown, SVP, National Security Solutions")] }),
            new Paragraph({ children: [new TextRun("robert.brown@alphaomega.com")] })]],
        ]),
        new Paragraph({ spacing: { before: 360 }, children: [placeholder("This response is submitted for informational and market-research purposes and does not obligate the Government or Alpha Omega. Bracketed, italicized text indicates items to be confirmed or completed by the capture/contracts team prior to submission.")] }),
      ],
    },

    // ===== BODY =====
    {
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      headers: { default: new Header({ children: [new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: TEAL, space: 2 } },
        children: [
          new TextRun({ text: "Alpha Omega Integration LLC", color: GREY, size: 16 }),
          new TextRun({ text: "\tRFI Response — DoW AI/Salesforce Case Management", color: GREY, size: 16 }),
        ],
        tabStops: [{ type: "right", position: CONTENT_W }],
      })] }) },
      footers: { default: new Footer({ children: [new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: TEAL, space: 2 } },
        children: [
          new TextRun({ text: "Sensitive — For Government Market Research", color: GREY, size: 16 }),
          new TextRun({ text: "\tPage ", color: GREY, size: 16 }),
          new TextRun({ children: [PageNumber.CURRENT], color: GREY, size: 16 }),
        ],
        tabStops: [{ type: "right", position: CONTENT_W }],
      })] }) },
      children: [
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Contents")] }),
        new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-2" }),
        new Paragraph({ children: [new PageBreak()] }),

        // 1. Executive Summary
        h1("1. Executive Summary"),
        p("Alpha Omega Integration LLC (Alpha Omega) is a CMMI Maturity Level 5 (Development and Services) digital modernization firm that helps federal and Department of Defense organizations deploy secure, AI-driven automation at mission speed. We deliver case management, low-code application development, DevSecOps, Robotic Process Automation (RPA), and Artificial Intelligence as an integrated practice rather than as disconnected services."),
        p("This response describes how Alpha Omega can support the Department of War (DoW) in four areas identified in the notice: (1) Salesforce-based case management and automated workflows; (2) DevSecOps and RPA to accelerate low-code deployments; (3) deployment of AI within Software-as-a-Service (SaaS) environments; and (4) AI capabilities grounded in a proven track record of Salesforce and platform implementations across the federal and DoD space."),
        runs([
          new TextRun("Our delivery is accelerated by the "),
          new TextRun({ text: "Continuum Automation Framework", bold: true }),
          new TextRun(" — a set of AI-driven accelerators (Design, Code, Connect, and Secure) that compress the path from requirements to a secure, authorized, production system. Continuum Design alone reduces development time by more than 85% and is available today to DoW through the Tradewinds Solution Marketplace."),
        ]),

        // 2. Company snapshot
        h1("2. Company Snapshot"),
        p("Alpha Omega serves agencies across national security, defense, health, federal financial, and space and science missions. Representative customers include the U.S. Air Force, U.S. Navy, U.S. Department of State, Department of Homeland Security, Department of Health & Human Services, USDA, NOAA, CDC, and FDIC. The company is headquartered in Vienna, Virginia."),
        h2("Certifications & quality"),
        bullet("CMMI Maturity Level 5 — appraised for both Development (DEV) and Services (SVC)"),
        bullet("ISO 9001 (Quality Management), ISO/IEC 20000-1 (IT Service Management), and ISO/IEC 27001 (Information Security Management)"),
        bullet([placeholder("[Confirm and insert any DoD-relevant clearances and authorizations: facility clearance level, FedRAMP authorizations, IL4/IL5 experience, DCAA-approved accounting, etc.]")]),
        h2("Technology partner ecosystem"),
        runs([
          new TextRun("Alpha Omega maintains alliances with leading platform providers, including "),
          new TextRun({ text: "AWS, Microsoft Azure, ServiceNow, UiPath (RPA), Unqork (low-code), Databricks, and Harness (DevSecOps)", bold: true }),
          new TextRun(". "),
          placeholder("[If Alpha Omega holds a Salesforce partnership (e.g., Salesforce Consulting Partner / AppExchange) and Salesforce-certified staff, insert tier, number of certified Administrators/Developers/Architects, and Government Cloud Plus experience here.]"),
        ]),

        // 3. Theme 1
        h1("3. Salesforce-Based Case Management & Automated Workflows"),
        p("Alpha Omega designs and deploys case management solutions that consolidate intake, triage, routing, adjudication, correspondence, and reporting into a single governed system of record. On the Salesforce platform, we apply this approach using Salesforce Service Cloud / Public Sector Solutions case objects, Flow and Flow Orchestration for automated, multi-step workflows, OmniStudio/OmniScript for guided user journeys, and Experience Cloud for secure constituent and stakeholder portals."),
        h2("What we deliver"),
        bullet("Configurable case types, queues, assignment rules, and SLA/milestone tracking aligned to DoW business processes"),
        bullet("Automated workflows using declarative Flow and approval processes to remove manual hand-offs, enforce policy, and create a full audit trail"),
        bullet("Role- and attribute-based access control, field-level security, and audit logging aligned to DoD data-handling requirements"),
        bullet("Dashboards and reporting for real-time operational visibility and oversight"),
        bullet("Migration of legacy case data into the platform with validated, high-fidelity pipelines"),
        runs([
          new TextRun({ text: "Relevant proof point: ", bold: true }),
          placeholder("[Insert a specific Salesforce-based case-management implementation — agency/customer, contract number, scope (e.g., number of case types, users, transaction volume), and measurable outcomes such as reduced processing time or backlog. Alpha Omega’s public references do not name a Salesforce case-management contract, so the capture team should supply the strongest qualifying example.]"),
        ]),

        // 4. Theme 2
        h1("4. DevSecOps & RPA to Accelerate Low-Code Deployments"),
        p("Alpha Omega treats security and automation as first-class elements of delivery, not afterthoughts. Our DevSecOps practice implements CI/CD pipelines, infrastructure as code, automated testing, and continuous security scanning so that low-code configurations and custom components move from development to production rapidly and safely."),
        h2("DevSecOps for low-code platforms"),
        bullet("Source-controlled, pipeline-driven deployment of Salesforce metadata and low-code artifacts (e.g., SFDX-based pipelines via Harness or equivalent) with automated validation and rollback"),
        bullet("Policy-as-code, automated security gates, and continuous compliance checks integrated into the pipeline"),
        bullet("Containerized, cloud-native platform engineering (Kubernetes, OpenShift) and zero-trust integration across AWS, Azure, and GovCloud"),
        h2("Robotic Process Automation (RPA)"),
        runs([
          new TextRun("As a "),
          new TextRun({ text: "UiPath", bold: true }),
          new TextRun(" partner, Alpha Omega uses RPA to automate the high-volume, rules-based tasks that surround a case-management system — data entry across legacy systems, document handling, status synchronization, and reconciliation — bridging modern SaaS workflows with systems that lack APIs. Combined with intelligent automation and orchestration, RPA reduces manual workload and increases throughput."),
        ]),
        h2("Accelerated low-code delivery"),
        runs([
          new TextRun("Our "),
          new TextRun({ text: "Continuum Design", bold: true }),
          new TextRun(" accelerator captures business processes visually (Event Storming, Domain-Driven Design, Event Modeling), then auto-generates requirements, data models, architecture, documentation, and working prototypes in hours — a "),
          new TextRun({ text: "more than 85% reduction in development time", bold: true }),
          new TextRun(". Outputs export directly to Jira or Azure DevOps and deploy into secure environments aligned to CMMI L5, ISO 9001/20000/27001, and NIST 800-53 practices, with customer-owned source code."),
        ]),

        // 5. Theme 3
        h1("5. Deploying Artificial Intelligence Within SaaS Environments"),
        p("Alpha Omega operationalizes AI inside SaaS platforms to improve decision speed, automate analysis, and strengthen operational performance — while keeping models governed, secure, and explainable. Our hybrid approach pairs generative AI with deterministic AI so that automated actions in regulated, high-stakes workflows remain predictable and auditable."),
        h2("AI capabilities applied to SaaS / case management"),
        bullet("AI engineering and model development: custom machine learning, generative, and deterministic models for real-time decision support"),
        bullet("Intelligent automation and orchestration to automate complex, multi-step workflows and triage"),
        bullet("Conversational and agent-based AI: secure assistants and mission agents that speed knowledge retrieval, summarize case histories, and guide users"),
        bullet("Responsible AI and governance: frameworks, risk controls, and human-in-the-loop practices ensuring fairness, traceability, and compliance"),
        bullet("AI infrastructure and MLOps: secure, scalable pipelines for training, validation, deployment, and continuous monitoring"),
        runs([
          new TextRun("Within a Salesforce environment, these capabilities map to platform-native AI (for example, Einstein / Agentforce-style assistants and predictive case routing) augmented by Alpha Omega-engineered models and secure integrations, all wrapped in our responsible-AI governance. "),
          placeholder("[Confirm specific Salesforce-native AI features Alpha Omega has deployed and any FedRAMP/IL constraints relevant to DoW.]"),
        ]),

        // 6. Theme 4
        h1("6. Proven Track Record — AI, Salesforce & Modernization in Federal/DoD"),
        p("Alpha Omega’s AI work is backed by measurable delivery results across defense and federal customers. The following outcomes are drawn from Alpha Omega’s documented performance:"),
        new Table({
          width: { size: CONTENT_W, type: WidthType.DXA },
          columnWidths: [2400, 4360, 2600],
          rows: [
            new TableRow({ tableHeader: true, children: [
              cell("Customer", { w: 2400, shade: NAVY, headerCell: true }),
              cell("Outcome", { w: 4360, shade: NAVY, headerCell: true }),
              cell("Capability", { w: 2600, shade: NAVY, headerCell: true }),
            ] }),
            new TableRow({ children: [
              cell("U.S. Navy", { w: 2400, shade: LIGHT }),
              cell("$250K saved per audit cycle through automated compliance", { w: 4360 }),
              cell("Continuum Secure / ATO automation", { w: 2600 }),
            ] }),
            new TableRow({ children: [
              cell("U.S. Air Force", { w: 2400, shade: LIGHT }),
              cell("30,000 lines of legacy code modernized in 3 months", { w: 4360 }),
              cell("Deterministic AI / Continuum Code", { w: 2600 }),
            ] }),
            new TableRow({ children: [
              cell("U.S. Dept. of State", { w: 2400, shade: LIGHT }),
              cell("18 Authorizations to Operate (ATOs) completed in 18 months", { w: 4360 }),
              cell("DevSecOps / Continuum Secure", { w: 2600 }),
            ] }),
            new TableRow({ children: [
              cell([new Paragraph({ children: [placeholder("[DoW-relevant Salesforce reference]")] })], { w: 2400, shade: LIGHT }),
              cell([new Paragraph({ children: [placeholder("[Insert Salesforce case-management outcome: backlog reduced, processing time cut, users supported, transaction volume]")] })], { w: 4360 }),
              cell([new Paragraph({ children: [placeholder("[Salesforce Service Cloud / Public Sector Solutions]")] })], { w: 2600 }),
            ] }),
          ],
        }),
        new Paragraph({ spacing: { before: 160 }, children: [placeholder("Capture-team action: add 1–3 Salesforce-specific past-performance citations (agency, contract/CLIN, period of performance, role as prime/sub, dollar value, and quantified results) to fully satisfy this evaluation factor.")] }),

        // 7. Differentiators
        h1("7. Why Alpha Omega"),
        bullet([new TextRun({ text: "Integrated accelerators: ", bold: true }), new TextRun("the Continuum Automation Framework (Design, Code, Connect, Secure) compresses build, migration, and authorization timelines.")]),
        bullet([new TextRun({ text: "Security and compliance by design: ", bold: true }), new TextRun("CMMI L5, ISO 9001/20000-1/27001, zero-trust engineering, and automation of up to 70% of cyber compliance and ATO tasks.")]),
        bullet([new TextRun({ text: "Hybrid AI: ", bold: true }), new TextRun("generative plus deterministic AI for automation that is fast and auditable — well suited to DoW’s regulated workflows.")]),
        bullet([new TextRun({ text: "Proven DoD delivery: ", bold: true }), new TextRun("documented results for the Navy, Air Force, and State Department.")]),
        bullet([new TextRun({ text: "Platform breadth: ", bold: true }), new TextRun("Salesforce alongside ServiceNow, Unqork, UiPath, AWS, and Azure — enabling platform-right, not platform-locked, recommendations.")]),

        // 8. Procurement
        h1("8. Contract Vehicles & Procurement Path"),
        runs([
          new TextRun("Alpha Omega’s Continuum Design accelerator is available on the "),
          new TextRun({ text: "Tradewinds Solution Marketplace", bold: true }),
          new TextRun(" — the DoW’s trusted platform for rapid AI acquisition — offering a pre-competed, readily awardable path that lets DoW components modernize without delay."),
        ]),
        runs([new TextRun({ text: "Additional vehicles: ", bold: true }), placeholder("[Insert current contract vehicles and GWACs (e.g., GSA MAS schedule number, OASIS+, agency BPAs/IDIQs) and SINs relevant to DoW.]")]),

        // 9. Conclusion
        h1("9. Conclusion & Point of Contact"),
        p("Alpha Omega welcomes the opportunity to support the Department of War with secure, AI-enabled Salesforce case management and workflow automation. We would be pleased to provide a capabilities demonstration, a Continuum Design proof-of-concept, or additional past-performance detail at the Government’s request."),
        infoTable([
          ["Point of contact", [new Paragraph({ children: [new TextRun({ text: "Rob Brown", bold: true })] }), new Paragraph({ children: [new TextRun("SVP, National Security Solutions")] })]],
          ["Email", [new Paragraph({ children: [new TextRun("robert.brown@alphaomega.com")] })]],
          ["Phone", [new Paragraph({ children: [placeholder("[insert phone]")] })]],
          ["Address", [new Paragraph({ children: [new TextRun("8150 Leesburg Pike, Vienna, VA 22182")] })]],
        ]),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("/sessions/beautiful-eager-clarke/mnt/outputs/AlphaOmega_DoW_RFI_Response.docx", buf);
  console.log("written");
});
