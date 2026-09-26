---
name: Aditya Mittal
description: A portfolio set as a passing test run. Every claim is an assertion with its receipt attached.
colors:
  report-paper: "#f1f2ee"
  report-sheet: "#fafaf8"
  report-ink: "#15171a"
  ink-secondary: "#464b52"
  ink-tertiary: "#5e636b"
  hairline: "#d9dbd5"
  hairline-strong: "#b8bbb4"
  pass-green: "#157a3a"
  pass-wash: "#dcefe1"
  pass-rule: "#9fd1ae"
  skip-amber: "#9a4d0b"
  skip-wash: "#f5e7d4"
  graphite-paper: "#111315"
  graphite-sheet: "#171a1c"
  graphite-ink: "#e8eae5"
  graphite-ink-secondary: "#b4b9b1"
  graphite-ink-tertiary: "#8f948d"
  graphite-hairline: "#272b2e"
  graphite-hairline-strong: "#394044"
  graphite-pass-green: "#52c77a"
  graphite-pass-wash: "#13301f"
  graphite-pass-rule: "#24583a"
  graphite-skip-amber: "#e3a458"
  graphite-skip-wash: "#3a2a16"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 1.6rem + 4.6vw, 5.25rem)"
    fontWeight: 650
    lineHeight: 0.98
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.05rem + 1.3vw, 2rem)"
    fontWeight: 450
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.2rem + 1.8vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title-sm:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  body-lg:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  identifier:
    fontFamily: "Martian Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 75"
  numeral:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "clamp(2.25rem, 1.5rem + 2.6vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.05em"
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 112.5"
rounded:
  segment: "2px"
  key: "4px"
  tag: "6px"
  control: "8px"
  attachment: "10px"
  panel: "12px"
  pill: "14px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  measure: "1200px"
  toolbar: "60px"
  row: "clamp(32px, 4vw, 48px)"
  section: "clamp(56px, 7vw, 96px)"
  panel: "24px"
  cluster: "12px"
  chip-gap: "6px"
components:
  button-primary:
    backgroundColor: "{colors.report-ink}"
    textColor: "{colors.report-paper}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "color-mix(in srgb, #15171a 86%, #f1f2ee)"
    textColor: "{colors.report-paper}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.report-ink}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.report-sheet}"
  tag:
    backgroundColor: "{colors.report-sheet}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.identifier}"
    rounded: "{rounded.tag}"
    padding: "0 8px"
    height: "24px"
  status-open:
    backgroundColor: "{colors.pass-wash}"
    textColor: "{colors.pass-green}"
    rounded: "{rounded.pill}"
    padding: "0 12px 0 10px"
    height: "28px"
  status-mark-passed:
    backgroundColor: "{colors.pass-wash}"
    textColor: "{colors.pass-green}"
    size: "20px"
  status-mark-skipped:
    backgroundColor: "{colors.skip-wash}"
    textColor: "{colors.skip-amber}"
    size: "20px"
  proof-link:
    backgroundColor: "{colors.pass-wash}"
    textColor: "{colors.pass-green}"
    rounded: "{rounded.tag}"
    padding: "0 8px"
    height: "24px"
  toolbar-tab:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.tag}"
    padding: "0 10px"
    height: "34px"
  toolbar-tab-hover:
    backgroundColor: "{colors.report-sheet}"
    textColor: "{colors.report-ink}"
  run-summary-panel:
    backgroundColor: "{colors.report-sheet}"
    textColor: "{colors.report-ink}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel}"
  console:
    backgroundColor: "{colors.report-sheet}"
    textColor: "{colors.report-ink}"
    typography: "{typography.identifier}"
    rounded: "{rounded.panel}"
    width: "640px"
---

# Design System: Aditya Mittal

## Overview

**Creative North Star: "The Passing Run"**

The page is a test report that has just finished green. Ink sits on report paper, rows sit on hairline rules, and every claim is written as an assertion with its receipt beside it: a number, a named fix or a link. The system borrows its grammar from real test tooling (status marks, suites, pass counts, @tag chips, a trace waterfall, an environment table) and uses it straight, without costume. It exists to refuse the dark "hero, avatar, glow, project cards" developer portfolio.

