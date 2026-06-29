const fs = require("fs");
const sharp = require("sharp");

// ---- canvas ----
const W = 2280, LABEL = 256, RIGHT = 40, TOP = 132;
const laneH = 150;
const lanes = [
  { id:"student", name:"Student /\nApplicant",      tint:"#E8F1F2", bd:"#0E7C7B" },
  { id:"cadre",   name:"ROTC Cadre /\nPMS",          tint:"#EAF2EA", bd:"#2C5F2D" },
  { id:"boards",  name:"USACC\nSelection Boards",    tint:"#F5EECF", bd:"#8A6D00" },
  { id:"medical", name:"DoDMERB\n(Medical)",         tint:"#EFEAF4", bd:"#5B3A86" },
  { id:"adj",     name:"DCSA /\nAdjudicator",        tint:"#FBEAE6", bd:"#A4402A" },
  { id:"plat",    name:"Salesforce +\nMuleSoft + AI",tint:"#1F2A44", bd:"#0E7C7B", dark:true },
];
const H = TOP + lanes.length*laneH + 40;
const axisX0 = LABEL, axisX1 = W - RIGHT;
const mx = m => axisX0 + (m/12)*(axisX1-axisX0);
const laneY = i => TOP + i*laneH;
const laneCy = i => laneY(i) + laneH/2;
const laneIndex = id => lanes.findIndex(l=>l.id===id);

// ---- stages (ordered by time / x) ----
const BW = 214, BH = 84;
const stages = [
  { code:"S1", lane:"student", m:0.7,  t:"Awareness &\nLead Capture", ai:true },
  { code:"S2", lane:"student", m:2.0,  t:"Application\nIntake", ai:true },
  { code:"S3", lane:"cadre",   m:2.9,  t:"Docs &\nEligibility", ai:true },
  { code:"S5", lane:"cadre",   m:4.2,  t:"PMS\nInterview", ai:true },
  { code:"S4", lane:"medical", m:5.0,  t:"Fitness &\nMedical", ai:true },
  { code:"S6", lane:"boards",  m:6.0,  t:"Selection\nBoards", ai:true },
  { code:"S7", lane:"cadre",   m:7.4,  t:"Offer &\nAcceptance", ai:true },
  { code:"S8a",lane:"student", m:8.8,  t:"SF-86\nCompletion", ai:true },
  { code:"S8b",lane:"adj",     m:10.0, t:"Investigation &\nAdjudication", ai:true },
  { code:"S9", lane:"cadre",   m:11.2, t:"Contracting &\nOnboarding", ai:true },
];
const pos = {};
stages.forEach(s=>{ pos[s.code] = { x: mx(s.m)-BW/2, y: laneCy(laneIndex(s.lane))-BH/2, cx: mx(s.m), cy: laneCy(laneIndex(s.lane)) }; });

const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
function multiline(text, x, y, opts={}){
  const { size=21, color="#1F2A44", weight="600", anchor="middle", lh=23 } = opts;
  const lines = text.split("\n");
  const startY = y - ((lines.length-1)*lh)/2;
  return lines.map((ln,i)=>`<text x="${x}" y="${startY+i*lh}" font-family="Arial, DejaVu Sans, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}" dominant-baseline="middle">${esc(ln)}</text>`).join("");
}

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
svg += `<rect width="${W}" height="${H}" fill="#FFFFFF"/>`;
// defs: arrowheads
svg += `<defs>
<marker id="arr" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L7,3 L0,6 Z" fill="#46566F"/></marker>
<marker id="arrT" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L7,3 L0,6 Z" fill="#0E7C7B"/></marker>
</defs>`;

// title
svg += `<text x="${LABEL}" y="44" font-family="Arial, DejaVu Sans, sans-serif" font-size="34" font-weight="700" fill="#1F2A44">Army ROTC Recruitment &amp; Onboarding — Business Flow Swimlane</text>`;
svg += `<text x="${LABEL}" y="76" font-family="Arial, DejaVu Sans, sans-serif" font-size="20" font-weight="400" fill="#5A5A5A">From applicant form entry to ROTC acceptance &amp; contracting (~12 months). Teal “AI” badge = AI / automation touchpoint.</text>`;

// month axis
svg += `<line x1="${axisX0}" y1="${TOP-14}" x2="${axisX1}" y2="${TOP-14}" stroke="#C9D2DA" stroke-width="2"/>`;
for(let m=0;m<=12;m+=1){
  const x=mx(m);
  svg += `<line x1="${x}" y1="${TOP-20}" x2="${x}" y2="${TOP-8}" stroke="#C9D2DA" stroke-width="2"/>`;
  if(m%2===0) svg += `<text x="${x}" y="${TOP-26}" font-family="Arial, DejaVu Sans, sans-serif" font-size="16" fill="#8A93A0" text-anchor="middle">Month ${m}</text>`;
}

