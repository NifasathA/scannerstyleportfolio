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
    code: "RETR-SYS",
    title: "Production Retrieval Systems",
    summary: "Semantic retrieval infrastructure for AI-assisted engineering workflows across more than 50,000 technical documents.",
    context: "Technical knowledge had to be ingested, indexed, searched, and evaluated as part of production engineering workflows.",
    built: "Document ingestion, embedding generation, vector indexing, and semantic-search APIs, plus tooling for retrieval-quality analysis and regression detection.",
    approach: "Iterated on chunking strategies, embedding pipelines, ranking logic, and request orchestration while comparing retrieval experiments before deployment.",
    outcome: "Served searchable engineering knowledge across 50K+ technical documents.",
    technologies: ["Python", "Vector retrieval", "Embeddings", "Semantic search", "Retrieval evaluation"],
    capabilityIds: ["ai-applications", "model-evaluation", "retrieval-search", "data-experimentation"],
    organizationId: "agilent",
    object: "Evidence archive",
    region: { x: 23, y: 10, w: 21, h: 34 },
  },
  {
    id: "async-workflows",
    code: "ASYNC-OPS",
    title: "Async Processing & API Reliability",
    summary: "Distributed Python backend services for high-volume telemetry, workflow events, and long-running AI operations.",
    context: "AI and engineering workflows needed reliable execution beyond the lifetime and failure model of a synchronous request.",
    built: "Backend APIs and execution services using asynchronous workers, batching, retries, and queue-based processing across containerized AWS infrastructure.",
    approach: "Separated request handling from durable work execution and added retry and recovery paths for failed workflows.",
    outcome: "The résumé reports an approximately 40% throughput improvement.",
    technologies: ["Python", "Async workers", "Queues", "REST APIs", "AWS", "Containers"],
    capabilityIds: ["ai-applications", "backend-distributed", "reliability-observability"],
    organizationId: "agilent",
    object: "Cooled server module",
    region: { x: 45, y: 9, w: 16, h: 36 },
  },
  {
    id: "workflow-observability",
    code: "OPS-TRACE",
    title: "Workflow Reliability & Observability",
    summary: "Operational instrumentation and automated recovery for distributed production services.",
    context: "Distributed workflow failures needed to be diagnosable and recoverable without prolonged manual investigation.",
    built: "Centralized logging, metrics, tracing, alerting, and automated recovery paths for failed workflows.",
    approach: "Connected service-level signals to workflow execution state so failures could be detected, traced, and retried with useful context.",
    outcome: "The résumé reports approximately 60% lower incident-resolution time.",
    technologies: ["Logging", "Metrics", "Tracing", "Alerting", "Automated recovery"],
    capabilityIds: ["backend-distributed", "reliability-observability"],
    organizationId: "agilent",
    object: "Displaced charger + cable",
    region: { x: 58, y: 54, w: 8, h: 12 },
  },
  {
    id: "ml-experiment-infra",
    code: "ML-ORCH",
    title: "Distributed ML Experiment Infrastructure",
    summary: "Infrastructure for scheduling, tracking, validating, and reproducing distributed ML experiments.",
    context: "Researchers needed faster and more repeatable training and experimentation workflows across distributed environments.",
    built: "AWS- and Docker-based distributed ML infrastructure with workload scheduling, artifact tracking, automated validation, rollback support, and execution management.",
    approach: "Made experiment configuration and runtime state explicit so execution could be reproduced, validated, and rolled back across containerized environments.",
    outcome: "The résumé reports experiment turnaround reduced from hours to under one hour.",
    technologies: ["AWS", "Docker", "Distributed execution", "Artifact tracking", "Validation"],
    capabilityIds: ["backend-distributed", "developer-tooling", "data-experimentation"],
    organizationId: "cerebras",
    object: "Compute board",
    region: { x: 27, y: 56, w: 14, h: 34 },
  },
  {
    id: "model-regression",
    code: "REG-CHECK",
    title: "Model Regression & Performance Testing",
    summary: "Tooling for model benchmarking, experiment comparison, regression detection, and distributed-workload analysis.",
    context: "Model and runtime changes needed repeatable checks before release, while performance bottlenecks required system-level visibility.",
    built: "Benchmarking and regression tooling plus telemetry analysis for memory, I/O, and compute bottlenecks in distributed training workloads.",
    approach: "Compared experiment quality and runtime behavior across changes, with automated validation and reproducible execution workflows.",
    technologies: ["Model evaluation", "Regression testing", "Telemetry", "Benchmarking", "Performance analysis"],
    capabilityIds: ["model-evaluation", "reliability-observability", "data-experimentation"],
    organizationId: "cerebras",
    object: "Headphones + sensors",
    region: { x: 43, y: 56, w: 14, h: 18 },
  },
  {
    id: "streaming-pipelines",
    code: "STREAM-50G",
    title: "Enterprise Streaming Pipelines",
    summary: "Kafka-based distributed data pipelines and tuned SQL workflows for downstream analytics.",
    context: "Enterprise analytics systems needed steady ingestion and lower-latency query paths across distributed services.",
    built: "Kafka streaming pipelines processing more than 50GB of enterprise data daily and optimized SQL-backed workflows.",
    approach: "Combined streaming ingestion with query-path tuning for the downstream analytics workload.",
    outcome: "The résumé reports approximately 30% lower downstream analytics latency.",
    technologies: ["Kafka", "SQL", "Streaming data", "Distributed services"],
    capabilityIds: ["backend-distributed", "reliability-observability", "data-experimentation"],
    organizationId: "ibm",
    object: "Memory + cable array",
    region: { x: 71, y: 89, w: 18, h: 7 },
  },
  {
    id: "cmu-scalable-systems",
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
    region: { x: 44, y: 75, w: 20, h: 17 },
  },
];

