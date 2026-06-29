const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType, ShadingType,
  TableOfContents, PageNumber, Header, Footer, PageBreak, ImageRun
} = require("docx");

const NAVY = "0A1A30", ACCENT = "B5651D", GREY = "5A6675", LINE = "CCCCCC";
const HEAD_FILL = "0E2342", ALT_FILL = "EEF2F7";

const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const H3 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(t)] });
const P = (t, opts = {}) => new Paragraph({ spacing: { after: 140, line: 276 }, children: parseRuns(t), ...opts });
// simple bold parser: **x**
function parseRuns(t) {
  const parts = String(t).split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map(p => p.startsWith("**") && p.endsWith("**")
    ? new TextRun({ text: p.slice(2, -2), bold: true })
    : new TextRun(p));
}
const BUL = (t) => new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 80, line: 270 }, children: parseRuns(t) });
const NUM = (t) => new Paragraph({ numbering: { reference: "nums", level: 0 }, spacing: { after: 80, line: 270 }, children: parseRuns(t) });

const border = { style: BorderStyle.SINGLE, size: 1, color: LINE };
const borders = { top: border, bottom: border, left: border, right: border };
function cell(text, w, { head = false, alt = false, bold = false } = {}) {
  return new TableCell({
    borders, width: { size: w, type: WidthType.DXA },
    shading: { fill: head ? HEAD_FILL : (alt ? ALT_FILL : "FFFFFF"), type: ShadingType.CLEAR },
    margins: { top: 70, bottom: 70, left: 110, right: 110 },
    children: [new Paragraph({ children: [new TextRun({ text: String(text), bold: head || bold, color: head ? "FFFFFF" : "000000", size: 19 })] })]
  });
}
function table(widths, rows) {
  const total = widths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA }, columnWidths: widths,
    rows: rows.map((r, i) => new TableRow({
      tableHeader: i === 0,
      children: r.map((c) => cell(c, widths[r.indexOf(c)] || widths[0], { head: i === 0, alt: i > 0 && i % 2 === 0 }))
    }))
  });
}
// helper to build rows with correct per-column widths
function trow(cells, widths, opts) {
  return new TableRow({ tableHeader: !!(opts && opts.head),
    children: cells.map((t, j) => cell(t, widths[j], { head: !!(opts && opts.head), alt: !!(opts && opts.alt) })) });
}
function tbl(widths, headerCells, dataRows) {
  const total = widths.reduce((a, b) => a + b, 0);
  const rows = [trow(headerCells, widths, { head: true })];
  dataRows.forEach((r, i) => rows.push(trow(r, widths, { alt: i % 2 === 1 })));
  return new Table({ width: { size: total, type: WidthType.DXA }, columnWidths: widths, rows });
}

const children = [];

// ---- Title block ----
children.push(new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: "ALPHA OMEGA INTEGRATION LLC", bold: true, color: ACCENT, size: 22 })] }));
children.push(new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: "Technical Description: AI Agents for the Army Accessions Information Environment (AIE)", bold: true, size: 40, color: NAVY })] }));
children.push(new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: "Agentic automation for accessions case management and proactive documentation", italics: true, size: 24, color: GREY })] }));
children.push(new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 4 } }, spacing: { after: 160 }, children: [] }));
children.push(P("**Prepared for:** AIE technical evaluation (architecture, feasibility, and governance review)"));
children.push(P("**Prepared by:** Alpha Omega — National Security Solutions"));
children.push(P("**Status:** Reference architecture, demonstrated live in a commercial Salesforce trial org"));
children.push(P("**Classification:** Unclassified / pre-decisional draft for technical review"));

children.push(new Paragraph({ spacing: { before: 200, after: 120 }, children: [new TextRun({ text: "Contents", bold: true, size: 26, color: NAVY })] }));
children.push(new TableOfContents("Contents", { hyperlink: true, headingStyleRange: "1-2" }));
children.push(new Paragraph({ children: [new PageBreak()] }));

// ---- 1. Purpose ----
children.push(H1("1. Purpose and scope"));
children.push(P("This document describes the software agents Alpha Omega built to automate accessions case management within an environment modeled on the Army Accessions Information Environment (AIE). It explains what each agent does, how the agents were created, the infrastructure they run on, and the specific role they play across the recruiting and accessions lifecycle. It is written for AIE technical evaluators assessing feasibility, architecture, and governance."));
children.push(P("The central design goal is cycle-time reduction. Accessions timelines are dominated not by the forms themselves but by the iterative request-wait-resubmit loop around medical documentation, waivers, and security screening. The agents described here compress that loop by predicting and assembling the required documentation package the moment a case is created, drafting the applicant outreach for human approval, and instrumenting every action so cycle time becomes measurable data rather than anecdote."));
children.push(P("**Scope note.** The capability was demonstrated live in a commercial Salesforce trial edition. All cadet names and data in this document and the demonstration are fictional placeholders; no real applicant PII was used. Production deployment to an IL5/FedRAMP-authorized environment, a governed model boundary, and licensed Agentforce services are addressed in Sections 7 and 10 and flagged as assumptions in Section 11."));

