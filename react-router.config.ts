import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  appDirectory: "src",
  async prerender() {
    const locales = ["en", "fr"];
    const pages = ["", "about", "careers", "contact", "services"];
    return locales.flatMap((l) => pages.map((p) => `/${l}${p ? `/${p}` : ""}`));
  },
} satisfies Config;
