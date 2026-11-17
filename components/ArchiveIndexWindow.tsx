"use client";

import { useEffect, useRef } from "react";
import { modeCopy, type InspectionRecord, type ScannerMode } from "@/content/records";

type Props = {
  mode: ScannerMode;
  records: InspectionRecord[];
  onClose: () => void;
  onOpen: (record: InspectionRecord) => void;
};

export function ArchiveIndexWindow({ mode, records, onClose, onOpen }: Props) {
  const dialog = useRef<HTMLElement>(null);

  useEffect(() => { dialog.current?.focus(); }, [mode]);

  return (
    <div className="archive-index-layer" onPointerDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={dialog} tabIndex={-1} className="archive-index-window" role="dialog" aria-modal="true" aria-labelledby="archive-index-title">
        <div className="window-titlebar">
          <span className="window-icon">▦</span>
          <strong id="archive-index-title">FULL_ARCHIVE_INDEX://{modeCopy[mode].code}</strong>
          <span className="window-actions"><button onClick={onClose} aria-label="Close full archive index">×</button></span>
        </div>
        <header className="archive-index-header">
          <div><span>ACTIVE TAB SECTION</span><h2>{mode}</h2><p>{modeCopy[mode].note}</p></div>
          <dl><dt>RECORDS</dt><dd>{records.length}</dd><dt>STATE</dt><dd>FULL INDEX</dd></dl>
        </header>
        <div className="archive-index-grid">
          {records.map((record, index) => (
            <button key={record.id} onClick={() => onOpen(record)}>
              <span className="archive-index-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="archive-index-copy"><small>{record.code} / {record.category}</small><b>{record.title}</b><em>{record.summary}</em><i>{record.technologies.slice(0, 4).join(" · ")}</i></span>
              <span className="archive-index-open">INSPECT ›</span>
            </button>
          ))}
        </div>
        <footer className="window-status"><span>{modeCopy[mode].code}</span><span>SELECT RECORD TO INSPECT</span><span>ESC TO CLOSE</span></footer>
      </section>
    </div>
  );
}
