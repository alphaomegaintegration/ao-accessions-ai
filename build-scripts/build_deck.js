const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
p.author = "Alpha Omega Integration LLC";
p.title = "Army ROTC Lifecycle AI Modernization";

const NAVY="1F2A44", TEAL="0E7C7B", ICE="CFE3E3", GOLD="8A6D00", GREY="5A5A5A",
      BG="F4F7F8", WHITE="FFFFFF", LTEAL="E6F1F1", LGOLD="F5EECF", SAGE="EAF2EA";
const FH="Cambria", FB="Arial";
const W=13.33, H=7.5;
const shadow = () => ({ type:"outer", color:"000000", blur:7, offset:3, angle:90, opacity:0.13 });

function title(slide, t, sub){
  slide.addText(t, { x:0.6, y:0.34, w:12.1, h:0.62, fontFace:FH, fontSize:30, bold:true, color:NAVY, margin:0 });
  if(sub) slide.addText(sub, { x:0.62, y:0.98, w:12.1, h:0.36, fontFace:FB, fontSize:14, color:TEAL, margin:0 });
  slide.addShape(p.shapes.OVAL, { x:0.62, y:0.5, w:0.0, h:0.0 }); // noop keep
}
function footer(slide, n){
  slide.addText("Alpha Omega — Pre-decisional Solution Concept", { x:0.6, y:7.08, w:8, h:0.3, fontFace:FB, fontSize:9, color:"9AA6B0", margin:0 });
  slide.addText(String(n), { x:12.5, y:7.08, w:0.5, h:0.3, fontFace:FB, fontSize:9, color:"9AA6B0", align:"right", margin:0 });
}

// ---------- Slide 1: Title ----------
let s = p.addSlide(); s.background={color:NAVY};
s.addShape(p.shapes.OVAL,{ x:-1.6, y:-1.8, w:4.6, h:4.6, fill:{color:"27324F"} });
s.addShape(p.shapes.OVAL,{ x:11.0, y:5.0, w:4.2, h:4.2, fill:{color:"27324F"} });
s.addText("ALPHA OMEGA", { x:0.8, y:1.5, w:11, h:0.5, fontFace:FB, fontSize:16, bold:true, color:ICE, charSpacing:3, margin:0 });
s.addText("Modernizing the Army ROTC Recruitment\n& Onboarding Lifecycle with AI", { x:0.8, y:2.1, w:11.7, h:1.9, fontFace:FH, fontSize:40, bold:true, color:WHITE, lineSpacing:46, margin:0 });
s.addText("From applicant form entry to ROTC acceptance & contracting — compressing the ~12-month lifecycle, raising data quality, and reducing risk on a DoD Salesforce + MuleSoft + DocuSign + Azure DevOps stack.",
  { x:0.8, y:4.35, w:11.4, h:1.0, fontFace:FB, fontSize:15, color:"C7D2DC", lineSpacing:22, margin:0 });
s.addShape(p.shapes.RECTANGLE,{ x:0.8, y:5.7, w:3.0, h:0.045, fill:{color:TEAL} });
s.addText("Briefing Deck  ·  Solution Concept  ·  June 2026", { x:0.8, y:5.85, w:11, h:0.4, fontFace:FB, fontSize:13, italic:true, color:ICE, margin:0 });
s.addText("Human-in-the-loop by design: AI augments eligibility, selection & clearance work — it never decides.", { x:0.8, y:6.45, w:11.4, h:0.4, fontFace:FB, fontSize:12, color:"8FA0AE", margin:0 });
s.addNotes("Frame the opportunity: the ROTC year is one long, paper-heavy, multi-actor case. We can treat it as a single AI-augmented case and compress it without ever letting AI make the call on eligibility, selection, or clearance.");

// ---------- Slide 2: The Challenge ----------
s = p.addSlide(); s.background={color:BG};
title(s,"The challenge: a 12-month, paper-heavy, multi-actor journey");
const pains = [
  "Re-keying the same identity, education & biographic data across the application, DoDMERB, SF-86 and contracting",
  "Incomplete or inconsistent submissions that bounce back weeks later and restart clocks",
  "Manual document collection, verification and status-chasing over email and phone",
  "Limited applicant visibility into status — driving anxiety, abandonment and inbound inquiries",
  "Disconnected systems with no single case record; cadre and adjudicators stitch context by hand",
];
s.addText(pains.map((t,i)=>({ text:t, options:{ bullet:{code:"2022"}, breakLine:true, paraSpaceAfter:10 } })),
  { x:0.6, y:1.5, w:7.1, h:5.0, fontFace:FB, fontSize:15, color:"303A45", lineSpacing:21, valign:"top" });
