import type { MetadataRoute } from "next";

const SITE_URL = "https://laputa-os.vercel.app";
const publicRoutes = [
  "",
  "/home",
  "/projects",
  "/cyberware",
  "/experience",
  "/about",
  "/contact",
  "/credits",
  "/music",
  "/journal",
  "/gallery",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date("2026-07-26"),
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route === "/home" ? 0.9 : 0.7,
  }));
}
