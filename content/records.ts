export type ScannerMode = "EXPERIENCE" | "PROJECTS" | "SYSTEMS";
export type RecordKind = "ACCOMPLISHMENT" | "PROJECT" | "CAPABILITY" | "BACKGROUND" | "CLEARANCE";
export type EvidenceScope = "PROFESSIONAL" | "PERSONAL PROJECT" | "EDUCATION";

export type ScanRegion = { x: number; y: number; w: number; h: number };
export type ExternalLink = { id: string; label: string; href: string; external?: boolean };

export type Organization = {
  id: string;
  name: string;
  role: string;
  period?: string;
  location?: string;
  type: "EMPLOYER" | "EDUCATION";
};

export type Accomplishment = {
  id: string;
  slug: string;
  code: string;
  title: string;
  summary: string;
  context: string;
  built: string;
  approach: string;
  outcome?: string;
  technologies: string[];
  capabilityIds: string[];
  organizationId: string;
  object: string;
  region: ScanRegion;
};

export type Project = {
  id: string;
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  summary: string;
  problem: string;
  built: string;
  approach: string;
  decisions: string;
  limitations: string;
  outcome?: string;
  technologies: string[];
  capabilityIds: string[];
  links?: ExternalLink[];
  object: string;
  region: ScanRegion;
};

export type Capability = {
  id: string;
  slug: string;
  code: string;
  title: string;
  summary: string;
  areas: string[];
  technologies: string[];
  evidenceIds: string[];
  object: string;
  region: ScanRegion;
};

export type InspectionRecord = {
  id: string;
  slug: string;
  mode: ScannerMode | "GLOBAL";
  kind: RecordKind;
  code: string;
  title: string;
  subtitle: string;
  category: string;
  classification: string;
  object: string;
  summary: string;
  problem?: string;
  built?: string;
  approach?: string;
  decisions?: string;
  limitations?: string;
  outcome?: string;
  technologies: string[];
  association?: string;
  scope?: EvidenceScope;
  evidence?: { id: string; title: string; association: string; scope: EvidenceScope }[];
  links?: ExternalLink[];
  region: ScanRegion;
};

export const organizations: Organization[] = [
  { id: "agilent", name: "Agilent Technologies", role: "Senior Software R&D Engineer", period: "Jan 2023 – Present", location: "Wilmington, DE", type: "EMPLOYER" },
  { id: "cerebras", name: "Cerebras Systems", role: "Member of Technical Staff", period: "Mar 2021 – Aug 2022", location: "Sunnyvale, CA", type: "EMPLOYER" },
  { id: "ibm", name: "IBM", role: "Associate System Engineer", period: "Sept 2018 – May 2019", location: "Bangalore, India", type: "EMPLOYER" },
  { id: "cmu", name: "Carnegie Mellon University", role: "MS Software Engineering — Scalable Systems", period: "Dec 2020", location: "Pittsburgh, PA", type: "EDUCATION" },
  { id: "anna", name: "Anna University", role: "BTech Information Technology — Honor Roll", period: "May 2018", location: "Chennai, India", type: "EDUCATION" },
];

