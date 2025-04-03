import { defineConfig } from "vite";

export default defineConfig(async () => {
  const tsConfigPaths = (await import("vite-tsconfig-paths")).default;

  return {
    plugins: [tsConfigPaths()],
    test: {
      globals: true,
      environment: "node",
      include: ["src/**/*.spec.ts"],
      coverage: {
        reporter: ["text", "json", "html"]
      },
    },
  };
});
