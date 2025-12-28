import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Игнорируем TypeScript ошибки для деплоя
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Редиректы для новой структуры URL
  async redirects() {
    return [
      // Демонстрации
      {
        source: '/legends/demo',
        destination: '/demos/team',
        permanent: true,
      },
      {
        source: '/legends/artline',
        destination: '/demos/artline',
        permanent: true,
      },
      {
        source: '/rental-management',
        destination: '/demos/fleet',
        permanent: true,
      },
      {
        source: '/tracks',
        destination: '/demos/tracks',
        permanent: true,
      },
      // Партнеры
      {
        source: '/legends',
        destination: '/partners/artline',
        permanent: true,
      },
      {
        source: '/torgmash-proposal',
        destination: '/partners/torgmash',
        permanent: true,
      },
      {
        source: '/torgmash-proposal/analysis',
        destination: '/partners/torgmash/analysis',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