export const accomplishments: Accomplishment[] = [
  {
    id: "retrieval-platform",
    slug: "retrieval-systems",
    code: "RETR-SYS",
    title: "Retrieval That Holds Up in Production",
    summary: "I built semantic retrieval infrastructure for engineering workflows across more than 50,000 technical documents.",
    context: "Search had to turn a large, uneven document collection into results engineers could actually find and trust.",
    built: "I implemented ingestion, chunking, embedding generation, vector indexing, search APIs, and tooling to analyze retrieval quality and regressions.",
    approach: "I compared chunking and ranking strategies before deployment and kept evaluation close to the retrieval pipeline so changes could be measured.",
    outcome: "Served searchable engineering knowledge across 50K+ technical documents.",
    technologies: ["Python", "Vector retrieval", "Embeddings", "Semantic search", "Retrieval evaluation"],
    capabilityIds: ["ai-applications", "model-evaluation", "retrieval-search", "data-experimentation"],
    organizationId: "agilent",
    object: "Evidence archive",
    region: { x: 23, y: 8, w: 17, h: 27 },
  },
  {
    id: "async-workflows",
    slug: "async-api-reliability",
    code: "ASYNC-OPS",
    title: "Reliable Async AI Workflows",
    summary: "I built Python services that move long-running AI and telemetry work out of synchronous request paths.",
    context: "Important work could outlive an HTTP request, arrive in bursts, or fail halfway through execution.",
    built: "I implemented APIs, asynchronous workers, batching, retries, and queue-based processing on containerized AWS infrastructure.",
    approach: "I separated request handling from durable execution and made retry and recovery behavior explicit instead of hiding it inside API handlers.",
    outcome: "The résumé reports an approximately 40% throughput improvement.",
    technologies: ["Python", "Async workers", "Queues", "REST APIs", "AWS", "Containers"],
    capabilityIds: ["ai-applications", "backend-distributed", "reliability-observability"],
    organizationId: "agilent",
    object: "Cooled server module",
    region: { x: 39, y: 8, w: 15, h: 26 },
  },
  {
    id: "workflow-observability",
    slug: "workflow-observability",
    code: "OPS-TRACE",
    title: "Make Failures Explain Themselves",
    summary: "I added the instrumentation and recovery paths needed to operate distributed production workflows.",
    context: "A failed workflow was not useful unless an engineer could find where it failed, understand why, and recover it safely.",
    built: "I connected centralized logs, metrics, traces, alerts, and automated recovery to workflow execution state.",
    approach: "Operational signals carried workflow context so failures could be traced across services and retried with enough information to diagnose the original cause.",
    outcome: "The résumé reports approximately 60% lower incident-resolution time.",
    technologies: ["Logging", "Metrics", "Tracing", "Alerting", "Automated recovery"],
    capabilityIds: ["backend-distributed", "reliability-observability"],
    organizationId: "agilent",
    object: "Displaced charger + cable",
    region: { x: 50, y: 79, w: 11, h: 11 },
  },
  {
    id: "ml-experiment-infra",
    slug: "distributed-ml-experiments",
    code: "ML-ORCH",
    title: "Reproducible Distributed ML Experiments",
    summary: "I built infrastructure to schedule, track, validate, and reproduce distributed ML experiments.",
    context: "Researchers needed shorter feedback loops without losing the configuration and artifacts required to reproduce a run.",
    built: "I implemented AWS- and Docker-based execution with workload scheduling, artifact tracking, automated validation, rollback support, and run management.",
    approach: "Experiment configuration and runtime state were explicit artifacts, which made runs easier to compare, validate, and restore.",
    outcome: "The résumé reports experiment turnaround reduced from hours to under one hour.",
    technologies: ["AWS", "Docker", "Distributed execution", "Artifact tracking", "Validation"],
    capabilityIds: ["backend-distributed", "developer-tooling", "data-experimentation"],
    organizationId: "cerebras",
    object: "Compute board",
    region: { x: 26, y: 48, w: 17, h: 29 },
  },
  {
    id: "model-regression",
    slug: "model-regression-testing",
    code: "REG-CHECK",
    title: "Catch Model Regressions Before Release",
    summary: "I built repeatable checks for model behavior and tooling to investigate performance changes in distributed workloads.",
    context: "A model or runtime change could improve one path while quietly breaking correctness or shifting memory, I/O, and compute costs elsewhere.",
    built: "I built benchmarking and regression workflows alongside telemetry analysis for distributed training bottlenecks.",
    approach: "I compared model quality and runtime behavior across reproducible runs instead of treating benchmark scores and systems telemetry as separate problems.",
    technologies: ["Model evaluation", "Regression testing", "Telemetry", "Benchmarking", "Performance analysis"],
    capabilityIds: ["model-evaluation", "reliability-observability", "data-experimentation"],
    organizationId: "cerebras",
    object: "Headphones + sensors",
    region: { x: 41, y: 49, w: 16, h: 21 },
  },
  {
    id: "streaming-pipelines",
    slug: "enterprise-streaming-pipelines",
    code: "STREAM-50G",
    title: "Streaming Data Without Slowing Analytics",
    summary: "I built Kafka pipelines that processed more than 50GB of enterprise data each day and tuned the SQL paths that consumed it.",
    context: "Ingestion had to remain steady while downstream analytics needed lower and more predictable latency.",
    built: "I implemented distributed Kafka ingestion and optimized SQL-backed analytics workflows.",
    approach: "I treated the stream and its downstream query path as one system, then tuned the handoff between ingestion and analytics.",
    outcome: "The résumé reports approximately 30% lower downstream analytics latency.",
    technologies: ["Kafka", "SQL", "Streaming data", "Distributed services"],
    capabilityIds: ["backend-distributed", "reliability-observability", "data-experimentation"],
    organizationId: "ibm",
    object: "Memory + cable array",
    region: { x: 69, y: 83, w: 15, h: 9 },
  },
  {
    id: "cmu-scalable-systems",
    slug: "scalable-systems-cmu",
    code: "EDU-CMU",
    title: "Scalable Systems Graduate Work",
    summary: "MS in Software Engineering — Scalable Systems at Carnegie Mellon University.",
    context: "Graduate study focused on engineering software systems at scale.",
    built: "Academic and capstone work, including an adaptive reinforcement-learning agent with Lockheed Martin listed in the résumé as patent pending.",
    approach: "Software-engineering practice applied to scalable systems and machine-learning work.",
    technologies: ["Scalable systems", "Software architecture", "Machine learning"],
    capabilityIds: ["ai-applications", "backend-distributed", "data-experimentation"],
    organizationId: "cmu",
    object: "Keyboard matrix",
    region: { x: 40, y: 67, w: 23, h: 18 },
  },
];

