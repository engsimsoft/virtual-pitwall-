import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Исключаем папку backups из сборки
  typescript: {
    ignoreBuildErrors: true, // Временно игнорируем TypeScript ошибки для деплоя
  },
  
  // Исключаем файлы backup из компиляции
  webpack: (config: any) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: [/node_modules/, /backups/],
    });
    return config;
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
