import { config, collection } from "@keystatic/core";
import { fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: "FrankThaingtham/personal-website",
  },

  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",

      // ✅ IMPORTANT: keep directory + extension in sync with src/lib/posts.ts
      path: "src/content/posts/*.mdx",

      format: { contentField: "content" },

      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({ label: "Date" }),
        summary: fields.text({ label: "Summary", multiline: true }),
        content: fields.mdx({ label: "Content" }),
      },
    }),
  },
});