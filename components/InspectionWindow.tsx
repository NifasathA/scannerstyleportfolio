"use client";

import { useEffect, useRef, useState } from "react";
import { getRecordPath, type InspectionRecord } from "@/content/records";

export type WindowState = { record: InspectionRecord; x: number; y: number; z: number; minimized: boolean };

type Props = {
  window: WindowState;
  focused: boolean;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  onMove: (x: number, y: number) => void;
};

export function InspectionWindow({ window: win, focused, onClose, onFocus, onMinimize, onMove }: Props) {
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  const dialog = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const record = win.record;

  useEffect(() => { dialog.current?.focus(); }, [record.id]);

  async function copyRecordLink() {
    const url = new URL(getRecordPath(record), window.location.origin).toString();
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("textarea");
      input.value = url;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function startDrag(event: React.PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("button")) return;
    drag.current = { sx: event.clientX, sy: event.clientY, ox: win.x, oy: win.y };
    event.currentTarget.setPointerCapture(event.pointerId);
    onFocus();
  }

  function moveDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    onMove(Math.max(0, Math.min(window.innerWidth - 370, drag.current.ox + event.clientX - drag.current.sx)), Math.max(42, Math.min(window.innerHeight - 150, drag.current.oy + event.clientY - drag.current.sy)));
  }

  return (
    <section ref={dialog} tabIndex={-1} className={`inspection-window ${focused ? "focused" : ""} ${win.minimized ? "minimized" : ""}`} style={{ transform: `translate(${win.x}px, ${win.y}px)`, zIndex: win.z }} role="dialog" aria-modal="false" aria-labelledby={`title-${record.id}`} onPointerDown={onFocus}>
      <div className="window-titlebar" onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={() => { drag.current = null; }}>
        <span className="window-icon">✥</span><strong id={`title-${record.id}`}>INSPECTION_RECORD://{record.code}</strong>
        <span className="window-actions"><button onClick={onMinimize} aria-label={win.minimized ? "Restore window" : "Minimize window"}>_</button><button onClick={onClose} aria-label="Close window">×</button></span>
      </div>
      {!win.minimized && <div className="window-body">
        <div className="record-head"><div><span className="eyebrow">{record.kind} / {record.classification}</span><h2>{record.title}</h2><p>{record.subtitle}</p></div><div className="record-stamp">ARCHIVED<br/><b>{record.code}</b></div></div>
        {record.association && <div className="record-association"><span>SOURCE ASSOCIATION</span><b>{record.association}</b>{record.scope && <em>{record.scope}</em>}</div>}
        <p className="record-summary">{record.summary}</p>
        <dl className="record-grid">
          {record.problem && <><dt>ENGINEERING PROBLEM</dt><dd>{record.problem}</dd></>}
          {record.built && <><dt>WHAT I BUILT</dt><dd>{record.built}</dd></>}
          {record.approach && <><dt>TECHNICAL APPROACH</dt><dd>{record.approach}</dd></>}
          {record.decisions && <><dt>ENGINEERING DECISIONS</dt><dd>{record.decisions}</dd></>}
          {record.limitations && <><dt>LIMITATIONS</dt><dd>{record.limitations}</dd></>}
          {record.outcome && <><dt>WHAT CHANGED</dt><dd>{record.outcome}</dd></>}
        </dl>
        {!!record.evidence?.length && <div className="evidence-list"><strong>SUPPORTING EVIDENCE</strong>{record.evidence.map(item => <div key={item.id}><span>{item.scope}</span><b>{item.title}</b><em>{item.association}</em></div>)}</div>}
        {record.technologies.length > 0 && <div className="tech-row" aria-label="Technologies">{record.technologies.map(item => <span key={item}>{item}</span>)}</div>}
        {record.id === "contact" && <div className="contact-panel"><p className="contact-callout">EXTERNAL CONNECTIONS REQUIRE USER CONFIRMATION</p><p>External profiles open in a new tab. Email opens your configured mail application.</p></div>}
        <div className="record-window-actions">
          {record.mode !== "GLOBAL" && <button className="copy-record-link" onClick={copyRecordLink}>COPY RECORD LINK</button>}
          {copied && <span role="status">ARCHIVE LINK COPIED</span>}
        </div>
        {!!record.links?.length && <nav className="record-links" aria-label="External connections">{record.links.map(link => <a aria-label={link.label} href={link.href} key={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined}>{link.label} ↗</a>)}</nav>}
      </div>}
      <div className="window-status"><span>REC {record.code}</span><span>READ ONLY</span><span>{record.classification}</span></div>
    </section>
  );
}
