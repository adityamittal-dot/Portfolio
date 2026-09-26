import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits a fully static site into out/ — no server, so it can be served
  // straight from a CDN (Cloudflare Pages) with no cold starts.
  output: "export",
  // Image optimization needs a server; images in public/ are pre-compressed
  // WebP instead.
  images: { unoptimized: true },
};

export default nextConfig;
