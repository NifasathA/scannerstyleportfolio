import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SecurityTerminal } from "@/components/SecurityTerminal";
import { getInspectionRecordBySlug, inspectionRecords } from "@/content/records";

export function generateStaticParams() {
  return inspectionRecords.map(record => ({ slug: record.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const record = getInspectionRecordBySlug(slug);
  if (!record) return {};
  const title = `${record.title} | Nifasath Shanawaz Ahamed`;
  const url = `https://nifasath.com/inspect/${record.slug}/`;
  return {
    title,
    description: record.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description: record.summary, images: [{ url: "/assets/nifasath-archive-social.jpg", width: 1200, height: 630, alt: `${record.title} inspection record` }] },
    twitter: { card: "summary_large_image", title, description: record.summary, images: ["/assets/nifasath-archive-social.jpg"] },
  };
}

export default async function InspectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const record = getInspectionRecordBySlug(slug);
  if (!record) notFound();
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: record.title,
    description: record.summary,
    url: `https://nifasath.com/inspect/${record.slug}/`,
    creator: { "@type": "Person", name: "Nifasath Shanawaz Ahamed", url: "https://nifasath.com" },
    keywords: record.technologies.join(", "),
  };
  return <>
    <SecurityTerminal/>
    <article className="crawlable-record">
      <h2>{record.title}</h2>
      <p>{record.summary}</p>
      {record.problem && <section><h3>The problem</h3><p>{record.problem}</p></section>}
      {record.built && <section><h3>What I built</h3><p>{record.built}</p></section>}
      {record.decisions && <section><h3>Engineering decisions</h3><p>{record.decisions}</p></section>}
      {record.approach && <section><h3>Technical approach</h3><p>{record.approach}</p></section>}
      {record.outcome && <section><h3>What changed</h3><p>{record.outcome}</p></section>}
      <h3>Technical details</h3><p>{record.technologies.join(", ")}</p>
    </article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}/>
  </>;
}
