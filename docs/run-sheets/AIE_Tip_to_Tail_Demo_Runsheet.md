# AIE / ROTC Accessions — Tip-to-Tail Demo Run-Sheet (all automations)

**Org:** your-org  ·  **Theme:** one fact in → a complete, AI-assisted documentation
package out — every time. Native automation where Einstein/Agentforce is licensed; an external
agent delivering the identical outcome anywhere else.  **Guardrail throughout:** AI surfaces,
drafts, and automates; humans approve every send and own every eligibility/suitability/clearance
decision (SEAD 4).

Legend — **[LIVE]** = built and runnable in this trial org · **[PKG]** = in the deploy package
(`AIE_SF_Package.zip`) for an Agentforce/Einstein-licensed org.

---

## Pre-brief (30 sec)
"In 2020 a recruit could enlist in under a week; today it's 30–45 days, and the delay lives in
medical, waivers, and documentation. We attack cycle time and adapt to constant policy change."

## ACT 1 — The problem & the model
1. Open the **Cadet Case** object (Object Manager) — one case = the cadet's whole journey, with
   child **Document Requests**, Medical Factor, SF-86 Status. **[LIVE]**
   - Say: "Everything becomes one connected, instrumented case."

## ACT 2 — The automations, stage by stage (the spine)
| # | Lifecycle stage | Automation | Type | Show | Value line |
|---|---|---|---|---|---|
| 1 | Lead & application | Conversational/guided intake, pre-fill | [PKG] CRM 2.1.4 | runbook / cycle-time demo | "Capture once, reuse everywhere — no re-keying" |
| 2 | Pre-screen & eligibility | Auto eligibility rules + suitability assist | [PKG] 2.3.1.6 / 3.8.1.1 | flow-logic.md | "Errors caught before they enter the pipeline" |
| 3 | **Medical / waiver (the bottleneck)** | **Proactive document automation** — record-triggered Flow creates predicted docs on save | **[LIVE]** native Flow | create a cadet w/ ADHD → doc appears | "The government's next request, asked for upfront" |
| 4 | Full checklist (any factor) | **External agent** completes the policy-driven document set | **[LIVE]** browser agent | add cadet w/ Asthma → agent makes PFT/notes/challenge | "Fills what the native flow/edition can't — same outcome" |
| 5 | Case copilot (Einstein replacement) | **External agent** writes case summary + gap check + drafted applicant request as a Note | **[LIVE]** agent Note | open Maria/David → AI Case Summary note | "Agentforce-style output, produced externally" |
| 6 | Recruiter worklist | **External agent** creates a follow-up Task ("admin agent") | [PKG]/agent_runner | runbook step 4 | "Recruiters recruit; agents track paperwork" |
| 7 | DoDMERB / SF-86 | Status sync + SF-86 pre-fill/validation; 60-day SECRET SLA | [PKG] 3.3.1.7 / 3.4.4.18–.25 | einstein-prompt-templates.md | "Protect the 60-day SECRET window" |
| 8 | Selection boards | Auto packet assembly + completeness scoring (human-decided) | [PKG] 2.1.4.7 | concept doc | "Boards see only complete packets" |
| 9 | Contracting & onboarding | DocuSign generate-and-sign; orchestration | [PKG] 1.3 / 3.4.4 | concept doc | "Same-day, tracked, clean activation" |
| 10 | Commission / accession | Eligibility validation, OML, accession orders | [PKG] 4.7 | concept doc | "Cohort built, cleanly accessioned" |

## ACT 3 — Value & scale (the money slide)
- Open the **AI-Generated Documents** list view. **[LIVE]**
  - Say: "Every row was created by automation, not a person. Count = back-and-forth cycles
    eliminated ≈ days of cycle time saved."
- Create 1–2 more cadets live; refresh the list — the count climbs in real time. **[LIVE]**
  - Say: "One fact in; the full package out — identical, every time, at scale."
- Show the **agent at scale**: `agent_runner.py` queries new cadets and applies the whole package
  headless on a schedule. **[PKG]**

## ACT 4 — Adapt fast (policy change)
- "Everything's always changing." A new factor or required form is a **config/table edit** (Flow
  decision + matrix row, or a line in `agent_runner.py` FACTOR_DOCS) — minutes, not a dev cycle.
- For a fully licensed org, the same is delivered via **Einstein prompt templates** + the
  **Agentforce Accessions Assistant** (`agentforce-accessions-assistant.md`). **[PKG]**

## Close
"Native where licensed, external agent everywhere else — the recruiter experience and the
cycle-time win are identical. Humans keep every decision."

---

## Live click-path (the 90-second version to actually run)
1. **AI-Generated Documents** list → note the count.
2. **New Cadet Case** → name + Medical Factor = ADHD → Save. (Native Flow creates 1 doc.)
3. On the cadet's **Related** tab → **New** → add the 3 remaining ADHD docs (agent completes checklist).
4. **New Note** → paste the agent's case summary + drafted request.
5. Back to the **AI-Generated Documents** list → count jumped by 4. Done.

## Reset / cleanup
- Deactivate Flow: Setup → Flows → *Proactive Document Requests* → Deactivate.
- Delete demo cadets (Jordan, Alex, Maria, David) — child Document Requests and Notes go with them.
- Optionally delete the **AI-Generated Documents** list view.

## Current state of your-org (as left)
4 cadets · 12 auto-generated documents · AI notes on Maria & David · AI-Generated Documents list
view · active *Proactive Document Requests* Flow.
