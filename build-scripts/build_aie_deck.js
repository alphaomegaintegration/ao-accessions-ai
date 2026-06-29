const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE";
p.author = "Alpha Omega Integration LLC";
p.title = "AI-Enabled ROTC Accessions in the Army AIE";

const NAVY="1F2A44", TEAL="0E7C7B", ICE="CFE3E3", GOLD="8A6D00", GREY="5A5A5A",
      BG="F4F7F8", WHITE="FFFFFF", LTEAL="E6F1F1", LGOLD="F5EECF", SAGE="EAF2EA", PLUM="EFEAF4", BLUSH="FBEAE6";
const FH="Cambria", FB="Arial";
const W=13.33;
const shadow=()=>({type:"outer",color:"000000",blur:7,offset:3,angle:90,opacity:0.13});
function title(s,t,sub){
  s.addText(t,{x:0.6,y:0.32,w:12.1,h:0.6,fontFace:FH,fontSize:29,bold:true,color:NAVY,margin:0});
  if(sub) s.addText(sub,{x:0.62,y:0.95,w:12.1,h:0.34,fontFace:FB,fontSize:13.5,color:TEAL,margin:0});
}
function footer(s,n){
  s.addText("Alpha Omega — AIE ROTC Accessions  ·  Pre-decisional, RTM-traced",{x:0.6,y:7.08,w:9,h:0.3,fontFace:FB,fontSize:9,color:"9AA6B0",margin:0});
  s.addText(String(n),{x:12.5,y:7.08,w:0.5,h:0.3,fontFace:FB,fontSize:9,color:"9AA6B0",align:"right",margin:0});
}

// 1 TITLE
let s=p.addSlide(); s.background={color:NAVY};
s.addShape(p.shapes.OVAL,{x:-1.6,y:-1.8,w:4.6,h:4.6,fill:{color:"27324F"}});
s.addShape(p.shapes.OVAL,{x:11.0,y:5.0,w:4.2,h:4.2,fill:{color:"27324F"}});
s.addText("ALPHA OMEGA",{x:0.8,y:1.35,w:11,h:0.5,fontFace:FB,fontSize:16,bold:true,color:ICE,charSpacing:3,margin:0});
s.addText("AI-Enabled ROTC Accessions in the Army\nAccessions Information Environment (AIE)",{x:0.8,y:1.95,w:11.8,h:1.8,fontFace:FH,fontSize:36,bold:true,color:WHITE,lineSpacing:43,margin:0});
s.addText("Mapping the ROTC officer-accessions lifecycle to the AIE Functional RTM — ideas, use cases & business flows on AIE's COTS Salesforce + MuleSoft + DocuSign + Azure foundation.",
  {x:0.8,y:4.05,w:11.4,h:1.0,fontFace:FB,fontSize:15,color:"C7D2DC",lineSpacing:22,margin:0});
s.addShape(p.shapes.RECTANGLE,{x:0.8,y:5.35,w:3.0,h:0.045,fill:{color:TEAL}});
s.addText("Briefing Deck  ·  Solution Concept  ·  June 2026",{x:0.8,y:5.5,w:11,h:0.4,fontFace:FB,fontSize:13,italic:true,color:ICE,margin:0});
s.addText("Bracketed IDs (e.g., 3.4.4.18) cite AIE RTM requirements. Human-in-the-loop by design: AI never decides eligibility, selection, suitability, or clearance.",
  {x:0.8,y:6.15,w:11.6,h:0.6,fontFace:FB,fontSize:12,color:"8FA0AE",lineSpacing:17,margin:0});
s.addNotes("AIE is the Army's Accessions Information Environment — COTS, commercial cloud, IL4. ROTC is the officer/scholarship pipeline within it. This deck maps AI to the actual RTM requirements.");

