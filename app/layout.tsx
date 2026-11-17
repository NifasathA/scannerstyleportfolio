import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NIFASATH ARCHIVE",
  description: "Inspect the engineering archive of Nifasath Shanawaz Ahamed.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