const stats=[["~12 mo","applicant form entry → acceptance"],["4+","major forms & systems, often re-keyed"],["Weeks","lost per bounce-back / rework cycle"]];
let sy=1.55;
stats.forEach(([n,l])=>{
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{ x:8.05, y:sy, w:4.65, h:1.5, fill:{color:WHITE}, rectRadius:0.1, shadow:shadow() });
  s.addText(n,{ x:8.25, y:sy+0.16, w:4.3, h:0.7, fontFace:FH, fontSize:34, bold:true, color:TEAL, margin:0 });
  s.addText(l,{ x:8.25, y:sy+0.92, w:4.3, h:0.5, fontFace:FB, fontSize:13, color:GREY, margin:0 });
  sy+=1.72;
});
footer(s,2);

// ---------- Slide 3: Lifecycle at a glance ----------
s = p.addSlide(); s.background={color:BG};
title(s,"The lifecycle at a glance","Ten connected stages, treated as a single instrumented case");
const steps=[
  ["S1","Awareness &\nLead Capture"],["S2","Application\nIntake"],["S3","Docs &\nEligibility"],
  ["S4","Fitness &\nMedical"],["S5","PMS\nInterview"],["S6","Selection\nBoards"],
  ["S7","Offer &\nAcceptance"],["S8","SF-86 &\nAdjudication"],["S9","Contracting &\nOnboarding"],["S10","Case Mgmt\n(cross-cutting)"]
];
const cols=5, cw=2.32, chh=1.45, gx=0.18, gy=0.3, x0=0.72, y0=1.7;
steps.forEach((st,i)=>{
  const r=Math.floor(i/cols), c=i%cols;
  const x=x0+c*(cw+gx), y=y0+r*(chh+gy);
  const isX = st[0]==="S10";
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{ x, y, w:cw, h:chh, fill:{color: isX?NAVY:WHITE}, rectRadius:0.09, shadow:shadow() });
  s.addShape(p.shapes.OVAL,{ x:x+0.16, y:y+0.18, w:0.5, h:0.5, fill:{color: isX?TEAL:LTEAL} });
  s.addText(st[0],{ x:x+0.16, y:y+0.18, w:0.5, h:0.5, align:"center", valign:"middle", fontFace:FB, fontSize:13, bold:true, color: isX?WHITE:TEAL, margin:0 });
  s.addText(st[1],{ x:x+0.74, y:y+0.16, w:cw-0.86, h:chh-0.3, fontFace:FB, fontSize:13, bold:true, color: isX?WHITE:NAVY, valign:"middle", lineSpacing:15, margin:0 });
});
s.addText("Each stage carries an AI / automation lever — detailed on the following slides.", { x:0.72, y:6.55, w:12, h:0.4, fontFace:FB, fontSize:13, italic:true, color:GREY, margin:0 });
footer(s,3);

// ---------- Slide 4: Swimlane ----------
s = p.addSlide(); s.background={color:WHITE};
title(s,"Business-flow swimlane","Who does what, when — across the ~12-month lifecycle");
const iw=12.5, ih=iw/(6080/2859); // preserve aspect
s.addImage({ path:"/sessions/beautiful-eager-clarke/mnt/outputs/rotc_swimlane.png", x:(W-iw)/2, y:1.45, w:iw, h:ih });
footer(s,4);
s.addNotes("Walk the path: lead capture → application → eligibility → interview → medical → boards → offer → SF-86 → adjudication → contracting. The dark bottom lane is the platform backbone that carries the single case record and the API integrations. Teal AI badges mark where AI/automation intervenes.");

