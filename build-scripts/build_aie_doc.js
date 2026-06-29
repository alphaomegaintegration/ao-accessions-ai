const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType, PageNumber, PageBreak, TableOfContents
} = require("docx");

const NAVY="1F2A44", TEAL="0E7C7B", LIGHT="E8F1F2", GREY="5A5A5A", GOLD="8A6D00";
const CONTENT_W=9360;
const border={style:BorderStyle.SINGLE,size:1,color:"BFD3D3"};
const borders={top:border,bottom:border,left:border,right:border};

const h1=t=>new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun(t)]});
const h2=t=>new Paragraph({heading:HeadingLevel.HEADING_2,children:[new TextRun(t)]});
const h3=t=>new Paragraph({heading:HeadingLevel.HEADING_3,children:[new TextRun(t)]});
const p=(t,o={})=>new Paragraph({spacing:{after:150,line:272},children:[new TextRun({text:t,...o})]});
const runs=(arr,after=150)=>new Paragraph({spacing:{after,line:272},children:arr});
const bullet=t=>new Paragraph({numbering:{reference:"bul",level:0},spacing:{after:70,line:268},children:Array.isArray(t)?t:[new TextRun(t)]});
const pageBreak=()=>new Paragraph({children:[new PageBreak()]});
// requirement id chip inline
const rid=ids=>new TextRun({text:` [${ids}]`,bold:true,color:TEAL});

function cell(content,{w,shade,head=false,bold=false}={}){
  const children=Array.isArray(content)?content:[new Paragraph({children:[new TextRun({text:String(content),bold:head||bold,color:head?"FFFFFF":undefined,size:18})]})];
  return new TableCell({borders,width:{size:w,type:WidthType.DXA},shading:shade?{fill:shade,type:ShadingType.CLEAR}:undefined,margins:{top:70,bottom:70,left:110,right:110},children});
}
function tbl(colWidths,header,rows,headShade=NAVY){
  const tr=[new TableRow({tableHeader:true,children:header.map((h,i)=>cell(h,{w:colWidths[i],shade:headShade,head:true}))})];
  rows.forEach((r,ri)=>tr.push(new TableRow({children:r.map((c,i)=>cell(c,{w:colWidths[i],shade:ri%2?undefined:LIGHT}))})));
  return new Table({width:{size:CONTENT_W,type:WidthType.DXA},columnWidths:colWidths,rows:tr});
}
function useCase(num,title,fields){
  const out=[new Paragraph({spacing:{before:150,after:40},shading:{fill:LIGHT,type:ShadingType.CLEAR},children:[new TextRun({text:`  UC-${num}  `,bold:true,color:"FFFFFF"}),new TextRun({text:`  ${title}`,bold:true,color:NAVY,size:22})]})];
  fields.forEach(([k,v])=>out.push(new Paragraph({spacing:{after:50,line:268},indent:{left:120},children:[new TextRun({text:`${k}: `,bold:true,color:TEAL}),...(Array.isArray(v)?v:[new TextRun({text:v})])]})));
  return out;
}

