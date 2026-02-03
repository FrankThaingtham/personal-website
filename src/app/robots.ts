// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://YOURDOMAIN.com"; // <-- change this

  const routes = [
    "",
    "/about",
    "/projects",
    "/research",
    "/reading",
    "/blog",
    "/contact",
    // "/resume.pdf", // optional (uncomment if you want it indexed)
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}