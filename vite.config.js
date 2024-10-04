import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/count-up" : undefined,
  plugins: [react()],
}));