// 2 AIE AT A GLANCE
s=p.addSlide(); s.background={color:BG};
title(s,"AIE at a glance","“A multi-network, multi-device, secure COTS solution in commercial cloud that automates accessions & recruiting.” (OV-1)");
const stats=[["~30,000","Cadets recruited & developed"],["~14,000","Scholarships managed"],["~5,100","Recruiters / staff"],["~1,000","ROTC locations"]];
stats.forEach((b,i)=>{ const x=0.6+i*3.06;
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{x,y:1.5,w:2.9,h:1.55,fill:{color:WHITE},rectRadius:0.1,shadow:shadow()});
  s.addText(b[0],{x:x+0.2,y:1.66,w:2.5,h:0.7,fontFace:FH,fontSize:30,bold:true,color:TEAL,margin:0});
  s.addText(b[1],{x:x+0.2,y:2.4,w:2.5,h:0.55,fontFace:FB,fontSize:12.5,color:GREY,lineSpacing:15,margin:0});
});
s.addText("ROTC accessions span three sub-paths, all built on the shared AIE foundation:",{x:0.6,y:3.4,w:12,h:0.4,fontFace:FB,fontSize:14,bold:true,color:NAVY,margin:0});
const paths=[["Scholarship Program","National 4-yr, Green-to-Gold, on-campus & campus-based awards"],["On-Campus","MS I–IV enrollment, screening, contracting & Cadet management"],["Summer Training Camps","Basic & Advanced Camp (CST) and CPDT, with camp medical screening"]];
paths.forEach((c,i)=>{ const x=0.6+i*4.05;
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{x,y:3.95,w:3.85,h:2.5,fill:{color:WHITE},rectRadius:0.1,shadow:shadow()});
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{x,y:3.95,w:3.85,h:0.62,fill:{color:TEAL},rectRadius:0.1});
  s.addShape(p.shapes.RECTANGLE,{x,y:4.35,w:3.85,h:0.22,fill:{color:TEAL}});
  s.addText(c[0],{x:x+0.22,y:3.95,w:3.45,h:0.62,fontFace:FH,fontSize:15.5,bold:true,color:WHITE,valign:"middle",margin:0});
  s.addText(c[1],{x:x+0.22,y:4.8,w:3.45,h:1.5,fontFace:FB,fontSize:13,color:"3A434E",valign:"top",lineSpacing:18,margin:0});
});
footer(s,2);

// 3 CAPABILITY FRAMEWORK
s=p.addSlide(); s.background={color:WHITE};
title(s,"AIE capability framework — where ROTC lives","The ROTC lifecycle touches all eight RTM capabilities");
const caps=[
  ["1 Foundation","Single record, forms generate/sign, integration, IL4 security",LTEAL],
  ["2 CRM","Leads, scholarship apps & boards, pre-screen, digital interview",SAGE],
  ["3 Processing","Eligibility, DoDMERB/security interfaces, contracting, RPA, Cadet mgmt",LGOLD],
  ["4 On-Boarding","ROTC accession orders, branch/component, commissioning",PLUM],
  ["5 Intelligence","Mission COAs, scholarship-funding modeling, PMS forecasts",ICE],
  ["6 Marketing","Propensity & campaign targeting to feed the pipeline",BLUSH],
  ["7 Training & Leader Dev","LMS (MS I–IV), Basic/Advanced Camp, camp medical",LTEAL],
  ["8 Sustain & Support","DD-918 agreements, retention reviews, Cadre hierarchy",SAGE],
];
const cw=3.0,chh=2.0,cgx=0.16,cx0=0.55;
caps.forEach((c,i)=>{ const r=Math.floor(i/4),col=i%4;
  const x=cx0+col*(cw+cgx), y=1.55+r*(chh+0.28);
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{x,y,w:cw,h:chh,fill:{color:c[2]},rectRadius:0.09,shadow:shadow()});
  s.addText(c[0],{x:x+0.2,y:y+0.18,w:cw-0.4,h:0.7,fontFace:FH,fontSize:16,bold:true,color:NAVY,valign:"top",lineSpacing:18,margin:0});
  s.addText(c[1],{x:x+0.2,y:y+0.92,w:cw-0.4,h:0.95,fontFace:FB,fontSize:12,color:"33404B",valign:"top",lineSpacing:15.5,margin:0});
});
footer(s,3);

