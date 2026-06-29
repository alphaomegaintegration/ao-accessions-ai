# Proactive Document Automation — Flow logic (all factors)

Record-triggered Flow on **Cadet_Case__c**, *A record is created or updated*,
**Optimize for: Actions and Related Records** (after-save).

**Entry condition (recommended):** `Medical_Factor__c` Is Changed = true (or simply
not blank) so it fires when a factor is set/changed. The live demo used
`Medical_Factor__c Equals "ADHD/anxiety medication history"`; for the full version,
remove that single-value filter and branch in a Decision.

## Structure
```
Start (Cadet_Case__c, created/updated, after-save)
  └─ Decision: "Which Medical Factor?"  (outcomes below; default = no action)
       ├─ ADHD/anxiety medication history ─► Create 4 Document_Request__c
       ├─ Asthma after age 13            ─► Create 3 Document_Request__c
       ├─ Prior orthopedic injury/surgery─► Create 4 Document_Request__c
       └─ Vision correction (LASIK/PRK)  ─► Create 3 Document_Request__c
  End
```

Each **Create Records** element sets, per document:
- `Cadet_Case__c` = `{!$Record.Id}`
- `Name` = the document type (from the matrix below)
- `Status__c` = `Requested`
- `Predicted__c` = `true`
- `Due_Date__c` = `{!$Flow.CurrentDate}` + 7 (use a Formula resource `TODAY()+7`)

> Tip to avoid duplicates on re-runs: before creating, **Get Records** on
> `Document_Request__c` where `Cadet_Case__c = {!$Record.Id}` AND `Predicted__c = true`;
> only create the missing ones (Decision: "Already created?"). The live demo omitted this
> for simplicity.

## Factor → documents matrix
| Medical / background factor | Documents to auto-create (Predicted, Requested) | Cycles saved |
|---|---|---|
| ADHD/anxiety medication history | Pharmacy records (7-yr history); Prescribing provider notes & treatment dates; Statement of current functioning (med-free period); School accommodation records | ~2 |
| Asthma after age 13 | Pulmonary function test (PFT); Provider treatment history; Methacholine challenge (if required) | ~1 |
| Prior orthopedic injury or surgery | Operative report; Imaging (X-ray/MRI); Physical therapy notes; Range-of-motion exam | ~1 |
| Vision correction (LASIK/PRK) | Surgical operative report; Pre/post-op visual acuity; Surgeon clearance letter | ~1 |
| (extendable) Employment verification needed | Employment verification letter; Supervisor contact reference | ~1 |
| (extendable) Behavioral/legal record item | Court disposition documents; Character references | ~1 |

## Build steps (Flow Builder)
1. New Flow → Record-Triggered Flow → object **Cadet Case**, created or updated, after-save.
2. (Optional) Entry condition `Medical_Factor__c` Is Null = False.
3. Add a **Decision** with one outcome per factor (Resource: `{!$Record.Medical_Factor__c}` Equals each value).
4. On each outcome path, add **Create Records** → *Manually*, object **Document Request**, one element per document (or a single element fed by a record collection you build with Assignment elements). Set the fields as above.
5. Save → **Activate**.
6. Test: set a cadet's Medical Factor; confirm the documents appear in the Document Requests related list with Status = Requested.

> Multi-select alternative: make `Medical_Factor__c` a multi-select picklist and use
> `INCLUDES()` in each Decision outcome to support cadets with several factors.
