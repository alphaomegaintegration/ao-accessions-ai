# AIE / ROTC Accessions — Salesforce AI Demo: Deploy Guide

This package recreates and **completes** the AI-enabled accessions demo for a Salesforce
org that has **Agentforce + Einstein Generative AI enabled** (Enterprise/Unlimited or a
Developer/Partner org with those features turned on). It supersedes the Pro Suite trial
limits hit in `your-org` (no Einstein Prompt Builder, no custom Agentforce
agent builder).

## What was already built LIVE in your-org
- `Cadet_Case__c` object (Deployed) with **Medical Factor** and **SF-86 Status** picklists
- `Document_Request__c` object with a **Cadet Case** lookup + Document Requests related list
- An **active** record-triggered Flow *Proactive Document Requests* that auto-creates a
  predicted document when Medical Factor = ADHD/anxiety — proven end-to-end on sample
  cadet "Jordan A. Maxwell" (auto-created *Pharmacy records (7-yr history)*)
- Agentforce panel available (default sales agent)

## What this package adds / completes
1. Full data model (incl. **Status**, **Predicted**, **Document Type**, **Cycle Stage**, **Days to Accession**)
2. Proactive document automation for **all** medical/background factors (full checklist), with `Status = Requested`
3. **Document Requests** report grouped by Status
4. Three **Einstein prompt templates** (case summary, gap check, document-request draft) — `einstein-prompt-templates.md`
5. **Agentforce "Accessions Assistant"** agent spec (topics + actions) — `agentforce-accessions-assistant.md`

---

## Prerequisites (target org)
- Edition with **Agentforce** + **Einstein Generative AI / Prompt Builder** enabled and licensed.
- Setup → Einstein → turn on Einstein Generative AI; enable **Prompt Builder** and **Agentforce (Agents)**.
- A user with **Modify All / Customize Application** and **Author Apex** (for CLI deploy).
- Salesforce CLI (`sf`) installed for the metadata deploy (`npm i -g @salesforce/cli`).
- Handle PII/PHI appropriately; for DoD use, deploy in an org at the correct Impact Level (IL4) with the proper boundary controls. AI runs in-boundary; humans retain all eligibility/suitability/clearance decisions (SEAD 4).

## Deploy order
1. **Data model + Flow + Report** via CLI (`/force-app` + `deploy.sh`), or build by hand from `factor-document-matrix.md`.
2. **Einstein prompt templates** — build in **Setup → Einstein → Prompt Builder** using `einstein-prompt-templates.md` (paste-ready text).
3. **Agentforce agent** — build in **Setup → Agentforce Studio → Agents → New** using `agentforce-accessions-assistant.md`.
4. **Surface on the record page** — Lightning App Builder → Cadet Case record page → add the Agentforce/Einstein panel + the Document Requests related list.
5. **Sample data + test** — create a Cadet with Medical Factor = ADHD; confirm documents auto-create; ask the agent to summarize / check gaps / draft the request.

### CLI deploy
```bash
cd AIE_SF_Package
sf org login web --alias aieDemo
sf project deploy start --source-dir force-app --target-org aieDemo --dry-run   # validate first
sf project deploy start --source-dir force-app --target-org aieDemo             # deploy
```
> Always run `--dry-run` first; metadata API versions differ across orgs. If the Flow XML
> rejects on the target API version, open it in Flow Builder and re-save, or rebuild from
> `flow-logic.md`.

---

## Data model (fields)

### Cadet_Case__c
| Field | API | Type | Values / notes |
|---|---|---|---|
| Path | `Path__c` | Picklist | Scholarship; On-Campus; Summer Camp |
| Branch | `Branch__c` | Picklist | Infantry; Cyber; Aviation; Nurse; … |
| Contract Date | `Contract_Date__c` | Date | drives 60-day SF-86 clock |
| Medical Factor | `Medical_Factor__c` | Picklist | ADHD/anxiety medication history; Asthma after age 13; Prior orthopedic injury or surgery; Vision correction (LASIK/PRK) |
| SF-86 Status | `SF86_Status__c` | Picklist | Not started; In progress; Submitted; Returned for more info; Granted |
| Clearance Level | `Clearance_Level__c` | Picklist | SECRET; TOP SECRET |
| Cycle Stage | `Cycle_Stage__c` | Picklist | Lead; Application; Pre-screen; Interview; Medical; Board; Offer; SF-86; Enroll; Commission |
| Days to Accession | `Days_To_Accession__c` | Number | optional; formula on stage timestamps |

### Document_Request__c (child of Cadet_Case__c)
| Field | API | Type | Values / notes |
|---|---|---|---|
| (Name) | `Name` | Text(80) | holds the document type |
| Cadet Case | `Cadet_Case__c` | Lookup(Cadet_Case__c) | parent |
| Status | `Status__c` | Picklist | Requested (default); Received; Waived |
| Predicted | `Predicted__c` | Checkbox | true when auto-created proactively |
| Document Type | `Document_Type__c` | Picklist | Medical; Employment; Legal; Education (optional grouping) |
| Due Date | `Due_Date__c` | Date | default TODAY()+7 |

---

## Report
**Document Requests by Status** (tabular/summary):
- Report type: Document Requests (or Cadet Cases with Document Requests)
- Group rows by `Status__c`; columns: Cadet Case, Document Request Name, Predicted, Due Date, Created Date
- Filter: `Predicted = true` to show AI-generated requests; chart: donut by Status
- Add to a "Cadet Accessions" dashboard with a "Days to Accession" metric for the cycle-time story.

See `flow-logic.md`, `factor-document-matrix.md`, `einstein-prompt-templates.md`, and
`agentforce-accessions-assistant.md` for the rest.
