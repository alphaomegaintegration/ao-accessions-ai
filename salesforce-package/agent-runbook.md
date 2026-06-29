# Agent Runbook — automate the whole package with an external agent

This turns the package into an **autonomous procedure** an agent runs per Cadet — the same
pattern demonstrated live in `your-org`, where an external agent completed the
full document checklists (Alex Rivera = full ADHD set; Maria Chen = full asthma set) and
wrote AI case-summary Notes, **compensating for Einstein/Agentforce not being licensed**.

## Where it fits
- **Native automation (when licensed):** the record-triggered Flow + Einstein prompt
  templates + Agentforce agent do this in-platform.
- **External agent (any edition):** an agent reaches in, reasons over the record, and writes
  results back — identical outcome to the end user. Use this where Einstein isn't available.

## The per-Cadet loop (what the agent does)
For each `Cadet_Case__c` that is new or flagged for processing:
1. **Read** `Medical_Factor__c`, `Branch__c`, `SF86_Status__c`, `Contract_Date__c`.
2. **Documents:** look up the factor in the matrix (`flow-logic.md`); create any *missing*
   `Document_Request__c` with `Predicted__c=true`, `Status__c=Requested`,
   `Cadet_Case__c={record}`, `Due_Date__c=TODAY()+7`. (Skip ones that already exist.)
3. **AI outputs (Einstein replacement):** generate
   - Case summary (`Cadet_Case_Summary` template),
   - SF-86 / medical gap check (`SF86_Medical_Gap_Check`),
   - Draft applicant request (`Document_Request_Draft`),
   and write them as a **Note** titled "AI Case Summary & Next Action (external agent)".
4. **Recruiter Task:** create a Task "Send document request to {Cadet}" (WhatId={record}),
   priority High if inside the 60-day SF-86 window.
5. **SLA:** if `Branch` requires Top Secret, flag for TS; if inside 60 days of contract, mark at-risk.
6. **Log** every action to the case feed for SEAD 4 traceability.

## Guardrails (always)
- Human approves any send/correspondence (drafts only).
- No eligibility / selection / suitability / clearance determinations by the agent.
- Run in-boundary (IL4); never send case data to an unaccredited service.

## Two execution modes
- **A — Browser agent (Claude for Chrome):** drives the Salesforce UI (New record →
  related-list documents → New Note → New Task). This is what ran live in the demo. No org
  config required; works in any edition including Pro Suite trial.
- **B — API / MCP agent (headless, scalable):** uses the Salesforce REST/Bulk API (or `sf`
  CLI) to create records/notes/tasks, and the Claude API to generate the text. See
  `agent_runner.py`. Schedule it (cron / platform event) to process new cadets automatically.

## Demo add-on (run live)
1. Open the **AI-Generated Documents** list view — note the count.
2. Create a cadet with any medical factor.
3. Run the agent (browser mode): it creates the *full* document set for that factor + the AI Note + the recruiter Task.
4. Refresh the list — count jumps by the full checklist size; open the cadet to show the Note and Task.
Repeat to show automation at scale. Value statement: each row = a government back-and-forth cycle eliminated; the agent does it identically every time, in any edition.