// ---------- Slide 5: Two human journeys ----------
s = p.addSlide(); s.background={color:BG};
title(s,"Designing for two people first","The student completing the forms, and the adjudicator reviewing them");
function persona(x, head, tint, today, future){
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{ x, y:1.45, w:5.95, h:5.35, fill:{color:WHITE}, rectRadius:0.1, shadow:shadow() });
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{ x, y:1.45, w:5.95, h:0.62, fill:{color:tint}, rectRadius:0.1 });
  s.addShape(p.shapes.RECTANGLE,{ x, y:1.85, w:5.95, h:0.22, fill:{color:tint} });
  s.addText(head,{ x:x+0.25, y:1.45, w:5.5, h:0.62, fontFace:FH, fontSize:18, bold:true, color:WHITE, valign:"middle", margin:0 });
  s.addText("Today",{ x:x+0.25, y:2.2, w:5.4, h:0.3, fontFace:FB, fontSize:13, bold:true, color:GOLD, margin:0 });
  s.addText(today.map(t=>({text:t,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:5}})),
    { x:x+0.3, y:2.5, w:5.4, h:1.7, fontFace:FB, fontSize:12, color:"3A434E", lineSpacing:16, valign:"top" });
  s.addText("With AI",{ x:x+0.25, y:4.25, w:5.4, h:0.3, fontFace:FB, fontSize:13, bold:true, color:TEAL, margin:0 });
  s.addText(future.map(t=>({text:t,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:5}})),
    { x:x+0.3, y:4.55, w:5.4, h:2.1, fontFace:FB, fontSize:12, color:"3A434E", lineSpacing:16, valign:"top" });
}
persona(0.55,"The Student", TEAL,
  ["Two large, overlapping forms (application, then SF-86)","Reconstructs 7–10 years of history from memory","No feedback until a reviewer rejects the packet","No single view of what's done vs. pending"],
  ["Conversational, guided intake in plain language","Consented pre-fill reuses data across forms","Real-time validation & a live 'readiness' score","Photograph a document → auto-extracted & filed","Always-on status portal and proactive nudges"]);
persona(6.83,"The Adjudicator / Cadre", "A4402A",
  ["Manually reads long packets and SF-86s","Time lost on incomplete submissions & interrogatories","Tracking across spreadsheets, email, many systems","Hard to prioritize highest-risk / nearest-deadline"],
  ["Copilot summarizes packet, flags gaps, links evidence to guideline","Only complete, validated cases reach review","Queue ranked by deadline & risk; next-best-action","Unified case record with full, defensible audit trail"]);
s.addText("Guardrail: AI surfaces and organizes information; eligibility, selection and clearance decisions remain human under SEAD 4.",
  { x:0.55, y:6.95, w:12.2, h:0.3, fontFace:FB, fontSize:10.5, italic:true, color:GREY, margin:0 });

// ---------- Slide 6: AI opportunity matrix ----------
s = p.addSlide(); s.background={color:WHITE};
title(s,"AI opportunity matrix","Pain → method → platform component → value lever");
const hdr = (t)=>({text:t,options:{fill:{color:NAVY},color:WHITE,bold:true,fontFace:FB,fontSize:12,valign:"middle"}});
const rows = [
  ["Application intake","Abandonment, partial data","Conversational AI, pre-fill, validation","Salesforce + Azure OpenAI; MuleSoft","Speed + experience"],
  ["Docs & eligibility","Manual checks, rework","Document AI (OCR/IDP) + rules","Azure AI Doc Intelligence; SF Flow","Quality + risk"],
  ["Fitness & medical","Scheduling, silent remedials","Scheduling, status sync, prediction","MuleSoft ↔ DoDMERB; ML","Speed"],
  ["PMS interview","Coordination, scoring drift","Summarization, rubric checks","Azure OpenAI; Salesforce","Quality"],
  ["Selection boards","Packet assembly, ranking","Auto-assembly, completeness, analytics","Salesforce; Azure ML (human-decided)","Speed + quality"],
  ["Offer & acceptance","Manual letters, tracking","Generated correspondence, e-sign","DocuSign; SF; Azure OpenAI","Speed"],
  ["SF-86 clearance","Errors, long cycle","Pre-fill, validation, copilot, triage","SF; MuleSoft ↔ e-QIP/NBIS; Azure AI","All four"],
  ["Contracting/onboarding","Manual onboarding","Orchestration, provisioning","SF Flow Orch.; MuleSoft; DocuSign","Speed + risk"],
  ["Case mgmt (cross-cut)","No unified view","SLA automation, next-best-action","Salesforce Service Cloud / PSS","All four"],
];
const tdata = [[hdr("Stage"),hdr("Pain today"),hdr("AI method"),hdr("Tech component"),hdr("Value lever")]];
rows.forEach((r,i)=>{ const f=i%2?WHITE:"EEF3F4"; tdata.push(r.map((c,ci)=>({text:c,options:{fill:{color:f},color:"2A323C",fontFace:FB,fontSize:10.5,bold:ci===0,valign:"middle"}}))); });
s.addTable(tdata,{ x:0.5, y:1.45, w:12.3, colW:[1.85,2.5,3.05,3.0,1.9], rowH:0.5, border:{pt:0.5,color:"D5DEE2"}, align:"left", margin:3 });
footer(s,6);

