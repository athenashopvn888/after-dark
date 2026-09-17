import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "afterdarkcannabis.com" },
      { protocol: "https", hostname: "kennedyloudcannabis.com" },
      { protocol: "https", hostname: "stclaircannabis.com" },
      { protocol: "https", hostname: "athena-cannabis-images.vercel.app", pathname: "/products/delivery/v1/**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "afterdarkcannabis.ca" }],
        destination: "https://afterdarkcannabis.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.afterdarkcannabis.ca" }],
        destination: "https://afterdarkcannabis.com/:path*",
        permanent: true,
      },
      { source: "/delivery", destination: "/weed-delivery-york", permanent: true },
      { source: "/info/weed-store-near-mississauga", destination: "/resources/local-guides/how-to-reach-after-dark-from-mississauga", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:path*", destination: "/", permanent: true },
      { source: "/product-category/edibles", destination: "/items/edibles", permanent: true },
      { source: "/product-category/vape-pen", destination: "/items/vapes", permanent: true },
      { source: "/product-category/concentrates", destination: "/items/concentrates", permanent: true },
      { source: "/edibles", destination: "/items/edibles", permanent: true },
      { source: "/vapes", destination: "/items/vapes", permanent: true },
      { source: "/vape-disposables", destination: "/items/vape-disposables", permanent: true },
      { source: "/concentrates", destination: "/items/concentrates", permanent: true },
      { source: "/prerolls", destination: "/items/prerolls", permanent: true },
      { source: "/add-ons", destination: "/items/add-ons", permanent: true },
      { source: "/cigarettes", destination: "/items/cigarettes", permanent: true },
      { source: "/magic", destination: "/items/magic", permanent: true },
    ];
  },
};

export default nextConfig;