export const projects: Project[] = [
  {
    id: "hermes",
    slug: "hermes-webmcp-guard",
    code: "WEB-MCP",
    title: "Hermes WebMCP Guard",
    subtitle: "Permission-aware website capabilities for Hermes Agent",
    summary: "I built a Hermes Agent plugin that can use website-provided WebMCP tools without treating a web page as trusted infrastructure.",
    problem: "A website can change its tools, schemas, origin, or document state between discovery and execution. Agent approval has to remain bound to the exact action the user reviewed.",
    built: "I wrapped Chrome's native WebMCP CDP transport with fixed connection, discovery, execution, and disconnect operations plus audit logging, redaction, and bypass detection.",
    approach: "Configured endpoints and allowed origins constrain discovery. Strict schemas, document-bound capability IDs, bounded execution, safe revocation, and one-call approvals constrain use.",
    decisions: "The model can select only configured endpoints. Origin or schema changes fail closed. Approvals bind to owner, call, capability, and canonical arguments, then are consumed once.",
    limitations: "WebMCP remains experimental. The plugin uses an explicit browser connection because the documented Hermes supervisor path lacks the authoritative event subscription required by this adapter.",
    outcome: "The repository documents verified Python and Raspberry Pi 5 live-browser flows with Hermes 0.23.1 and Chromium Shell 156.",
    technologies: ["Python", "WebMCP", "Chrome CDP", "JSON Schema", "pytest", "WebSocket"],
    capabilityIds: ["ai-applications", "developer-tooling", "reliability-observability"],
    links: [{ id: "hermes-github", label: "GitHub", href: "https://github.com/NifasathA/hermes-webmcp-guard", external: true }],
    object: "iPod + perfume + watch cable cluster",
    region: { x: 11, y: 13, w: 18, h: 25 },
  },
  {
    id: "provenance",
    slug: "provenance",
    code: "ADV-EVAL",
    title: "Provenance",
    subtitle: "Adversarial AI agent evaluation",
    summary: "I am exploring how synthetic trajectories and controlled experiments can expose failures in AI-agent behavior.",
    problem: "Agent failures are difficult to compare when every run follows a different path or depends on uncontrolled external state.",
    built: "A controlled evaluation approach built around repeatable adversarial conditions and synthetic trajectories.",
    approach: "Controlled experiment design and synthetic trajectories are supplied project context. Implementation specifics are left unexpanded until repository material is available.",
    decisions: "The archive distinguishes the verified project premise from architecture details that have not yet been supplied.",
    limitations: "No repository, benchmark result, or implementation detail is currently available in the workspace.",
    technologies: ["AI evaluation", "Synthetic trajectories", "Controlled experiments"],
    capabilityIds: ["model-evaluation", "data-experimentation"],
    object: "Evidence archive",
    region: { x: 23, y: 8, w: 17, h: 27 },
  },
  {
    id: "agentdeck",
    slug: "agentdeck",
    code: "AGENT-DECK",
    title: "AgentDeck",
    subtitle: "A physical control surface for live coding-agent sessions",
    summary: "I built an ESP32-S3 desk controller that makes concurrent coding-agent sessions visible and keeps permission decisions physically deliberate.",
    problem: "Multiple agent sessions can be difficult to track, and permission prompts should remain explicit, visible, and human-controlled.",
    built: "I wrote ESP32-S3 firmware, a Python host daemon, a USB serial protocol, and lifecycle hooks that map sessions to a four-tile display and route permission requests to the device.",
    approach: "Agent hooks send events to a loopback-only FastAPI service. The daemon owns session state and emits compact JSON-line updates over USB CDC while the device remains a deliberately simple I/O surface.",
    decisions: "Denial requires a tap while approval requires a deliberate hold. Long commands must be scrolled before approval unlocks, truncated commands are deny-only, and every missing or malformed response falls back to the normal terminal prompt.",
    limitations: "The repository identifies the current build as Phase 0: one physical key, the onboard display, and Claude Code integration. Broader agent support remains future work.",
    outcome: "The documented implementation supports four visible concurrent sessions and includes daemon tests plus a hardware smoke-test procedure.",
    technologies: ["ESP32-S3", "C++", "Python", "FastAPI", "USB CDC", "PlatformIO"],
    capabilityIds: ["ai-applications", "developer-tooling", "reliability-observability"],
    links: [{ id: "agentdeck-github", label: "GitHub", href: "https://github.com/NifasathA/agentdeck", external: true }],
    object: "Handheld control deck",
    region: { x: 57, y: 63, w: 19, h: 23 },
  },
  {
    id: "sentinel",
    slug: "sentinel-forgetting-evaluator",
    code: "FORGET-CANARY",
    title: "Sentinel",
    subtitle: "Catastrophic-forgetting checks for LLM fine-tuning",
    summary: "I built an early-stage evaluator that looks for capability regressions during LLM fine-tuning using versioned canary data and repeatable checkpoint comparisons.",
    problem: "Fine-tuning can improve a target behavior while quietly degrading unrelated knowledge, reasoning, fluency, or instruction-following capabilities.",
    built: "I implemented a framework-independent checkpoint evaluator, versioned canary buckets, result schemas, appendable JSONL logs, and correctness tests for the scoring path.",
    approach: "The evaluator measures token-weighted perplexity only over completion tokens, compares each capability bucket with a baseline, and optionally performs forward-only accuracy checks without requiring text generation.",
    decisions: "Prompt labels are masked from loss, samples are length-grouped into bounded microbatches, canary integrity can be checksum-verified, and CUDA out-of-memory errors return a skipped result instead of crashing training.",
    limitations: "The checked-out repository describes this as Phase 0. The Hugging Face Trainer callback and live training integration are planned but are not yet part of the public package surface.",
    outcome: "The repository includes focused tests for completion-token masking, token-weighted aggregation, canary handling, and result persistence. No benchmark outcome is claimed.",
    technologies: ["Python", "PyTorch", "Transformers", "pytest", "JSONL", "Pydantic"],
    capabilityIds: ["model-evaluation", "data-experimentation", "developer-tooling"],
    links: [{ id: "sentinel-github", label: "GitHub", href: "https://github.com/NifasathA/sentinel", external: true }],
    object: "Lower diagnostic board",
    region: { x: 26, y: 48, w: 17, h: 29 },
  },
];

