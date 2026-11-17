"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { contactRecord, developerNotesRecord, externalLinks, getInspectionRecordById, getInspectionRecordBySlug, getModeRecords, getRecordPath, modeCopy, organizations, type InspectionRecord, type ScannerMode } from "@/content/records";
import { ScannerScene } from "./ScannerScene";
import { DetectionOverlay } from "./DetectionOverlay";
import { WindowManager } from "./WindowManager";
import type { WindowState } from "./InspectionWindow";
import { ArchiveIndexWindow } from "./ArchiveIndexWindow";

const modes: ScannerMode[] = ["EXPERIENCE", "PROJECTS", "SYSTEMS"];

export function SecurityTerminal() {
  const [mode, setMode] = useState<ScannerMode>("PROJECTS");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [scanVersion, setScanVersion] = useState(0);
  const [warningIndex, setWarningIndex] = useState(0);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [scanning, setScanning] = useState(true);
  const [booting, setBooting] = useState(true);
  const [message, setMessage] = useState("CALIBRATING MULTI-SPECTRAL ARRAY");
  const [archiveError, setArchiveError] = useState<string | null>(null);
  const [diagnosticMode, setDiagnosticMode] = useState(false);
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const topZ = useRef(10);
  const scannerViewportRef = useRef<HTMLDivElement>(null);
  const konamiIndex = useRef(0);
  const modeRecords = useMemo(() => getModeRecords(mode), [mode]);
  const selectedRecord = useMemo(() => modeRecords.find(record => record.id === selectedId) ?? null, [modeRecords, selectedId]);
  const currentWarning = warningIndex === 0 ? modeCopy[mode].warning : modeCopy[mode].alternatives[(warningIndex - 1) % modeCopy[mode].alternatives.length];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setBooting(false); setScanning(false); setMessage("INSPECTION READY — MOTION REDUCED"); return; }
    const a = window.setTimeout(() => setMessage("SIGNATURES ACQUIRED / INDEXING"), 700);
    const b = window.setTimeout(() => { setBooting(false); setScanning(false); setMessage("ARCHIVE READY / SELECT DETECTED OBJECT"); }, 1100);
    return () => { window.clearTimeout(a); window.clearTimeout(b); };
  }, []);

  useEffect(() => {
    function key(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing = target?.matches("input, textarea, [contenteditable=true]");
      if (typing) return;
      if (event.key === "Escape" && viewAllOpen) { setViewAllOpen(false); return; }
      if (event.key === "Escape" && focusedId) closeWindow(focusedId);
      if (event.altKey && ["1", "2", "3"].includes(event.key)) changeMode(modes[Number(event.key) - 1]);
      const sequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
      const pressed = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      konamiIndex.current = pressed === sequence[konamiIndex.current] ? konamiIndex.current + 1 : pressed === sequence[0] ? 1 : 0;
      if (konamiIndex.current === sequence.length) {
        konamiIndex.current = 0;
        setDiagnosticMode(true);
        setMessage("UNAUTHORIZED CURIOSITY DETECTED / DIAGNOSTIC PALETTE ACTIVE");
      }
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  });

  useEffect(() => {
    const viewport = scannerViewportRef.current;
    if (!viewport) return;

    let frame = 0;
    const centerScrollableScan = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const overflow = viewport.scrollWidth - viewport.clientWidth;
        if (overflow > 0) viewport.scrollLeft = overflow / 2;
      });
    };
    const observer = new ResizeObserver(centerScrollableScan);
    observer.observe(viewport);
    centerScrollableScan();
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    function restoreLocation() {
      const url = new URL(window.location.href);
      const pathMatch = url.pathname.match(/^\/inspect\/([^/]+)\/?$/);
      const requestedSlug = url.searchParams.get("inspect") ?? pathMatch?.[1] ?? null;
      if (!requestedSlug) {
        setArchiveError(null);
        setSelectedId(null);
        setWindows([]);
        setFocusedId(null);
        return;
      }
      const record = getInspectionRecordBySlug(decodeURIComponent(requestedSlug));
      if (!record) {
        setArchiveError(`RECORD NOT FOUND / ${requestedSlug.toUpperCase()}`);
        setSelectedId(null);
        setWindows([]);
        setFocusedId(null);
        setMessage("ARCHIVE LOOKUP FAILED / CHECK RECORD IDENTIFIER");
        return;
      }
      openRecord(record, "none");
      if (url.searchParams.has("inspect")) window.history.replaceState({}, "", getRecordPath(record));
    }
    restoreLocation();
    window.addEventListener("popstate", restoreLocation);
    return () => window.removeEventListener("popstate", restoreLocation);
  }, []);

  function changeMode(next: ScannerMode) {
    const shouldAddHistoryEntry = selectedId !== null || windows.length > 0;
    setMode(next); setActiveId(null); setSelectedId(null); setWindows([]); setFocusedId(null); setViewAllOpen(false); setArchiveError(null); setWarningIndex(0); setScanVersion(value => value + 1); setMessage(`LOADING ${next} ARCHIVE INDEX`); setScanning(true);
    window.history[shouldAddHistoryEntry ? "pushState" : "replaceState"]({}, "", "/");
    window.setTimeout(() => { setScanning(false); setMessage(`${next} INDEX READY / ${getModeRecords(next).length} RECORDS`); }, 560);
  }

  function runScan() {
    if (windows.length > 0) window.history.pushState({}, "", "/");
    setWindows([]); setFocusedId(null); setViewAllOpen(false); setScanning(false); setSelectedId(null); setActiveId(null); setWarningIndex(value => (value + 1) % (modeCopy[mode].alternatives.length + 1)); setScanVersion(value => value + 1); window.requestAnimationFrame(() => { setScanning(true); setMessage("RESCAN ACTIVE / RE-INDEXING PHYSICAL SIGNATURES"); });
    window.setTimeout(() => { setScanning(false); setMessage(`SCAN COMPLETE / ${modeRecords.length} RECORDS AVAILABLE`); }, 1200);
  }

  function toggleScan() {
    if (scanning) { setScanning(false); setMessage("SCAN PAUSED / ARCHIVE INTERACTION AVAILABLE"); return; }
    setScanning(true); setMessage("SCAN RESUMED / CALIBRATION PASS");
    window.setTimeout(() => { setScanning(false); setMessage("CALIBRATION PASS COMPLETE"); }, 900);
  }

  function openRecord(record: InspectionRecord, historyAction: "push" | "replace" | "none" = "push") {
    setViewAllOpen(false);
    if (historyAction === "push" && windows.some(item => item.record.id === record.id)) {
      focusWindow(record.id);
      return;
    }
    setArchiveError(null);
    if (record.mode !== "GLOBAL") {
      setMode(record.mode);
      setSelectedId(record.id);
    } else {
      setSelectedId(null);
    }
    topZ.current += 1;
    const compact = typeof window !== "undefined" && window.innerWidth < 720;
    setWindows([{ record, x: compact ? 0 : 360, y: compact ? 0 : 116, z: topZ.current, minimized: false }]);
    setFocusedId(record.id); setMessage(`RECORD OPENED / ${record.code}`);
    if (historyAction !== "none") {
      const path = record.mode === "GLOBAL" ? "/" : getRecordPath(record);
      window.history[historyAction === "replace" ? "replaceState" : "pushState"]({}, "", path);
    }
  }

  function selectRecord(record: InspectionRecord) {
    setActiveId(null);
    openRecord(record);
  }

  function selectAdjacent(direction: -1 | 1) {
    const current = Math.max(0, modeRecords.findIndex(record => record.id === selectedId));
    const next = (current + direction + modeRecords.length) % modeRecords.length;
    openRecord(modeRecords[next]);
  }

  function inspectEvidence(id: string) {
    const record = getInspectionRecordById(id);
    if (!record) return;
    setWarningIndex(0);
    setScanVersion(value => value + 1);
    openRecord(record);
  }

  function closeWindow(id: string) {
    setWindows([]);
    setFocusedId(null);
    if (id === selectedId) {
      setSelectedId(null);
      window.history.pushState({}, "", "/");
      setMessage("INSPECTION RECORD CLOSED / ARCHIVE READY");
    }
  }
  function focusWindow(id: string) { topZ.current += 1; setFocusedId(id); setWindows(items => items.map(win => win.record.id === id ? { ...win, z: topZ.current } : win)); }
  function minimizeWindow(id: string) { setWindows(items => items.map(win => win.record.id === id ? { ...win, minimized: !win.minimized } : win)); }
  function moveWindow(id: string, x: number, y: number) { setWindows(items => items.map(win => win.record.id === id ? { ...win, x, y } : win)); }
  function reset() { setWindows([]); setFocusedId(null); setViewAllOpen(false); setSelectedId(null); setActiveId(null); setArchiveError(null); setDiagnosticMode(false); setWarningIndex(0); setScanVersion(value => value + 1); setMessage("VIEW RESET / SELECT DETECTED OBJECT TO INSPECT"); window.history.pushState({}, "", "/"); }

  function openArchiveIndex() {
    if (windows.length > 0 || selectedId) window.history.pushState({}, "", "/");
    setWindows([]); setFocusedId(null); setSelectedId(null); setActiveId(null); setViewAllOpen(true);
    setMessage(`FULL ${mode} INDEX OPEN / ${modeRecords.length} RECORDS`);
  }

  return (
    <main className={`terminal-shell ${booting ? "is-booting" : ""} ${diagnosticMode ? "diagnostic-mode" : ""}`}>
      <a className="skip-link" href="#controls">Skip to scanner controls</a>
      <header className="app-titlebar">
        <div className="app-mark" aria-hidden="true"><i/><i/><i/></div>
        <div className="app-title"><h1>NIFASATH ARCHIVE</h1><span className="app-subtitle">PERSONNEL INSPECTION ENVIRONMENT / v2.4.06</span><span className="mobile-subject-name">NIFASATH SHANAWAZ AHAMED</span></div>
        <div className="identity"><span>NIFASATH SHANAWAZ AHAMED</span><strong>I BUILD AI SYSTEMS THAT WORK OUTSIDE THE DEMO.</strong></div>
        <button className="clearance-button" onClick={() => openRecord(contactRecord)}>MEET SUBJECT</button>
      </header>

      <section className="workspace" aria-label="Personnel archive scanner application">
        <div className="scanner-panel">
          <div className="scanner-toolbar">
            <span><b>FILE:</b> NIFASATH_PERSONNEL_ARCHIVE.XRAY</span><span>ARCHIVE CAPTURE: 2026.11.15 / 01:33 EST</span><span className="live-led">● SIMULATED SCAN</span>
          </div>
          <div className="scanner-viewport" ref={scannerViewportRef}>
            <div className="scan-stage">
              <ScannerScene mode={mode}/>
              {selectedRecord && <div className="selection-veil" aria-hidden="true"><span style={{ left: `${selectedRecord.region.x}%`, top: `${selectedRecord.region.y}%`, width: `${selectedRecord.region.w}%`, height: `${selectedRecord.region.h}%` }}/></div>}
              <DetectionOverlay records={modeRecords} selectedId={selectedId} activeId={activeId} scanVersion={scanVersion} onActive={setActiveId} onOpen={openRecord}/>
            </div>
            <div className={`scan-beam ${scanning ? "running" : ""}`} aria-hidden="true"/>
            <div className="grain" aria-hidden="true"/>
            <div className="calibration-grid" aria-hidden="true"><i/><i/><span>CAL-X 048</span><span>CAL-Y 112</span></div>
            <div className="scanner-utility-actions"><div className="scan-alert" role="status">⚠ {diagnosticMode ? "UNAUTHORIZED CURIOSITY DETECTED" : currentWarning}{diagnosticMode && <button onClick={() => setDiagnosticMode(false)}>NORMALIZE</button>}</div><button className="view-all-button" onClick={openArchiveIndex}>▦ VIEW ALL {mode}</button></div>
            {archiveError && <div className="archive-error" role="alert"><b>ARCHIVE LOOKUP ERROR</b><span>{archiveError}</span><button onClick={() => { setArchiveError(null); window.history.replaceState({}, "", "/"); }}>RETURN TO INDEX</button></div>}
            <div className="interaction-hint">SELECT DETECTED OBJECT TO INSPECT · ALT+1/2/3 CHANGES MODE</div>
            <div className="viewport-ticks" aria-hidden="true">SIM 12.8 KEV <span>◢ MULTI-SPECTRAL ARCHIVE RENDER</span> VIEW AUTO-FIT</div>
          </div>
          <nav className="mobile-record-nav" aria-label={`${mode.toLowerCase()} archive records`}>{modeRecords.map(record => <button key={record.id} onClick={() => openRecord(record)}><small>{record.code}</small><span>{record.title}</span></button>)}</nav>
        </div>

        <aside className={`object-overview ${selectedRecord ? "has-selection" : ""}`} aria-label="Live inspection console">
          <div className="panel-title"><span>{selectedRecord ? "Record Inspection" : "Personnel Archive Console"}</span><b aria-hidden="true">□</b></div>
          <div className="overview-meta"><span>SESSION</span><b>VISITOR_01</b><span>INDEX</span><b>{modeCopy[mode].code}</b><span>RENDER</span><b>{scanning ? "ACQUIRING" : "STABLE"}</b><span>RECORDS</span><b>{modeRecords.length}</b></div>
          {!selectedRecord ? <>
            <div className="subject-card">
              <div className="subject-avatar" aria-hidden="true">NA</div>
              <div><small>SUBJECT IDENTIFICATION RECORD</small><strong>Nifasath Shanawaz Ahamed</strong><dl><dt>FOCUS</dt><dd>AI systems / evaluation / infrastructure</dd><dt>BACKGROUND</dt><dd>Agilent / Cerebras / IBM</dd><dt>EDUCATION</dt><dd>Carnegie Mellon University</dd></dl></div>
            </div>
            <p className="subject-summary">Builds production AI applications and the retrieval, evaluation, distributed execution, and developer infrastructure that keep them useful outside a demo.</p>
            <div className="overview-alert">{currentWarning} / {modeRecords.length} RECORDS</div>
            <div className="record-list-heading"><span>DETECTED RECORDS</span><b>{mode}</b></div>
            <ol>{modeRecords.map(record => <li key={record.id} className={activeId === record.id ? "active" : ""} onMouseEnter={() => setActiveId(record.id)} onMouseLeave={() => setActiveId(null)}><button onClick={() => selectRecord(record)}><span className="threat-icon">✥</span><span><small>{record.category}</small><b>{record.title}</b><small>{record.association ?? record.subtitle}</small></span><em>{record.code}</em></button></li>)}</ol>
            <div className="capability-strip"><span>TECHNICAL SURFACE</span><p>AI applications · agent safety · evaluation · retrieval · APIs · distributed systems · performance · developer tooling · reliability</p></div>
            <div className="subject-history"><span>BACKGROUND SIGNALS</span><b>{organizations.filter(item => item.type === "EMPLOYER").map(item => item.name).join(" · ")}</b><span>ACADEMIC ORIGIN</span><b>Carnegie Mellon University</b></div>
            <nav className="external-connections" aria-label="External connections"><span>EXTERNAL CONNECTIONS</span><div>{externalLinks.map(link => <a className={link.id === "x" ? "external-link-x" : undefined} aria-label={link.id === "x" ? "X profile, @niferential" : link.label} title={link.id === "x" ? "@niferential on X" : undefined} key={link.id} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined}>{link.label}</a>)}</div></nav>
          </> : <div className="console-record">
            <div className="console-nav"><button onClick={() => closeWindow(selectedRecord.id)}>‹ QUEUE</button><span>{modeRecords.findIndex(record => record.id === selectedRecord.id) + 1}/{modeRecords.length}</span><button onClick={() => selectAdjacent(-1)} aria-label="Previous detected object">◀</button><button onClick={() => selectAdjacent(1)} aria-label="Next detected object">▶</button></div>
            <span className="console-category">{selectedRecord.code} / {selectedRecord.classification}</span>
            <h2>{selectedRecord.title}</h2>
            <p className="console-subtitle">{selectedRecord.subtitle}</p>
            <div className="object-id"><span>PHYSICAL SIGNATURE</span><b>{selectedRecord.object}</b></div>
            {selectedRecord.association && <div className="console-association"><span>ASSOCIATED SOURCE</span><b>{selectedRecord.association}</b><em>{selectedRecord.scope}</em></div>}
            <p className="console-summary">{selectedRecord.summary}</p>
            {selectedRecord.problem && <section><h3>ENGINEERING PROBLEM</h3><p>{selectedRecord.problem}</p></section>}
            {selectedRecord.built && <section><h3>WHAT NIFASATH BUILT</h3><p>{selectedRecord.built}</p></section>}
            {selectedRecord.approach && <section><h3>TECHNICAL APPROACH</h3><p>{selectedRecord.approach}</p></section>}
            {selectedRecord.decisions && <section><h3>ENGINEERING DECISIONS</h3><p>{selectedRecord.decisions}</p></section>}
            {selectedRecord.limitations && <section><h3>LIMITATIONS</h3><p>{selectedRecord.limitations}</p></section>}
            {selectedRecord.outcome && <section><h3>WHAT CHANGED</h3><p>{selectedRecord.outcome}</p></section>}
            {!!selectedRecord.evidence?.length && <section className="console-evidence"><h3>SUPPORTING EVIDENCE</h3>{selectedRecord.evidence.map(item => <button key={item.id} onClick={() => inspectEvidence(item.id)}><span>{item.scope}</span><b>{item.title}</b><em>{item.association}</em></button>)}</section>}
            <div className="console-tech">{selectedRecord.technologies.map(item => <span key={item}>{item}</span>)}</div>
            <div className="console-actions"><button onClick={() => openRecord(selectedRecord)}>OPEN FULL RECORD</button>{selectedRecord.links?.map(link => <a key={link.id} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}>{link.label} ↗</a>)}</div>
          </div>}
          <div className="signal-chart" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
          <div className="overview-footer"><b>SUBJECT</b><span>NA / PERSONNEL-01</span><b>MODE</b><span>{mode}</span><b>STATE</b><span className="safe">ARCHIVE READY</span></div>
        </aside>
      </section>

      <footer className="control-deck" id="controls">
        <nav className="mode-switcher" aria-label="Inspection modes">{modes.map((item, index) => <button key={item} aria-pressed={mode === item} onClick={() => changeMode(item)}><small>ALT+{index + 1}</small>{item}<span>{item === "EXPERIENCE" ? "EVIDENCE" : item === "PROJECTS" ? "INDEPENDENT" : "CAPABILITY MAP"}</span></button>)}</nav>
        <div className="transport"><button onClick={runScan} aria-label="Rescan archive"><b>↻</b><small>RESCAN</small></button><button onClick={toggleScan} aria-label={scanning ? "Pause scan" : "Resume scan"}><b>{scanning ? "Ⅱ" : "▶"}</b><small>{scanning ? "PAUSE" : "RESUME"}</small></button><button onClick={reset} aria-label="Reset archive view"><b>⌂</b><small>RESET</small></button><div className="progress" aria-hidden="true"><span style={{ width: scanning ? "76%" : "100%" }}/></div></div>
        <div className="telemetry"><div><small>CURRENT MODE</small><b>{mode}</b></div><div><small>OBJECT COUNT</small><b>{modeRecords.length} RECORDS</b></div><div><small>INDEX TYPE</small><b>{modeCopy[mode].note}</b></div></div>
        <div className="system-status"><button className={`diagnostic-led ${scanning ? "busy" : ""}`} onClick={() => openRecord(developerNotesRecord)} aria-label="Open archive implementation notes" title="Diagnostic channel">●</button><div><small>SYSTEM MESSAGE</small><strong role="status">{message}</strong></div></div>
      </footer>

      <WindowManager windows={windows} focusedId={focusedId} close={closeWindow} focus={focusWindow} minimize={minimizeWindow} move={moveWindow}/>
      {viewAllOpen && <ArchiveIndexWindow mode={mode} records={modeRecords} onClose={() => setViewAllOpen(false)} onOpen={record => openRecord(record)}/>}

      {booting && <div className="startup" role="status"><div className="startup-box"><div className="startup-logo">NA<span>◫</span></div><strong>NIFASATH ARCHIVE</strong><p>{message}</p><div className="boot-progress"><i/></div><button onClick={() => { setBooting(false); setScanning(false); setMessage("STARTUP SKIPPED / ARCHIVE READY"); }}>SKIP STARTUP</button></div></div>}
    </main>
  );
}
