const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType, PageNumber, PageBreak, TableOfContents
} = require("docx");

const NAVY = "1F2A44", TEAL = "0E7C7B", LIGHT = "E8F1F2", GREY = "5A5A5A",
      GOLD = "8A6D00", LGOLD = "F3ECD2", SAGE = "EAF2EA";
const CONTENT_W = 9360;
const border = { style: BorderStyle.SINGLE, size: 1, color: "BFD3D3" };
const borders = { top: border, bottom: border, left: border, right: border };

const h1 = t => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const h2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const h3 = t => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(t)] });
const p  = (t, o={}) => new Paragraph({ spacing:{after:150,line:272}, children:[new TextRun({text:t,...o})] });
const runs = (arr, after=150) => new Paragraph({ spacing:{after,line:272}, children:arr });
const bullet = t => new Paragraph({ numbering:{reference:"bul",level:0}, spacing:{after:70,line:268}, children: Array.isArray(t)?t:[new TextRun(t)] });
const subbullet = t => new Paragraph({ numbering:{reference:"bul",level:1}, spacing:{after:60,line:266}, children: Array.isArray(t)?t:[new TextRun(t)] });
const pageBreak = () => new Paragraph({ children:[new PageBreak()] });

function cell(content, { w, shade, head=false, bold=false } = {}) {
  const children = Array.isArray(content) ? content
    : [new Paragraph({ children:[new TextRun({ text:String(content), bold: head||bold, color: head?"FFFFFF":undefined, size: head?18:18 })] })];
  return new TableCell({ borders, width:{size:w,type:WidthType.DXA},
    shading: shade?{fill:shade,type:ShadingType.CLEAR}:undefined,
    margins:{top:70,bottom:70,left:110,right:110}, children });
}
function tbl(colWidths, header, rows, headShade=NAVY) {
  const trows = [];
  trows.push(new TableRow({ tableHeader:true, children: header.map((h,i)=>cell(h,{w:colWidths[i],shade:headShade,head:true})) }));
  rows.forEach((r,ri)=>{
    trows.push(new TableRow({ children: r.map((c,i)=>cell(c,{w:colWidths[i], shade: ri%2? undefined: LIGHT})) }));
  });
  return new Table({ width:{size:CONTENT_W,type:WidthType.DXA}, columnWidths:colWidths, rows:trows });
}
// use-case card
function useCase(num, title, fields) {
  const out = [];
  out.push(new Paragraph({ spacing:{before:160,after:40},
    shading:{fill:LIGHT,type:ShadingType.CLEAR},
    children:[new TextRun({text:`  UC-${num}  `,bold:true,color:"FFFFFF"}), new TextRun({text:`  ${title}`,bold:true,color:NAVY,size:22})] }));
  fields.forEach(([k,v])=>{
    out.push(new Paragraph({ spacing:{after:50,line:268}, indent:{left:120},
      children:[ new TextRun({text:`${k}: `,bold:true,color:TEAL}), new TextRun({text:v}) ]}));
  });
  return out;
}