Density is that of a report meant to be read closely and also skimmed: large type for the name, the thesis and three oversized numerals, then compact ruled rows beneath them that reward the deep read. Light mode is the base, a report open on a desk in daylight. Dark mode is the same report in a dark room (graphite paper, pale ink), not a second brand. There is one authored motion moment: on load the run plays once on a single clock, and the page is fully correct without it.

This language was derived from the direction contract and PRODUCT.md, not from a user interview.

**Key Characteristics:**
- Cool off-white report paper (graphite in dark) with near-black ink; no gradients, glows or photographic hero.
- Pass-green is the only saturated colour and is spent only on proof. Amber appears only for a genuinely skipped case.
- Archivo carries all prose, headings and labels. Martian Mono carries identifiers and data only: narrow (75% width) for identifiers, widest and heaviest (112.5% width, 700) for livery numerals.
- Hairline-ruled rows are the default container. Cards are reserved for four objects: the run summary panel, screenshot attachments, the trace figure and the command console.
- One clock drives one load-run moment; everything renders in its passed state with no JS or with reduced motion.

## Colors

A near-achromatic report palette with one saturated signal that means "proven".

### Primary
- **Pass Green** (pass-green; graphite-pass-green in dark): pass marks, receipts, pass counts, the progress bar, the availability flag, the console prompt, the focus ring and the hover state of an assertion's numeral. It is never used for decoration, headings or brand accents.
- **Pass Wash** and **Pass Rule** (pass-wash, pass-rule): the tinted fill and 1px inset ring that sit behind pass-green in status marks, the "open to internships" pill, proof links and the copied state of the copy button. Pass wash is also the text selection colour.

### Secondary
- **Skip Amber** (skip-amber, with skip-wash): only for cases whose real status is skipped (the skipped total, a skipped bar segment, a skipped status mark, a lab row without a public link). It is not a warning or highlight colour.

### Neutral
- **Report Paper** (report-paper / graphite-paper): the page ground and the browser theme colour.
- **Report Sheet** (report-sheet / graphite-sheet): one step lifted from the ground; cards, tags, hover fills, the About band.
- **Report Ink** (report-ink / graphite-ink): headings, body copy and the primary button fill.
- **Ink Secondary** (ink-secondary): supporting prose, step lists, descriptions, tab text.
- **Ink Tertiary** (ink-tertiary): meta lines, table keys, captions, axis labels. It passes WCAG AA on both paper and sheet.
- **Hairline** (hairline): row rules, card inset borders, gridlines.
- **Hairline Strong** (hairline-strong): section-head rules, secondary button borders, keycap borders, chart axes.

### Named Rules
**The Colour Is Proof Rule.** Pass-green appears only where something has been verified. If an element isn't a mark, a receipt, a count or a focus ring, it's ink.

**The Honest Skip Rule.** Amber is used only for a case that is actually skipped. Never use it to add warmth or variety.

**The Same Report Rule.** Dark mode swaps values, not roles. Every token has a graphite twin with the same job.

## Typography

**Display / Body Font:** Archivo (variable, width axis) with ui-sans-serif, system-ui fallback
**Identifier / Numeral Font:** Martian Mono (variable, width axis) with ui-monospace fallback

**Character:** Archivo is a sturdy report grotesque that sets the voice at every size, tightly tracked in display. Martian Mono has two roles: at its narrowest it sets file names and tags at the same visual weight as the surrounding prose, and at its widest and heaviest it gives the headline figures the look of numbers stencilled on a machine. Archivo replaced Geist during the build after the detector flagged Geist as an overused default.

