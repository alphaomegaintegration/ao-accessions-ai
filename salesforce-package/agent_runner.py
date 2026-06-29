#!/usr/bin/env python3
"""
agent_runner.py — headless external agent that automates the AIE accessions package.

Compensates for Einstein/Agentforce not being licensed: it reaches into Salesforce via the
REST API, applies the factor->document matrix, and writes AI-generated case notes back.

Reference implementation / skeleton. Configure credentials and an LLM before running.
Deps:  pip install simple-salesforce anthropic
Env:   SF_USERNAME SF_PASSWORD SF_TOKEN  (and optionally SF_DOMAIN=login|test)
       ANTHROPIC_API_KEY
Run:   python agent_runner.py            # process cadets needing automation
       python agent_runner.py --dry-run  # show actions without writing
"""
import os, sys, datetime

# Factor -> documents (mirrors flow-logic.md). Extend freely; this is the "policy table".
FACTOR_DOCS = {
    "ADHD/anxiety medication history": [
        "Pharmacy records (7-yr history)",
        "Prescribing provider notes & treatment dates",
        "Statement of current functioning (med-free period)",
        "School accommodation records (if any)",
    ],
    "Asthma after age 13": [
        "Pulmonary function test (PFT)",
        "Provider treatment history (asthma)",
        "Methacholine challenge test (if required)",
    ],
    "Prior orthopedic injury or surgery": [
        "Operative report", "Imaging (X-ray/MRI)",
        "Physical therapy notes", "Range-of-motion exam",
    ],
    "Vision correction (LASIK/PRK)": [
        "Surgical operative report", "Pre/post-op visual acuity", "Surgeon clearance letter",
    ],
}

SUMMARY_PROMPT = (
    "You are assisting Army accessions staff. From the Cadet fields below, write a 4-6 line "
    "case summary (path/branch, cycle stage, SF-86 status, days to the 60-day SECRET window "
    "from Contract Date, outstanding documents, single next best action). Then a short, "
    "courteous DRAFT applicant message requesting the outstanding documents, clearly marked "
    "as a draft for staff review. Do not fabricate applicant answers; make no eligibility, "
    "suitability, or clearance determination.\n\nCadet data:\n{data}"
)

def get_llm_text(prompt: str) -> str:
    """Generate the AI note text. Replace with your governed/in-boundary model."""
    try:
        import anthropic
        client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
        msg = client.messages.create(
            model="claude-sonnet-4-6", max_tokens=600,
            messages=[{"role": "user", "content": prompt}],
        )
        return msg.content[0].text
    except Exception as e:  # offline / not configured -> deterministic fallback
        return "[AI text unavailable: %s] Draft: please provide the outstanding documents." % e

def main(dry_run: bool):
    from simple_salesforce import Salesforce
    sf = Salesforce(
        username=os.environ["SF_USERNAME"], password=os.environ["SF_PASSWORD"],
        security_token=os.environ["SF_TOKEN"], domain=os.environ.get("SF_DOMAIN", "login"),
    )
    due = (datetime.date.today() + datetime.timedelta(days=7)).isoformat()

    # Cadets with a medical factor set. Add a "Needs_Automation__c" flag in production.
    cadets = sf.query(
        "SELECT Id, Name, Medical_Factor__c, SF86_Status__c, Branch__c, Contract_Date__c "
        "FROM Cadet_Case__c WHERE Medical_Factor__c != null"
    )["records"]

    for c in cadets:
        factor = c["Medical_Factor__c"]
        wanted = FACTOR_DOCS.get(factor, [])
        if not wanted:
            continue
        existing = {r["Name"] for r in sf.query(
            "SELECT Name FROM Document_Request__c WHERE Cadet_Case__c='%s'" % c["Id"]
        )["records"]}
        missing = [d for d in wanted if d not in existing]

        print("%s | factor=%s | creating %d docs" % (c["Name"], factor, len(missing)))
        if dry_run:
            continue

        # 1) Documents (full checklist, idempotent)
        for d in missing:
            sf.Document_Request__c.create({
                "Name": d, "Cadet_Case__c": c["Id"],
                "Status__c": "Requested", "Predicted__c": True, "Due_Date__c": due,
            })
        # 2) AI note (Einstein replacement)
        note = get_llm_text(SUMMARY_PROMPT.format(data=c))
        sf.restful("sobjects/ContentNote", method="POST", json={
            "Title": "AI Case Summary & Next Action (external agent)",
            "Content": __import__("base64").b64encode(note.encode()).decode(),
        })  # then link via ContentDocumentLink to c["Id"] (omitted for brevity)
        # 3) Recruiter task
        sf.Task.create({
            "Subject": "Send document request to %s" % c["Name"],
            "WhatId": c["Id"], "Priority": "High", "ActivityDate": due,
        })
    print("Done. Human approves any applicant send; no AI eligibility/clearance decisions.")

if __name__ == "__main__":
    main("--dry-run" in sys.argv)
