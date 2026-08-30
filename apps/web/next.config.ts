import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/products/cpu-1214c-dc-dc-dc",
        destination: "/products/6es7214-1ag40-0xb0",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