const doc = new Document({
  creator:"Alpha Omega Integration LLC",
  title:"AI-Enabled Modernization of the Army ROTC Recruitment & Onboarding Lifecycle",
  styles:{
    default:{ document:{ run:{ font:"Arial", size:21 } } },
    paragraphStyles:[
      { id:"Heading1", name:"Heading 1", basedOn:"Normal", next:"Normal", quickFormat:true,
        run:{ size:28, bold:true, font:"Arial", color:NAVY },
        paragraph:{ spacing:{before:300,after:140}, outlineLevel:0,
          border:{ bottom:{ style:BorderStyle.SINGLE, size:6, color:TEAL, space:4 } } } },
      { id:"Heading2", name:"Heading 2", basedOn:"Normal", next:"Normal", quickFormat:true,
        run:{ size:23, bold:true, font:"Arial", color:TEAL },
        paragraph:{ spacing:{before:200,after:90}, outlineLevel:1 } },
      { id:"Heading3", name:"Heading 3", basedOn:"Normal", next:"Normal", quickFormat:true,
        run:{ size:21, bold:true, font:"Arial", color:NAVY },
        paragraph:{ spacing:{before:140,after:60}, outlineLevel:2 } },
    ]
  },
  numbering:{ config:[
    { reference:"bul", levels:[
      { level:0, format:LevelFormat.BULLET, text:"•", alignment:AlignmentType.LEFT, style:{paragraph:{indent:{left:480,hanging:240}}} },
      { level:1, format:LevelFormat.BULLET, text:"–", alignment:AlignmentType.LEFT, style:{paragraph:{indent:{left:900,hanging:240}}} },
    ]},
  ]},
  sections:[
    // ===== COVER =====
    {
      properties:{ page:{ size:{width:12240,height:15840}, margin:{top:1440,right:1440,bottom:1440,left:1440} } },
      children:[
        new Paragraph({ spacing:{before:1300,after:0}, children:[new TextRun({text:"ALPHA OMEGA",bold:true,size:52,color:NAVY})] }),
        new Paragraph({ spacing:{after:500}, children:[new TextRun({text:"Total Mission Automation",size:24,color:TEAL,italics:true})] }),
        new Paragraph({ shading:{fill:NAVY,type:ShadingType.CLEAR}, children:[new TextRun({text:"  AI-Enabled Modernization of the",bold:true,size:30,color:"FFFFFF"})] }),
        new Paragraph({ shading:{fill:NAVY,type:ShadingType.CLEAR}, children:[new TextRun({text:"  Army ROTC Recruitment & Onboarding Lifecycle",bold:true,size:30,color:"FFFFFF"})] }),
        new Paragraph({ shading:{fill:TEAL,type:ShadingType.CLEAR}, spacing:{after:420}, children:[new TextRun({text:"  Ideas, use cases, and business flows on a DoD Salesforce + MuleSoft + DocuSign + Azure DevOps stack",size:20,color:"FFFFFF"})] }),
        p("From applicant form entry to ROTC acceptance and contracting — a solution concept for compressing the ~12-month lifecycle, improving data quality, and reducing risk through applied AI and intelligent automation, with full human-in-the-loop control over eligibility, selection, and security-clearance decisions."),
        new Paragraph({ spacing:{before:300,after:120}, children:[new TextRun({text:"Solution Concept Document",bold:true,size:24,color:NAVY})] }),
        tbl([3000,6360],["Field","Detail"],[
          ["Prepared by","Alpha Omega Integration LLC — National Security Solutions"],
          ["Point of contact","Rob Brown, SVP, National Security Solutions (robert.brown@alphaomega.com)"],
          ["Date","June 25, 2026"],
          ["Target environment","DoD Salesforce (Service/Public Sector Solutions), MuleSoft, DocuSign, Microsoft Azure + Azure DevOps, SAFe, DevSecOps"],
          ["Status","Pre-decisional ideation — for internal review and customer discovery"],
        ]),
        new Paragraph({ spacing:{before:300}, children:[new TextRun({text:"Note on scope and accuracy: ",bold:true,color:GOLD}),
          new TextRun({text:"Process steps reflect the publicly understood Army ROTC scholarship and onboarding lifecycle and the SF-86 national-security questionnaire workflow. Exact board dates, system names (e.g., e-QIP vs. NBIS), and policy thresholds should be confirmed with USACC (Cadet Command), DCSA, and DoDMERB before design baseline.",italics:true,color:GREY}) ] }),
      ],
    },
    // ===== BODY =====
    {
      properties:{ page:{ size:{width:12240,height:15840}, margin:{top:1440,right:1440,bottom:1440,left:1440} } },
      headers:{ default:new Header({ children:[new Paragraph({
        border:{bottom:{style:BorderStyle.SINGLE,size:4,color:TEAL,space:2}},
        tabStops:[{type:"right",position:CONTENT_W}],
        children:[ new TextRun({text:"Alpha Omega — National Security Solutions",color:GREY,size:16}),
                   new TextRun({text:"\tArmy ROTC Lifecycle Modernization",color:GREY,size:16}) ]})] }) },
      footers:{ default:new Footer({ children:[new Paragraph({
        border:{top:{style:BorderStyle.SINGLE,size:4,color:TEAL,space:2}},
        tabStops:[{type:"right",position:CONTENT_W}],
        children:[ new TextRun({text:"Pre-decisional — Solution Concept",color:GREY,size:16}),
                   new TextRun({text:"\tPage ",color:GREY,size:16}), new TextRun({children:[PageNumber.CURRENT],color:GREY,size:16}) ]})] }) },
      children:[
        h1("Contents"),
        new TableOfContents("Table of Contents",{hyperlink:true,headingStyleRange:"1-2"}),
        pageBreak(),

        // 1
        h1("1. Executive Summary"),
        p("The Army ROTC scholarship pathway takes roughly twelve months from the moment an applicant starts the online application to the point of ROTC acceptance and contracting. Across that year the candidate moves through application intake, document and eligibility verification, fitness and medical screening (DoDMERB), a Professor of Military Science (PMS) interview, multiple national selection boards, an offer and acceptance, security-clearance initiation via the SF-86, and finally contracting and enrollment. Each handoff today involves manual data entry, document chasing, email back-and-forth, and disconnected systems — the dominant sources of delay, error, and applicant drop-off."),
        p("This document describes how applied AI and intelligent automation — built on the target DoD stack of Salesforce (Service Cloud / Public Sector Solutions), MuleSoft, DocuSign, and Microsoft Azure, delivered with SAFe and DevSecOps on Azure DevOps — can compress that lifecycle, raise data quality, and reduce risk. It is organized around business flows and concrete use cases, and deliberately centers two human experiences: the student completing the application and the SF-86, and the cadre member / adjudicator reviewing those forms and managing the case to completion."),
        p("A guiding principle runs through every recommendation: AI accelerates, structures, and quality-checks the work, but humans retain authority over eligibility, selection, and security-clearance determinations. Adjudicative and selection judgments are augmented, never automated."),
        runs([ new TextRun({text:"Target outcomes: ",bold:true}),
          new TextRun("shorter time-to-decision, fewer incomplete or erroneous submissions, lower administrative burden on cadre and adjudicators, earlier risk surfacing, and a measurably better applicant experience that protects the recruiting pipeline.") ]),

        // 2
        h1("2. Scope, Actors & Current-State Overview"),
        h2("2.1 Lifecycle in scope"),
        p("End to end, from applicant form entry to ROTC acceptance, contracting, and onboarding into a host battalion — including the security-clearance onboarding that runs in parallel. The lifecycle is treated as a single connected case rather than a series of disconnected forms."),
        h2("2.2 Key actors"),
        bullet([new TextRun({text:"Applicant / Cadet candidate — ",bold:true}), new TextRun("completes the application, uploads documents, takes the fitness assessment, attends the medical exam and interview, and later completes the SF-86.")]),
        bullet([new TextRun({text:"Parents / recommenders / school officials — ",bold:true}), new TextRun("provide transcripts, test scores, and references.")]),
        bullet([new TextRun({text:"ROTC cadre / Recruiting Operations Officer (ROO) / PMS — ",bold:true}), new TextRun("guide applicants, conduct interviews, score and forward packets.")]),
        bullet([new TextRun({text:"USACC (Cadet Command) selection boards — ",bold:true}), new TextRun("score and rank candidates across multiple boards and issue offers.")]),
        bullet([new TextRun({text:"DoDMERB — ",bold:true}), new TextRun("conducts and adjudicates the medical examination.")]),
        bullet([new TextRun({text:"Security clearance investigator / adjudicator (DCSA) — ",bold:true}), new TextRun("processes the SF-86, conducts the background investigation, and adjudicates eligibility under the National Security Adjudicative Guidelines (SEAD 4).")]),
        h2("2.3 Why it is slow today — the recurring pain pattern"),
        bullet("Re-keying the same identity, education, and biographic data into multiple forms and systems (application, DoDMERB, SF-86, contracting)."),
        bullet("Incomplete or inconsistent submissions that bounce back weeks later, restarting clocks."),
        bullet("Manual document collection, verification, and status-chasing over email and phone."),
        bullet("Limited applicant visibility into status, creating anxiety, abandonment, and inbound inquiries."),
        bullet("Disconnected systems with no single case record, so cadre and adjudicators stitch context together by hand."),

        // 3
        h1("3. The End-to-End Process — Business Flow"),
        p("The lifecycle below is the backbone for every use case in Section 6. Each stage lists the core activity, the dominant friction, and the primary AI/automation lever. Section 5 then summarizes all levers in a single opportunity matrix."),
        tbl([520,2100,3220,3520],
          ["#","Stage","Core activity & friction","Primary AI / automation lever"],
          [
            ["S1","Awareness & lead capture","Inbound interest from web, events, referrals; leads lost or slow to first contact","AI lead scoring & routing; conversational assistant for instant Q&A and qualification"],
            ["S2","Application intake","Long multi-part online application; high abandonment; partial data","Guided/conversational intake, pre-fill, real-time validation, autosave & nudge"],
            ["S3","Document & eligibility verification","Transcripts, test scores, citizenship, age; manual checks; rework","Intelligent document processing (OCR/IDP), automated eligibility rules, anomaly flags"],
            ["S4","Fitness & medical (CFA + DoDMERB)","Scheduling, results capture, medical remedials/waivers","Automated scheduling, status sync via API, document classification, remedial prediction"],
            ["S5","PMS interview","Coordinating and scoring interviews across battalions","Smart scheduling; AI interview-note summarization; rubric-consistency checks"],
            ["S6","Selection boards & scoring","Compiling whole-person packets; ranking across boards","Automated packet assembly & completeness scoring; decision-support analytics (human-decided)"],
            ["S7","Offer & acceptance","Generating, sending, tracking offers & acceptance","DocuSign e-signature; automated, personalized correspondence; deadline tracking"],
            ["S8","Security clearance (SF-86)","136-page questionnaire; errors; long investigation/adjudication","SF-86 pre-fill & validation; IDP for evidence; adjudicator copilot; case prioritization"],
            ["S9","Contracting & onboarding","Oath, enrollment, scholarship activation, battalion in-processing","Workflow orchestration; e-sign; provisioning via API; onboarding concierge"],
            ["S10","Case management (cross-cutting)","Status, SLAs, correspondence, escalations across all stages","Salesforce case lifecycle, omnichannel, SLA automation, next-best-action"],
          ]),

        // 4
        h1("4. Two Human Journeys"),
        p("Most of the time-and-quality problem lives in two experiences. Designing for these personas first is what turns a systems project into a mission outcome."),

        h2("4.1 The Student — completing the application and the SF-86"),
        h3("Today"),
        bullet("Faces two large, intimidating forms (the ROTC application and later the SF-86) that ask for overlapping information in different formats and at different times."),
        bullet("Must gather 7–10 years of addresses, schools, employment, and contacts for the SF-86 from memory, often introducing gaps and errors that trigger rework."),
        bullet("Has little feedback on whether answers are complete or correct until a reviewer rejects the packet weeks later."),
        bullet("Lacks a clear, consolidated view of what is done, what is pending, and what happens next."),
        h3("Future state with AI"),
        bullet([new TextRun({text:"Conversational, guided intake: ",bold:true}), new TextRun("a secure assistant turns the form into a plain-language conversation, explaining why each item is needed and adapting questions to prior answers.")]),
        bullet([new TextRun({text:"Pre-fill and reuse: ",bold:true}), new TextRun("data captured once in the application is reused (with consent) to pre-populate downstream forms, including the biographic and residence/education history that the SF-86 demands.")]),
        bullet([new TextRun({text:"Real-time validation & completeness scoring: ",bold:true}), new TextRun("AI checks for gaps, date overlaps, missing contacts, and inconsistent entries before submission, with a live 'readiness' score.")]),
        bullet([new TextRun({text:"Document help: ",bold:true}), new TextRun("the applicant photographs a transcript or document and intelligent document processing extracts and files it automatically.")]),
        bullet([new TextRun({text:"Always-on status & nudges: ",bold:true}), new TextRun("a portal and proactive notifications show exactly what is complete, what is pending, and the next action — reducing abandonment and inbound inquiries.")]),
        runs([ new TextRun({text:"Guardrail: ",bold:true,color:GOLD}),
          new TextRun("AI assists the applicant in completing their own truthful answers; it never fabricates or infers SF-86 responses. All certifications remain the applicant's own attested statements.") ]),

        h2("4.2 The Adjudicator / Cadre — reviewing forms and managing the case"),
        h3("Today"),
        bullet("Manually reads long packets and SF-86 submissions, cross-checking fields, dates, and supporting evidence by hand."),
        bullet("Spends disproportionate time on incomplete submissions, issuing interrogatories and waiting for responses."),
        bullet("Tracks cases across spreadsheets, email, and multiple systems with no unified queue, SLA view, or audit trail."),
        bullet("Struggles to prioritize the highest-risk or closest-to-deadline cases."),
        h3("Future state with AI"),
        bullet([new TextRun({text:"Adjudicator/reviewer copilot: ",bold:true}), new TextRun("auto-summarizes the packet, highlights gaps and inconsistencies, links each concern to the relevant evidence and the applicable guideline, and drafts interrogatories for human approval.")]),
        bullet([new TextRun({text:"Completeness gating: ",bold:true}), new TextRun("only validated, complete cases reach the reviewer, eliminating the bounce-back cycle.")]),
        bullet([new TextRun({text:"Case prioritization & next-best-action: ",bold:true}), new TextRun("AI ranks the queue by deadline and risk and recommends the next step, while the human makes every substantive call.")]),
        bullet([new TextRun({text:"Unified case record & audit trail: ",bold:true}), new TextRun("one Salesforce case shows full history, correspondence, SLAs, and decisions — defensible and inspection-ready.")]),
        runs([ new TextRun({text:"Guardrail: ",bold:true,color:GOLD}),
          new TextRun("AI surfaces, organizes, and explains information. Eligibility, selection, and clearance determinations are made by authorized humans under SEAD 4 and Army policy, with every AI-assisted step logged for traceability.") ]),

        // 5
        h1("5. AI Opportunity Matrix"),
        p("The matrix maps each stage to the dominant pain, the AI method, the platform component that delivers it, and the value lever (speed, quality, risk, experience)."),
        tbl([1500,2100,2100,1660,2000],
          ["Stage","Pain today","AI method","Tech component","Value lever"],
          [
            ["Intake (S2)","Abandonment, partial data","Conversational AI, pre-fill, validation","Salesforce + Azure OpenAI; MuleSoft pre-fill","Speed + experience"],
            ["Docs/eligibility (S3)","Manual checks, rework","Intelligent document processing, rules","Azure AI Document Intelligence; SF Flow","Quality + risk"],
            ["Medical (S4)","Scheduling, remedials","Scheduling, status sync, prediction","MuleSoft↔DoDMERB; ML model","Speed"],
            ["Interview (S5)","Coordination, scoring drift","Summarization, rubric checks","Azure OpenAI; Salesforce","Quality"],
            ["Boards (S6)","Packet assembly, ranking","Auto-assembly, completeness, analytics","Salesforce; Azure ML (human-decided)","Speed + quality"],
            ["Offer (S7)","Manual letters, tracking","Generated correspondence, e-sign","DocuSign; SF; Azure OpenAI","Speed"],
            ["SF-86 (S8)","Errors, long cycle","Pre-fill, validation, copilot, triage","SF; MuleSoft↔NBIS; Azure AI","All four"],
            ["Contracting (S9)","Manual onboarding","Orchestration, provisioning","SF Flow Orchestration; MuleSoft; DocuSign","Speed + risk"],
            ["Case mgmt (S10)","No unified view","SLA automation, next-best-action","Salesforce Service Cloud / PSS","All four"],
          ]),

        // 6
        h1("6. Detailed AI Use Cases"),
        p("Each use case states the problem, the AI technique, the mapping to the target stack, and the expected outcome. Use cases are sequenced to mirror the lifecycle."),
        ...useCase("01","Conversational guided application intake",[
          ["Problem","Long, intimidating multi-part application drives abandonment and partial data."],
          ["AI technique","Retrieval-augmented conversational assistant with dynamic branching and plain-language explanations; real-time field validation."],
          ["Stack","Salesforce Experience Cloud front end; Azure OpenAI (governed) for the assistant; MuleSoft APIs to pre-fill from authoritative sources; Salesforce as system of record."],
          ["Outcome","Higher completion rates, cleaner first-pass data, fewer support inquiries."],
        ]),
        ...useCase("02","Intelligent document processing & eligibility verification",[
          ["Problem","Transcripts, test scores, citizenship/age proofs verified by hand; frequent rework."],
          ["AI technique","OCR + document classification + key-field extraction; deterministic eligibility rules engine with anomaly detection."],
          ["Stack","Azure AI Document Intelligence; Salesforce Flow / rules; MuleSoft to verticalize external lookups."],
          ["Outcome","Faster verification, consistent eligibility checks, exceptions surfaced early."],
        ]),
        ...useCase("03","DoDMERB medical scheduling & status synchronization",[
          ["Problem","Medical exam scheduling and results tracking are manual; remedials cause silent delays."],
          ["AI technique","Automated scheduling/reminders; predictive flag for likely remedials/waivers to act earlier."],
          ["Stack","MuleSoft API integration to DoDMERB; Salesforce case milestones; notification automation."],
          ["Outcome","Fewer stalled cases; earlier intervention on medical remedials."],
        ]),
        ...useCase("04","Interview scheduling & AI note summarization",[
          ["Problem","Coordinating PMS interviews across battalions; inconsistent scoring notes."],
          ["AI technique","Smart scheduling; speech/text summarization of interview notes; rubric-consistency checks (advisory)."],
          ["Stack","Salesforce scheduling; Azure OpenAI summarization; structured rubric in Salesforce."],
          ["Outcome","Less coordination overhead; more consistent, auditable interview records."],
        ]),
        ...useCase("05","Automated whole-person packet assembly & completeness scoring",[
          ["Problem","Board packets assembled manually; incomplete packets reach boards."],
          ["AI technique","Automated assembly from the case record; completeness scoring; decision-support analytics that rank on documented criteria."],
          ["Stack","Salesforce (case + documents); Azure ML for analytics; dashboards for board members."],
          ["Outcome","Boards see only complete packets; faster, better-informed (human) decisions."],
          ["Guardrail","Selection decisions remain with the board; AI provides organized evidence and analytics, not the ranking decision."],
        ]),
        ...useCase("06","Generated offers, correspondence & e-signature",[
          ["Problem","Offer letters and status correspondence are manual; acceptance tracking is ad hoc."],
          ["AI technique","Template-grounded generation of personalized, policy-compliant correspondence; automated reminders."],
          ["Stack","DocuSign for offer/acceptance e-signature; Salesforce for orchestration; Azure OpenAI for drafting (human-approved)."],
          ["Outcome","Same-day offers, tracked acceptance, fewer missed deadlines."],
        ]),
        ...useCase("07","SF-86 pre-fill, validation & applicant copilot",[
          ["Problem","The SF-86 is long and error-prone; gaps and date overlaps trigger costly rework and investigation delays."],
          ["AI technique","Consented pre-fill from prior data; real-time completeness/consistency validation; plain-language copilot explaining each section."],
          ["Stack","Salesforce/Experience Cloud; MuleSoft integration to the official clearance system (e-QIP/NBIS) — confirm interface; Azure AI."],
          ["Outcome","Cleaner SF-86 submissions, fewer interrogatories, shorter investigation start time."],
          ["Guardrail","Applicant attests to all answers; AI never fabricates responses."],
        ]),
        ...useCase("08","Adjudicator / reviewer copilot",[
          ["Problem","Reviewers manually read long submissions and cross-check evidence and guidelines."],
          ["AI technique","Packet summarization; gap/inconsistency detection; evidence-to-guideline linking; drafted interrogatories for human approval."],
          ["Stack","Salesforce case; Azure OpenAI (governed, in-boundary); retrieval over case documents."],
          ["Outcome","Major reduction in review time; consistent, defensible, fully logged reviews."],
          ["Guardrail","Adjudicative determinations are human decisions under SEAD 4; AI is decision-support only."],
        ]),
        ...useCase("09","Case prioritization & next-best-action",[
          ["Problem","No unified queue; hard to prioritize by deadline and risk."],
          ["AI technique","Predictive prioritization on deadline/risk; next-best-action recommendations."],
          ["Stack","Salesforce Service Cloud / Public Sector Solutions; Einstein/Azure ML."],
          ["Outcome","Cases worked in the right order; fewer breaches of board and clearance timelines."],
        ]),
        ...useCase("10","Contracting & onboarding orchestration",[
          ["Problem","Oath, enrollment, scholarship activation, and battalion in-processing are manual and fragmented."],
          ["AI technique","Workflow orchestration with automated provisioning and an onboarding 'concierge' assistant."],
          ["Stack","Salesforce Flow Orchestration; DocuSign; MuleSoft to enterprise systems (e.g., enrollment, pay, DEERS — confirm)."],
          ["Outcome","Faster, consistent onboarding; clean activation; better first experience as a cadet."],
        ]),
        ...useCase("11","Proactive applicant status & retention nudges",[
          ["Problem","Applicants drop off due to uncertainty and slow feedback."],
          ["AI technique","Personalized, event-driven nudges and a self-service status assistant; churn-risk prediction."],
          ["Stack","Salesforce + Marketing/omnichannel; Azure ML; conversational assistant."],
          ["Outcome","Protected recruiting pipeline; fewer inbound inquiries."],
        ]),
        ...useCase("12","Data quality & deduplication across the lifecycle",[
          ["Problem","Duplicate and inconsistent records degrade trust and reporting."],
          ["AI technique","Entity resolution/matching, standardization, and continuous data-quality scoring."],
          ["Stack","Salesforce data model + duplicate rules; MuleSoft canonical data; Azure data services."],
          ["Outcome","One trusted record per candidate; reliable analytics and audit."],
        ]),

        // 7
        h1("7. Case Management Automation (Salesforce Core)"),
        p("A single Salesforce case represents the candidate's journey from lead to contracted cadet, with stage-specific child records (application, documents, medical, interview, offer, clearance). This is what makes the lifecycle measurable and manageable."),
        bullet([new TextRun({text:"Case lifecycle & milestones: ",bold:true}), new TextRun("statuses and entitlements/SLAs per stage, with automated escalation on approaching breaches.")]),
        bullet([new TextRun({text:"Queues, assignment & omnichannel: ",bold:true}), new TextRun("rules-based routing to the right cadre/adjudicator; email, portal, and chat unified on the case.")]),
        bullet([new TextRun({text:"Automated correspondence: ",bold:true}), new TextRun("template-driven, policy-compliant communications triggered by case events, sent for human approval where required.")]),
        bullet([new TextRun({text:"Flow & Flow Orchestration: ",bold:true}), new TextRun("declarative multi-step, multi-actor workflows that remove manual handoffs and enforce policy.")]),
        bullet([new TextRun({text:"Knowledge & self-service: ",bold:true}), new TextRun("grounded answers for applicants and cadre, reducing repeat inquiries.")]),
        bullet([new TextRun({text:"Audit & reporting: ",bold:true}), new TextRun("full history, dashboards for cycle time, completeness, and bottlenecks by stage and battalion.")]),

        // 8
        h1("8. Target-State Architecture"),
        h2("8.1 Layered view"),
        tbl([2300,7060],["Layer","Components & role"],[
          ["Experience","Salesforce Experience Cloud portals for applicants and cadre; conversational assistants; DocuSign signing experiences."],
          ["Engagement / case","Salesforce Service Cloud / Public Sector Solutions — system of record for the case, workflows (Flow/Orchestration), SLAs, correspondence, knowledge."],
          ["AI services","Azure OpenAI and Azure AI (Document Intelligence, ML) plus Salesforce Einstein, used through a governed, in-boundary pattern with human-in-the-loop."],
          ["Integration","MuleSoft API layer (API-led: system/process/experience APIs) connecting Salesforce to DoDMERB, the clearance system (e-QIP/NBIS), enrollment/SIS, identity (DEERS/IdAM), and pay — in an API-heavy environment this is the backbone."],
          ["Document & e-sign","DocuSign for offers, acceptances, contracting, and consent capture, integrated to the case."],
          ["Data & analytics","Canonical data model, data-quality services, dashboards/CRM Analytics on Azure data services."],
          ["Platform & security","Azure hosting at the appropriate DoD Impact Level; zero-trust, encryption, RBAC/ABAC, full audit; DevSecOps pipelines."],
        ]),
        h2("8.2 Integration principle (API-led)"),
        p("In this API-heavy environment, MuleSoft is the integration backbone. System APIs expose authoritative sources (DoDMERB, clearance, enrollment, identity, pay); process APIs encapsulate lifecycle logic (e.g., 'verify eligibility', 'initiate clearance'); experience APIs serve the Salesforce portals and assistants. This decouples Salesforce from brittle point-to-point links, enables reuse, and lets data be captured once and reused across the application, SF-86, and contracting — directly attacking the re-keying problem."),

        // 9
        h1("9. Responsible AI, Security & Governance"),
        bullet([new TextRun({text:"Human-in-the-loop by design: ",bold:true}), new TextRun("AI never makes eligibility, selection, or clearance determinations; it summarizes, validates, and recommends, and every assisted step is logged.")]),
        bullet([new TextRun({text:"Hybrid (deterministic + generative) AI: ",bold:true}), new TextRun("rules engines handle policy-bound checks for predictability and auditability; generative AI handles language tasks (explanation, drafting, summarization) within guardrails.")]),
        bullet([new TextRun({text:"Data protection: ",bold:true}), new TextRun("PII/PEI minimization, encryption in transit and at rest, strict RBAC/ABAC, and segregation of SF-86 data consistent with DCSA handling requirements.")]),
        bullet([new TextRun({text:"Boundary & accreditation: ",bold:true}), new TextRun("AI services operated within the accredited DoD boundary at the correct Impact Level; no candidate data sent to unaccredited services.")]),
        bullet([new TextRun({text:"Bias, transparency & traceability: ",bold:true}), new TextRun("model evaluation, explainability for any scoring, and a clear record of how each recommendation was produced.")]),
        bullet([new TextRun({text:"Records & FOIA/Privacy Act posture: ",bold:true}), new TextRun("retention and disclosure handled within Salesforce's audit and records capabilities.")]),

        // 10
        h1("10. Delivery Approach — SAFe & DevSecOps on Azure DevOps"),
        bullet([new TextRun({text:"SAFe delivery: ",bold:true}), new TextRun("an Agile Release Train aligned to the lifecycle, with PI planning, lifecycle-stage features, and continuous stakeholder demos to USACC, DoDMERB, and clearance stakeholders.")]),
        bullet([new TextRun({text:"Azure DevOps (ADO): ",bold:true}), new TextRun("backlog, boards, repos, and pipelines as the single delivery hub; traceability from requirement to deployed change.")]),
        bullet([new TextRun({text:"DevSecOps pipelines: ",bold:true}), new TextRun("CI/CD for Salesforce metadata (SFDX) and MuleSoft assets with automated testing, static/dynamic security scanning, policy-as-code gates, and automated rollback.")]),
        bullet([new TextRun({text:"Continuous ATO posture: ",bold:true}), new TextRun("security controls and evidence automated into the pipeline to shorten and sustain authorization.")]),
        bullet([new TextRun({text:"Environments & data: ",bold:true}), new TextRun("masked/synthetic data in lower environments; controlled promotion to production.")]),

        // 11
        h1("11. Risks & Mitigations"),
        tbl([3100,3100,3160],["Risk","Impact","Mitigation"],[
          ["Over-automation of judgment","Improper eligibility/clearance outcomes","Strict human-in-the-loop; AI is decision-support only; full logging"],
          ["Data sensitivity (SF-86/PII)","Breach, compliance failure","In-boundary AI, encryption, RBAC/ABAC, DCSA-aligned handling"],
          ["Integration complexity","Delays, brittle links","API-led MuleSoft design; reuse; contract testing"],
          ["Model error / hallucination","Wrong guidance to applicant/reviewer","Deterministic checks for policy items; grounded generation; human approval"],
          ["Change adoption","Low uptake by cadre/applicants","Persona-led design; training; phased rollout; clear value"],
          ["Authorization timeline","Slow path to production","DevSecOps + continuous-ATO automation from day one"],
        ]),

        // 12
        h1("12. Expected Benefits & KPIs"),
        tbl([3600,2880,2880],["Objective","Metric","Target direction"],[
          ["Speed up the lifecycle","Median days, form-entry → acceptance","Significant reduction"],
          ["Clean up data","First-pass completeness / error rate","Higher completeness, fewer errors"],
          ["Reduce rework","Interrogatories / bounce-backs per case","Down"],
          ["Reduce risk","SLA/timeline breaches; audit findings","Down"],
          ["Higher quality","Decision consistency; record completeness","Up"],
          ["Better experience","Abandonment rate; applicant satisfaction","Lower abandonment, higher CSAT"],
          ["Lower burden","Cadre/adjudicator hours per case","Down"],
        ]),
        p("Targets should be baselined against current USACC and clearance cycle data during discovery, then tracked on Salesforce dashboards."),

        // 13
        h1("13. Phased Roadmap"),
        h3("Phase 1 — Foundation (Crawl)"),
        bullet("Unified Salesforce case model and lifecycle; DocuSign for offers/acceptance; MuleSoft system APIs for the highest-value integrations (DoDMERB, clearance); core dashboards. Quick wins: guided intake (UC-01), IDP (UC-02), status nudges (UC-11)."),
        h3("Phase 2 — Intelligence (Walk)"),
        bullet("SF-86 pre-fill & validation (UC-07), adjudicator copilot (UC-08), automated packet assembly (UC-05), generated correspondence (UC-06), case prioritization (UC-09), within governed AI guardrails."),
        h3("Phase 3 — Optimization (Run)"),
        bullet("Predictive analytics across the pipeline, onboarding orchestration (UC-10), continuous data-quality (UC-12), and continuous-ATO maturity; expand to other accessions pipelines."),

        h1("14. Conclusion"),
        p("Treating the Army ROTC year as a single, AI-augmented, well-instrumented case — built on Salesforce, MuleSoft, DocuSign, and Azure, and delivered with SAFe and DevSecOps — can meaningfully compress the timeline, raise data quality, reduce risk, and improve the experience for both the student and the adjudicator, while keeping every eligibility, selection, and clearance decision firmly in human hands. Alpha Omega is positioned to design and deliver this concept and would welcome a discovery session and a Continuum Design proof-of-concept to baseline the current state and prioritize the first increment."),
      ],
    },
  ],
});

Packer.toBuffer(doc).then(buf=>{
  fs.writeFileSync("/sessions/beautiful-eager-clarke/mnt/outputs/AlphaOmega_ROTC_AI_Modernization.docx", buf);
  console.log("written");
});