// lanes
lanes.forEach((l,i)=>{
  const y=laneY(i);
  svg += `<rect x="${axisX0}" y="${y}" width="${axisX1-axisX0}" height="${laneH-10}" fill="${l.tint}" rx="10"/>`;
  // label chip
  svg += `<rect x="20" y="${y}" width="${LABEL-40}" height="${laneH-10}" fill="${l.dark?'#1F2A44':'#FFFFFF'}" stroke="${l.bd}" stroke-width="2" rx="10"/>`;
  svg += multiline(l.name, 20+(LABEL-40)/2, y+(laneH-10)/2, { size:19, weight:"700", color:l.dark?'#FFFFFF':l.bd, lh:22 });
});

// platform backbone caption (spans width)
const pIdx = laneIndex("plat");
svg += `<text x="${(axisX0+axisX1)/2}" y="${laneY(pIdx)+laneH-26}" font-family="Arial, DejaVu Sans, sans-serif" font-size="16" fill="#CFE3E3" text-anchor="middle" font-style="italic">Unified case record · MuleSoft API-led integration (DoDMERB, e-QIP/NBIS, SIS, DEERS, pay) · DocuSign e-sign · governed AI · DevSecOps</text>`;

// connectors between consecutive stages (ordered)
function connector(aCode,bCode,teal=false){
  const a=pos[aCode], b=pos[bCode];
  const x1=a.x+BW, y1=a.cy, x2=b.x, y2=b.cy;
  const xm=(x1+x2)/2;
  const col = teal? "#0E7C7B":"#46566F";
  const mk = teal? "url(#arrT)":"url(#arr)";
  svg += `<path d="M ${x1} ${y1} H ${xm} V ${y2} H ${x2-2}" fill="none" stroke="${col}" stroke-width="3" marker-end="${mk}"/>`;
}
const order=["S1","S2","S3","S5","S4","S6","S7","S8a","S8b","S9"];
for(let i=0;i<order.length-1;i++) connector(order[i],order[i+1]);

// dashed links from each stage down to platform backbone (selective: show data flows to platform)
const plY = laneCy(pIdx);
["S2","S4","S6","S8a","S8b","S9"].forEach(code=>{
  const a=pos[code];
  svg += `<line x1="${a.cx}" y1="${a.y+BH}" x2="${a.cx}" y2="${plY-30}" stroke="#9FB0BD" stroke-width="1.6" stroke-dasharray="4 5"/>`;
});

// stage boxes
stages.forEach(s=>{
  const pp=pos[s.code]; const l=lanes[laneIndex(s.lane)];
  svg += `<rect x="${pp.x}" y="${pp.y}" width="${BW}" height="${BH}" rx="11" fill="#FFFFFF" stroke="${l.bd}" stroke-width="2.5"/>`;
  // code tag
  svg += `<text x="${pp.x+12}" y="${pp.y+20}" font-family="Arial, DejaVu Sans, sans-serif" font-size="15" font-weight="700" fill="${l.bd}">${s.code}</text>`;
  // AI badge
  if(s.ai){
    svg += `<rect x="${pp.x+BW-46}" y="${pp.y+8}" width="38" height="20" rx="10" fill="#0E7C7B"/>`;
    svg += `<text x="${pp.x+BW-27}" y="${pp.y+18}" font-family="Arial, DejaVu Sans, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">AI</text>`;
  }
  svg += multiline(s.t, pp.x+BW/2, pp.y+BH/2+8, { size:17, weight:"600", color:"#243044", lh:20 });
});

// backbone platform "box" centered label already in lane; add a node marker
svg += `<rect x="${mx(0.45)-BW/2}" y="${laneCy(pIdx)-30}" width="${mx(11.4)+BW/2-(mx(0.45)-BW/2)}" height="2" fill="#0E7C7B"/>`;

svg += `</svg>`;

fs.writeFileSync("/sessions/beautiful-eager-clarke/mnt/outputs/rotc_swimlane.svg", svg);
sharp(Buffer.from(svg), { density: 192 }).png().toFile("/sessions/beautiful-eager-clarke/mnt/outputs/rotc_swimlane.png")
  .then(info=>console.log("png", info.width, info.height))
  .catch(e=>{ console.error(e); process.exit(1); });
