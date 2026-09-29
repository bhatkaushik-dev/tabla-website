import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // YouTube thumbnails for the video facades on /performances.
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
      // The CMS photo library (the backend's Supabase Storage bucket). Only
      // public objects in that one project, so the optimizer can't be pointed
      // at arbitrary hosts.
      {
        protocol: "https",
        hostname: "lwawfizrwjgtznrjdfju.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  poweredByHeader: false,
  // Dev only: lets a phone on the same Wi-Fi load the dev server's scripts.
  allowedDevOrigins: ["192.168.68.132"],
};

export default nextConfig;