// 4 LIFECYCLE CHIPS
s=p.addSlide(); s.background={color:BG};
title(s,"The ROTC lifecycle in AIE","Ten connected stages — each traced to RTM requirement IDs");
const steps=[
  ["S1","Lead & Prospect","2.1"],["S2","Scholarship App & CBEF","2.1.4"],["S3","Pre-Screen & Eligibility","2.3.1.6"],
  ["S4","PMS Interview","2.3"],["S5","DoDMERB Medical","3.3.1.7"],["S6","Selection Boards","2.1.4.7"],
  ["S7","Offer & Contract","3.4.4"],["S8","SF-86 Completion","3.4.4.18"],["S9","Invest. & Adjudication","3.4.4.25"],["S10","Enroll & Commission","3.10 · 4.7"]
];
const lc=5,lcw=2.32,lch=1.5,lgx=0.18,lx0=0.72,ly0=1.7;
steps.forEach((st,i)=>{ const r=Math.floor(i/lc),c=i%lc;
  const x=lx0+c*(lcw+lgx), y=ly0+r*(lch+0.3);
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{x,y,w:lcw,h:lch,fill:{color:WHITE},rectRadius:0.09,shadow:shadow()});
  s.addShape(p.shapes.OVAL,{x:x+0.16,y:y+0.16,w:0.46,h:0.46,fill:{color:LTEAL}});
  s.addText(st[0],{x:x+0.16,y:y+0.16,w:0.46,h:0.46,align:"center",valign:"middle",fontFace:FB,fontSize:12,bold:true,color:TEAL,margin:0});
  s.addText(st[1],{x:x+0.7,y:y+0.18,w:lcw-0.82,h:0.8,fontFace:FB,fontSize:12.5,bold:true,color:NAVY,valign:"middle",lineSpacing:14,margin:0});
  s.addText("["+st[2]+"]",{x:x+0.16,y:y+lch-0.42,w:lcw-0.3,h:0.34,fontFace:FB,fontSize:11.5,bold:true,color:TEAL,margin:0});
});
s.addText("Stages 1–9 are the ~1-year application-to-contracting cycle; enrollment, training & commissioning continue across MS I–IV.",{x:0.72,y:6.55,w:12,h:0.4,fontFace:FB,fontSize:12.5,italic:true,color:GREY,margin:0});
footer(s,4);

// 5 SWIMLANE
s=p.addSlide(); s.background={color:WHITE};
title(s,"Business-flow swimlane","Who does what, when — traced to AIE requirements");
const ihMax=5.45, iw=ihMax*(6228/3051), ih=ihMax;
s.addImage({path:"/sessions/beautiful-eager-clarke/mnt/outputs/aie_rotc_swimlane.png",x:(W-iw)/2,y:1.45,w:iw,h:ih});
footer(s,5);
s.addNotes("The dark bottom lane is the AIE platform backbone (single record, MuleSoft to SORs, DocuSign, RPA, IL4). Teal AI badges mark AI levers. Bracketed IDs trace to the RTM.");

