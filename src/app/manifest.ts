import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Laputa OS",
    short_name: "Laputa OS",
    description:
      "Vincent Le's interactive engineering portfolio.",
    start_url: "/",
    display: "standalone",
    background_color: "#05090d",
    theme_color: "#05090d",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
