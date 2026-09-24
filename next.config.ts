import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // YouTube thumbnails for the video facades on / and /performances.
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
  poweredByHeader: false,
  // Dev only: lets a phone on the same Wi-Fi load the dev server's scripts.
  allowedDevOrigins: ["192.168.68.132"],
};

export default nextConfig;