// 6 TWO JOURNEYS
s=p.addSlide(); s.background={color:BG};
title(s,"Designing for two people first","The Cadet completing forms & the SF-86 — and the adjudicator reviewing them");
function persona(x,head,tint,today,future){
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{x,y:1.45,w:5.95,h:5.18,fill:{color:WHITE},rectRadius:0.1,shadow:shadow()});
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{x,y:1.45,w:5.95,h:0.62,fill:{color:tint},rectRadius:0.1});
  s.addShape(p.shapes.RECTANGLE,{x,y:1.85,w:5.95,h:0.22,fill:{color:tint}});
  s.addText(head,{x:x+0.25,y:1.45,w:5.5,h:0.62,fontFace:FH,fontSize:18,bold:true,color:WHITE,valign:"middle",margin:0});
  s.addText("Today",{x:x+0.25,y:2.2,w:5.4,h:0.3,fontFace:FB,fontSize:13,bold:true,color:GOLD,margin:0});
  s.addText(today.map(t=>({text:t,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:5}})),{x:x+0.3,y:2.5,w:5.4,h:1.7,fontFace:FB,fontSize:12,color:"3A434E",lineSpacing:16,valign:"top"});
  s.addText("With AI",{x:x+0.25,y:4.25,w:5.4,h:0.3,fontFace:FB,fontSize:13,bold:true,color:TEAL,margin:0});
  s.addText(future.map(t=>({text:t,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:5}})),{x:x+0.3,y:4.55,w:5.4,h:2.1,fontFace:FB,fontSize:12,color:"3A434E",lineSpacing:16,valign:"top"});
}
persona(0.55,"The Cadet",TEAL,
  ["Overlapping forms: scholarship app, CBEF, contracting, then SF-86","Reconstructs years of history from memory for the SF-86","SECRET clearance due within 60 days of contracting [3.4.4.18]","Little feedback until pre-screen or reviewer rejects"],
  ["Conversational guided intake on community portal [2.5]","Consented pre-fill reuses core data across forms [1.4]","Real-time validation = AIE continuous screening [3.4.4.20]","Document capture (IDP) to single record [1.2, 1.4]"]);
persona(6.83,"The Cadre / Adjudicator","A4402A",
  ["Manually reads packets & SF-86s across many SORs","Time lost on incomplete submissions & interrogatories","Heavy manual board assembly & scoring [2.1.4.7]","Hard to prioritize highest-risk / nearest-deadline"],
  ["Copilot summarizes, flags gaps, links evidence→guideline [3.8.1.1]","Completeness gating; RPA clears SOR steps [3.8]","Queue ranked by deadline & risk; next-best-action","Unified Cadet record, full audit trail [2.6]"]);
s.addText("Guardrail: AI surfaces & organizes; eligibility, selection, suitability & clearance decisions remain human under SEAD 4.",{x:0.55,y:6.78,w:12.2,h:0.3,fontFace:FB,fontSize:10.5,italic:true,color:GREY,margin:0});

// 7 SF-86 DEEP DIVE
s=p.addSlide(); s.background={color:WHITE};
title(s,"Deep dive: SF-86 & security clearance","A concrete RTM workflow — and a high-value AI target");
const reqs=[
  ["3.4.4.18","Initiate & complete SF-86 within 60 days of contracting for SECRET"],
  ["3.4.4.20","Continuous screening & data validation for accurate SF-86"],
  ["3.4.4.23","Auto-identify Cadets needing Top Secret by branch"],
  ["3.4.4.25","Interface with DCSA to send/receive SF-86 results & docs"],
  ["3.4.4.21","Support appeal process for denied clearances"],
  ["3.4.4.22","Detect existing clearance/investigation from SOR"],
];
reqs.forEach((rq,i)=>{ const r=Math.floor(i/2),c=i%2; const x=0.6+c*6.25,y=1.5+r*0.92;
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{x,y,w:5.95,h:0.78,fill:{color:BG},rectRadius:0.08,shadow:shadow()});
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{x:x+0.15,y:y+0.16,w:1.15,h:0.46,fill:{color:TEAL},rectRadius:0.07});
  s.addText(rq[0],{x:x+0.15,y:y+0.16,w:1.15,h:0.46,align:"center",valign:"middle",fontFace:FB,fontSize:11.5,bold:true,color:WHITE,margin:0});
  s.addText(rq[1],{x:x+1.45,y:y,w:4.4,h:0.78,fontFace:FB,fontSize:12,color:"2A323C",valign:"middle",lineSpacing:15,margin:0});
});
s.addShape(p.shapes.ROUNDED_RECTANGLE,{x:0.6,y:4.5,w:12.1,h:2.05,fill:{color:NAVY},rectRadius:0.1});
s.addText("AI levers mapped to these requirements",{x:0.85,y:4.65,w:11.6,h:0.4,fontFace:FH,fontSize:16,bold:true,color:WHITE,margin:0});
s.addText([
  {text:"Consented SF-86 pre-fill + real-time validation — fewer errors, faster start    ",options:{breakLine:true,paraSpaceAfter:6}},
  {text:"Adjudicator copilot — summarize, flag gaps, link evidence to guideline, draft interrogatories    ",options:{breakLine:true,paraSpaceAfter:6}},
  {text:"Predictive case prioritization against the 60-day window; automated nudges    ",options:{breakLine:true,paraSpaceAfter:6}},
  {text:"RPA moves SF-86 packages & DCSA responses across SOR interfaces — determinations stay human",options:{}},
].map(o=>({text:o.text,options:{...o.options,bullet:{code:"2022"},color:"E8F1F2",fontFace:FB,fontSize:13}}),),{x:0.95,y:5.15,w:11.4,h:1.3,lineSpacing:18,valign:"top"});
footer(s,7);

