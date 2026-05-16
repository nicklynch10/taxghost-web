import Script from "next/script";

export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <Script
      id={`jsonld-${Math.random().toString(36).substr(2, 9)}`}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