export const projects: Project[] = [
  {
    id: "hermes",
    code: "WEB-MCP",
    title: "Hermes WebMCP Guard",
    subtitle: "Permission-aware website capabilities for Hermes Agent",
    summary: "An installable Hermes Agent plugin that discovers and invokes website-provided WebMCP tools while treating every capability as temporary and untrusted.",
    problem: "Structured website capabilities need origin, lifecycle, schema, and approval boundaries before an agent can invoke them safely.",
    built: "A firewall around Chrome's native WebMCP CDP transport with fixed connect, discovery, execution, and disconnect tools; audit logging; redaction; and bypass detection.",
    approach: "Explicit endpoints and allowed origins, strict JSON schemas, document-bound capability IDs, bounded execution, safe revocation, and exact one-call approvals.",
    decisions: "The model can select only configured endpoints. Origin or schema changes fail closed. Approvals bind to owner, call, capability, and canonical arguments, then are consumed once.",
    limitations: "WebMCP remains experimental. The plugin uses an explicit browser connection because the documented Hermes supervisor path lacks the authoritative event subscription required by this adapter.",
    outcome: "The repository documents verified Python and Raspberry Pi 5 live-browser flows with Hermes 0.23.1 and Chromium Shell 156.",
    technologies: ["Python", "WebMCP", "Chrome CDP", "JSON Schema", "pytest", "WebSocket"],
    capabilityIds: ["ai-applications", "developer-tooling", "reliability-observability"],
    links: [{ id: "hermes-github", label: "GitHub", href: "https://github.com/NifasathA/hermes-webmcp-guard", external: true }],
    object: "Nano + perfume + watch cable cluster",
    region: { x: 7, y: 13, w: 15, h: 31 },
  },
  {
    id: "provenance",
    code: "ADV-EVAL",
    title: "Provenance",
    subtitle: "Adversarial AI agent evaluation",
    summary: "An adversarial AI-agent evaluation project involving synthetic trajectories and controlled experiments.",
    problem: "Evaluate agent behavior under deliberately constructed, repeatable adversarial conditions.",
    built: "An experimental evaluation approach using synthetic trajectories and controlled experiments.",
    approach: "Controlled experiment design and synthetic trajectories are supplied project context; implementation specifics are left unexpanded until repository material is available.",
    decisions: "The archive distinguishes the verified project premise from architecture details that have not yet been supplied.",
    limitations: "No repository, benchmark result, or implementation detail is currently available in the workspace.",
    technologies: ["AI evaluation", "Synthetic trajectories", "Controlled experiments"],
    capabilityIds: ["model-evaluation", "data-experimentation"],
    object: "Evidence archive",
    region: { x: 23, y: 10, w: 21, h: 34 },
  },
];