// 8 OPPORTUNITY MATRIX
s=p.addSlide(); s.background={color:WHITE};
title(s,"AI opportunity matrix","Pain → method → AIE capability/requirement → value");
const hdr=t=>({text:t,options:{fill:{color:NAVY},color:WHITE,bold:true,fontFace:FB,fontSize:12,valign:"middle"}});
const rows=[
  ["Application & CBEF","Abandonment, partial data","Conversational AI, pre-fill, validation","CRM 2.1.4; Foundation 1.4","Speed + exp."],
  ["Pre-screen / eligibility","Manual checks, rework","Rules + anomaly; suitability assist","2.3.1.6, 3.8.1.1","Quality + risk"],
  ["Interview","Coordination, scoring drift","Summarization, rubric checks","CRM 2.3","Quality"],
  ["Medical (DoDMERB)","Silent delays, waivers","Status sync, doc AI, prediction","3.3.1.7, 3.2.1.15","Speed"],
  ["Selection boards","Packet assembly, ranking","Auto-assembly, completeness, analytics","2.1.4.7, 3.5","Speed + quality"],
  ["Offer & contract","Manual letters, forms","Generated correspondence, e-sign","2.1.4.14, 1.3","Speed"],
  ["SF-86 & clearance","Errors, 60-day window","Pre-fill, validation, copilot, triage","3.4.4.18–.25","All four"],
  ["Enroll & manage","Manual tracking, ETPs","Auto-screening, near-real-time status","3.10","Quality + risk"],
  ["Cross-cutting workload","High manual volume","RPA across SOR steps","3.8","All four"],
];
const tdata=[[hdr("Stage"),hdr("Pain today"),hdr("AI method"),hdr("AIE capability / req"),hdr("Value")]];
rows.forEach((r,i)=>{const f=i%2?WHITE:"EEF3F4"; tdata.push(r.map((c,ci)=>({text:c,options:{fill:{color:f},color:"2A323C",fontFace:FB,fontSize:10.5,bold:ci===0,valign:"middle"}})));});
s.addTable(tdata,{x:0.5,y:1.45,w:12.3,colW:[1.95,2.45,3.1,2.95,1.85],rowH:0.5,border:{pt:0.5,color:"D5DEE2"},align:"left",margin:3});
footer(s,8);

