import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "src/**/*.ts",
  sourcemap: true,
  dts: true,
  bundle: false,
  external: ["@prisma/client", ".prisma/client", "@cloudCB/db"],
});
