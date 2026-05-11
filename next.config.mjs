import { fileURLToPath } from "node:url"

const projectRoot = fileURLToPath(new URL(".", import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: projectRoot,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