export const capabilities: Capability[] = [
  { id: "ai-applications", slug: "ai-applications-agents", code: "AI-APP", title: "AI Applications & Agents", summary: "I connect model behavior to dependable APIs, explicit tool boundaries, and backend execution that can survive real usage.", areas: ["Agent workflows", "AI-assisted engineering", "Production APIs", "LLM integration"], technologies: ["Python", "FastAPI", "WebMCP", "REST APIs"], evidenceIds: ["retrieval-platform", "async-workflows", "hermes", "agentdeck"], object: "Cooled GPU board", region: { x: 39, y: 8, w: 15, h: 26 } },
  { id: "model-evaluation", slug: "model-evaluation", code: "MODEL-EVAL", title: "Model Evaluation", summary: "I build repeatable checks for model regressions, retrieval quality, experiment comparisons, and adversarial agent behavior.", areas: ["Regression testing", "Retrieval evaluation", "Benchmarking", "Adversarial testing"], technologies: ["pytest", "Automated scoring", "Experiment comparison", "Telemetry"], evidenceIds: ["model-regression", "retrieval-platform", "provenance", "sentinel"], object: "Evidence papers + storage media", region: { x: 23, y: 8, w: 17, h: 27 } },
  { id: "retrieval-search", slug: "retrieval-search", code: "RETRIEVAL", title: "Retrieval & Search", summary: "I work across ingestion, chunking, embeddings, indexing, ranking, search APIs, and the evaluation needed to tell whether retrieval improved.", areas: ["Chunking", "Embeddings", "Vector indexing", "Reranking", "Semantic search"], technologies: ["Python", "Vector retrieval", "Embedding pipelines", "Search APIs"], evidenceIds: ["retrieval-platform"], object: "iPod + watch cluster", region: { x: 13, y: 20, w: 11, h: 14 } },
  { id: "backend-distributed", slug: "distributed-systems", code: "DIST-SYS", title: "Backend & Distributed Systems", summary: "I build queue-backed workers, streaming pipelines, APIs, and orchestration paths with explicit failure and recovery behavior.", areas: ["Queues and workers", "Async processing", "Streaming data", "Service orchestration"], technologies: ["Python", "Kafka", "AWS", "Docker", "SQL"], evidenceIds: ["async-workflows", "ml-experiment-infra", "streaming-pipelines"], object: "Fan-equipped compute board", region: { x: 26, y: 48, w: 17, h: 29 } },
  { id: "developer-tooling", slug: "developer-tooling", code: "DEV-TOOLS", title: "Developer Tooling", summary: "I turn complicated system behavior into tools that are safer to operate, easier to test, and easier to understand.", areas: ["Agent tooling", "Experiment tooling", "Audit logs", "Internal interfaces"], technologies: ["Python", "CLI workflows", "JSON Schema", "Testing"], evidenceIds: ["hermes", "agentdeck", "sentinel", "ml-experiment-infra"], object: "Mechanical keyboard", region: { x: 40, y: 67, w: 23, h: 18 } },
  { id: "reliability-observability", slug: "reliability-observability", code: "RELIABILITY", title: "Reliability & Observability", summary: "I connect logs, metrics, traces, alerts, recovery, and regression checks to the work a production system is actually performing.", areas: ["Metrics", "Tracing", "Alerting", "Automated recovery", "Regression checks"], technologies: ["Prometheus", "Grafana", "CloudWatch", "Logging"], evidenceIds: ["workflow-observability", "model-regression", "hermes", "agentdeck"], object: "Inspection camera module", region: { x: 81, y: 74, w: 11, h: 15 } },
  { id: "data-experimentation", slug: "data-experimentation", code: "DATA-EXP", title: "Data & Experimentation", summary: "I make experiment inputs, artifacts, comparisons, and evaluation data explicit so results can be reproduced and challenged.", areas: ["Artifact tracking", "Controlled experiments", "Evaluation data", "Streaming pipelines"], technologies: ["Kafka", "SQL", "Experiment tracking", "Benchmarking"], evidenceIds: ["retrieval-platform", "ml-experiment-infra", "streaming-pipelines", "provenance", "sentinel"], object: "Headphones + signal cable", region: { x: 41, y: 49, w: 17, h: 21 } },
  { id: "agent-security", slug: "agent-security-tool-boundaries", code: "AGENT-SAFE", title: "Agent Security & Tool Boundaries", summary: "I design agent-tool integrations around explicit capabilities, constrained discovery, approval boundaries, and audit trails instead of treating tool output as trusted by default.", areas: ["Capability boundaries", "Origin and schema validation", "Single-use approvals", "Audit and redaction"], technologies: ["WebMCP", "Chrome CDP", "JSON Schema", "Python", "pytest"], evidenceIds: ["hermes", "provenance"], object: "Upper adapter + cable junction", region: { x: 10, y: 12, w: 14, h: 8 } },
  { id: "api-async-systems", slug: "api-async-workflows", code: "API-ASYNC", title: "APIs & Asynchronous Workflows", summary: "I separate fast request paths from durable background work, then make batching, retries, recovery, and execution state explicit.", areas: ["API design", "Queues and workers", "Batch processing", "Retries and recovery"], technologies: ["Python", "REST APIs", "Queues", "AWS", "Docker"], evidenceIds: ["async-workflows", "retrieval-platform", "workflow-observability"], object: "Power adapter + routed cable", region: { x: 50, y: 79, w: 11, h: 11 } },
  { id: "performance-scalability", slug: "performance-scalability", code: "PERF-SCALE", title: "Performance & Scalability", summary: "I use workload measurements, controlled comparisons, and system telemetry to find bottlenecks across data pipelines and distributed execution.", areas: ["Throughput and latency", "Bottleneck analysis", "Workload scheduling", "Query-path optimization"], technologies: ["Benchmarking", "Telemetry", "Kafka", "SQL", "Docker"], evidenceIds: ["ml-experiment-infra", "model-regression", "streaming-pipelines", "retrieval-platform"], object: "Old iBook mainboard", region: { x: 60, y: 48, w: 22, h: 21 } },
];

