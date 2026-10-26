# Graph Report - ao-accessions-ai  (2026-10-26)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 270 nodes · 288 edges · 25 communities (21 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3c97f950`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- build_aie_deck.js
- build_deck.js
- build_agents_doc.js
- build_aie_doc.js
- build_rotc.js
- build_aie_swimlane.js
- build_swimlane.js
- demo_runner.py
- build_rfi.js
- The run (live, ~6–8 minutes)
- 2. Build workflow
- AIE / ROTC Accessions — Tip-to-Tail Demo Run-Sheet (all automations)
- AIE / ROTC Accessions — Salesforce AI Demo: Deploy Guide
- Build reference — fields, mappings, prompt text, demo script
- docx
- AIE Accessions — Agentic AI for Army Recruiting & Accessions
- Agent Runbook — automate the whole package with an external agent
- Agentforce "Accessions Assistant" — agent spec
- Demo agents — the roster that runs the demo clean, end to end
- Einstein Prompt Builder — 3 templates (paste-ready)
- Proactive Document Automation — Flow logic (all factors)
- NOTICE.md
- run_demo.sh
- deploy.sh

## God Nodes (most connected - your core abstractions)
1. `AIE / ROTC Accessions — Tip-to-Tail Demo Run-Sheet (all automations)` - 10 edges
2. `The run (live, ~6–8 minutes)` - 8 edges
3. `2. Build workflow` - 7 edges
4. `Build AI enhancements in Salesforce — live via Claude in Chrome` - 7 edges
5. `AIE / ROTC Accessions — Salesforce AI Demo: Deploy Guide` - 7 edges
6. `Build reference — fields, mappings, prompt text, demo script` - 7 edges
7. `AIE Accessions — Agentic AI for Army Recruiting & Accessions` - 7 edges
8. `main()` - 6 edges
9. `docx` - 6 edges
10. `Agent Runbook — automate the whole package with an external agent` - 6 edges

## Surprising Connections (you probably didn't know these)
- `run_agents()` --calls--> `get_llm_text()`  [EXTRACTED]
  salesforce-package/demo/demo_runner.py → salesforce-package/agent_runner.py

## Import Cycles
- None detected.

## Communities (25 total, 4 thin omitted)

### Community 0 - "build_aie_deck.js"
Cohesion: 0.10
Nodes (18): ben, caps, deliv, gov, layers, p, paths, persona() (+10 more)

### Community 1 - "build_deck.js"
Cohesion: 0.11
Nodes (16): ben, deliv, gov, layers, p, pains, persona(), phases (+8 more)

### Community 2 - "build_agents_doc.js"
Cohesion: 0.15
Nodes (14): border, borders, BUL(), cell(), children, doc, {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType, ShadingType,
  TableOfContents, PageNumber, Header, Footer, PageBreak, ImageRun
}, fs (+6 more)

### Community 3 - "build_aie_doc.js"
Cohesion: 0.12
Nodes (7): border, borders, cell(), doc, {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType, PageNumber, PageBreak, TableOfContents
}, fs, tbl()

### Community 4 - "build_rotc.js"
Cohesion: 0.12
Nodes (7): border, borders, cell(), doc, {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType, PageNumber, PageBreak, TableOfContents
}, fs, tbl()

### Community 5 - "build_aie_swimlane.js"
Cohesion: 0.14
Nodes (12): esc(), fs, laneCy(), lanes, laneY(), multiline(), order, pIdx (+4 more)

### Community 6 - "build_swimlane.js"
Cohesion: 0.14
Nodes (12): esc(), fs, laneCy(), lanes, laneY(), multiline(), order, pIdx (+4 more)

### Community 7 - "demo_runner.py"
Cohesion: 0.23
Nodes (8): get_llm_text(), main(), main(), report(), reset(), run_agents(), seed(), sf_client()

### Community 8 - "build_rfi.js"
Cohesion: 0.14
Nodes (7): border, borders, cell(), doc, {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType, PageNumber, PageBreak, TableOfContents, ExternalHyperlink
}, fs, infoTable()

### Community 9 - "The run (live, ~6–8 minutes)"
Cohesion: 0.13
Nodes (14): 60-second pre-flight (do this right before the room is live), ACT 1 — The problem (30 sec, no clicks), ACT 2 — One connected case (1 min), ACT 3 — The automation that already ran (1–2 min), ACT 4 — Do it live (the proof, 1–2 min), ACT 5 — The money slide (1 min), ACT 6 — Adapt fast + the licensed path (30 sec), AIE Accessions — Live Salesforce Demo Run-Sheet (+6 more)

