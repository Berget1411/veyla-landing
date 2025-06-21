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
        src: "/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/icon-512.png",
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
