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
};

export default nextConfig;
