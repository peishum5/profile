import type { NextConfig } from "next";

// GitHub Pages serves the site from a subpath (/<repo>/) as static files.
// The CI build sets GITHUB_PAGES=true to enable static export + basePath.
// Local `npm run dev` stays at the root with no basePath.
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "profile";

const nextConfig: NextConfig = {
  output: isPages ? "export" : undefined,
  basePath: isPages ? `/${repo}` : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  allowedDevOrigins: ["localhost"],
};

export default nextConfig;
