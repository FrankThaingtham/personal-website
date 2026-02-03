import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: { kind: "local" },

  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({ label: "Date" }),
        summary: fields.text({ label: "Summary", multiline: true }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
  },
});