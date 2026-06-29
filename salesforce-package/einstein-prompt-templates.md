# Einstein Prompt Builder — 3 templates (paste-ready)

Build in **Setup → Einstein → Prompt Builder → New Prompt Template**. Use type
**Flex** (or **Record Summary** for #1), grounded on `Cadet_Case__c` and its
`Document_Request__c` children. Add the record as an input resource named `Input:CadetCase`.

Guardrail for all three: AI assists and drafts; it never makes eligibility, selection,
suitability, or clearance determinations, and never fabricates applicant answers.

---

## 1) Cadet Case Summary
**Name:** Cadet_Case_Summary  ·  **Type:** Record Summary / Flex
```
You are assisting U.S. Army accessions staff. Summarize this Cadet case in 4–6 lines:
path and branch, current cycle stage, SF-86 status and days remaining to the 60-day SECRET
window (Contract Date + 60), the outstanding document requests (Status = Requested), and the
single most important next action. Be factual and concise. Do not infer or invent any
applicant-provided data. Do not state eligibility, suitability, or clearance determinations.

Cadet: {!$Input:CadetCase.Name}
Path/Branch: {!$Input:CadetCase.Path__c} / {!$Input:CadetCase.Branch__c}
Cycle stage: {!$Input:CadetCase.Cycle_Stage__c}
SF-86 status: {!$Input:CadetCase.SF86_Status__c}
Contract date: {!$Input:CadetCase.Contract_Date__c}
Outstanding documents: {!$Input:CadetCase.Document_Requests__r}  (Status = Requested)
```

## 2) SF-86 / Medical Gap Check
**Name:** SF86_Medical_Gap_Check  ·  **Type:** Flex
```
Review this Cadet's record and list the supporting documents and information most likely
still required, based on the recorded medical/background factor and current document requests.
Group by factor. Flag anything at risk of delaying the 60-day SECRET window. Never fabricate
applicant answers; only identify gaps and likely-required evidence. Output a short bulleted
checklist for human review.

Medical factor: {!$Input:CadetCase.Medical_Factor__c}
Existing document requests: {!$Input:CadetCase.Document_Requests__r}
SF-86 status: {!$Input:CadetCase.SF86_Status__c}
```

## 3) Document Request Draft
**Name:** Document_Request_Draft  ·  **Type:** Flex
```
Draft a brief, courteous message to the applicant requesting the outstanding predicted
documents (Status = Requested). List each document with one line on why it is needed. Keep it
specific and actionable. Mark clearly that this is a draft for staff review before sending. Do
not include sensitive data beyond what is necessary to identify the documents.

Applicant: {!$Input:CadetCase.Name}
Documents to request: {!$Input:CadetCase.Document_Requests__r}  (Status = Requested)
```

> Note: child-relationship merge syntax (`Document_Requests__r`) and resource binding vary by
> org/release. In Prompt Builder, use the field/relationship picker to insert resources rather
> than hand-typing, then Preview against sample cadet "Jordan A. Maxwell".