### Hierarchy
- **Display** (650, fluid 44–84px, 0.98): the name in the run header, and nowhere else.
- **Headline** (450, fluid 22–32px, 1.2, max 22ch): the one-line thesis under the name. The About lead and contact heading are close siblings (500–600 weight, same scale range).
- **Title** (600, fluid 28–40px, 1.1): suite headings (Work, Experience, Lab, Environment, About).
- **Title Small** (600, fluid 24–32px, 1.1): case titles and company names inside a suite.
- **Body** (400, 16px, 1.6) and **Body Large** (17px, 1.55, max 48–52ch): prose, summaries, descriptions. Step lists run at 15px in ink-secondary, capped at 72ch.
- **Label** (400–500, 13–15px, sentence case, Archivo): meta lines, table keys, captions, button text. Labels are never mono and never uppercase-tracked.
- **Identifier** (Martian Mono at 75% width, 11–13px, -0.01em): file names, suite names, @tags, keycaps, tab counts, chart axes, the console.
- **Numeral** (Martian Mono, 700, 112.5% width, fluid 36–60px, tabular): the three headline assertions and the run totals. A 22px size of the same cut is used inside the trace figure.

### Named Rules
**The Mono Means Data Rule.** Mono is only for identifiers, file names and data. A heading, a label or a sentence set in mono is a defect.

**The Livery Numeral Rule.** Oversized figures are always Martian Mono at 112.5% width and weight 700 with tabular numerals, and each one carries its source beside it.

## Layout

A single centred column with a 1200px measure and a fluid gutter (16px on phones, 40px at most). The sticky toolbar is 60px. Below 860px the anchor tabs move to a second 44px row that scrolls sideways, and the scroll offset grows to match.

Sections follow report order: run header, then the suites (Work, Environment, Lab, Experience), then About and Contact. Each suite opens with a header row: title on the left, mono pass result and meta on the right, with a strong hairline beneath. Section spacing is fluid (56–96px) and rows inside a suite breathe at 32–48px.

Grids are asymmetric: the run header is 7fr / 5fr (copy / summary panel); Work cases are text plus a 520px attachment; Experience is a 300px sticky fact column beside the wide work column; Lab rows are a dense four-column line (mark, cover, text, link). Every multi-column layout collapses to one column by 960px or earlier, and the indented step trees drop their 42px indent below 560px.

## Elevation & Depth

Mostly flat, with depth from tone and hairlines. The ground is paper; a card is a sheet one tone lighter with a 1px inset ring. Only three objects add a cast shadow: the run summary panel and screenshot attachments use the soft ambient shadow, and the command console, the only overlay, uses the large shadow over a scrim. The About section is a full-width sheet-toned band between two hairlines, which is tonal layering rather than elevation.

### Shadow Vocabulary
- **Sheet** (`0 1px 2px rgb(21 23 26 / 0.06), 0 8px 24px -12px rgb(21 23 26 / 0.18)`): run summary panel and screenshot attachments.
- **Overlay** (`0 2px 6px rgb(21 23 26 / 0.08), 0 24px 60px -20px rgb(21 23 26 / 0.35)`): the command console only.
- In dark mode the same two roles use black at higher opacity (0.4/0.6 and 0.45/0.75).

### Named Rules
**The Rules Before Cards Rule.** A row on a hairline is the default container. A card is only earned by an object that is a document in its own right: the run summary, an attachment, the trace figure or the console.

## Shapes

Gently rounded and consistent. Controls are 8px, tags and tabs 6px, attachments 10px, and the large panels (run summary, trace figure, console) 12px. Keycaps are 4px with a 2px bottom border so they read as physical keys. Status marks and the availability dot are full circles, and progress bar segments are nearly square (2px). Borders are drawn as 1px inset box-shadows on cards and as real 1px borders on rows. There are no clipped corners, notches or decorative shapes.

## Components

### Buttons
Two weights in one family, confident and plain.
- **Shape:** gently rounded (8px), 44px minimum height, 18px side padding, 15px Archivo at weight 500.
- **Primary:** ink fill with paper text ("Download resume"). On hover the fill mixes 14% toward paper.
- **Secondary:** transparent with a strong hairline border and ink text. On hover it takes a sheet fill and an ink-tertiary border.
- **Press:** every button squashes to scale(0.97) with the ease-out curve over 160ms.
- **Focus:** a 2px pass-green outline at a 3px offset, site-wide.

