# NIFASATH ARCHIVE

An interactive personal portfolio presented as recovered personnel-inspection software from the early 2000s. The preserved X-ray scanner anchors accomplishment records, independent projects, and an evidence-backed capability map.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify

```bash
npm run typecheck
npm run build
```

## Edit portfolio content

All accomplishments, capabilities, projects, organizations, evidence relationships, and external links live in `content/records.ts`. Resume content is sourced from the local canonical CV, while Hermes WebMCP Guard details come from its repository documentation. Unsupported details remain optional rather than inferred. The UI consumes derived inspection records, so source content can change without rewriting rendering modules.

Keyboard shortcuts:

- `Alt+1`, `Alt+2`, `Alt+3`: switch scanner modes
- `Tab` / `Enter`: navigate and open detected objects
- `Escape`: close the focused inspection record

The app respects `prefers-reduced-motion` and converts overlapping desktop windows into mobile bottom sheets below 720px.
