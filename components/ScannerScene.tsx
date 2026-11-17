"use client";

import Image from "next/image";
import type { ScannerMode } from "@/content/records";

export function ScannerScene({ mode }: { mode: ScannerMode }) {
  return (
    <figure className={`scanner-art scanner-photo mode-${mode.toLowerCase()}`}>
      <Image
        src="/assets/scanner-xray-v11.webp"
        alt="Hyperrealistic airport X-ray scan of two asymmetrically packed equipment cases with layered electronics and translucent cables, including an iPod nano, shoe-shaped perfume bottle, vintage watch, clamshell iBook, reusable bottle, translucent handheld game console, displaced chargers, headphones, keyboard, memory, camera, and an empty ceramic-lined travel cup."
        fill
        priority
        sizes="(max-width: 820px) 100vw, (max-width: 900px) calc(100vw - 238px), calc(100vw - 304px)"
        className="scanner-photo-image"
      />
      <span className="spectral-shadow spectral-shadow-a" aria-hidden="true" />
      <span className="spectral-shadow spectral-shadow-b" aria-hidden="true" />
      <span className="density-map" aria-hidden="true" />
    </figure>
  );
}
