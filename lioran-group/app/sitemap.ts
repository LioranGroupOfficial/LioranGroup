import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lioran.group";
  const pages = [
    "",
    "/about",
    "/products",
    "/companies",
    "/companies/lcs",
    "/companies/lcs/products",
    "/companies/lcs/technology",
    "/companies/lcs/roadmap",
    "/companies/lcs/contact",
    "/companies/future",
    "/founder",
    "/careers",
    "/contact",
    "/support",
    "/leadership",
    "/leadership/cto",
    "/team",
    "/roadmap",
    "/status",
    "/security",
    "/license",
    "/changelog",
    "/legal",
    "/legal/privacy",
    "/legal/terms",
    "/legal/refund",
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date("2026-07-16"),
    changeFrequency: page === "" ? "weekly" : "monthly",
    priority: page === "" ? 1 : 0.7,
  }));
}
