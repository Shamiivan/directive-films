import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    reactRouter(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
