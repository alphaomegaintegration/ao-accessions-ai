# Demo agents — the roster that runs the demo clean, end to end

The demo is automated by a small set of cooperating external agents (orchestrated by
`demo_runner.py`). They reach into Salesforce via API and produce the same outcome a licensed
Einstein/Agentforce org would — so the demo runs identically in any edition, and **clean every
time** for a client.

| Agent | Job | Salesforce action |
|---|---|---|
| **Orchestrator** | Sequences the run, prints the value meter | runs the agents below in order |
| **ResetAgent** | Tears down prior demo data so each run starts pristine | deletes all Document Requests, then Cadet Cases (clears their notes/tasks) |
| **SeedAgent** | Creates the demo roster of cadets across varied factors | inserts Cadet Cases (setting Medical Factor fires the native Flow) |
| **DocumentAgent** | Completes the full, policy-driven document checklist per factor; idempotent | creates missing Document Requests (Predicted=true, Requested) |
| **CopilotAgent** | Einstein replacement: case summary + gap check + drafted applicant request | writes a Note on the cadet (human approves before send) |
| **TaskAgent** | "Admin agent": prepares the recruiter follow-up | creates a High-priority Task on the cadet |

## How it maps to the live + native layers
- **Native automation** (the record-triggered Flow) still fires on seed for ADHD cadets — the
  DocumentAgent is idempotent and only adds what's missing, so native + agent never duplicate.
- **External agents** cover every other factor and produce the AI copilot output the trial
  edition can't — identical end-user result.
- In a fully licensed org, swap CopilotAgent for **Einstein prompt templates** and the
  **Agentforce Accessions Assistant** (see `../einstein-prompt-templates.md`,
  `../agentforce-accessions-assistant.md`); the orchestration is unchanged.

## One-command clean demo
```bash
# from AIE_SF_Package/
export SF_USERNAME=... SF_PASSWORD=... SF_TOKEN=... ANTHROPIC_API_KEY=...
bash demo/run_demo.sh            # reset -> seed -> run agents -> report
python demo/demo_runner.py --report   # value meter only (before/after)
python demo/demo_runner.py --reset    # tear down demo data after the meeting
```
Add `--dry-run` to preview. Guardrail: humans approve every applicant send; agents never make
eligibility, suitability, or clearance determinations (SEAD 4).

## Browser-agent equivalent (no API creds, any edition)
Where you can't run headless, the **Claude for Chrome** agent performs the same steps in the UI
(create cadet -> native Flow seeds a doc -> agent completes the checklist -> writes the Note ->
creates the Task -> refresh the AI-Generated Documents list). This is exactly what was run live
in your-org. Follow `../../AIE_Tip_to_Tail_Demo_Runsheet.md` (90-second click-path).
