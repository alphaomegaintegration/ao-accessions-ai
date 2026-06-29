# AIE Accessions — Live Salesforce Demo Run-Sheet

**Org:** your-org · **Edition:** Pro Suite trial · **Mode:** present entirely in the live org
**Theme:** one fact about a cadet goes in → a complete, AI-assisted documentation package comes out, every time.
**Guardrail (say it once, early):** AI surfaces, drafts, and automates; a human approves every send and owns every eligibility / suitability / clearance decision (SEAD 4).

---

## Prepped state (already done — verify before you present)
- **Flow `Proactive Document Requests` is ACTIVE** (record-triggered, runs after save on Cadet Case).
- **4 baseline cadets**, all with the ADHD/anxiety medical factor:
  - **Alex Rivera – Green-to-Gold (Cyber)** — the *hero* record: full 4-document checklist + an **AI Case Summary** note.
  - David Okafor – National 4-Yr (Cyber)
  - Sarah Lin – On-Campus (Signal)
  - Tyler Brooks – National 4-Yr (Cyber)
- **"AI-Generated Documents" list view = 7 documents** (the value meter / money slide).

### 60-second pre-flight (do this right before the room is live)
1. Open the **AI-Generated Documents** list view → confirm it loads and shows **7**.
2. Open **Alex Rivera** → **Related** → confirm **Document Requests (4)**; **Details/Notes** → confirm the **AI Case Summary** note.
3. Confirm you're logged in as Rob Brown and the Flow shows **Active** (Setup → Flows).

---

## The run (live, ~6–8 minutes)

### ACT 1 — The problem (30 sec, no clicks)
"In 2020 a recruit could enlist in under a week; today it's 30–45 days. The delay isn't the forms — it's the medical/waiver back-and-forth, and policy changes constantly. We attack the *cycle*."

### ACT 2 — One connected case (1 min)
- Open **Alex Rivera**'s Cadet Case.
- Point to: **Medical Factor**, **SF-86 Status**, and the child **Document Requests (4)**.
- Say: "Everything about the cadet's journey is one connected, instrumented record."

### ACT 3 — The automation that already ran (1–2 min)
- On Alex, open the **Related** tab → the **4-document checklist** (pharmacy records, prescribing provider notes, statement of current functioning, school accommodation records).
- Say: "The native Flow created the first document the moment Alex was saved. An agent completed the rest of the policy-driven checklist — the government's next four requests, asked for upfront."
- Open the **AI Case Summary** note. Say: "And the copilot drafted the case summary and the applicant outreach — *as a draft*. A human approves before anything sends."

### ACT 4 — Do it live (the proof, 1–2 min)
1. Cadet Cases → **New**.
2. Name: **Jordan A. Maxwell – National 4-Yr (Cyber)**; Medical Factor: **ADHD/anxiety medication history**; SF-86 Status: **Submitted** → **Save**.
3. On Jordan's **Related** tab → a **Document Request appears automatically** ("Pharmacy records (7-yr history)").
   - Say: "No one typed that. The save fired the automation."
4. *(Optional)* Click **New** on Jordan's Document Requests and add the other three ADHD items to show the full checklist assembling.

### ACT 5 — The money slide (1 min)
- Open the **AI-Generated Documents** list view → it now shows **8** (was 7).
- Say: "Every row was created by automation, not a person — each is a request-wait-resubmit cycle eliminated, ≈ days of cycle time saved. Across ~30K cadets and the enlisted pipeline, that compounds."

### ACT 6 — Adapt fast + the licensed path (30 sec)
- "A new medical factor or required form is a config/table edit — minutes, not a dev cycle."
- "Native automation where Einstein/Agentforce is licensed; an external agent delivering the identical outcome everywhere else. The deploy-ready package makes this Agentforce-native whenever the license is on."

### Close
"Native where licensed, external agent everywhere else — same recruiter experience, same cycle-time win. Humans keep every decision."

---

## If something goes sideways
- **New Cadet doesn't auto-create a document** → Setup → Flows → confirm `Proactive Document Requests` is **Active** (re-activate the version if needed). Only the **ADHD/anxiety** factor triggers the native doc.
- **List view count looks wrong** → click the refresh (↻) icon on the list view.
- **Lookup/picklist misclick in the New form** → just Cancel and re-open; the form is only 3 fields.

## Reset after the meeting (back to clean)
> **Important:** deleting a Cadet Case does **not** auto-delete its Document Requests (the link is a lookup, not master-detail). If you delete only the cadet, its documents become orphans and the value meter stays inflated on the next run.

**Correct reset for a cadet you created live:**
1. Open the cadet → **Related** → Document Requests → row menu (▾) → **Delete** each document.
2. Then **Delete** the Cadet Case itself.
3. Refresh the **AI-Generated Documents** list → confirm it's back to **7**.

- Keep the 4 baseline cadets (Alex, David, Sarah, Tyler) for the next run.
- For a fully pristine org: delete every Document Request first, then every Cadet Case, then deactivate the Flow.
- Objects, fields, the Flow, and the list view stay in place for re-runs.

## Talking-point cheat sheet (RTM anchors)
- Proactive document automation / RPA → **3.8**
- Cadet case management → **3.10**
- SF-86 / 60-day SECRET window → **3.4.4.18**; DCSA interface **3.4.4.25**; DoDMERB **3.3.1.7**
- Pre-screen / suitability → **2.3.1.6 / 3.8.1.1**
- IL4 hosting → **1.11.1.59**; PII/PHI handling → **1.11.1.75**
