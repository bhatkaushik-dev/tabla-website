/**
 * Renders structured data as a plain script tag in the server-rendered HTML,
 * per node_modules/next/dist/docs/01-app/02-guides/json-ld.md — not via
 * next/script, so crawlers see it in the initial response.
 *
 * `<` is escaped to < so a stray "</script>" inside any string value
 * cannot break out of the tag.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
