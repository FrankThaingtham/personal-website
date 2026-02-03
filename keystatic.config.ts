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

      // ✅ must end with /* or /**
      path: "src/content/posts/*",

      // ✅ tell Keystatic this collection is MDX content
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