// ---------- Slide 7: Priority use cases ----------
s = p.addSlide(); s.background={color:BG};
title(s,"Priority use cases","Sequenced to deliver early value, then intelligence");
const ucs=[
  ["UC-01","Guided conversational intake","Higher completion, cleaner first-pass data"],
  ["UC-02","Document AI & eligibility checks","Faster verification, early exceptions"],
  ["UC-05","Auto packet assembly + scoring","Boards see only complete packets"],
  ["UC-07","SF-86 pre-fill, validation & copilot","Fewer errors; faster investigation start"],
  ["UC-08","Adjudicator / reviewer copilot","Major review-time cut; defensible, logged"],
  ["UC-09","Case prioritization & next-best-action","Right case worked first; fewer breaches"],
];
const uw=3.95, uh=2.32, ugx=0.2, uy0=1.6, ux0=0.55;
ucs.forEach((u,i)=>{
  const r=Math.floor(i/3), c=i%3;
  const x=ux0+c*(uw+ugx), y=uy0+r*(uh+0.28);
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{ x, y, w:uw, h:uh, fill:{color:WHITE}, rectRadius:0.09, shadow:shadow() });
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{ x:x+0.22, y:y+0.22, w:1.0, h:0.42, fill:{color:LTEAL}, rectRadius:0.08 });
  s.addText(u[0],{ x:x+0.22, y:y+0.22, w:1.0, h:0.42, align:"center", valign:"middle", fontFace:FB, fontSize:13, bold:true, color:TEAL, margin:0 });
  s.addText(u[1],{ x:x+0.22, y:y+0.78, w:uw-0.44, h:0.85, fontFace:FH, fontSize:15.5, bold:true, color:NAVY, valign:"top", lineSpacing:18, margin:0 });
  s.addText(u[2],{ x:x+0.22, y:y+1.62, w:uw-0.44, h:0.6, fontFace:FB, fontSize:11.5, color:GREY, valign:"top", lineSpacing:15, margin:0 });
});
footer(s,7);

// ---------- Slide 8: Architecture ----------
s = p.addSlide(); s.background={color:WHITE};
title(s,"Target-state architecture","API-led, governed AI, secure by design");
const layers=[
  ["Experience","Salesforce Experience Cloud portals (applicant & cadre) · conversational assistants · DocuSign signing", LTEAL, NAVY],
  ["Engagement / Case","Salesforce Service Cloud / Public Sector Solutions — system of record, Flow & Orchestration, SLAs, knowledge", SAGE, NAVY],
  ["AI services","Azure OpenAI & Azure AI (Document Intelligence, ML) + Salesforce Einstein — governed, in-boundary, human-in-the-loop", ICE, NAVY],
  ["Integration (backbone)","MuleSoft API-led layer → DoDMERB · e-QIP/NBIS · SIS/enrollment · DEERS/IdAM · pay  (capture once, reuse everywhere)", TEAL, WHITE],
  ["Document & e-sign","DocuSign for offers, acceptance, contracting and consent capture — integrated to the case", LGOLD, NAVY],
  ["Platform & security","Azure at the appropriate DoD Impact Level · zero-trust · RBAC/ABAC · full audit · DevSecOps pipelines", "E7ECEF", NAVY],
];
let ly=1.55;
layers.forEach(([h,d,fill,tc])=>{
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{ x:0.6, y:ly, w:12.1, h:0.82, fill:{color:fill}, rectRadius:0.07, shadow:shadow() });
  s.addText(h,{ x:0.8, y:ly, w:2.9, h:0.82, fontFace:FH, fontSize:15, bold:true, color:tc, valign:"middle", margin:0 });
  s.addText(d,{ x:3.8, y:ly, w:8.7, h:0.82, fontFace:FB, fontSize:12, color: tc===WHITE?"EAF6F5":"36404B", valign:"middle", lineSpacing:15, margin:0 });
  ly+=0.9;
});
footer(s,8);