// 9 USE CASES
s=p.addSlide(); s.background={color:BG};
title(s,"Priority use cases","Each traced to AIE requirements");
const ucs=[
  ["UC-01","Conversational app & CBEF intake","2.1.4 · 2.5"],
  ["UC-02","Document AI & eligibility screening","2.3.1.6 · 3.8.1.1"],
  ["UC-04","Board packet assembly & scoring","2.1.4.7 · 3.5"],
  ["UC-05","SF-86 pre-fill, validation & copilot","3.4.4.18 · .20"],
  ["UC-06","Adjudicator / reviewer copilot","3.8.1.1 · 3.6"],
  ["UC-07","RPA across SOR steps","3.8 · 3.3"],
];
const uw=3.95,uh=2.32,ugx=0.2,uy0=1.6,ux0=0.55;
ucs.forEach((u,i)=>{ const r=Math.floor(i/3),c=i%3; const x=ux0+c*(uw+ugx),y=uy0+r*(uh+0.28);
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{x,y,w:uw,h:uh,fill:{color:WHITE},rectRadius:0.09,shadow:shadow()});
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{x:x+0.22,y:y+0.22,w:1.0,h:0.42,fill:{color:LTEAL},rectRadius:0.08});
  s.addText(u[0],{x:x+0.22,y:y+0.22,w:1.0,h:0.42,align:"center",valign:"middle",fontFace:FB,fontSize:13,bold:true,color:TEAL,margin:0});
  s.addText(u[1],{x:x+0.22,y:y+0.78,w:uw-0.44,h:0.95,fontFace:FH,fontSize:15.5,bold:true,color:NAVY,valign:"top",lineSpacing:18,margin:0});
  s.addText("RTM: "+u[2],{x:x+0.22,y:y+1.78,w:uw-0.44,h:0.4,fontFace:FB,fontSize:11.5,bold:true,color:TEAL,valign:"top",margin:0});
});
footer(s,9);

// 10 ARCHITECTURE
s=p.addSlide(); s.background={color:WHITE};
title(s,"Target-state architecture on the AIE stack","COTS-first, API-led, governed AI, IL4");
const layers=[
  ["Experience","Community portal & cadre workspaces on Salesforce [2.5, 1.6] · conversational assistants · DocuSign signing",LTEAL,NAVY],
  ["Engagement / Case","Salesforce across CRM [2], Processing [3], On-Boarding [4] · configurable workflows [3.2] · single record [1.4]",SAGE,NAVY],
  ["AI + Automation","Azure OpenAI & Azure AI + Einstein (governed, in-boundary) · pre-screen [2.3.1.6] · suitability [3.8.1.1] · RPA [3.8]",ICE,NAVY],
  ["Integration (backbone)","MuleSoft API-led per OV-3 [1.10, 3.3] → DoDMERB [3.3.1.7] · Security SOR [3.3.1.9/.10] · DCSA [3.4.4.25] · IPPS-A · HireVue · LMS",TEAL,WHITE],
  ["Document & e-sign","DocuSign generate-and-sign forms, offers, contracting, consent [1.3]",LGOLD,NAVY],
  ["Platform & security","COTS in commercial cloud (OV-1) · FedRAMP+/IL4 [1.11.1.59] · PII/PHI [1.11.1.75] · multi-tenant upgrades [1.11] · DevSecOps","E7ECEF",NAVY],
];
let ly=1.5;
layers.forEach(([h,d,fill,tc])=>{
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{x:0.6,y:ly,w:12.1,h:0.82,fill:{color:fill},rectRadius:0.07,shadow:shadow()});
  s.addText(h,{x:0.8,y:ly,w:2.9,h:0.82,fontFace:FH,fontSize:14.5,bold:true,color:tc,valign:"middle",margin:0});
  s.addText(d,{x:3.8,y:ly,w:8.7,h:0.82,fontFace:FB,fontSize:11.5,color:tc===WHITE?"EAF6F5":"36404B",valign:"middle",lineSpacing:14.5,margin:0});
  ly+=0.9;
});
footer(s,10);