export const capabilities: Capability[] = [
  { id: "ai-applications", code: "AI-APP", title: "AI Applications & Agents", summary: "Application-layer AI systems connected to reliable backend execution and explicit tool boundaries.", areas: ["Agent workflows", "AI-assisted engineering", "Production APIs", "LLM integration"], technologies: ["Python", "FastAPI", "WebMCP", "REST APIs"], evidenceIds: ["retrieval-platform", "async-workflows", "hermes"], object: "Cooled server module", region: { x: 45, y: 9, w: 16, h: 36 } },
  { id: "model-evaluation", code: "MODEL-EVAL", title: "Model Evaluation", summary: "Regression detection, retrieval-quality analysis, experiment comparison, and adversarial evaluation design.", areas: ["Regression testing", "Retrieval evaluation", "Benchmarking", "Adversarial testing"], technologies: ["pytest", "Automated scoring", "Experiment comparison", "Telemetry"], evidenceIds: ["model-regression", "retrieval-platform", "provenance"], object: "Evidence archive", region: { x: 23, y: 10, w: 21, h: 34 } },
  { id: "retrieval-search", code: "RETRIEVAL", title: "Retrieval & Search", summary: "End-to-end document ingestion, embedding, indexing, semantic search, ranking, and evaluation.", areas: ["Chunking", "Embeddings", "Vector indexing", "Reranking", "Semantic search"], technologies: ["Python", "Vector retrieval", "Embedding pipelines", "Search APIs"], evidenceIds: ["retrieval-platform"], object: "Nano + watch + indexed cable", region: { x: 7, y: 13, w: 15, h: 31 } },
  { id: "backend-distributed", code: "DIST-SYS", title: "Backend & Distributed Systems", summary: "Queue-based work execution, distributed data processing, APIs, and service orchestration.", areas: ["Queues and workers", "Async processing", "Streaming data", "Service orchestration"], technologies: ["Python", "Kafka", "AWS", "Docker", "SQL"], evidenceIds: ["async-workflows", "ml-experiment-infra", "streaming-pipelines"], object: "Compute board", region: { x: 29, y: 56, w: 18, h: 35 } },
  { id: "developer-tooling", code: "DEV-TOOLS", title: "Developer Tooling", summary: "Tools that expose complex system behavior through safer, repeatable engineering workflows.", areas: ["Agent tooling", "Experiment tooling", "Audit logs", "Internal interfaces"], technologies: ["Python", "CLI workflows", "JSON Schema", "Testing"], evidenceIds: ["hermes", "ml-experiment-infra"], object: "Keyboard matrix", region: { x: 44, y: 75, w: 20, h: 17 } },
  { id: "reliability-observability", code: "RELIABILITY", title: "Reliability & Observability", summary: "Logging, metrics, tracing, alerting, recovery, and regression checks for production and ML systems.", areas: ["Metrics", "Tracing", "Alerting", "Automated recovery", "Regression checks"], technologies: ["Prometheus", "Grafana", "CloudWatch", "Logging"], evidenceIds: ["workflow-observability", "model-regression", "hermes"], object: "Displaced charger + cable", region: { x: 58, y: 54, w: 8, h: 12 } },
  { id: "data-experimentation", code: "DATA-EXP", title: "Data & Experimentation", summary: "Experiment comparison, artifact tracking, evaluation datasets, streaming data, and controlled tests.", areas: ["Artifact tracking", "Controlled experiments", "Evaluation data", "Streaming pipelines"], technologies: ["Kafka", "SQL", "Experiment tracking", "Benchmarking"], evidenceIds: ["retrieval-platform", "ml-experiment-infra", "streaming-pipelines", "provenance"], object: "Empty ceramic travel cup", region: { x: 34, y: 76, w: 10, h: 18 } },
];

