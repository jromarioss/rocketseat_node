import { defineConfig } from "vitest/config";

const setupConfig = async () => {
  const tsconfigPaths = (await import("vite-tsconfig-paths")).default;

  return defineConfig({
    plugins: [tsconfigPaths()],
    test: {
      environment: "node",
      environmentMatchGlobs: [["src/http/controllers/**", "prisma"]],
    },
  });
};

export default setupConfig();
