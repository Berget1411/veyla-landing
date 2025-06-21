import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Veyla - Bouppteckning digitalt",
    short_name: "Veyla",
    description:
      "Trygg, transparent och kostnadseffektiv bouppteckning med AI-guidning",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0ea47a",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon-192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["legal", "finance", "business"],
    lang: "sv-SE",
    orientation: "portrait",
    scope: "/",
  };
}