// ---- 2. Architecture ----
children.push(H1("2. Architecture overview"));
children.push(P("The solution uses a **hybrid agentic architecture** organized in three cooperating layers. The layering is deliberate: it lets the same business outcome — a complete documentation package, an AI case summary, and a recruiter task — be produced in any Salesforce edition, so the capability runs identically whether or not licensed AI services are present."));
children.push(H2("2.1 Native automation layer"));
children.push(P("A record-triggered Salesforce Flow runs on the platform itself. When a Cadet Case is saved with a qualifying medical factor, the Flow synchronously creates the first predicted Document Request and sets case fields. This layer requires no external compute and runs inside the org's trust boundary."));
children.push(H2("2.2 External agent layer"));
children.push(P("A small roster of cooperating external agents reaches into Salesforce through its REST API to complete work the platform Flow or the current edition cannot: finishing the full policy-driven document checklist for any medical factor, generating an AI case summary and drafted applicant request, and queuing a recruiter follow-up task. The agents are idempotent, so they never duplicate what the native Flow already created. They can run headless on a schedule or, where API credentials are not available, through a supervised browser-automation path."));
children.push(H2("2.3 Licensed AI layer (drop-in)"));
children.push(P("In a fully licensed org, the external Copilot agent is replaced by a native Agentforce assistant. The orchestration and the data model are unchanged; only the component that produces the natural-language summary moves inside the platform. This makes the external agent layer a portable stand-in rather than a permanent dependency."));

children.push(H2("2.4 Process overview (Figure 1)"));
children.push(P("Figure 1 summarizes the end-to-end process on a single page. The top band shows the **core automation loop**: one input — a Cadet Case saved with a medical factor — triggers the native Flow to create the first predicted document, after which the external agents complete the full policy-driven checklist, draft the case summary and applicant outreach, and queue the recruiter task, leaving a connected, instrumented case whose value meter ticks up by one cycle eliminated for each document produced. The agents act against the factor-to-document policy table, so adapting to a policy change is a data edit rather than a code change."));
children.push(P("The middle band is the **SEAD 4 human-in-the-loop guardrail** that governs the entire flow: AI surfaces, drafts, and automates, but a human approves every applicant send and owns every eligibility, suitability, and clearance decision. The lower band maps the agents onto the **ten-stage accessions lifecycle**, color-coded by delivery layer — native (live), external agent (live), and licensed (Agentforce) — with the corresponding AIE RTM identifiers and the medical/waiver bottleneck (Stage 3) marked as the stage demonstrated live. The footer lists the infrastructure the capability runs on, with the IL5/FedRAMP posture shown as target state."));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 80, after: 60 },
  children: [new ImageRun({
    type: "png",
    data: fs.readFileSync("AIE_Agentic_Process_Diagram.png"),
    transformation: { width: 624, height: 364 },
    altText: { title: "AIE Accessions Agentic Process Flow", name: "AIE_Agentic_Process_Diagram", description: "Diagram showing the agent automation loop, the SEAD 4 human-in-the-loop guardrail, the ten-stage accessions lifecycle color-coded by delivery layer with RTM identifiers, and the infrastructure stack." }
  })]
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 160 },
  children: [new TextRun({ text: "Figure 1. AIE accessions agentic process flow — core automation loop, SEAD 4 guardrail, lifecycle mapping, and infrastructure.", italics: true, size: 18, color: GREY })]
}));

// ---- 3. Agent roster ----
children.push(H1("3. The agent roster"));
children.push(P("The external layer is implemented as a set of single-responsibility agents coordinated by an orchestrator. Separating responsibilities keeps each agent small, independently testable, and safe to re-run."));
children.push(tbl(
  [1700, 4360, 3300],
  ["Agent", "Responsibility", "Salesforce action"],
  [
    ["Orchestrator", "Sequences the run and prints the value summary (the cycle-time meter)", "Invokes the agents below in order"],
    ["SeedAgent", "Creates the demonstration cadet roster across varied medical factors", "Inserts Cadet Cases; setting the medical factor fires the native Flow"],
    ["DocumentAgent", "Completes the full, policy-driven document checklist per factor; idempotent", "Creates only the missing Document Requests (predicted, requested)"],
    ["CopilotAgent", "Agentforce stand-in: case summary, gap check, and drafted applicant request", "Writes a Note on the cadet for human approval before any send"],
    ["TaskAgent", "The administrative agent: prepares the recruiter follow-up", "Creates a high-priority Task on the cadet"],
    ["ResetAgent", "Tears down prior demonstration data so each run starts clean", "Deletes Document Requests, then Cadet Cases"]
  ]
));
children.push(P("Each agent has a narrow contract. The DocumentAgent, for example, reads a cadet's existing documents, computes the difference against the required set for that medical factor, and creates only what is missing — so a partial run, a retry, or a native-Flow head start all converge to the same complete state."));