// 11 GOVERNANCE
s=p.addSlide(); s.background={color:BG};
title(s,"Responsible AI, security & governance");
const gov=[
  ["Human-in-the-loop by design","AI summarizes, validates & recommends. Eligibility, selection, suitability & clearance remain human under SEAD 4. Automated screening/suitability [3.8.1.1, 3.10.4.5] advise, not decide."],
  ["Hybrid deterministic + generative AI","Rules engines for policy-bound checks (predictable, auditable); generative AI for language tasks within guardrails."],
  ["Security & data protection","FedRAMP+/IL4 [1.11.1.59] · PII/PHI per DoDD 5400.11 & DoDI 8580.02 [1.11.1.75] · DCSA-aligned SF-86 handling · AI inside the accredited boundary."],
  ["Transparency & traceability","Model evaluation, explainable scoring, and a logged record of each recommendation — inspection-ready and RTM-traceable."],
];
let gy=1.45;
gov.forEach((g,i)=>{
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{x:0.6,y:gy,w:12.1,h:1.28,fill:{color:WHITE},rectRadius:0.08,shadow:shadow()});
  s.addShape(p.shapes.OVAL,{x:0.85,y:gy+0.34,w:0.6,h:0.6,fill:{color:TEAL}});
  s.addText(String(i+1),{x:0.85,y:gy+0.34,w:0.6,h:0.6,align:"center",valign:"middle",fontFace:FH,fontSize:20,bold:true,color:WHITE,margin:0});
  s.addText(g[0],{x:1.7,y:gy+0.18,w:10.8,h:0.4,fontFace:FH,fontSize:16,bold:true,color:NAVY,margin:0});
  s.addText(g[1],{x:1.7,y:gy+0.56,w:10.8,h:0.66,fontFace:FB,fontSize:12,color:"3A434E",lineSpacing:15.5,margin:0});
  gy+=1.42;
});
footer(s,11);

// 12 DELIVERY
s=p.addSlide(); s.background={color:WHITE};
title(s,"Delivery: SAFe + DevSecOps on Azure DevOps");
const deliv=[
  ["SAFe Agile Release Train","Aligned to AIE capabilities; PI planning & continuous demos to USACC, DoDMERB & DCSA stakeholders"],
  ["Azure DevOps hub","Backlog, boards, repos & pipelines as one system — traceable to RTM requirement IDs"],
  ["DevSecOps pipelines","CI/CD for Salesforce (SFDX) & MuleSoft with automated test, security scanning, policy-as-code, rollback"],
  ["Continuous upgrades & ATO","Leverage AIE multi-tenant continuous-upgrade model [1.11]; automate control evidence to sustain authorization"],
];
deliv.forEach((d,i)=>{ const x=0.6+(i%2)*6.25,y=1.55+Math.floor(i/2)*2.5;
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{x,y,w:5.95,h:2.25,fill:{color:BG},rectRadius:0.09,shadow:shadow()});
  s.addText(String(i+1),{x:x+0.25,y:y+0.22,w:0.8,h:0.8,fontFace:FH,fontSize:30,bold:true,color:ICE,margin:0});
  s.addText(d[0],{x:x+1.15,y:y+0.28,w:4.6,h:0.7,fontFace:FH,fontSize:17,bold:true,color:NAVY,valign:"middle",lineSpacing:19,margin:0});
  s.addText(d[1],{x:x+0.3,y:y+1.1,w:5.35,h:1.0,fontFace:FB,fontSize:13,color:"3A434E",valign:"top",lineSpacing:18,margin:0});
});
footer(s,12);

