"use client";

import { Fragment } from "react";
import type { InspectionRecord } from "@/content/records";

type LabelPosition = { x: number; y: number };

// Labels use independent stage coordinates so overlapping scan regions never
// force their headings into the same visual row.
const labelPositions: Record<string, LabelPosition> = {
  "retrieval-platform": { x: 17, y: 3 },
  "async-workflows": { x: 43, y: 4 },
  "ml-experiment-infra": { x: 14, y: 44 },
  "model-regression": { x: 47, y: 45 },
  "cmu-scalable-systems": { x: 38, y: 68 },
  "workflow-observability": { x: 53, y: 80 },
  "streaming-pipelines": { x: 73, y: 87 },
  hermes: { x: 4, y: 12 },
  provenance: { x: 24, y: 3 },
  sentinel: { x: 22, y: 44 },
  agentdeck: { x: 67, y: 64 },
  "retrieval-search": { x: 11, y: 35 },
  "model-evaluation": { x: 24, y: 3 },
  "ai-applications": { x: 51, y: 11 },
  "backend-distributed": { x: 15, y: 45 },
  "developer-tooling": { x: 47, y: 65 },
  "data-experimentation": { x: 44, y: 46 },
  "reliability-observability": { x: 80, y: 71 },
  "agent-security": { x: 8, y: 9 },
  "api-async-systems": { x: 48, y: 76 },
  "performance-scalability": { x: 70, y: 53 },
};

const boxColors = ["#064fd0", "#008e8b", "#6d35b5", "#0076b8", "#087b55", "#a32674", "#2457a6"];

function getLabelStyle(record: InspectionRecord, index: number): React.CSSProperties {
  const position = labelPositions[record.id] ?? { x: record.region.x, y: Math.max(2, record.region.y - 4) };
  return {
    left: `${position.x}%`,
    top: `${position.y}%`,
    "--delay": `${index * 90}ms`,
    "--box-color": boxColors[index % boxColors.length],
  } as React.CSSProperties;
}

type Props = {
  records: InspectionRecord[];
  selectedId: string | null;
  activeId: string | null;
  scanVersion: number;
  onActive: (id: string | null) => void;
  onOpen: (record: InspectionRecord) => void;
};

export function DetectionOverlay({ records, selectedId, activeId, scanVersion, onActive, onOpen }: Props) {
  return (
    <div className="detections" aria-label="Detected inspection records">
      {records.map((record, index) => {
        const stateClass = `${activeId === record.id ? "is-active" : ""} ${selectedId === record.id ? "is-selected" : ""}`;
        const activate = () => onActive(record.id);
        const deactivate = () => onActive(null);
        return <Fragment key={`${record.id}-${scanVersion}`}>
          <button
            className={`detection ${stateClass}`}
            style={{ left: `${record.region.x}%`, top: `${record.region.y}%`, width: `${record.region.w}%`, height: `${record.region.h}%`, "--delay": `${index * 90}ms`, "--box-color": boxColors[index % boxColors.length] } as React.CSSProperties}
            onMouseEnter={activate}
            onMouseLeave={deactivate}
            onFocus={activate}
            onBlur={deactivate}
            onClick={() => onOpen(record)}
            aria-label={`Inspect ${record.title}, ${record.classification.toLowerCase()}`}
          >
            <span className="corner corner-a"/><span className="corner corner-b"/><span className="corner corner-c"/><span className="corner corner-d"/>
          </button>
          <button
            className={`detection-label ${stateClass}`}
            style={getLabelStyle(record, index)}
            onMouseEnter={activate}
            onMouseLeave={deactivate}
            onFocus={activate}
            onBlur={deactivate}
            onClick={() => onOpen(record)}
            aria-label={`Inspect ${record.title}`}
          ><b>✥ {record.code}</b></button>
        </Fragment>;
      })}
    </div>
  );
}
