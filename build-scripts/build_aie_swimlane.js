const fs = require("fs");
const sharp = require("sharp");

const W = 2360, LABEL = 270, RIGHT = 40, TOP = 140;
const laneH = 162;
const lanes = [
  { id:"cadet",  name:"Cadet /\nFuture Applicant",  tint:"#E8F1F2", bd:"#0E7C7B" },
  { id:"cadre",  name:"ROTC Cadre /\nPMS",           tint:"#EAF2EA", bd:"#2C5F2D" },
  { id:"boards", name:"USACC HQ /\nBrigade Boards",  tint:"#F5EECF", bd:"#8A6D00" },
  { id:"medical",name:"DoDMERB",                     tint:"#EFEAF4", bd:"#5B3A86" },
  { id:"adj",    name:"DCSA / Investigation\n& Adjudication", tint:"#FBEAE6", bd:"#A4402A" },
  { id:"plat",   name:"AIE Platform\n(SF+MuleSoft+DocuSign)", tint:"#1F2A44", bd:"#0E7C7B", dark:true },
];
const H = TOP + lanes.length*laneH + 44;
const axisX0 = LABEL, axisX1 = W - RIGHT;
const mx = m => axisX0 + (m/12)*(axisX1-axisX0);
const laneY = i => TOP + i*laneH;
const laneCy = i => laneY(i) + (laneH-10)/2;
const laneIndex = id => lanes.findIndex(l=>l.id===id);

const BW = 222, BH = 100;
const stages = [
  { code:"S1", lane:"cadet",  m:0.7,  t:"Lead &\nProspect",        id:"2.1", ai:true },
  { code:"S2", lane:"cadet",  m:2.05, t:"Scholarship App\n& CBEF", id:"2.1.4", ai:true },
  { code:"S3", lane:"cadre",  m:3.0,  t:"Pre-Screen &\nEligibility",id:"2.3.1.6 · 3.10.4.5", ai:true },
  { code:"S4", lane:"cadre",  m:4.35, t:"PMS\nInterview",          id:"2.3", ai:true },
  { code:"S5", lane:"medical",m:5.15, t:"DoDMERB\nMedical",        id:"3.3.1.7", ai:true },
  { code:"S6", lane:"boards", m:6.2,  t:"Selection\nBoards",       id:"2.1.4.7 · 3.5", ai:true },
  { code:"S7", lane:"cadre",  m:7.6,  t:"Offer &\nContract",       id:"2.1.4.14 · 3.4.4", ai:true },
  { code:"S8", lane:"cadet",  m:8.95, t:"SF-86\nCompletion",       id:"3.4.4.18 · .20", ai:true },
  { code:"S9", lane:"adj",    m:10.1, t:"Investigation &\nAdjudication", id:"3.4.4.25 · 3.6", ai:true },
  { code:"S10",lane:"cadre",  m:11.35,t:"Enroll &\nCommission",    id:"3.10 · 4.7", ai:true },
];
const pos={};
stages.forEach(s=>{ pos[s.code]={ x:mx(s.m)-BW/2, y:laneCy(laneIndex(s.lane))-BH/2, cx:mx(s.m), cy:laneCy(laneIndex(s.lane)) }; });

const esc=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
function multiline(text,x,y,opts={}){
  const{size=21,color="#1F2A44",weight="600",anchor="middle",lh=23}=opts;
  const lines=text.split("\n");
  const sy=y-((lines.length-1)*lh)/2;
  return lines.map((ln,i)=>`<text x="${x}" y="${sy+i*lh}" font-family="Arial, DejaVu Sans, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}" dominant-baseline="middle">${esc(ln)}</text>`).join("");
}

let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
svg+=`<rect width="${W}" height="${H}" fill="#FFFFFF"/>`;
svg+=`<defs>
<marker id="arr" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L7,3 L0,6 Z" fill="#46566F"/></marker>
</defs>`;
svg+=`<text x="${LABEL}" y="42" font-family="Arial, DejaVu Sans, sans-serif" font-size="33" font-weight="700" fill="#1F2A44">ROTC Officer-Accessions Lifecycle in AIE — Business-Flow Swimlane</text>`;
svg+=`<text x="${LABEL}" y="74" font-family="Arial, DejaVu Sans, sans-serif" font-size="19" font-weight="400" fill="#5A5A5A">Application to contracting (~12 months); enrollment &#8594; commissioning continues MS I&#8211;IV.  Bracketed = AIE RTM requirement ID.  Teal “AI” = AI / automation lever.</text>`;

