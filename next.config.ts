import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Traces only the runtime deps actually used and emits a self-contained
  // server into .next/standalone — the Dockerfile copies just that instead
  // of the full node_modules tree, which is most of the image-size win.
  output: "standalone",
};

export default nextConfig;
