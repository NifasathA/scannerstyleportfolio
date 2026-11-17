import type { MetadataRoute } from "next";
import { inspectionRecords } from "@/content/records";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nifasath.com";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    ...inspectionRecords.map(record => ({
      url: `${base}/inspect/${record.slug}/`,
      changeFrequency: "monthly" as const,
      priority: record.mode === "PROJECTS" ? 0.9 : 0.75,
    })),
  ];
}
