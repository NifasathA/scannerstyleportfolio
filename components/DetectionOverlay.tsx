"use client";

import type { InspectionRecord } from "@/content/records";

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
      {records.map((record, index) => (
        <button
          className={`detection ${activeId === record.id ? "is-active" : ""} ${selectedId === record.id ? "is-selected" : ""}`}
          key={`${record.id}-${scanVersion}`}
          style={{ left: `${record.region.x}%`, top: `${record.region.y}%`, width: `${record.region.w}%`, height: `${record.region.h}%`, "--delay": `${index * 90}ms` } as React.CSSProperties}
          onMouseEnter={() => onActive(record.id)}
          onMouseLeave={() => onActive(null)}
          onFocus={() => onActive(record.id)}
          onBlur={() => onActive(null)}
          onClick={() => onOpen(record)}
          aria-label={`Inspect ${record.title}, ${record.classification.toLowerCase()}`}
        >
          <span className="detection-label"><b>✥ {record.code}</b><span>{record.kind === "CAPABILITY" ? "AREA" : record.kind === "PROJECT" ? "PROJECT" : "EVIDENCE"}</span></span>
          <span className="corner corner-a"/><span className="corner corner-b"/><span className="corner corner-c"/><span className="corner corner-d"/>
        </button>
      ))}
    </div>
  );
}
