import Link from "next/link";

export default function NotFound() {
  return (
    <main className="archive-not-found">
      <section role="alert" aria-labelledby="archive-error-title">
        <div className="window-titlebar"><span id="archive-error-title">NIFASATH ARCHIVE — LOOKUP ERROR</span></div>
        <div className="archive-not-found-body">
          <p className="archive-error-code">RECORD_404 / CLASSIFICATION UNKNOWN</p>
          <h1>Inspection record not found</h1>
          <p>The requested archive identifier is missing, retired, or still hiding in an undocumented edge case.</p>
          <Link href="/">RETURN TO ARCHIVE INDEX</Link>
        </div>
      </section>
    </main>
  );
}