// ---- 4. How created ----
children.push(H1("4. How the agents were created"));
children.push(H2("4.1 Design method"));
children.push(P("The agents were derived directly from the accessions documentation policy. The core artifact is a **policy table** mapping each medical factor to the exact set of documents the government will require (Appendix A). This table — not hard-coded branching logic — is the single source of truth, so adapting to a policy change is a data edit rather than a development cycle. The DocumentAgent reads the table; the native Flow encodes the most common path for synchronous, in-platform creation."));
children.push(H2("4.2 The Copilot (LLM-backed) agent"));
children.push(P("The CopilotAgent composes a short case summary and a courteous draft applicant message from the case's structured fields. It is prompt-driven against a large language model through the Anthropic API, with an explicit instruction set: summarize path/branch, cycle stage, SF-86 status, days to the 60-day SECRET window, and the single next best action; produce the applicant message clearly marked as a draft; and make no eligibility, suitability, or clearance determination. If the model is unavailable, the agent falls back to deterministic text so a run never fails. In a licensed deployment this component is replaced by a native Agentforce assistant operating within the platform's governed model boundary."));
children.push(H2("4.3 Idempotency and safety by construction"));
children.push(P("Every write is guarded. The DocumentAgent creates only missing documents; the orchestrator can be run with a dry-run flag that reports intended actions without writing; the ResetAgent makes runs repeatable. No agent performs a destructive or irreversible action without an explicit operator instruction, and no agent sends anything to an applicant — it only drafts."));
children.push(H2("4.4 How the build itself was performed"));
children.push(P("The Salesforce configuration (custom objects, fields, the record-triggered Flow, list views, and sample records) was built live through a supervised browser-automation agent (Claude for Chrome) driving the Salesforce Setup and record UIs, pausing for human confirmation before each meaningful change. The same browser path can run the demonstration end to end in any edition. The headless Python agents and the platform metadata were then captured into a deploy-ready SFDX package for repeatable provisioning."));

// ---- 5. Infrastructure ----
children.push(H1("5. Infrastructure and technology stack"));
children.push(tbl(
  [2700, 6660],
  ["Component", "Description"],
  [
    ["Platform of record", "Salesforce (Lightning). Custom objects Cadet Case (parent) and Document Request (child), related by lookup, with fields for Medical Factor, SF-86 Status, Cycle Stage, Contract Date, Predicted, Status, and Due Date."],
    ["Native automation", "Record-triggered Flow (run-after-save) that creates the first predicted Document Request and sets case fields on cadet creation."],
    ["Agent runtime", "Python. Salesforce access via the simple-salesforce REST client; case notes written via the ContentNote / ContentDocumentLink REST endpoints; tasks via the Task object."],
    ["Language model", "Anthropic Claude via the Anthropic API for the Copilot summaries/drafts, with a deterministic offline fallback. In production this is replaced by an in-boundary, governed model (Agentforce)."],
    ["Supervised browser agent", "Claude for Chrome automation for live, credential-free operation in any edition and for the live demonstration; performs the identical UI steps a human would."],
    ["Packaging & deployment", "Deploy-ready SFDX package (object/field metadata, the Flow, deploy scripts, agent runbooks) for repeatable provisioning into a target org."],
    ["Value instrumentation", "An AI-Generated Documents list view that counts auto-created documents — each row is one request-wait-resubmit cycle eliminated."]
  ]
));
children.push(P("**Hosting posture (production, to be confirmed).** The AIE target is a COTS, commercial-cloud capability at FedRAMP+/IL5. The demonstration ran in a standard commercial trial org, which is not IL5-authorized. A production deployment would target a FedRAMP/IL5-authorized Salesforce environment and an in-boundary model service; the exact authorization status and model hosting should be verified against current AIE requirements before any handling of real applicant data."));

