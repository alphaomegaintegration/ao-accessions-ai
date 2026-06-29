#!/usr/bin/env python3
"""
demo_runner.py — one-command, repeatable AIE accessions demo, driven by a roster of agents.

Runs CLEAN every time for a client:  reset -> seed -> run -> report.
Compensates for Einstein/Agentforce not being licensed by using external agents that reach
into Salesforce and produce the identical outcome (documents + AI notes + recruiter tasks).

Agents (see agents.md):
  ResetAgent       wipes prior demo data so every run starts clean
  SeedAgent        creates the demo cadet roster (varied medical factors)
  DocumentAgent    completes the full, policy-driven document checklist per factor (idempotent)
  CopilotAgent     writes the AI case summary + drafted applicant request as a Note (Einstein replacement)
  TaskAgent        creates the recruiter follow-up task (the "admin agent")
  Orchestrator     sequences the above and prints the value summary

Deps:  pip install simple-salesforce anthropic
Env:   SF_USERNAME SF_PASSWORD SF_TOKEN [SF_DOMAIN=login|test]  ANTHROPIC_API_KEY
Run:   python demo/demo_runner.py --reset --seed --run --report   # full clean demo
       python demo/demo_runner.py --report                        # just show the value count
       python demo/demo_runner.py --reset                         # tear down demo data only
Add --dry-run to preview without writing.
"""
import os, sys, datetime

# Reuse the package policy table + LLM helper (same folder one level up).
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from agent_runner import FACTOR_DOCS, get_llm_text, SUMMARY_PROMPT  # noqa: E402

# Fixed demo roster — varied factors so the demo shows native Flow + agent coverage.
DEMO_ROSTER = [
    ("Jordan A. Maxwell - National 4-Yr (Cyber)", "ADHD/anxiety medication history"),
    ("Alex Rivera - Green-to-Gold (Cyber)",       "ADHD/anxiety medication history"),
    ("Maria Chen - On-Campus (Nurse)",            "Asthma after age 13"),
    ("David Okafor - National 4-Yr (Cyber)",      "ADHD/anxiety medication history"),
    ("Priya Nair - On-Campus (Aviation)",         "Vision correction (LASIK/PRK)"),
    ("Marcus Hill - Green-to-Gold (Infantry)",    "Prior orthopedic injury or surgery"),
]
DUE = (datetime.date.today() + datetime.timedelta(days=7)).isoformat()

def sf_client():
    from simple_salesforce import Salesforce
    return Salesforce(
        username=os.environ["SF_USERNAME"], password=os.environ["SF_PASSWORD"],
        security_token=os.environ["SF_TOKEN"], domain=os.environ.get("SF_DOMAIN", "login"),
    )

# ---- ResetAgent ----------------------------------------------------------------
def reset(sf, dry):
    docs = sf.query_all("SELECT Id FROM Document_Request__c")["records"]
    cadets = sf.query_all("SELECT Id FROM Cadet_Case__c")["records"]
    print("ResetAgent: deleting %d documents, %d cadets" % (len(docs), len(cadets)))
    if dry:
        return
    for d in docs:
        sf.Document_Request__c.delete(d["Id"])
    for c in cadets:
        sf.Cadet_Case__c.delete(c["Id"])  # also clears their notes/tasks

# ---- SeedAgent -----------------------------------------------------------------
def seed(sf, dry):
    print("SeedAgent: creating %d cadets" % len(DEMO_ROSTER))
    ids = []
    for name, factor in DEMO_ROSTER:
        print("  + %s [%s]" % (name, factor))
        if dry:
            continue
        # Setting Medical_Factor__c fires the native Flow (ADHD path) automatically.
        r = sf.Cadet_Case__c.create({"Name": name, "Medical_Factor__c": factor,
                                      "SF86_Status__c": "Not started"})
        ids.append(r["id"])
    return ids

# ---- DocumentAgent + CopilotAgent + TaskAgent ----------------------------------
def run_agents(sf, dry):
    cadets = sf.query_all(
        "SELECT Id, Name, Medical_Factor__c, SF86_Status__c, Branch__c, Contract_Date__c "
        "FROM Cadet_Case__c WHERE Medical_Factor__c != null")["records"]
    for c in cadets:
        wanted = FACTOR_DOCS.get(c["Medical_Factor__c"], [])
        existing = {r["Name"] for r in sf.query_all(
            "SELECT Name FROM Document_Request__c WHERE Cadet_Case__c='%s'" % c["Id"])["records"]}
        missing = [d for d in wanted if d not in existing]
        print("DocumentAgent: %s -> +%d docs (had %d)" % (c["Name"], len(missing), len(existing)))
        if dry:
            continue
        for d in missing:  # DocumentAgent (idempotent: native Flow may have seeded one)
            sf.Document_Request__c.create({"Name": d, "Cadet_Case__c": c["Id"],
                "Status__c": "Requested", "Predicted__c": True, "Due_Date__c": DUE})
        note = get_llm_text(SUMMARY_PROMPT.format(data=c))      # CopilotAgent
        try:
            import base64
            cn = sf.restful("sobjects/ContentNote", method="POST", json={
                "Title": "AI Case Summary & Next Action (external agent)",
                "Content": base64.b64encode(note.encode()).decode()})
            sf.restful("sobjects/ContentDocumentLink", method="POST", json={
                "ContentDocumentId": cn["id"], "LinkedEntityId": c["Id"], "ShareType": "V"})
        except Exception as e:
            print("    (note skipped: %s)" % e)
        try:
            sf.Task.create({"Subject": "Send document request to %s" % c["Name"],
                            "WhatId": c["Id"], "Priority": "High", "ActivityDate": DUE})  # TaskAgent
        except Exception as e:
            print("    (task skipped: %s)" % e)

# ---- Orchestrator + report -----------------------------------------------------
def report(sf):
    n = sf.query("SELECT COUNT() FROM Document_Request__c WHERE Predicted__c=true")["totalSize"]
    cadets = sf.query("SELECT COUNT() FROM Cadet_Case__c")["totalSize"]
    print("\n=== VALUE METER ===")
    print("%d cadets | %d AI-generated documents (each = a back-and-forth cycle eliminated)" % (cadets, n))

def main(argv):
    dry = "--dry-run" in argv
    do_all = not any(f in argv for f in ("--reset", "--seed", "--run", "--report"))
    sf = None if dry and "--report" not in argv else sf_client()
    if dry: sf = sf_client()
    if do_all or "--reset" in argv:  reset(sf, dry)
    if do_all or "--seed" in argv:   seed(sf, dry)
    if do_all or "--run" in argv:    run_agents(sf, dry)
    if do_all or "--report" in argv: report(sf)
    print("Done. Guardrail: humans approve sends; no AI eligibility/suitability/clearance decisions.")

if __name__ == "__main__":
    main(sys.argv[1:])