// month axis
svg+=`<line x1="${axisX0}" y1="${TOP-14}" x2="${axisX1}" y2="${TOP-14}" stroke="#C9D2DA" stroke-width="2"/>`;
for(let m=0;m<=12;m++){ const x=mx(m);
  svg+=`<line x1="${x}" y1="${TOP-20}" x2="${x}" y2="${TOP-8}" stroke="#C9D2DA" stroke-width="2"/>`;
  if(m%2===0) svg+=`<text x="${x}" y="${TOP-26}" font-family="Arial, DejaVu Sans, sans-serif" font-size="16" fill="#8A93A0" text-anchor="middle">Month ${m}</text>`;
}
// lanes
lanes.forEach((l,i)=>{ const y=laneY(i);
  svg+=`<rect x="${axisX0}" y="${y}" width="${axisX1-axisX0}" height="${laneH-10}" fill="${l.tint}" rx="10"/>`;
  svg+=`<rect x="20" y="${y}" width="${LABEL-40}" height="${laneH-10}" fill="${l.dark?'#1F2A44':'#FFFFFF'}" stroke="${l.bd}" stroke-width="2" rx="10"/>`;
  svg+=multiline(l.name, 20+(LABEL-40)/2, y+(laneH-10)/2, { size:18, weight:"700", color:l.dark?'#FFFFFF':l.bd, lh:21 });
});
// platform caption
const pIdx=laneIndex("plat");
svg+=`<text x="${(axisX0+axisX1)/2}" y="${laneY(pIdx)+laneH-30}" font-family="Arial, DejaVu Sans, sans-serif" font-size="15.5" fill="#CFE3E3" text-anchor="middle" font-style="italic">Single authoritative Cadet record [1.4] · MuleSoft API-led to SORs (DoDMERB, DCSA, IPPS-A, HireVue) [1.10, 3.3] · DocuSign generate-and-sign [1.3] · RPA [3.8] · FedRAMP+/IL4 [1.11]</text>`;

// connectors
function connector(a,b){ const A=pos[a],B=pos[b];
  const x1=A.x+BW,y1=A.cy,x2=B.x,y2=B.cy,xm=(x1+x2)/2;
  svg+=`<path d="M ${x1} ${y1} H ${xm} V ${y2} H ${x2-2}" fill="none" stroke="#46566F" stroke-width="3" marker-end="url(#arr)"/>`;
}
const order=["S1","S2","S3","S4","S5","S6","S7","S8","S9","S10"];
for(let i=0;i<order.length-1;i++) connector(order[i],order[i+1]);
// dashed to platform
const plY=laneCy(pIdx);
["S2","S5","S6","S8","S9","S10"].forEach(c=>{ const A=pos[c];
  svg+=`<line x1="${A.cx}" y1="${A.y+BH}" x2="${A.cx}" y2="${plY-32}" stroke="#9FB0BD" stroke-width="1.6" stroke-dasharray="4 5"/>`;
});
// boxes
stages.forEach(s=>{ const pp=pos[s.code]; const l=lanes[laneIndex(s.lane)];
  svg+=`<rect x="${pp.x}" y="${pp.y}" width="${BW}" height="${BH}" rx="11" fill="#FFFFFF" stroke="${l.bd}" stroke-width="2.5"/>`;
  svg+=`<text x="${pp.x+12}" y="${pp.y+20}" font-family="Arial, DejaVu Sans, sans-serif" font-size="15" font-weight="700" fill="${l.bd}">${s.code}</text>`;
  if(s.ai){ svg+=`<rect x="${pp.x+BW-46}" y="${pp.y+8}" width="38" height="20" rx="10" fill="#0E7C7B"/>`;
    svg+=`<text x="${pp.x+BW-27}" y="${pp.y+18}" font-family="Arial, DejaVu Sans, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">AI</text>`; }
  svg+=multiline(s.t, pp.x+BW/2, pp.y+44, { size:17, weight:"600", color:"#243044", lh:19 });
  svg+=`<text x="${pp.x+BW/2}" y="${pp.y+BH-12}" font-family="Arial, DejaVu Sans, sans-serif" font-size="12.5" font-weight="700" fill="#0E7C7B" text-anchor="middle">[${esc(s.id)}]</text>`;
});
svg+=`</svg>`;

fs.writeFileSync("/sessions/beautiful-eager-clarke/mnt/outputs/aie_rotc_swimlane.svg",svg);
sharp(Buffer.from(svg),{density:190}).png().toFile("/sessions/beautiful-eager-clarke/mnt/outputs/aie_rotc_swimlane.png")
  .then(i=>console.log("png",i.width,i.height)).catch(e=>{console.error(e);process.exit(1);});