// ---------- Slide 9: Responsible AI ----------
s = p.addSlide(); s.background={color:BG};
title(s,"Responsible AI, security & governance");
const gov=[
  ["Human-in-the-loop by design","AI summarizes, validates and recommends. Eligibility, selection and clearance determinations are made by authorized humans under SEAD 4 — every assisted step logged."],
  ["Hybrid deterministic + generative AI","Rules engines handle policy-bound checks for predictability and auditability; generative AI handles language tasks within guardrails."],
  ["Data protection & boundary","PII minimization, encryption, strict RBAC/ABAC, DCSA-aligned SF-86 handling; AI runs inside the accredited DoD boundary at the correct Impact Level."],
  ["Transparency & traceability","Model evaluation, explainable scoring, and a clear record of how each recommendation was produced — inspection-ready."],
];
let gy2=1.45;
gov.forEach(([h,d],i)=>{
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{ x:0.6, y:gy2, w:12.1, h:1.28, fill:{color:WHITE}, rectRadius:0.08, shadow:shadow() });
  s.addShape(p.shapes.OVAL,{ x:0.85, y:gy2+0.34, w:0.6, h:0.6, fill:{color:TEAL} });
  s.addText(String(i+1),{ x:0.85, y:gy2+0.34, w:0.6, h:0.6, align:"center", valign:"middle", fontFace:FH, fontSize:20, bold:true, color:WHITE, margin:0 });
  s.addText(h,{ x:1.7, y:gy2+0.18, w:10.8, h:0.4, fontFace:FH, fontSize:16, bold:true, color:NAVY, margin:0 });
  s.addText(d,{ x:1.7, y:gy2+0.58, w:10.8, h:0.62, fontFace:FB, fontSize:12.5, color:"3A434E", lineSpacing:16, margin:0 });
  gy2+=1.42;
});
footer(s,9);

// ---------- Slide 10: Delivery ----------
s = p.addSlide(); s.background={color:WHITE};
title(s,"Delivery: SAFe + DevSecOps on Azure DevOps");
const deliv=[
  ["SAFe Agile Release Train","Lifecycle-aligned features, PI planning, continuous demos to USACC, DoDMERB & clearance stakeholders"],
  ["Azure DevOps hub","Backlog, boards, repos & pipelines as one delivery system — traceable requirement → deployed change"],
  ["DevSecOps pipelines","CI/CD for Salesforce (SFDX) & MuleSoft with automated test, security scanning, policy-as-code gates, rollback"],
  ["Continuous ATO posture","Security controls & evidence automated into the pipeline to shorten and sustain authorization"],
];
deliv.forEach((d,i)=>{
  const x=0.6+ (i%2)*6.25, y=1.55+Math.floor(i/2)*2.5;
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{ x, y, w:5.95, h:2.25, fill:{color:BG}, rectRadius:0.09, shadow:shadow() });
  s.addText(String(i+1),{ x:x+0.25, y:y+0.22, w:0.8, h:0.8, fontFace:FH, fontSize:30, bold:true, color:ICE, margin:0 });
  s.addText(d[0],{ x:x+1.15, y:y+0.28, w:4.6, h:0.7, fontFace:FH, fontSize:17, bold:true, color:NAVY, valign:"middle", lineSpacing:19, margin:0 });
  s.addText(d[1],{ x:x+0.3, y:y+1.1, w:5.35, h:1.0, fontFace:FB, fontSize:13, color:"3A434E", valign:"top", lineSpacing:18, margin:0 });
});
footer(s,10);