export const externalLinks: ExternalLink[] = [
  { id: "x", label: "𝕏", href: "https://x.com/niferential", external: true },
  { id: "linkedin", label: "LINKEDIN", href: "https://www.linkedin.com/in/nifasath/", external: true },
  { id: "github", label: "GITHUB", href: "https://github.com/NifasathA", external: true },
  { id: "email", label: "EMAIL", href: "mailto:nifasathsa@gmail.com" },
];

const organizationById = new Map(organizations.map(item => [item.id, item]));
const accomplishmentById = new Map(accomplishments.map(item => [item.id, item]));
const projectById = new Map(projects.map(item => [item.id, item]));

function evidenceFor(ids: string[]): NonNullable<InspectionRecord["evidence"]> {
  const evidence: NonNullable<InspectionRecord["evidence"]> = [];
  ids.forEach(id => {
    const accomplishment = accomplishmentById.get(id);
    if (accomplishment) {
      const organization = organizationById.get(accomplishment.organizationId)!;
      evidence.push({ id, title: accomplishment.title, association: organization.name, scope: organization.type === "EDUCATION" ? "EDUCATION" : "PROFESSIONAL" });
      return;
    }
    const project = projectById.get(id);
    if (project) evidence.push({ id, title: project.title, association: "Independent project", scope: "PERSONAL PROJECT" });
  });
  return evidence;
}

