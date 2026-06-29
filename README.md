# AIE Accessions — Agentic AI for Army Recruiting & Accessions

A reference implementation and supporting materials for applying **agentic AI to the Army Accessions Information Environment (AIE)** accessions/recruiting process. The central goal is **cycle-time reduction**: turn one fact about a candidate into a complete, AI-assisted documentation package — automatically, governed, and human-approved.

Built on Salesforce with a **hybrid agentic architecture**: native automation where it runs in-platform, external agents that produce the identical outcome in any edition, and a drop-in path to a fully licensed **Agentforce** deployment.

**Live site:** the interactive demos and documents are published via GitHub Pages at <https://alphaomegaintegration.github.io/ao-accessions-ai/> — see [Live links](#live-links) below.

> **Note on confidentiality.** This repository contains pre-decisional, draft proposal and demonstration material. All candidate ("cadet") data is fictional, and account-specific identifiers (e.g., the demonstration org subdomain and Salesforce record IDs) have been redacted and replaced with placeholders such as `your-org`. The IL5/FedRAMP posture, governed model boundary, and external integrations described here are **target-state** and must be confirmed with the program office before any handling of real applicant data. See `NOTICE.md`.

## What's inside

| Folder | Contents |
|--------|----------|
| `docs/` | Technical description of the agents (`AIE_AI_Agents_Technical_Description.docx`/`.pdf`), the AIE/ROTC concept and modernization write-ups, the DoW RFI response, and presenter run-sheets under `docs/run-sheets/`. |
| `diagrams/` | The agentic process flow diagram and accessions swimlanes (SVG + PNG). |
| `presentations/` | Briefing decks (`.pptx`/`.pdf`) and the interactive HTML demos under `presentations/demos/` (open the `.html` files in a browser). |
| `salesforce-package/` | Deploy-ready SFDX package: custom object/field metadata, the record-triggered Flow logic, the headless agent runner, the demo orchestrator, and runbooks. |
| `skill/` | The "Salesforce AI via Chrome" skill used to build/demonstrate the capability live in a browser. |
| `build-scripts/` | Node scripts that generate the Word docs, decks, and diagrams (docx-js / pptxgenjs / sharp). |

## The agents (summary)

| Agent | Role |
|-------|------|
| **Orchestrator** | Sequences the run; prints the value summary (cycle-time meter). |
| **SeedAgent** | Creates the demo cadet roster across medical factors. |
| **DocumentAgent** | Completes the full, policy-driven document checklist per factor (idempotent). |
| **CopilotAgent** | Agentforce stand-in: case summary, gap check, and a **drafted** applicant request (human approves before send). |
| **TaskAgent** | Queues the recruiter follow-up task. |
| **ResetAgent** | Tears down demo data so every run starts clean. |

Full detail — architecture, infrastructure, governance (SEAD 4), RTM traceability, and the process diagram — is in `docs/AIE_AI_Agents_Technical_Description.docx`.

## Quick start

**Salesforce package (headless agents)**
```bash
cd salesforce-package
pip install simple-salesforce anthropic
export SF_USERNAME=... SF_PASSWORD=... SF_TOKEN=... ANTHROPIC_API_KEY=...
bash demo/run_demo.sh         # reset -> seed -> run agents -> report
python demo/demo_runner.py --report    # value meter only
```
> Provide your own credentials in your environment; never commit secrets (see `.gitignore`).

**Regenerate the documents/diagrams**
```bash
cd build-scripts
npm install docx pptxgenjs sharp
node build_agents_doc.js      # rebuilds the technical description .docx
```

**View the demos** — open any file in `presentations/demos/` in a web browser.

## Live links

The site is published with **GitHub Pages** at <https://alphaomegaintegration.github.io/ao-accessions-ai/>, deployed from `main` (a `.nojekyll` file ensures every file is served verbatim). PDFs, diagrams, and HTML open directly in the browser; the interactive demos are fully self-contained (no external scripts, no browser storage) and run natively.

**Interactive demos**
- [Landing page](https://alphaomegaintegration.github.io/ao-accessions-ai/)
- [Agentic Process Walkthrough](https://alphaomegaintegration.github.io/ao-accessions-ai/presentations/demos/AIE_AI_Walkthrough.html) — working simulator with a live value meter
- [Cycle-Time Demo](https://alphaomegaintegration.github.io/ao-accessions-ai/presentations/demos/AIE_CycleTime_Demo.html) — the recruiter cycle-time story
- [AI-in-Salesforce Demo](https://alphaomegaintegration.github.io/ao-accessions-ai/presentations/demos/AIE_AI_Demo.html)

**Documents**
- [AI Agents — Technical Description (PDF)](https://alphaomegaintegration.github.io/ao-accessions-ai/docs/AIE_AI_Agents_Technical_Description.pdf) — architecture, governance (SEAD 4), and RTM traceability
- [DoW RFI Response (PDF)](https://alphaomegaintegration.github.io/ao-accessions-ai/docs/AlphaOmega_DoW_RFI_Response.pdf)
- [ROTC AI Modernization (PDF)](https://alphaomegaintegration.github.io/ao-accessions-ai/docs/AlphaOmega_ROTC_AI_Modernization.pdf)
- [ROTC AI Concept (DOCX)](https://alphaomegaintegration.github.io/ao-accessions-ai/docs/AIE_ROTC_AI_Concept.docx)

**Briefing decks**
- [AIE ROTC Briefing (PDF)](https://alphaomegaintegration.github.io/ao-accessions-ai/presentations/AIE_ROTC_Briefing.pdf)
- [Alpha Omega ROTC Briefing (PDF)](https://alphaomegaintegration.github.io/ao-accessions-ai/presentations/AlphaOmega_ROTC_Briefing.pdf)

**Diagrams**
- [Agentic Process Diagram (SVG)](https://alphaomegaintegration.github.io/ao-accessions-ai/diagrams/AIE_Agentic_Process_Diagram.svg)
- [AIE ROTC Swimlane (SVG)](https://alphaomegaintegration.github.io/ao-accessions-ai/diagrams/aie_rotc_swimlane.svg)
- [ROTC Swimlane (SVG)](https://alphaomegaintegration.github.io/ao-accessions-ai/diagrams/rotc_swimlane.svg)

**Run-sheets & guides** (rendered on GitHub)
- [Live Demo Run-sheet](https://github.com/alphaomegaintegration/ao-accessions-ai/blob/main/docs/run-sheets/AIE_Live_Demo_Runsheet.md)
- [Tip-to-Tail Demo Run-sheet](https://github.com/alphaomegaintegration/ao-accessions-ai/blob/main/docs/run-sheets/AIE_Tip_to_Tail_Demo_Runsheet.md)
- [Salesforce Deploy Guide](https://github.com/alphaomegaintegration/ao-accessions-ai/blob/main/salesforce-package/README_Deploy_Guide.md)

## Governance

AI surfaces, drafts, and automates. **A human approves every applicant send and owns every eligibility, suitability, and clearance decision (SEAD 4).** Agents are idempotent and never take destructive or irreversible action without explicit operator instruction.

## License / use

Internal Alpha Omega material provided for technical review. See `NOTICE.md`.
