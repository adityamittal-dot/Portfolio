---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

## Scope
Home page `/` of the portfolio (single-page site). Visitor mode: Experience (the work leads), with a Persuade obligation: role, availability, resume and contact must be findable within seconds.

## Audience and job
Hiring engineers and founders reading closely, plus recruiters skimming for about 30 seconds (weighted equally). Job: decide whether to interview. Action: download the resume or get in touch.

## Direction contract
THESIS: The portfolio is a passing test run. Every claim is an assertion with a receipt attached (a number, a named fix, a link). It refuses the dark "hero + avatar + glow + project cards" developer portfolio.
OWN-WORLD: The ground is report paper, cool off-white in light mode and graphite in dark. Ink is near-black. Pass-green is the only saturated colour and is spent only on receipts and pass marks; amber marks a real skipped state. Report rows sit on hairline rules. Tags use the @tag chip form. Mono is used for identifiers, file names and data only. Archivo carries prose and headings. It replaced Geist during the build after the detector flagged Geist as an overused default; Archivo is a sturdy report grotesque with a width axis. Martian Mono carries identifiers at its narrowest width (75%) and the oversized numerals at its widest (112.5%).
STORY: The visitor sees a run header naming Aditya, his role and "open to internships" as the run status. They read three proven assertions with oversized numerals, scan the suites (work, experience, lab), open the trace of the 96-to-2 fix, then download the resume or copy the email.
FIRST VIEWPORT: The toolbar holds the name, anchor tabs with counts (work 4, experience 2, lab 3), GitHub, theme and resume. Below it sit the run header (status line, name at display scale, a one-line thesis, subtext of 20 words or fewer, a primary "Download resume" CTA and a secondary "See the work"), then the run summary: a progress bar and the three headline assertions, each with an oversized numeral and a source.
FORM: The Test Report, #5 on the ordered grounded list (datasheet, postmortem, observability trace, PR diff, test report, oscilloscope, technical drawing). Seed key 4babcf1b. Borrowed: the Datasheet's environment table and performance graph; the Explainer Zine's drawn mechanism (the 96→2 trace waterfall); colour reserved for proof; one clock; livery numerals; provenance on every row.
SIGNATURE: On load the run plays once: the assertions tick from pending to passed on one clock and the counts settle. It is fully rendered without JS and with reduced motion. The 96→2 trace waterfall collapses 96 sequential spans into 2 when it scrolls into view.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Constraints
Static export only. Both themes stay working. The command palette (/ and Cmd/Ctrl+K) and the console greeting are kept. No invented metrics or timings: illustrative timing is labelled, while call counts are real. No placeholders or dead links.
