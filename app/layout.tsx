import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nifasath.com"),
  title: "Nifasath Shanawaz Ahamed | AI Systems Engineer",
  description: "Nifasath Shanawaz Ahamed builds production AI systems, evaluation infrastructure, developer tools, and distributed software. Explore projects, engineering work, and technical experiments.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://nifasath.com",
    siteName: "NIFASATH ARCHIVE",
    title: "Nifasath Shanawaz Ahamed | AI Systems Engineer",
    description: "Production AI systems, evaluation infrastructure, developer tools, and distributed software.",
    images: [{ url: "/assets/nifasath-archive-social.jpg", width: 1200, height: 630, alt: "NIFASATH ARCHIVE personnel inspection interface" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@niferential",
    creator: "@niferential",
    title: "Nifasath Shanawaz Ahamed | AI Systems Engineer",
    description: "I build AI systems that work outside the demo.",
    images: ["/assets/nifasath-archive-social.jpg"],
  },
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nifasath Shanawaz Ahamed",
    url: "https://nifasath.com",
    jobTitle: "AI Systems Engineer",
    alumniOf: { "@type": "CollegeOrUniversity", name: "Carnegie Mellon University" },
    sameAs: ["https://x.com/niferential", "https://www.linkedin.com/in/nifasath/", "https://github.com/NifasathA"],
    knowsAbout: ["AI systems", "Agent tool security", "Model evaluation", "Retrieval systems", "API engineering", "Distributed systems", "Performance engineering", "Developer tooling"],
  };
  return (
    <html lang="en">
      <body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}/></body>
    </html>
  );
}