const doc=new Document({
  creator:"Alpha Omega Integration LLC",
  title:"AI-Enabled ROTC Accessions in the Army AIE",
  styles:{
    default:{document:{run:{font:"Arial",size:21}}},
    paragraphStyles:[
      {id:"Heading1",name:"Heading 1",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:28,bold:true,font:"Arial",color:NAVY},paragraph:{spacing:{before:300,after:140},outlineLevel:0,border:{bottom:{style:BorderStyle.SINGLE,size:6,color:TEAL,space:4}}}},
      {id:"Heading2",name:"Heading 2",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:23,bold:true,font:"Arial",color:TEAL},paragraph:{spacing:{before:200,after:90},outlineLevel:1}},
      {id:"Heading3",name:"Heading 3",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:21,bold:true,font:"Arial",color:NAVY},paragraph:{spacing:{before:140,after:60},outlineLevel:2}},
    ]
  },
  numbering:{config:[{reference:"bul",levels:[
    {level:0,format:LevelFormat.BULLET,text:"•",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:480,hanging:240}}}},
    {level:1,format:LevelFormat.BULLET,text:"–",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:900,hanging:240}}}},
  ]}]},
  sections:[
    // COVER
    {
      properties:{page:{size:{width:12240,height:15840},margin:{top:1440,right:1440,bottom:1440,left:1440}}},
      children:[
        new Paragraph({spacing:{before:1200,after:0},children:[new TextRun({text:"ALPHA OMEGA",bold:true,size:52,color:NAVY})]}),
        new Paragraph({spacing:{after:480},children:[new TextRun({text:"Total Mission Automation",size:24,color:TEAL,italics:true})]}),
        new Paragraph({shading:{fill:NAVY,type:ShadingType.CLEAR},children:[new TextRun({text:"  AI-Enabled ROTC Accessions in the Army",bold:true,size:30,color:"FFFFFF"})]}),
        new Paragraph({shading:{fill:NAVY,type:ShadingType.CLEAR},children:[new TextRun({text:"  Accessions Information Environment (AIE)",bold:true,size:30,color:"FFFFFF"})]}),
        new Paragraph({shading:{fill:TEAL,type:ShadingType.CLEAR},spacing:{after:420},children:[new TextRun({text:"  Mapping the ROTC officer-accessions lifecycle to AIE functional requirements — ideas, use cases & business flows",size:19,color:"FFFFFF"})]}),
        p("A solution concept that aligns applied AI and intelligent automation to the AIE Functional Requirements Traceability Matrix (RTM) — accelerating the ROTC scholarship-to-contracting lifecycle, raising data quality, and reducing risk on AIE's COTS Salesforce + MuleSoft + DocuSign + Azure foundation, with human authority retained over eligibility, selection, suitability, and clearance decisions."),
        new Paragraph({spacing:{before:280,after:120},children:[new TextRun({text:"Solution Concept Document",bold:true,size:24,color:NAVY})]}),
        tbl([3000,6360],["Field","Detail"],[
          ["Prepared by","Alpha Omega Integration LLC — National Security Solutions"],
          ["Point of contact","Rob Brown, SVP, National Security Solutions (robert.brown@alphaomega.com)"],
          ["Date","June 25, 2026"],
          ["Grounded in","AIE Capability Overview (OV-1) and AIE Functional RTM (Foundation, CRM, Processing, On-Boarding, Intelligence, Marketing, Training & Leader Dev, Sustain & Support)"],
          ["Target stack","DoD Salesforce (CMMI/ITIL-aligned) · MuleSoft (API-led) · DocuSign · Microsoft Azure + Azure DevOps · SAFe · DevSecOps"],
          ["Status","Pre-decisional ideation — references RTM requirement IDs for traceability"],
        ]),
        new Paragraph({spacing:{before:280},children:[new TextRun({text:"Note: ",bold:true,color:GOLD}),new TextRun({text:"Bracketed identifiers (e.g., [3.4.4.18]) cite the AIE Functional RTM “New Reqt #” to show traceability. Requirement wording is summarized; the RTM remains authoritative. Process cadence (boards, 60-day clearance windows, MS I–IV progression) should be confirmed with USACC, DoDMERB, and DCSA before design baseline.",italics:true,color:GREY})]}),
      ],
    },
    // BODY
    {
      properties:{page:{size:{width:12240,height:15840},margin:{top:1440,right:1440,bottom:1440,left:1440}}},
      headers:{default:new Header({children:[new Paragraph({border:{bottom:{style:BorderStyle.SINGLE,size:4,color:TEAL,space:2}},tabStops:[{type:"right",position:CONTENT_W}],children:[new TextRun({text:"Alpha Omega — National Security Solutions",color:GREY,size:16}),new TextRun({text:"\tAI-Enabled ROTC Accessions in AIE",color:GREY,size:16})]})]})},
      footers:{default:new Footer({children:[new Paragraph({border:{top:{style:BorderStyle.SINGLE,size:4,color:TEAL,space:2}},tabStops:[{type:"right",position:CONTENT_W}],children:[new TextRun({text:"Pre-decisional — Solution Concept (RTM-traced)",color:GREY,size:16}),new TextRun({text:"\tPage ",color:GREY,size:16}),new TextRun({children:[PageNumber.CURRENT],color:GREY,size:16})]})]})},
      children:[
        h1("Contents"),
        new TableOfContents("Table of Contents",{hyperlink:true,headingStyleRange:"1-2"}),
        pageBreak(),

        // 1
        h1("1. Executive Summary"),
        p("The Army Accessions Information Environment (AIE) is a COTS-based, commercially cloud-hosted, multi-network and multi-device platform that automates accessions and recruiting business processes across the enlisted and officer missions. Within AIE, the ROTC officer-accessions pipeline — the Scholarship Program, on-campus enrollment, and Summer Training Camps — must move a candidate from first contact through scholarship application, screening, interview, medical, selection boards, offer, contracting, security clearance, enrollment, and ultimately commissioning."),
        p("This document maps applied AI and intelligent automation to the AIE Functional Requirements Traceability Matrix (RTM), showing where AI can accelerate, clean up, de-risk, and raise the quality of the ROTC lifecycle — expressed in AIE's own capability framework and traced to specific requirement IDs. It centers two human experiences the RTM repeatedly implies: the Cadet completing applications and the SF-86, and the Cadre member / adjudicator screening, scoring, and managing the case."),
        p("AIE already specifies the building blocks this concept exploits: generate-and-sign forms [1.3], API-led integration to Systems of Record [1.10, 3.3], configurable workflows [3.2], Remote Process Automation [3.8], an automated suitability capability [3.8.1.1], a centralized event-driven pre-screen [2.3.1.6], and continuous screening and data validation for the SF-86 [3.4.4.20]. The opportunity is to layer governed AI on top of these so the platform not only digitizes the process but actively assists the people in it."),
        runs([new TextRun({text:"Guiding principle: ",bold:true}),new TextRun("AI accelerates, structures, and quality-checks the work; humans retain authority over eligibility, selection, suitability, and clearance determinations. Automated screening and suitability checks [3.8.1.1, 3.10.4.5] surface and recommend — they do not replace adjudicative judgment.")]),

        // 2
        h1("2. AIE Context & Scale"),
        p("Per the AIE Capability Overview (OV-1), AIE is “a multi-network, multi-device accessible, secure COTS-based solution hosted in a commercial cloud that automates accessions and recruiting business processes.” The platform serves both missions at significant scale:"),
        tbl([4680,4680],["Officer / ROTC mission","Enlisted mission (context)"],[
          ["~30,000 Cadets recruited & developed","~135,000 Recruits"],
          ["~14,000 Scholarships","~21,000 In-Service / Prior Service"],
          ["~5,100 Recruiters / Staff","~21,400 Recruiters / Staff"],
          ["~1,000 Locations","~2,100 Locations; processed at 65 MEPS"],
        ]),
        p("ROTC accessions span three sub-paths — Scholarship Program, On-Campus, and Summer Training Camps — each qualified across aptitude, mental, moral, and physical standards and progressed through board processes (qualification, certification, selection). This concept addresses the full ROTC path while remaining consistent with the shared AIE foundation used by the enlisted mission."),

        // 3
        h1("3. AIE Capability Framework — Where ROTC Accessions Lives"),
        p("The AIE RTM organizes the platform into eight capabilities. The ROTC lifecycle touches all of them; the table shows each capability, its intent, and the primary ROTC relevance."),
        tbl([1900,3730,3730],["AIE capability","Intent (RTM)","Primary ROTC relevance"],[
          ["1 Foundation","Foundational product for recruiting ops: user & document mgmt, forms generate/sign [1.3], core data [1.4], integration [1.10], security/non-functional [1.11]","Single authoritative Cadet record; DocuSign forms; IL4 security; SOR integration backbone"],
          ["2 CRM","Industry-standard customer relationship mgmt","Lead gen & prospecting [2.1]; scholarship applications & boards [2.1.4]; pre-screen & digital interview [2.3]; community portal [2.5]"],
          ["3 Processing","Digitally assemble Accessions Packets per policy","Eligibility screening, DoDMERB & security interfaces [3.3]; contracting [3.4.4]; selection boards [3.5]; investigation [3.6]; RPA [3.8]; Cadet enrollment [3.10]"],
          ["4 On-Boarding","Conduct on-boarding / reception & accessions","ROTC Accession Orders [4.7]; branch & component selection; commissioning processing [4.7.8]"],
          ["5 Intelligence","Data & analysis for mission planning & resourcing","Mission COAs, scholarship funding allocation modeling, PMS commissioning forecasts [5.1.4]"],
          ["6 Marketing","Track & update marketing; campaigns","Propensity & campaign targeting to feed the ROTC pipeline"],
          ["7 Training & Leader Dev","Publicly-accessible learning mgmt","LMS (Blackboard) MS I–IV [7.4.1.1]; Basic/Advanced Camp & CPDT [7.5.1]; camp medical screening"],
          ["8 Sustain & Support","Mission support & effectiveness","DD Form 918 university agreements [8.2.1.1]; retention reviews [8.1.4.8]; Cadre/Cadet hierarchy [8.3]"],
        ]),

        // 4
        h1("4. The ROTC Accessions Lifecycle Mapped to AIE"),
        p("This is the backbone for every use case in Section 8. Each stage lists the activity, the dominant friction, and the primary AI/automation lever — traced to AIE requirement IDs."),
        tbl([460,1780,2620,2000,2500],
          ["#","Stage","Core activity & friction (RTM)","AI / automation lever","Key req IDs"],
          [
            ["1","Lead & prospect","Near-real-time lead creation, routing, assignment [2.1]; slow first contact","AI lead scoring & routing; conversational qualification","2.1, 2.1.4.1"],
            ["2","Scholarship application & CBEF","National 4-yr / Green-to-Gold / on-campus apps, online account, doc upload, COI coord [2.1.4.13–.17]; CBEF; abandonment","Guided/conversational intake, pre-fill, IDP, real-time validation","2.1.4.13, 2.1.4.14, CBEF"],
            ["3","Pre-screen & eligibility","Centralized, event-driven pre-screen [2.3.1.6]; auto-screen eligibility [3.10.4.5]; rework","Automated eligibility rules + anomaly flags; suitability assist","2.3.1.6, 3.10.4.5, 3.8.1.1"],
            ["4","Interview (PMS)","Digital Interview Platform [2.3]; coordination & scoring drift","Smart scheduling; AI note summarization; rubric consistency","2.3, 2.1.4.6"],
            ["5","Medical (DoDMERB)","Interface to DoDMERB SOR [3.3.1.7]; waivers to DoDMERB [3.2.1.15]; silent delays","Status sync, document AI, remedial/waiver prediction","3.3.1.7, 3.2.1.15"],
            ["6","Selection boards","Establish boards, scoring algorithms, assign applicants/members, automate scoring [2.1.4.7]; point caps [2.1.4.6]","Auto packet assembly & completeness; decision-support analytics (human-decided)","2.1.4.7, 3.5"],
            ["7","Offer & award","Offer/award process [2.1.4.14]; funding validation [2.1.4.15]; manual letters","Generated correspondence; DocuSign e-sign; deadline tracking","2.1.4.14, 1.3"],
            ["8","Contract Cadet","Complete contracting docs by circumstance [3.4.4.1]; enforce forms [3.4.4.2]","Workflow orchestration; conditional contracting logic; e-sign","3.4.4.1, 3.4.4.2, 3.2"],
            ["9","SF-86 & clearance","Initiate/complete SF-86 in 60 days for SECRET [3.4.4.18]; continuous screening & validation [3.4.4.20]; DCSA interface [3.4.4.25]","SF-86 pre-fill & validation; adjudicator copilot; case triage","3.4.4.18–.25, 3.6"],
            ["10","Enroll & manage Cadet","Enroll/screen, track curriculum & financials [3.10]; USACC Form 104-R [3.10.4.22]","Auto-screening, ETP/waiver detection, near-real-time status","3.10, 3.10.4.22"],
            ["11","Commission & accession","ROTC Accession Orders [4.7]; branch (TAB/HireVue) [4.7.3.3]; commissioning [4.7.8]","Eligibility validation, OML support, accessions packet automation","4.7, 4.7.8.2, 4.7.2.4"],
          ]),
        p("Stages 1–9 represent the roughly one-year scholarship-to-contracting cycle the candidate experiences first; enrollment, training (MS I–IV / Summer Camps), and commissioning [Capability 7, 4.7] continue across the program."),

        // 5
        h1("5. Two Human Journeys"),
        h2("5.1 The Cadet — applications and the SF-86"),
        h3("Today"),
        bullet("Faces overlapping forms across the lifecycle — scholarship application, CBEF, contracting forms, then the SF-86 — asking for similar data in different places and times."),
        bullet("Reconstructs years of residence, education, employment, and contacts for the SF-86 from memory, introducing gaps that trigger rework and delay the SECRET clearance the contract requires within 60 days [3.4.4.18]."),
        bullet("Gets little feedback on completeness until a reviewer or the pre-screen rejects the packet."),
        h3("Future state with AI (within AIE capabilities)"),
        bullet([new TextRun("Conversational, guided intake on the community portal "),rid("2.5"),new TextRun(", explaining each item in plain language and adapting to prior answers.")]),
        bullet([new TextRun("Consented pre-fill that reuses core data "),rid("1.4"),new TextRun(" across the application, contracting forms, and SF-86 — directly attacking re-keying.")]),
        bullet([new TextRun("Real-time validation and a live readiness score, operationalizing AIE's continuous screening and data validation for the SF-86 "),rid("3.4.4.20"),new TextRun(".")]),
        bullet([new TextRun("Document capture via intelligent document processing, filing to the single authoritative record "),rid("1.2, 1.4"),new TextRun(".")]),
        runs([new TextRun({text:"Guardrail: ",bold:true,color:GOLD}),new TextRun("AI assists the Cadet in completing their own truthful answers; it never fabricates or infers SF-86 responses. All certifications remain the applicant's attested statements.")]),
        h2("5.2 The Cadre / Adjudicator — screening, scoring & case management"),
        h3("Today"),
        bullet("Manually reads long packets and SF-86 submissions; tracks across multiple SORs and tools; spends disproportionate time on incomplete submissions and interrogatories."),
        bullet("Runs boards and scoring with heavy manual assembly [2.1.4.7]; struggles to prioritize highest-risk or nearest-deadline cases."),
        h3("Future state with AI"),
        bullet([new TextRun("Adjudicator/reviewer copilot that summarizes the packet, flags gaps and inconsistencies, links concerns to evidence and the applicable guideline, and drafts interrogatories for human approval — building on the automated suitability capability "),rid("3.8.1.1"),new TextRun(".")]),
        bullet([new TextRun("Completeness gating so only validated cases reach review; RPA "),rid("3.8"),new TextRun(" clears high-volume, rules-based steps across SORs.")]),
        bullet([new TextRun("Case prioritization and next-best-action on a unified Cadet record with full audit trail "),rid("2.6, 3.1.4.1"),new TextRun(".")]),
        runs([new TextRun({text:"Guardrail: ",bold:true,color:GOLD}),new TextRun("Eligibility, selection, suitability, and clearance determinations are made by authorized humans under SEAD 4 and Army policy; every AI-assisted step is logged for traceability.")]),

        // 6
        h1("6. Deep Dive: SF-86 & Security Clearance"),
        p("The RTM specifies an unusually concrete clearance workflow, which makes it a high-value AI target. AIE must:"),
        bullet([new TextRun("Initiate and complete the SF-86 within 60 days of contracting to gain a SECRET clearance "),rid("3.4.4.18"),new TextRun(", and request Top Secret where branch or special training requires "),rid("3.4.4.19"),new TextRun(".")]),
        bullet([new TextRun("Provide continuous screening and data validation to ensure accurate, successful SF-86 completion "),rid("3.4.4.20"),new TextRun(".")]),
        bullet([new TextRun("Automatically identify Cadets requiring TS based on branch assignment "),rid("3.4.4.23"),new TextRun(", and support the appeal process for denied clearances "),rid("3.4.4.21"),new TextRun(".")]),
        bullet([new TextRun("Receive data from SORs to detect existing clearances/investigations "),rid("3.4.4.22"),new TextRun(", and interface with DCSA to send/receive SF-86 results, communications, and documentation "),rid("3.4.4.25"),new TextRun(".")]),
        bullet([new TextRun("Support reporting and submission of reportable incidents by Cadets "),rid("3.4.4.24"),new TextRun(".")]),
        p("AI levers mapped to these requirements: consented SF-86 pre-fill and real-time validation (fewer errors, faster start); an adjudicator copilot that triages and summarizes; predictive case prioritization against the 60-day window; and RPA to move SF-86 packages and DCSA responses across SOR interfaces. Determinations remain human; AI shortens the path to a complete, accurate, defensible submission and review."),

        // 7
        h1("7. AI Opportunity Matrix"),
        tbl([1500,2050,2150,2000,1660],
          ["Stage","Pain today","AI method","AIE capability / req","Value lever"],
          [
            ["Application & CBEF","Abandonment, partial data","Conversational AI, pre-fill, validation","CRM 2.1.4; Foundation 1.4","Speed + experience"],
            ["Pre-screen / eligibility","Manual checks, rework","Rules + anomaly detection; suitability assist","Processing 2.3.1.6, 3.8.1.1","Quality + risk"],
            ["Interview","Coordination, scoring drift","Summarization, rubric checks","CRM 2.3","Quality"],
            ["Medical (DoDMERB)","Silent delays, waivers","Status sync, document AI, prediction","Processing 3.3.1.7, 3.2.1.15","Speed"],
            ["Selection boards","Packet assembly, ranking","Auto-assembly, completeness, analytics","CRM 2.1.4.7; 3.5","Speed + quality"],
            ["Offer & contract","Manual letters, forms","Generated correspondence, e-sign","2.1.4.14; Foundation 1.3","Speed"],
            ["SF-86 & clearance","Errors, long cycle, 60-day window","Pre-fill, validation, copilot, triage","Processing 3.4.4.18–.25","All four"],
            ["Enroll & manage","Manual tracking, ETPs","Auto-screening, near-real-time status","Processing 3.10","Quality + risk"],
            ["Commission & accession","Manual eligibility & packets","Eligibility validation, OML support","On-Boarding 4.7","Speed + quality"],
            ["Cross-cutting workload","High manual volume","RPA across SOR steps","Processing 3.8","All four"],
          ]),

        // 8
        h1("8. Detailed AI Use Cases"),
        ...useCase("01","Conversational scholarship application & CBEF intake",[
          ["Problem","Multi-path scholarship applications (4-yr, Green-to-Gold, on-campus) and the CBEF drive abandonment and partial data."],
          ["AI technique","RAG conversational assistant with dynamic branching; real-time validation."],
          ["AIE mapping",[new TextRun("CRM scholarship applications "),rid("2.1.4.13, 2.1.4.14"),new TextRun("; community portal "),rid("2.5"),new TextRun("; Salesforce + Azure OpenAI; MuleSoft pre-fill.")]],
          ["Outcome","Higher completion, cleaner first-pass data, fewer inquiries."],
        ]),
        ...useCase("02","Intelligent document processing & eligibility screening",[
          ["Problem","Transcripts, test scores, citizenship/age verified by hand; event-driven pre-screen is manual to maintain."],
          ["AI technique","OCR/IDP + classification + extraction; deterministic eligibility rules with anomaly detection."],
          ["AIE mapping",[new TextRun("Pre-screen "),rid("2.3.1.6"),new TextRun("; auto-screen eligibility "),rid("3.10.4.5"),new TextRun("; suitability "),rid("3.8.1.1"),new TextRun("; Azure AI Document Intelligence.")]],
          ["Outcome","Faster verification; exceptions surfaced early; consistent screening."],
        ]),
        ...useCase("03","DoDMERB medical scheduling & status synchronization",[
          ["Problem","Medical scheduling and waiver tracking are manual; remedials cause silent delays."],
          ["AI technique","Automated scheduling/reminders; predictive flag for likely remedials/waivers."],
          ["AIE mapping",[new TextRun("DoDMERB SOR interface "),rid("3.3.1.7"),new TextRun("; waiver sync to DoDMERB "),rid("3.2.1.15"),new TextRun("; MuleSoft.")]],
          ["Outcome","Fewer stalled cases; earlier intervention."],
        ]),
        ...useCase("04","Selection-board packet assembly & completeness scoring",[
          ["Problem","Boards require heavy manual packet assembly; incomplete packets reach members."],
          ["AI technique","Auto-assembly from the Cadet record; completeness scoring; decision-support analytics on documented criteria."],
          ["AIE mapping",[new TextRun("Scholarship boards "),rid("2.1.4.7"),new TextRun("; point caps "),rid("2.1.4.6"),new TextRun("; selection board "),rid("3.5"),new TextRun(".")]],
          ["Outcome","Boards see only complete packets; faster, better-informed human decisions."],
          ["Guardrail","Scoring/selection remain human; AI organizes evidence and analytics, not the ranking decision."],
        ]),
        ...useCase("05","SF-86 pre-fill, validation & Cadet copilot",[
          ["Problem","SF-86 errors and gaps threaten the 60-day SECRET window and trigger rework."],
          ["AI technique","Consented pre-fill; real-time completeness/consistency validation; plain-language copilot."],
          ["AIE mapping",[new TextRun("SF-86 within 60 days "),rid("3.4.4.18"),new TextRun("; continuous screening/validation "),rid("3.4.4.20"),new TextRun("; DCSA interface "),rid("3.4.4.25"),new TextRun(".")]],
          ["Outcome","Cleaner submissions; fewer interrogatories; faster investigation start."],
          ["Guardrail","Applicant attests to all answers; AI never fabricates responses."],
        ]),
        ...useCase("06","Adjudicator / reviewer copilot",[
          ["Problem","Reviewers manually read long submissions and cross-check evidence and guidelines."],
          ["AI technique","Packet summarization; gap/inconsistency detection; evidence-to-guideline linking; drafted interrogatories for approval."],
          ["AIE mapping",[new TextRun("Automated suitability "),rid("3.8.1.1"),new TextRun("; investigation "),rid("3.6"),new TextRun("; governed Azure OpenAI over the case record.")]],
          ["Outcome","Major review-time reduction; consistent, defensible, logged reviews."],
          ["Guardrail","Adjudicative determinations are human under SEAD 4; AI is decision-support only."],
        ]),
        ...useCase("07","RPA across SOR steps",[
          ["Problem","High-volume, rules-based tasks across DoDMERB, security, pay, and HR SORs consume Cadre time."],
          ["AI technique","Remote/Robotic Process Automation for data movement, status sync, and reconciliation."],
          ["AIE mapping",[new TextRun("RPA "),rid("3.8"),new TextRun("; processing integration to SORs "),rid("3.3"),new TextRun("; UiPath; MuleSoft.")]],
          ["Outcome","Lower manual workload; fewer transcription errors."],
        ]),
        ...useCase("08","Mission & scholarship-funding analytics",[
          ["Problem","Mission distribution and scholarship allocation require analyst-heavy modeling."],
          ["AI technique","COA modeling and forecasting; PMS commissioning-forecast aggregation."],
          ["AIE mapping",[new TextRun("Intelligence "),rid("5.1.4.1, 5.1.4.5, 5.1.4.4"),new TextRun("; Azure ML / CRM Analytics.")]],
          ["Outcome","Faster, evidence-based allocation; better mission forecasting."],
        ]),

        // 9
        h1("9. Case Management & Workflow Automation"),
        p("A single Salesforce case represents the Cadet from lead to commissioned officer, with stage-specific child records and SOR links. AIE already calls for user-defined, configurable workflows [3.2] and the capability to process Cadet actions for all Cadet types [3.1.4.1]; AI and RPA make them adaptive."),
        bullet([new TextRun("Configurable workflows & milestones with SLA/suspense automation and reminders to Cadets and Cadre "),rid("3.2, 4.7.1.6"),new TextRun(".")]),
        bullet([new TextRun("Generate-and-sign forms across the lifecycle via DocuSign "),rid("1.3"),new TextRun(".")]),
        bullet([new TextRun("Community-portal task assignment, completion, and status tracking "),rid("3.4.4.7, 2.5"),new TextRun(".")]),
        bullet([new TextRun("Record lifecycle management and audit on the single authoritative record "),rid("2.6, 1.4"),new TextRun(".")]),

        // 10
        h1("10. Target-State Architecture on the AIE Stack"),
        tbl([2300,7060],["Layer","Components & role (AIE-aligned)"],[
          ["Experience","Community portal & cadre workspaces on Salesforce [2.5, 1.6]; conversational assistants; DocuSign signing."],
          ["Engagement / case","Salesforce as system of engagement across CRM [2], Processing [3], On-Boarding [4]; configurable workflows [3.2]; single authoritative record [1.4]."],
          ["AI services","Azure OpenAI & Azure AI (Document Intelligence, ML) + Salesforce Einstein — governed, in-boundary, human-in-the-loop; supports pre-screen [2.3.1.6] and suitability [3.8.1.1]."],
          ["Automation","RPA [3.8] for high-volume SOR tasks; intelligent orchestration of multi-actor workflows."],
          ["Integration (backbone)","MuleSoft API-led layer per OV-3 [1.10, 3.3] to SORs: DoDMERB [3.3.1.7], Personnel Security Suitability [3.3.1.9] & Investigation [3.3.1.10] SOR, DCSA [3.4.4.25], IPPS-A/iPERMS/DJMS, ATRRS, HireVue [4.7.3.3], Blackboard LMS [7.4.1.1], NCES."],
          ["Document & e-sign","DocuSign for generate-and-sign forms, offers, contracting, consent [1.3]."],
          ["Platform & security","COTS in commercial cloud (OV-1); FedRAMP+ / DoD SRG IL4 controls [1.11.1.59]; PII/PHI protection per DoDD 5400.11 & DoDI 8580.02 [1.11.1.75]; multi-tenant continuous upgrades [1.8.1.1, 1.11]; DevSecOps."],
        ]),
        p("Because AIE is COTS-based, the concept favors configuration and platform-native AI over custom build, with MuleSoft as the API-led backbone that lets data be captured once and reused across the application, contracting, and SF-86."),

        // 11
        h1("11. Responsible AI, Security & Governance"),
        bullet([new TextRun({text:"Human-in-the-loop by design: ",bold:true}),new TextRun("AI summarizes, validates, and recommends; eligibility, selection, suitability, and clearance determinations remain human under SEAD 4. Automated screening/suitability "),rid("3.8.1.1, 3.10.4.5"),new TextRun(" advise, not decide.")]),
        bullet([new TextRun({text:"Hybrid deterministic + generative AI: ",bold:true}),new TextRun("rules engines for policy-bound checks (predictable, auditable); generative AI for language tasks within guardrails.")]),
        bullet([new TextRun({text:"Security & data protection: ",bold:true}),new TextRun("IL4 controls "),rid("1.11.1.59"),new TextRun("; PII/PHI handling "),rid("1.11.1.75"),new TextRun("; client-side security "),rid("1.11.1.55"),new TextRun("; DCSA-aligned SF-86 handling. AI runs inside the accredited boundary.")]),
        bullet([new TextRun({text:"Transparency & traceability: ",bold:true}),new TextRun("model evaluation, explainable scoring, and a logged record of how each recommendation was produced — inspection-ready.")]),

        // 12
        h1("12. Delivery — SAFe & DevSecOps on Azure DevOps"),
        bullet([new TextRun({text:"SAFe Agile Release Train ",bold:true}),new TextRun("aligned to AIE capabilities, with PI planning and continuous demos to USACC, DoDMERB, and DCSA stakeholders.")]),
        bullet([new TextRun({text:"Azure DevOps ",bold:true}),new TextRun("as the single delivery hub — backlog, boards, repos, pipelines — traceable to RTM requirement IDs.")]),
        bullet([new TextRun({text:"DevSecOps pipelines ",bold:true}),new TextRun("for Salesforce (SFDX) and MuleSoft with automated test, security scanning, policy-as-code gates, and rollback.")]),
        bullet([new TextRun({text:"Continuous upgrades & ATO: ",bold:true}),new TextRun("leverage AIE's multi-tenant continuous-upgrade model "),rid("1.8.1.1, 1.11"),new TextRun(" and automate control evidence to sustain authorization.")]),

        // 13
        h1("13. Risks & Mitigations"),
        tbl([3100,3100,3160],["Risk","Impact","Mitigation"],[
          ["Over-automation of judgment","Improper suitability/clearance/selection outcomes","Strict human-in-the-loop; AI decision-support only; full logging"],
          ["SF-86 / PII sensitivity","Breach, compliance failure","IL4, encryption, RBAC/ABAC, DCSA-aligned handling [1.11.1.75]"],
          ["Integration complexity (many SORs)","Delays, brittle links","API-led MuleSoft per OV-3 [1.10, 3.3]; reuse; contract testing"],
          ["Model error / hallucination","Wrong guidance to Cadet/reviewer","Deterministic checks for policy items; grounded generation; human approval"],
          ["COTS customization drift","Upgrade friction, cost","Favor configuration & platform-native AI; align to multi-tenant model [1.11]"],
          ["60-day clearance window","Missed timelines","Predictive prioritization against [3.4.4.18]; automated nudges"],
        ]),

        // 14
        h1("14. Expected Benefits & KPIs"),
        tbl([3600,2880,2880],["Objective","Metric","Target direction"],[
          ["Speed up the lifecycle","Median days, application → contracting","Significant reduction"],
          ["Clean up data","First-pass completeness / error rate; SF-86 rejects","Higher completeness, fewer errors"],
          ["Protect the 60-day window","On-time SF-86 completion rate [3.4.4.18]","Up"],
          ["Reduce rework","Interrogatories / bounce-backs per case","Down"],
          ["Reduce burden","Cadre/adjudicator hours per case (RPA offload)","Down"],
          ["Higher quality","Decision consistency; record completeness","Up"],
          ["Better experience","Application abandonment; Cadet satisfaction","Lower abandonment, higher CSAT"],
        ]),

        // 15
        h1("15. Phased Roadmap"),
        h3("Phase 1 — Foundation (Crawl)"),
        bullet([new TextRun("Single Cadet record & configurable workflows "),rid("1.4, 3.2"),new TextRun("; DocuSign forms "),rid("1.3"),new TextRun("; MuleSoft system APIs to DoDMERB & security SORs "),rid("3.3.1.7, 3.3.1.9/.10"),new TextRun("; quick wins UC-01, UC-02.")]),
        h3("Phase 2 — Intelligence (Walk)"),
        bullet("SF-86 pre-fill & validation (UC-05), adjudicator copilot (UC-06), board packet assembly (UC-04), generated correspondence, RPA across SORs (UC-07) — within governed AI guardrails."),
        h3("Phase 3 — Optimization (Run)"),
        bullet("Mission & funding analytics (UC-08), predictive prioritization, continuous data-quality, continuous-ATO maturity; extend pattern to enlisted accessions on the shared AIE foundation."),

        // 16 appendix
        h1("16. Appendix — Requirements Coverage Map"),
        tbl([2600,2600,4160],["Lifecycle stage","AIE capability","Representative requirement IDs"],[
          ["Lead & prospect","CRM","2.1, 2.1.4.1"],
          ["Scholarship app & CBEF","CRM","2.1.4.13, 2.1.4.14, 2.1.4.15, 2.1.4.6"],
          ["Pre-screen & eligibility","CRM / Processing","2.3.1.6, 3.10.4.5, 3.8.1.1"],
          ["Interview (PMS)","CRM","2.3, 2.1.4.7 (board points)"],
          ["Medical (DoDMERB)","Processing","3.3.1.7, 3.2.1.15"],
          ["Selection boards","CRM / Processing","2.1.4.7, 3.5"],
          ["Offer & contract","CRM / Processing / Foundation","2.1.4.14, 3.4.4.1, 3.4.4.2, 1.3"],
          ["SF-86 & clearance","Processing","3.4.4.18, .19, .20, .21, .22, .23, .24, .25, 3.6"],
          ["Enroll & manage Cadet","Processing","3.10, 3.10.4.5, 3.10.4.22, 3.1.4.1"],
          ["Commission & accession","On-Boarding","4.7, 4.7.2.4, 4.7.3.3, 4.7.8.2"],
          ["Analytics & mission","Intelligence","5.1.4.1, 5.1.4.4, 5.1.4.5"],
          ["Platform, security, RPA","Foundation / Processing","1.3, 1.4, 1.10, 1.11.1.59, 1.11.1.75, 3.3, 3.8"],
        ]),

        h1("17. Conclusion"),
        p("AIE already establishes the COTS foundation, integration model, and explicit requirements — from generate-and-sign forms and configurable workflows to RPA, automated suitability, and a concrete SF-86/clearance workflow. Layering governed, human-in-the-loop AI on top turns those requirements into a faster, cleaner, lower-risk ROTC accessions lifecycle for both the Cadet and the adjudicator, traceable to the RTM at every step. Alpha Omega is positioned to design and deliver this concept and welcomes a discovery session and a proof-of-concept to baseline current state and prioritize the first increment."),
      ],
    },
  ],
});

Packer.toBuffer(doc).then(buf=>{ fs.writeFileSync("/sessions/beautiful-eager-clarke/mnt/outputs/AIE_ROTC_AI_Concept.docx",buf); console.log("written"); });
