/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Make openai package optional - don't fail if not installed
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    }
    
    // Ignore openai module if not installed (we're using Ollama)
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        openai: false,
      }
    }
    
    // tesseract.js-node doesn't need WebAssembly or workers - it's pure Node.js
    
    return config
  },
}

export default nextConfig
