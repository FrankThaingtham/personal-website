import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },

  async headers() {
    return [
      {
        // Add noimageindex to common image file types
        source: "/:path*\\.(png|jpg|jpeg|webp|gif|svg)",
        headers: [{ key: "X-Robots-Tag", value: "noimageindex" }],
      },
    ];
  },
};

export default nextConfig;