### Chips
- **@tag:** a sheet fill with a 1px hairline border, 6px radius, 24px high, set as an identifier (Martian Mono at 75% width, 11.5px) in ink-secondary. Tags are labels and are never interactive.
- **Proof link:** the same geometry in pass-wash with a pass-rule ring and pass-green text. It is the receipt on an environment row.
- **Availability pill:** 28px, 14px radius, pass-wash with a pass-rule ring, a 7px pass-green dot and the text "open to internships". It is the only dot on the page because it is a real status flag.

### Cards / Containers
- **Report row (default):** no fill, and a 1px hairline under each row. A suite's first row sits under a strong hairline.
- **Run summary panel:** sheet, 12px radius, 24px padding (20px on phones), hairline inset ring plus the sheet shadow.
- **Attachment:** sheet, 10px radius, a 36px bar with the file name and a pass-green "live" marker, and a 16:10 screenshot that scales to 1.02 on case hover.
- **Trace figure:** sheet, 12px radius, hairline inset ring and no cast shadow.

### Navigation
- **Toolbar:** sticky, paper-toned, with a hairline that appears only after scroll. It holds the name (600, 15px), anchor tabs with mono counts, then console, GitHub, theme and a compact resume button.
- **Tabs:** 34px, ink-secondary, and sheet on hover. The active tab gets a 2px ink bar on the toolbar's baseline, like a report's status filter.
- **Mobile:** tabs move to their own sideways-scrolling row with edge fades, and the console trigger is hidden on touch devices.

### Status Mark (signature)
A 20px (or 28px) circle with a bold Phosphor check for passed or a minus for skipped, in the wash colour with a 1px inset ring. It prefixes every assertion, case and lab row and is labelled for assistive tech.

### Headline Assertion Row (signature)
A three-column ruled row: status mark, livery numeral, then the claim with its source and an evidence link. On hover the numeral turns pass-green and the evidence link nudges down 2px. On narrow screens the numeral stacks above the claim.

### Trace Waterfall (signature)
An SVG figure that draws 96 sequential spans in ink-secondary as a staircase, then the 2 batched spans in pass-green. It plays once on arrival (14ms per span, 240ms ease-out). Illustrative timing is labelled as such.

### Command Console
Opened with `/` or Cmd/Ctrl+K. A 640px sheet over a scrim, 12px radius, overlay shadow, set entirely in mono with a pass-green prompt. It opens and closes instantly, with no animation, because it is summoned from the keyboard and used repeatedly.

### Motion
One clock: a 90ms tick with a 250ms start. On load the bar segments fill tick by tick, the totals count up as CSS counters, and the assertions settle and their marks flip from pending to passed on the same beat, once. Easing is `cubic-bezier(0.23, 1, 0.32, 1)` for entrances and 150–200ms plain ease for colour changes. Under `prefers-reduced-motion`, or without JS or CSS, the run is already complete.

## Do's and Don'ts

### Do:
- **Do** attach a receipt (number, named fix or link) to every claim, and give every oversized numeral its source.
- **Do** keep pass-green for proof only: marks, counts, receipts, the progress bar, the focus ring.
- **Do** use hairline-ruled rows as the container; reach for a card only for the run summary, an attachment, the trace figure or the console.
- **Do** set identifiers, file names, @tags, keycaps and counts in Martian Mono at 75% width, and headline figures in Martian Mono at 112.5% width, weight 700, tabular.
- **Do** check every text token for WCAG AA against both paper and sheet in both themes.
- **Do** make every animation render its final state without JS and under reduced motion, and drive the load moment from one clock.

### Don't:
- **Don't** add a second saturated colour, gradient, glow or neon accent. Amber is for skipped cases only.
- **Don't** set headings, labels or prose in mono, and don't use uppercase tracked labels.
- **Don't** put kickers or eyebrows above headings; a suite header's meta sits on the right of its rule.
- **Don't** wrap content in card stacks; nested cards and bordered tiles for every item break the report.
- **Don't** add an avatar, portrait, hero glow or dark-by-default "developer" hero.
- **Don't** animate the command console open or closed, and don't add a second choreographed moment to the load run.
- **Don't** introduce fonts other than Archivo and Martian Mono (Geist was removed as an overused default).