// ---- 6. Operating modes ----
children.push(H1("6. Operating modes"));
children.push(P("The same outcome is reachable three ways, which is what makes the capability portable and the demonstration reliable:"));
children.push(BUL("**Native Flow** — synchronous, in-platform creation of the first predicted document on save. Always available; no external compute."));
children.push(BUL("**Headless API agents** — the Python orchestrator runs the full roster on a schedule against new cadets via the REST API; the production pattern for scale."));
children.push(BUL("**Supervised browser agent** — performs the identical steps through the UI where API credentials are unavailable or where a live, in-UI demonstration is desired."));
children.push(P("Because the agents are idempotent, these modes compose safely: the native Flow may seed a document, and the DocumentAgent then completes the remainder without duplication."));

// ---- 7. Role in AIE process ----
children.push(H1("7. Role in the AIE accessions process"));
children.push(P("The agents map to specific stages of the recruiting and accessions lifecycle, each traceable to an AIE Functional RTM requirement. The medical/waiver stage is the demonstrated bottleneck; the remaining stages are addressed by the same model and are delivered natively in a licensed org."));
children.push(tbl(
  [620, 2600, 3340, 1100, 1700],
  ["#", "Lifecycle stage", "Agent role / automation", "RTM", "Layer"],
  [
    ["1", "Lead & application", "Guided intake pre-fills the case (capture once, reuse everywhere)", "2.1.4", "Licensed"],
    ["2", "Pre-screen & eligibility", "Automated eligibility rules + suitability assist before pipeline entry", "2.3.1.6 / 3.8.1.1", "Licensed"],
    ["3", "Medical / waiver (bottleneck)", "Native Flow creates the first predicted document on save", "3.8 (RPA)", "Native (live)"],
    ["4", "Full checklist (any factor)", "DocumentAgent completes the policy-driven document set", "1.3 / 3.3", "Agent (live)"],
    ["5", "Case copilot", "CopilotAgent writes case summary, gap check, drafted request", "3.10", "Agent (live)"],
    ["6", "Recruiter worklist", "TaskAgent queues the high-priority follow-up task", "3.8", "Agent"],
    ["7", "DoDMERB / SF-86", "Status sync + SF-86 validation; protect the 60-day SECRET SLA", "3.3.1.7 / 3.4.4.18-.25", "Licensed"],
    ["8", "Selection boards", "Packet assembly + completeness scoring (human decides)", "2.1.4.7", "Licensed"],
    ["9", "Contracting & onboarding", "DocuSign generate-and-sign; orchestration", "1.3 / 3.4.4", "Licensed"],
    ["10", "Commission / accession", "Eligibility validation, OML, accession orders", "4.7", "Licensed"]
  ]
));
children.push(P("Across the lifecycle the agents act as a tireless documentation coordinator: they ask for the government's next request up front, keep the case complete and current, and let recruiters and adjudicators spend their time on judgment rather than paperwork chase."));

// ---- 8. Governance ----
children.push(H1("8. Governance, guardrails, and compliance"));
children.push(P("The agents are designed to operate inside accessions policy and SEAD 4. The governing principle is simple: **AI surfaces, drafts, and automates; humans approve every send and own every eligibility, suitability, selection, and clearance decision.**"));
children.push(BUL("**Human-in-the-loop.** No applicant message is sent by an agent; the Copilot produces a draft that a human reviews and approves. No agent renders an eligibility, suitability, or clearance determination."));
children.push(BUL("**Idempotency and bounded action.** Agents create only what is missing and never duplicate or take destructive action without explicit operator instruction; a dry-run mode previews all writes."));
children.push(BUL("**Auditability.** Every agent action is a Salesforce record write (document, note, task) on the timeline, providing a complete activity trail; notes are explicitly labeled as external-agent / draft output."));
children.push(BUL("**Data protection.** Production handling targets IL5 hosting (RTM 1.11.1.59) and governed PII/PHI handling (RTM 1.11.1.75); the model boundary must be an authorized, in-boundary service before any real data is processed."));
children.push(BUL("**Transparent policy.** Eligibility/document rules live in a visible policy table, not an opaque model — adaptations are reviewed configuration changes."));

// ---- 9. Results ----
children.push(H1("9. Demonstrated results"));
children.push(P("The architecture was proven live in a commercial Salesforce trial org. Saving a cadet with a qualifying medical factor automatically created the first predicted document; the external agent completed the full checklist, wrote the AI case summary as a draft note, and the value meter (auto-generated documents) incremented in real time as additional cadets were created. The build paused for human confirmation before each meaningful org change, and the data model, Flow, and agents were captured into a redeployable package."));
children.push(P("**Illustrative value framing.** Each auto-generated document corresponds to a request-wait-resubmit cycle eliminated; planning figures used in briefings (for example, a few round-trip days saved per document) are illustrative and should be replaced with measured program metrics once available."));