### Community 10 - "2. Build workflow"
Cohesion: 0.14
Nodes (13): 0. Before anything: connection + prerequisites, 1. SAFETY GUARDRAILS — read every time, 2. Build workflow, 3. Demo narration (keep it outcome-first), 4. Troubleshooting, 5. Fallback, Build AI enhancements in Salesforce — live via Claude in Chrome, Phase A — Data model (Cadet/Applicant case) (+5 more)

### Community 11 - "AIE / ROTC Accessions — Tip-to-Tail Demo Run-Sheet (all automations)"
Cohesion: 0.18
Nodes (10): ACT 1 — The problem & the model, ACT 2 — The automations, stage by stage (the spine), ACT 3 — Value & scale (the money slide), ACT 4 — Adapt fast (policy change), AIE / ROTC Accessions — Tip-to-Tail Demo Run-Sheet (all automations), Close, Current state of your-org (as left), Live click-path (the 90-second version to actually run) (+2 more)

### Community 12 - "AIE / ROTC Accessions — Salesforce AI Demo: Deploy Guide"
Cohesion: 0.18
Nodes (10): AIE / ROTC Accessions — Salesforce AI Demo: Deploy Guide, Cadet_Case__c, CLI deploy, Data model (fields), Deploy order, Document_Request__c (child of Cadet_Case__c), Prerequisites (target org), Report (+2 more)

### Community 13 - "Build reference — fields, mappings, prompt text, demo script"
Cohesion: 0.18
Nodes (10): Agentforce assistant (Phase D), Build reference — fields, mappings, prompt text, demo script, Cadet_Case__c, Data model (Phase A), Demo script (Phase F), Document_Request__c (child of Cadet_Case__c), Einstein prompt templates (Phase C) — paste text, Factor → predicted documents (Phase B Flow logic) (+2 more)

### Community 14 - "docx"
Cohesion: 0.36
Nodes (7): dependencies, docx@^9.7.1, pptxgenjs@^4.0.1, sharp@^0.35.2, docx, pptxgenjs, sharp

### Community 15 - "AIE Accessions — Agentic AI for Army Recruiting & Accessions"
Cohesion: 0.25
Nodes (7): AIE Accessions — Agentic AI for Army Recruiting & Accessions, Governance, License / use, Live links, Quick start, The agents (summary), What's inside

### Community 16 - "Agent Runbook — automate the whole package with an external agent"
Cohesion: 0.29
Nodes (6): Agent Runbook — automate the whole package with an external agent, Demo add-on (run live), Guardrails (always), The per-Cadet loop (what the agent does), Two execution modes, Where it fits

### Community 17 - "Agentforce "Accessions Assistant" — agent spec"
Cohesion: 0.33
Nodes (5): Agent, Agentforce "Accessions Assistant" — agent spec, Guardrails (configure in agent + topics), Test script, Topics & actions

### Community 18 - "Demo agents — the roster that runs the demo clean, end to end"
Cohesion: 0.40
Nodes (4): Browser-agent equivalent (no API creds, any edition), Demo agents — the roster that runs the demo clean, end to end, How it maps to the live + native layers, One-command clean demo

### Community 19 - "Einstein Prompt Builder — 3 templates (paste-ready)"
Cohesion: 0.40
Nodes (4): 1) Cadet Case Summary, 2) SF-86 / Medical Gap Check, 3) Document Request Draft, Einstein Prompt Builder — 3 templates (paste-ready)

### Community 20 - "Proactive Document Automation — Flow logic (all factors)"
Cohesion: 0.40
Nodes (4): Build steps (Flow Builder), Factor → documents matrix, Proactive Document Automation — Flow logic (all factors), Structure

## Knowledge Gaps
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `pptxgenjs` connect `docx` to `build_aie_deck.js`, `build_deck.js`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Should `build_aie_deck.js` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Why does `docx` connect `docx` to `build_rfi.js`, `build_agents_doc.js`, `build_aie_doc.js`, `build_rotc.js`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Should `build_deck.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Why does `sharp` connect `docx` to `build_aie_swimlane.js`, `build_swimlane.js`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Should `build_aie_doc.js` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Should `build_rotc.js` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._