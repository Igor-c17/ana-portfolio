"use client";

import dynamic from "next/dynamic";

const VisualEditing = dynamic(
  () => import("next-sanity/visual-editing").then((m) => m.VisualEditing),
  { ssr: false }
);

// Ajuste o caminho se seu SanityLive estiver em outro lugar
const SanityLive = dynamic(
  () => import("@/sanity/lib/live").then((m) => m.SanityLive),
  { ssr: false }
);

export function DraftToolsClient() {
  return (
    <>
      <SanityLive />
      <VisualEditing />
    </>
  );
}
