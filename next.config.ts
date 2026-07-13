import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin workspace root so parent D:\MyCode\package-lock.json does not confuse webpack HMR
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
