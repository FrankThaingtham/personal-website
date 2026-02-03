import Markdoc from "@markdoc/markdoc";
import React from "react";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

/** Small slug helper for heading ids */
function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Extract plain text from Markdoc node children */
function nodeToText(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (node.type === "text") return String(node.attributes?.content ?? "");
  if (node.attributes?.content && typeof node.attributes.content === "string")
    return node.attributes.content;
  if (node.children) return nodeToText(node.children);
  return "";
}

/** Build a TOC from the Markdoc AST */
function buildToc(ast: any) {
  const items: { level: number; text: string; id: string }[] = [];

  function walk(node: any) {
    if (!node) return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    if (node.type === "heading") {
      const level = Number(node.attributes?.level ?? 2);
      const text = nodeToText(node.children).trim();
      if (text) {
        const id = slugify(text);
        items.push({ level, text, id });
      }
    }

    if (node.children) walk(node.children);
  }

  walk(ast);
  return items.filter((x) => x.level >= 2 && x.level <= 4);
}

const markdocConfig = {
  nodes: {
    heading: {
      render: "h2",
      attributes: {
        level: { type: Number, required: true, default: 2 },
      },
      transform(node: any, config: any) {
        const level = node.attributes.level ?? 2;
        const children = node.transformChildren(config);

        const Tag = (["h2", "h3", "h4"] as const)[
          Math.min(Math.max(level - 2, 0), 2)
        ];

        const text = nodeToText(node.children).trim();
        const id = text ? slugify(text) : undefined;

        return new Markdoc.Tag(Tag, id ? { id } : {}, children);
      },
    },
    link: {
      render: "a",
      attributes: {
        href: { type: String },
        title: { type: String },
      },
    },
  },
};

type Params = { slug: string };

export default async function BlogPostPage(props: {
  params: Params | Promise<Params>;
}) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <>
        <h1 className="h1" style={{ fontSize: 36 }}>
          Not found
        </h1>
        <p className="p">That post doesn’t exist.</p>
      </>
    );
  }

  const ast = Markdoc.parse(post.content);
  const toc = buildToc(ast);

  const content = Markdoc.transform(ast, markdocConfig);
  const rendered = Markdoc.renderers.react(content, React);

  return (
    <>
      <a
        href="/blog"
        style={{
          color: "var(--muted)",
          textDecoration: "underline",
          textUnderlineOffset: 3,
        }}
      >
        ← Back to Blog
      </a>

      <h1 className="h1" style={{ fontSize: 36, marginTop: 14 }}>
        {post.title}
      </h1>

      <div
        style={{
          color: "var(--muted)",
          fontWeight: 700,
          fontSize: 13,
          marginTop: 6,
        }}
      >
        {post.date}
      </div>

      <div
        style={{
          marginTop: 18,
          display: "grid",
          gridTemplateColumns: "minmax(0, 760px) minmax(0, 220px)",
          gap: 28,
          alignItems: "start",
        }}
      >
        <article className="prose">{rendered}</article>

        {toc.length ? (
          <aside
            style={{
              position: "sticky",
              top: 90,
              alignSelf: "start",
              borderLeft: "1px solid var(--border)",
              paddingLeft: 16,
            }}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: 0.4,
                color: "var(--accent)",
                fontWeight: 800,
              }}
            >
              CONTENTS
            </div>

            <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  style={{
                    textDecoration: "none",
                    color: "var(--bodyText)", // keep neutral
                    fontSize: 13,
                    lineHeight: 1.4,
                    paddingLeft:
                      item.level === 3 ? 10 : item.level === 4 ? 18 : 0,
                    opacity: 0.9,
                  }}
                >
                  {item.text}
                </a>
              ))}
            </div>
          </aside>
        ) : null}
      </div>

      {/* ✅ Make blog headings accent, keep body neutral */}
      <style>{`
        html { scroll-behavior: smooth; }

        /* avoid headings hiding under the top nav when clicked */
        .prose h2, .prose h3, .prose h4 { scroll-margin-top: 90px; }

        /* ✅ headings in the article use accent */
        .prose h2, .prose h3, .prose h4 {
          color: var(--accent) !important;
        }

        /* ✅ keep article paragraphs/body neutral */
        .prose p, .prose li {
          color: var(--bodyText);
        }
      `}</style>
    </>
  );
}