function accomplishmentRecord(item: Accomplishment): InspectionRecord {
  const organization = organizationById.get(item.organizationId)!;
  return {
    id: item.id, slug: item.slug, mode: "EXPERIENCE", kind: organization.type === "EDUCATION" ? "BACKGROUND" : "ACCOMPLISHMENT",
    code: item.code, title: item.title, subtitle: organization.name, category: organization.type === "EDUCATION" ? "EDUCATION / BACKGROUND" : "ENGINEERING ACCOMPLISHMENT",
    classification: organization.type === "EDUCATION" ? "ACADEMIC RECORD" : "PROFESSIONAL EVIDENCE", object: item.object,
    summary: item.summary, problem: item.context, built: item.built, approach: item.approach, outcome: item.outcome,
    technologies: item.technologies, association: `${organization.name} — ${organization.role}`, scope: organization.type === "EDUCATION" ? "EDUCATION" : "PROFESSIONAL", region: item.region,
  };
}

function projectRecord(item: Project): InspectionRecord {
  return {
    id: item.id, slug: item.slug, mode: "PROJECTS", kind: "PROJECT", code: item.code, title: item.title, subtitle: item.subtitle,
    category: "INDEPENDENT PROJECT", classification: "PROJECT SIGNATURE", object: item.object, summary: item.summary,
    problem: item.problem, built: item.built, approach: item.approach, decisions: item.decisions, limitations: item.limitations,
    outcome: item.outcome, technologies: item.technologies, association: "Independent project", scope: "PERSONAL PROJECT", links: item.links, region: item.region,
  };
}

function capabilityRecord(item: Capability): InspectionRecord {
  return {
    id: item.id, slug: item.slug, mode: "SYSTEMS", kind: "CAPABILITY", code: item.code, title: item.title,
    subtitle: item.areas.join(" · "), category: "CAPABILITY MAP", classification: "EVIDENCE-BACKED AREA", object: item.object,
    summary: item.summary, approach: `Technical areas: ${item.areas.join(", ")}.`, technologies: item.technologies,
    evidence: evidenceFor(item.evidenceIds), region: item.region,
  };
}

const recordsByMode: Record<ScannerMode, InspectionRecord[]> = {
  EXPERIENCE: accomplishments.map(accomplishmentRecord),
  PROJECTS: projects.map(projectRecord),
  SYSTEMS: capabilities.map(capabilityRecord),
};

export const inspectionRecords = Object.values(recordsByMode).flat();
const recordBySlug = new Map(inspectionRecords.map(record => [record.slug, record]));
const recordById = new Map(inspectionRecords.map(record => [record.id, record]));