// 13 ROADMAP
s=p.addSlide(); s.background={color:BG};
title(s,"Phased roadmap","Crawl, walk, run — value at every step");
const phases=[
  ["Phase 1 — Crawl","Foundation",TEAL,["Single Cadet record & workflows [1.4, 3.2]","DocuSign forms [1.3]","MuleSoft APIs to DoDMERB & security SORs","Quick wins: guided intake, document AI"]],
  ["Phase 2 — Walk","Intelligence",GOLD,["SF-86 pre-fill & validation [3.4.4.20]","Adjudicator copilot [3.8.1.1]","Board packet assembly [2.1.4.7]","RPA across SORs [3.8]"]],
  ["Phase 3 — Run","Optimization","5B3A86",["Mission & funding analytics [5.1.4]","Predictive prioritization","Continuous data-quality & ATO","Extend to enlisted accessions"]],
];
phases.forEach((ph,i)=>{ const x=0.55+i*4.13;
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{x,y:1.55,w:3.9,h:5.1,fill:{color:WHITE},rectRadius:0.1,shadow:shadow()});
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{x,y:1.55,w:3.9,h:0.95,fill:{color:ph[2]},rectRadius:0.1});
  s.addShape(p.shapes.RECTANGLE,{x,y:2.2,w:3.9,h:0.3,fill:{color:ph[2]}});
  s.addText(ph[0],{x:x+0.25,y:1.62,w:3.4,h:0.45,fontFace:FH,fontSize:17,bold:true,color:WHITE,margin:0});
  s.addText(ph[1],{x:x+0.25,y:2.05,w:3.4,h:0.4,fontFace:FB,fontSize:13,italic:true,color:"F2F6F6",margin:0});
  s.addText(ph[3].map(t=>({text:t,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:9}})),{x:x+0.28,y:2.75,w:3.4,h:3.7,fontFace:FB,fontSize:12.5,color:"33404B",lineSpacing:17,valign:"top"});
});
footer(s,13);

// 14 BENEFITS + CLOSE
s=p.addSlide(); s.background={color:NAVY};
s.addShape(p.shapes.OVAL,{x:10.6,y:-1.6,w:4.4,h:4.4,fill:{color:"27324F"}});
s.addText("Expected outcomes",{x:0.8,y:0.6,w:11,h:0.7,fontFace:FH,fontSize:30,bold:true,color:WHITE,margin:0});
const ben=[["↓ Cycle time","application → contracting"],["↑ Data quality","first-pass completeness; SF-86"],["↑ On-time SF-86","60-day window [3.4.4.18]"],["↓ Burden","Cadre/adjudicator hours (RPA)"]];
ben.forEach((b,i)=>{ const x=0.8+i*3.0;
  s.addShape(p.shapes.ROUNDED_RECTANGLE,{x,y:1.7,w:2.75,h:1.7,fill:{color:"27324F"},rectRadius:0.1});
  s.addText(b[0],{x:x+0.2,y:1.9,w:2.4,h:0.7,fontFace:FH,fontSize:21,bold:true,color:TEAL,margin:0});
  s.addText(b[1],{x:x+0.2,y:2.65,w:2.4,h:0.65,fontFace:FB,fontSize:12,color:"C7D2DC",lineSpacing:15,margin:0});
});
s.addText("A faster, cleaner, lower-risk ROTC accessions lifecycle for the Cadet and the adjudicator — traceable to the AIE RTM at every step, with every decision in human hands.",
  {x:0.8,y:3.85,w:11.6,h:0.8,fontFace:FB,fontSize:15,color:"C7D2DC",lineSpacing:22,margin:0});
s.addShape(p.shapes.RECTANGLE,{x:0.8,y:5.0,w:3.0,h:0.045,fill:{color:TEAL}});
s.addText("Next step: a discovery session and a proof-of-concept to baseline current state and prioritize the first AIE increment.",
  {x:0.8,y:5.2,w:11.6,h:0.8,fontFace:FH,fontSize:17,bold:true,color:WHITE,lineSpacing:22,margin:0});
s.addText("Rob Brown, SVP National Security Solutions  ·  robert.brown@alphaomega.com  ·  Alpha Omega Integration LLC",
  {x:0.8,y:6.5,w:11.7,h:0.4,fontFace:FB,fontSize:12.5,color:"8FA0AE",margin:0});

p.writeFile({fileName:"/sessions/beautiful-eager-clarke/mnt/outputs/AIE_ROTC_Briefing.pptx"}).then(()=>console.log("deck done"));
