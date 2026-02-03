// app/sitemap.ts
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://frankthaingtham.com";

  const routes = [
    "",
    "/about",
    "/projects",
    "/research",
    "/reading",
    "/blog",
    "/contact",
    // "/resume.pdf", // optional: uncomment if you want the PDF indexed
  ];

  // Use one timestamp for the whole sitemap build (fine for small sites)
  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}