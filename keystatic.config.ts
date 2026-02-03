import { config } from "@keystatic/core";
import { fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: "FrankThaingtham/personal-website",
  },

  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        excerpt: fields.text({
          label: "Excerpt",
          multiline: true,
          validation: { length: { max: 200 } },
        }),
        date: fields.date({ label: "Date" }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
  },
});