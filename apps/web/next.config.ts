import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/products/cpu-1214c-dc-dc-dc",
        destination: "/products/6es7214-1ag40-0xb0",
        permanent: true,
      },
      {
        source: "/en/products/cpu-1214c-dc-dc-dc",
        destination: "/en/products/6es7214-1ag40-0xb0",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
