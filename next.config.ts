import path from "path";
import type { NextConfig } from "next";

/** Absolute project root — must match the folder that owns package-lock.json */
const projectRoot = path.join(__dirname);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Prevent parent D:\MyCode\package-lock.json from hijacking workspace root,
  // module resolution, and webpack / Turbopack HMR in dev.
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
