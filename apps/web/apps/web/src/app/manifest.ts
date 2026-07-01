import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ractysh Group",
    short_name: "Ractysh",
    description:
      "Ractysh Group is a diversified enterprise delivering excellence in Architecture, Construction, Real Estate, Import & Export, and Global Business Solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F4",
    theme_color: "#0A0A0A",
    icons: [
      {
        src: "/brand/ractysh-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/ractysh-icon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