// ---------- Slide 11: Roadmap ----------
s = p.addSlide(); s.background={color:BG};
title(s,"Phased roadmap","Crawl, walk, run — value at every step");
const phases=[
  ["Phase 1 — Crawl","Foundation", TEAL, ["Unified Salesforce case model & lifecycle","DocuSign offers/acceptance","MuleSoft system APIs (DoDMERB, clearance)","Quick wins: guided intake, document AI, status nudges"]],
  ["Phase 2 — Walk","Intelligence", GOLD, ["SF-86 pre-fill & validation","Adjudicator copilot","Automated packet assembly","Generated correspondence; case prioritization"]],
  ["Phase 3 — Run","Optimization", "5B3A86", ["Predictive analytics across the pipeline","Onboarding orchestration","Continuous data-quality","Continuous-ATO maturity; expand to other pipelines"]],
];
phases.forEach((ph,i)=>{
  const x=0.55+i*4.13;
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{ x, y:1.55, w:3.9, h:5.1, fill:{color:WHITE}, rectRadius:0.1, shadow:shadow() });
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{ x, y:1.55, w:3.9, h:0.95, fill:{color:ph[2]}, rectRadius:0.1 });
  s.addShape(p.shapes.RECTANGLE,{ x, y:2.2, w:3.9, h:0.3, fill:{color:ph[2]} });
  s.addText(ph[0],{ x:x+0.25, y:1.62, w:3.4, h:0.45, fontFace:FH, fontSize:17, bold:true, color:WHITE, margin:0 });
  s.addText(ph[1],{ x:x+0.25, y:2.05, w:3.4, h:0.4, fontFace:FB, fontSize:13, italic:true, color:"F2F6F6", margin:0 });
  s.addText(ph[3].map(t=>({text:t,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:9}})),
    { x:x+0.28, y:2.75, w:3.4, h:3.7, fontFace:FB, fontSize:12.5, color:"33404B", lineSpacing:17, valign:"top" });
});
footer(s,11);

// ---------- Slide 12: Benefits + closing ----------
s = p.addSlide(); s.background={color:NAVY};
s.addShape(p.shapes.OVAL,{ x:10.6, y:-1.6, w:4.4, h:4.4, fill:{color:"27324F"} });
s.addText("Expected outcomes", { x:0.8, y:0.6, w:11, h:0.7, fontFace:FH, fontSize:30, bold:true, color:WHITE, margin:0 });
const ben=[["↓ Cycle time","form entry → acceptance"],["↑ Data quality","first-pass completeness"],["↓ Rework","interrogatories / bounce-backs"],["↓ Burden","cadre & adjudicator hours"]];
ben.forEach((b,i)=>{
  const x=0.8+i*3.0;
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{ x, y:1.7, w:2.75, h:1.7, fill:{color:"27324F"}, rectRadius:0.1 });
  s.addText(b[0],{ x:x+0.2, y:1.9, w:2.4, h:0.7, fontFace:FH, fontSize:24, bold:true, color:TEAL, margin:0 });
  s.addText(b[1],{ x:x+0.2, y:2.7, w:2.4, h:0.6, fontFace:FB, fontSize:12.5, color:"C7D2DC", lineSpacing:15, margin:0 });
});
s.addText("Better experience for the student and the adjudicator — with every eligibility, selection and clearance decision firmly in human hands.",
  { x:0.8, y:3.85, w:11.5, h:0.8, fontFace:FB, fontSize:15, color:"C7D2DC", lineSpacing:22, margin:0 });
s.addShape(p.shapes.RECTANGLE,{ x:0.8, y:5.0, w:3.0, h:0.045, fill:{color:TEAL} });
s.addText("Next step: a discovery session and a Continuum Design proof-of-concept to baseline current state and prioritize the first increment.",
  { x:0.8, y:5.2, w:11.5, h:0.8, fontFace:FH, fontSize:17, bold:true, color:WHITE, lineSpacing:22, margin:0 });
s.addText("Rob Brown, SVP National Security Solutions  ·  robert.brown@alphaomega.com  ·  Alpha Omega Integration LLC",
  { x:0.8, y:6.5, w:11.7, h:0.4, fontFace:FB, fontSize:12.5, color:"8FA0AE", margin:0 });

p.writeFile({ fileName:"/sessions/beautiful-eager-clarke/mnt/outputs/AlphaOmega_ROTC_Briefing.pptx" }).then(()=>console.log("deck done"));