export const externalLinks: ExternalLink[] = [
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
    id: item.id, mode: "EXPERIENCE", kind: organization.type === "EDUCATION" ? "BACKGROUND" : "ACCOMPLISHMENT",
    code: item.code, title: item.title, subtitle: organization.name, category: organization.type === "EDUCATION" ? "EDUCATION / BACKGROUND" : "ENGINEERING ACCOMPLISHMENT",
    classification: organization.type === "EDUCATION" ? "ACADEMIC RECORD" : "PROFESSIONAL EVIDENCE", object: item.object,
    summary: item.summary, problem: item.context, built: item.built, approach: item.approach, outcome: item.outcome,
    technologies: item.technologies, association: `${organization.name} — ${organization.role}`, scope: organization.type === "EDUCATION" ? "EDUCATION" : "PROFESSIONAL", region: item.region,
  };
}

function projectRecord(item: Project): InspectionRecord {
  return {
    id: item.id, mode: "PROJECTS", kind: "PROJECT", code: item.code, title: item.title, subtitle: item.subtitle,
    category: "INDEPENDENT PROJECT", classification: "PROJECT SIGNATURE", object: item.object, summary: item.summary,
    problem: item.problem, built: item.built, approach: item.approach, decisions: item.decisions, limitations: item.limitations,
    outcome: item.outcome, technologies: item.technologies, association: "Independent project", scope: "PERSONAL PROJECT", links: item.links, region: item.region,
  };
}

function capabilityRecord(item: Capability): InspectionRecord {
  return {
    id: item.id, mode: "SYSTEMS", kind: "CAPABILITY", code: item.code, title: item.title,
    subtitle: item.areas.join(" · "), category: "CAPABILITY MAP", classification: "EVIDENCE-BACKED AREA", object: item.object,
    summary: item.summary, approach: `Technical areas: ${item.areas.join(", ")}.`, technologies: item.technologies,
    evidence: evidenceFor(item.evidenceIds), region: item.region,
  };
}

export function getModeRecords(mode: ScannerMode): InspectionRecord[] {
  if (mode === "EXPERIENCE") return accomplishments.map(accomplishmentRecord);
  if (mode === "PROJECTS") return projects.map(projectRecord);
  return capabilities.map(capabilityRecord);
}

export const contactRecord: InspectionRecord = {
  id: "contact", mode: "GLOBAL", kind: "CLEARANCE", code: "EXIT-01", title: "External Connections",
  subtitle: "Contact and document access", category: "CLEARANCE CHANNEL", classification: "USER-INITIATED CONNECTION", object: "Exit terminal",
  summary: "Contact Nifasath about AI systems, evaluation, distributed infrastructure, developer tooling, or production engineering work.",
  technologies: [], links: externalLinks, region: { x: 0, y: 0, w: 0, h: 0 },
};

export const modeCopy: Record<ScannerMode, { code: string; status: string; note: string; warning: string; alternatives: string[] }> = {
  EXPERIENCE: { code: "ARCHIVE/WORK", status: "accomplishment records", note: "Evidence + associated background", warning: "NOTICE: PRODUCTION EXPERIENCE DETECTED", alternatives: ["MULTIPLE SYSTEMS DEPLOYED IN THE WILD", "FIELD EXPERIENCE VERIFIED", "HISTORY OF SHIPPING REAL SOFTWARE"] },
  PROJECTS: { code: "ARCHIVE/PROJECTS", status: "independent project records", note: "Architecture + tradeoffs", warning: "WARNING: UNUSUAL LEVELS OF CURIOSITY", alternatives: ["EXPERIMENTAL BUILD PATTERNS DETECTED", "UNUSUAL PROJECT ACTIVITY IDENTIFIED", "MANUAL INSPECTION RECOMMENDED"] },
  SYSTEMS: { code: "ARCHIVE/CAP", status: "capability categories", note: "Evidence-linked technical map", warning: "NOTICE: BROAD TECHNICAL SURFACE AREA DETECTED", alternatives: ["MULTIPLE SYSTEM LAYERS IDENTIFIED", "CROSS-DOMAIN ENGINEERING PATTERN DETECTED", "ADDITIONAL TECHNICAL INSPECTION ADVISED"] },
};