export function getModeRecords(mode: ScannerMode): InspectionRecord[] { return recordsByMode[mode]; }
export function getInspectionRecordBySlug(slug: string): InspectionRecord | undefined { return recordBySlug.get(slug); }
export function getInspectionRecordById(id: string): InspectionRecord | undefined { return recordById.get(id); }
export function getRecordPath(record: InspectionRecord): string { return `/inspect/${record.slug}/`; }

export const contactRecord: InspectionRecord = {
  id: "contact", slug: "contact", mode: "GLOBAL", kind: "CLEARANCE", code: "EXIT-01", title: "External Connections",
  subtitle: "Contact and document access", category: "CLEARANCE CHANNEL", classification: "USER-INITIATED CONNECTION", object: "Exit terminal",
  summary: "Contact Nifasath about AI systems, evaluation, distributed infrastructure, developer tooling, or production engineering work.",
  technologies: [], links: externalLinks, region: { x: 0, y: 0, w: 0, h: 0 },
};

export const developerNotesRecord: InspectionRecord = {
  id: "developer-notes", slug: "developer-notes", mode: "GLOBAL", kind: "CLEARANCE", code: "DEV-NOTES", title: "Archive Implementation Notes",
  subtitle: "A technical record hidden behind the status light", category: "INTERNAL DOCUMENTATION", classification: "OPERATOR DISCOVERY", object: "Diagnostic status indicator",
  summary: "This portfolio is a stateful inspection interface rather than a sequence of landing-page sections. The scanner, sidebar, URL, and inspection window all resolve the same record registry.",
  problem: "The interface needed to stay playful without making projects difficult to share, navigate, or read with assistive technology.",
  built: "A typed content registry, URL-restorable inspection state, keyboard-operable detection regions, one active record window, responsive scanner panning, and static record pages for crawlers and social previews.",
  decisions: "The X-ray remains a normal optimized image while semantic buttons sit above it. Record routes are statically generated, query links remain compatible, and reduced-motion users skip decorative scanning movement.",
  outcome: "The result keeps the strange archival interface while exposing ordinary links, headings, metadata, and readable engineering records underneath it.",
  technologies: ["Next.js", "TypeScript", "React", "CSS", "Static export", "Accessible HTML"], region: { x: 0, y: 0, w: 0, h: 0 },
};

export const modeCopy: Record<ScannerMode, { code: string; status: string; note: string; warning: string; alternatives: string[] }> = {
  EXPERIENCE: { code: "ARCHIVE/WORK", status: "accomplishment records", note: "Evidence + associated background", warning: "NOTICE: PRODUCTION EXPERIENCE DETECTED", alternatives: ["MULTIPLE SYSTEMS DEPLOYED IN THE WILD", "FIELD NOTES: SOFTWARE SURVIVED CONTACT WITH REALITY", "HISTORY OF SHIPPING REAL SOFTWARE", "REPEAT OFFENDER: SHIPS TO PRODUCTION", "OPERATOR APPEARS FOND OF EDGE CASES", "REAL USERS DETECTED / SYSTEM REMAINED CALM"] },
  PROJECTS: { code: "ARCHIVE/PROJECTS", status: "independent project records", note: "Architecture + tradeoffs", warning: "WARNING: UNUSUAL LEVELS OF CURIOSITY", alternatives: ["EXPERIMENTAL BUILD PATTERNS DETECTED", "TINY SIDE PROJECT ESCAPED CONTAINMENT", "CURIOSITY LEVELS: ADORABLY NONCOMPLIANT", "ONE MORE EXPERIMENT WAS APPARENTLY NECESSARY", "MANUAL INSPECTION RECOMMENDED / SNACKS OPTIONAL", "WARNING: WIRES MAY BE THINKING"] },
  SYSTEMS: { code: "ARCHIVE/CAP", status: "capability categories", note: "Evidence-linked technical map", warning: "NOTICE: BROAD TECHNICAL SURFACE AREA DETECTED", alternatives: ["MULTIPLE SYSTEM LAYERS IDENTIFIED", "DEPENDENCIES FOUND HOLDING HANDS", "SEVERAL LAYERS COOPERATING SUSPICIOUSLY WELL", "QUEUE APPEARS PATIENT BUT DETERMINED", "EDGE CASE ADOPTED, NAMED, AND MONITORED", "SYSTEM STATUS: POLITE BUT PERSISTENT"] },
};
