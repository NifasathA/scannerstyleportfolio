# NIFASATH ARCHIVE — Design specification

## Reference analysis

The supplied reference is a phone capture of a fictional desktop X-ray application. The useful visual source is the application itself, not the surrounding social-media UI. Its composition is dominated by two translucent suitcases on an almost-white canvas. Saturated pink interiors, cyan/green edge offsets, dense overlapping electronics and organic shapes, thin blue detection rectangles, compact confidence labels, floating cobalt-title-bar windows, and a beveled bottom control deck create its identity. Small condensed type and uneven visual density make it feel like obscure 2002–2006 inspection software rather than a modern dashboard.

The portfolio preserves those properties without copying names, artwork, branding, or people from the reference. The existing two-case X-ray asset is now treated as immutable artwork. Pink is the transmissive material color; green/cyan describe dense edges and traces; cobalt identifies interactive detection and window chrome. Live CSS and HTML layers add restrained scanlines, calibration guides, registration bloom, mode treatment, detection boxes, selection isolation, and interaction without modifying the image.

## Application model

- One persistent scanner surface has three modes: `EXPERIENCE`, `PROJECTS`, and `SYSTEMS`.
- `EXPERIENCE` contains accomplishment records associated with organizations, not employer-first résumé entries.
- `PROJECTS` contains independently built work with architecture, decisions, and explicit limitations.
- `SYSTEMS` is a capability taxonomy whose records link back to professional, project, or education evidence.
- Mode changes remap detection regions, labels, records, status copy, and spectral treatment without replacing the scanner.
- Each region is a real button tightly fitted to a physical object. Hover/focus highlights its detection box; activation selects the object, dims surrounding scan noise, updates the live inspection console, and opens an inspection report.
- The right console has a subject/queue state and a selected-record state with previous/next object navigation and a full-report action.
- Reports are desktop windows with close/minimize/focus/z-order and pointer dragging. Below 720px they become fixed, scrollable sheets.
- Startup runs a short non-blocking beam/detection sequence. It can be skipped, rerun, and is disabled by reduced-motion preference.
- The contact/exit terminal is an actual record available from the title bar and bottom deck.

## Component architecture

- `SecurityTerminal`: application state, warning sequence, record navigation, and mode orchestration.
- `ScannerViewport` / `ScannerScene`: persistent scan field, optimized `scanner-xray-v11.webp` asset, and live spectral treatment.
- `DetectionOverlay` / `InspectableObject`: accessible object controls and categorical scanner labels.
- `ModeSwitcher` / `StatusBar`: functional scan controls and system feedback.
- `WindowManager` / `InspectionWindow`: records, dragging, focus, minimize, and mobile sheet behavior.
- `StartupSequence`: skippable startup state and scanning beam.
- `content/records.ts`: normalized accomplishments, capabilities, projects, organizations, evidence relationships, external links, and a single derived inspection-record interface.

## Responsive and accessibility behavior

Desktop prioritizes the scanner and allows overlapping floating windows. Mobile keeps the scanner identity but moves reports into a readable bottom sheet, enlarges targets, and collapses secondary telemetry. All object regions are keyboard buttons with visible focus rings; modes use a tab-like control; Escape closes the focused report; substantive copy uses high-contrast readable type. Motion is transform/opacity based and removed under `prefers-reduced-motion`.