// ---- 10. Path to licensed ----
children.push(H1("10. Path to a fully licensed Agentforce deployment"));
children.push(P("Moving from the demonstrated hybrid to a fully native deployment is a substitution, not a rebuild. The Cadet Case data model, the policy table, the record-triggered Flow, and the orchestration sequence remain. The external CopilotAgent is replaced by a native Agentforce assistant operating within the platform's governed model boundary; the headless orchestration can continue to run on a schedule for scale, or be expressed as native scheduled/triggered automation. Because the external layer always produced the same records a licensed org would, the migration carries low functional risk."));

// ---- 11. Assumptions ----
children.push(H1("11. Assumptions and caveats"));
children.push(BUL("The demonstration used a commercial trial edition; the custom Agentforce agent builder was not licensed in that edition, which is why the external agent layer stands in for it."));
children.push(BUL("All cadet data is fictional; no real applicant PII was used. The IL5/FedRAMP posture, model boundary, and integration interfaces (MuleSoft, DocuSign, DoDMERB, DCSA) are target-state and must be confirmed against current AIE requirements and authorizations."));
children.push(BUL("RTM identifiers are drawn from the AIE Functional RTM provided for this effort and are used for traceability; mappings should be validated with the program office."));
children.push(BUL("Cycle-time and day-savings figures are illustrative planning values, not measured outcomes."));

children.push(new Paragraph({ children: [new PageBreak()] }));

// ---- Appendix A ----
children.push(H1("Appendix A — Medical factor to document policy table"));
children.push(P("This table is the single source of truth the agents act on. Adding a factor or a required document is a row edit, propagated to the DocumentAgent (and, for the native path, a Flow decision branch)."));
children.push(tbl(
  [3200, 6160],
  ["Medical factor", "Required documents"],
  [
    ["ADHD / anxiety medication history", "Pharmacy records (7-yr history); prescribing provider notes & treatment dates; statement of current functioning (med-free period); school accommodation records (if any)"],
    ["Asthma after age 13", "Pulmonary function test (PFT); provider treatment history; methacholine challenge test (if required)"],
    ["Prior orthopedic injury or surgery", "Operative report; imaging (X-ray/MRI); physical therapy notes; range-of-motion exam"],
    ["Vision correction (LASIK/PRK)", "Surgical operative report; pre/post-op visual acuity; surgeon clearance letter"]
  ]
));

// ---- Appendix B ----
children.push(H1("Appendix B — Representative agent logic (pseudocode)"));
children.push(P("The DocumentAgent's idempotent completion loop, simplified:"));
children.push(new Paragraph({ shading: { type: ShadingType.CLEAR, fill: "F3F4F6" }, spacing: { after: 120 }, children: [new TextRun({ font: "Courier New", size: 18, text:
"for cadet in cadets_with_factor:" })] }));
[
  "    required = POLICY_TABLE[cadet.medical_factor]",
  "    existing  = documents_on(cadet)",
  "    for doc in required - existing:        # only what's missing",
  "        create_document_request(cadet, doc, predicted=True, status='Requested')",
  "    note = llm_summary(cadet)              # CopilotAgent (Agentforce stand-in)",
  "    attach_note(cadet, note)               # draft only; human approves send",
  "    create_task(cadet, 'Send document request', priority='High')  # TaskAgent"
].forEach(line => children.push(new Paragraph({ shading: { type: ShadingType.CLEAR, fill: "F3F4F6" }, spacing: { after: 0 }, children: [new TextRun({ font: "Courier New", size: 18, text: line })] })));
children.push(new Paragraph({ spacing: { before: 160 }, children: [new TextRun({ italics: true, color: GREY, size: 18, text: "Guardrail: every applicant send is human-approved; agents make no eligibility, suitability, or clearance determination (SEAD 4)." })] }));

// ---- Document assembly ----
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 21 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Arial", color: NAVY },
        paragraph: { spacing: { before: 300, after: 140 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: "16315A" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 21, bold: true, font: "Arial", color: "16315A" },
        paragraph: { spacing: { before: 140, after: 80 }, outlineLevel: 2 } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] },
      { reference: "nums", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Alpha Omega  |  AIE AI Agents — Technical Description", color: GREY, size: 16 })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Unclassified — pre-decisional draft for technical review     Page ", color: GREY, size: 16 }), new TextRun({ children: [PageNumber.CURRENT], color: GREY, size: 16 })] })] }) },
    children
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("AIE_AI_Agents_Technical_Description.docx", buf);
  console.log("written", buf.length, "bytes");
});
