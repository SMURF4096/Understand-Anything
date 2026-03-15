import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "serve-knowledge-graph",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/knowledge-graph.json") {
            // GRAPH_DIR env var points to the project being analyzed
            // Falls back to monorepo root, then public/ (demo)
            const graphDir = process.env.GRAPH_DIR;
            const candidates = [
              ...(graphDir
                ? [path.resolve(graphDir, ".understand-anything/knowledge-graph.json")]
                : []),
              path.resolve(process.cwd(), ".understand-anything/knowledge-graph.json"),
              path.resolve(process.cwd(), "../../../.understand-anything/knowledge-graph.json"),
            ];
            for (const candidate of candidates) {
              if (fs.existsSync(candidate)) {
                res.setHeader("Content-Type", "application/json");
                fs.createReadStream(candidate).pipe(res);
                return;
              }
            }
          }
          next();
        });
      },
    },
  ],
});
