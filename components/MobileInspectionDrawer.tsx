"use client";

import { useEffect, useRef } from "react";
import { modeCopy, organizations, type InspectionRecord, type ScannerMode } from "@/content/records";

type Props = {
  mode: ScannerMode;
  records: InspectionRecord[];
  selectedRecord: InspectionRecord | null;
  warning: string;
  scanning: boolean;
  open: boolean;
  onToggle: () => void;
  onCloseRecord: () => void;
  onOpenRecord: (record: InspectionRecord) => void;
  onInspectEvidence: (id: string) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function MobileInspectionDrawer({ mode, records, selectedRecord, warning, scanning, open, onToggle, onCloseRecord, onOpenRecord, onInspectEvidence, onPrevious, onNext }: Props) {
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    if (open && selectedRecord) panel.current?.focus();
  }, [open, selectedRecord]);

  return (
    <section ref={panel} tabIndex={-1} className={`mobile-console-shell ${open ? "is-open" : ""}`} aria-label="Mobile inspection console">
      <button className="mobile-console-handle" onClick={onToggle} aria-expanded={open}>
        <span><i className={scanning ? "busy" : ""}>●</i> ⚠ SUBJECT REQUIRES FURTHER INSPECTION</span>
        <b>{open ? "TAP TO COLLAPSE" : "TAP TO INSPECT"}</b>
        <em>{open ? "▼" : "▲"}</em>
      </button>
      {open && <div className="mobile-console-body"><div className={`object-overview mobile-object-overview ${selectedRecord ? "has-selection" : ""}`}>
        <div className="panel-title"><span>{selectedRecord ? "Record Inspection" : "Personnel Archive Console"}</span><b aria-hidden="true">□</b></div>
        <div className="overview-meta"><span>SESSION</span><b>VISITOR_01</b><span>INDEX</span><b>{modeCopy[mode].code}</b><span>RENDER</span><b>{scanning ? "ACQUIRING" : "STABLE"}</b><span>RECORDS</span><b>{records.length}</b></div>
        {!selectedRecord ? <>
          <div className="subject-card"><div className="subject-avatar" aria-hidden="true">NA</div><div><small>SUBJECT IDENTIFICATION RECORD</small><strong>Nifasath Shanawaz Ahamed</strong><dl><dt>FOCUS</dt><dd>AI systems / evaluation / infrastructure</dd><dt>BACKGROUND</dt><dd>Agilent / Cerebras / IBM</dd><dt>EDUCATION</dt><dd>Carnegie Mellon University</dd></dl></div></div>
          <p className="subject-summary">Builds production AI applications and the retrieval, evaluation, distributed execution, and developer infrastructure that keep them useful outside a demo.</p>
          <div className="overview-alert">{warning} / {records.length} RECORDS</div>
          <div className="record-list-heading"><span>DETECTED RECORDS</span><b>{mode}</b></div>
          <ol>{records.map(record => <li key={record.id}><button onClick={() => onOpenRecord(record)}><span className="threat-icon">✥</span><span><small>{record.category}</small><b>{record.title}</b><small>{record.association ?? record.subtitle}</small></span><em>{record.code}</em></button></li>)}</ol>
          <div className="capability-strip"><span>TECHNICAL SURFACE</span><p>AI applications · agent safety · evaluation · retrieval · APIs · distributed systems · performance · developer tooling · reliability</p></div>
          <div className="subject-history"><span>BACKGROUND SIGNALS</span><b>{organizations.filter(item => item.type === "EMPLOYER").map(item => item.name).join(" · ")}</b><span>ACADEMIC ORIGIN</span><b>Carnegie Mellon University</b></div>
        </> : <div className="console-record">
          <div className="console-nav"><button onClick={onCloseRecord}>‹ QUEUE</button><span>{records.findIndex(record => record.id === selectedRecord.id) + 1}/{records.length}</span><button onClick={onPrevious} aria-label="Previous detected object">◀</button><button onClick={onNext} aria-label="Next detected object">▶</button></div>
          <span className="console-category">{selectedRecord.code} / {selectedRecord.classification}</span><h2>{selectedRecord.title}</h2><p className="console-subtitle">{selectedRecord.subtitle}</p>
          <div className="object-id"><span>PHYSICAL SIGNATURE</span><b>{selectedRecord.object}</b></div>
          {selectedRecord.association && <div className="console-association"><span>ASSOCIATED SOURCE</span><b>{selectedRecord.association}</b><em>{selectedRecord.scope}</em></div>}
          <p className="console-summary">{selectedRecord.summary}</p>
          {selectedRecord.problem && <section><h3>ENGINEERING PROBLEM</h3><p>{selectedRecord.problem}</p></section>}
          {selectedRecord.built && <section><h3>WHAT NIFASATH BUILT</h3><p>{selectedRecord.built}</p></section>}
          {selectedRecord.approach && <section><h3>TECHNICAL APPROACH</h3><p>{selectedRecord.approach}</p></section>}
          {selectedRecord.decisions && <section><h3>ENGINEERING DECISIONS</h3><p>{selectedRecord.decisions}</p></section>}
          {selectedRecord.limitations && <section><h3>LIMITATIONS</h3><p>{selectedRecord.limitations}</p></section>}
          {selectedRecord.outcome && <section><h3>WHAT CHANGED</h3><p>{selectedRecord.outcome}</p></section>}
          {!!selectedRecord.evidence?.length && <section className="console-evidence"><h3>SUPPORTING EVIDENCE</h3>{selectedRecord.evidence.map(item => <button key={item.id} onClick={() => onInspectEvidence(item.id)}><span>{item.scope}</span><b>{item.title}</b><em>{item.association}</em></button>)}</section>}
          <div className="console-tech">{selectedRecord.technologies.map(item => <span key={item}>{item}</span>)}</div>
          {!!selectedRecord.links?.length && <div className="console-actions">{selectedRecord.links.map(link => <a key={link.id} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined}>{link.label} ↗</a>)}</div>}
        </div>}
        <div className="signal-chart" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
        <div className="overview-footer"><b>SUBJECT</b><span>NA / PERSONNEL-01</span><b>MODE</b><span>{mode}</span><b>STATE</b><span className="safe">ARCHIVE READY</span></div>
      </div></div>}
    </section>
  );
}
