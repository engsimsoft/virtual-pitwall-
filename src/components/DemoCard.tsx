'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface DemoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  badge: string;
  badgeColor: 'green' | 'blue' | 'purple' | 'yellow' | 'red';
  features: string[];
  href: string;
  featured?: boolean;
}

const badgeStyles = {
  green: 'bg-green-100 text-green-800 border-green-200',
  blue: 'bg-blue-100 text-blue-800 border-blue-200',
  purple: 'bg-purple-100 text-purple-800 border-purple-200',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  red: 'bg-red-100 text-red-800 border-red-200',
};

const cardStyles = {
  green: 'hover:border-green-300 hover:shadow-green-100',
  blue: 'hover:border-blue-300 hover:shadow-blue-100',
  purple: 'hover:border-purple-300 hover:shadow-purple-100',
  yellow: 'hover:border-yellow-300 hover:shadow-yellow-100',
  red: 'hover:border-red-300 hover:shadow-red-100',
};

const iconBgStyles = {
  green: 'bg-green-100 group-hover:bg-green-200',
  blue: 'bg-blue-100 group-hover:bg-blue-200',
  purple: 'bg-purple-100 group-hover:bg-purple-200',
  yellow: 'bg-yellow-100 group-hover:bg-yellow-200',
  red: 'bg-red-100 group-hover:bg-red-200',
};

const iconStyles = {
  green: 'text-green-600',
  blue: 'text-blue-600',
  purple: 'text-purple-600',
  yellow: 'text-yellow-600',
  red: 'text-red-600',
};

const buttonStyles = {
  green: 'bg-green-600 hover:bg-green-700 text-white',
  blue: 'bg-blue-600 hover:bg-blue-700 text-white',
  purple: 'bg-purple-600 hover:bg-purple-700 text-white',
  yellow: 'bg-yellow-600 hover:bg-yellow-700 text-white',
  red: 'bg-red-600 hover:bg-red-700 text-white',
};

export default function DemoCard({
  title,
  description,
  icon: Icon,
  badge,
  badgeColor,
  features,
  href,
  featured = false,
}: DemoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Link href={href} className="group block h-full">
        <div className={`
          bg-white border border-gray-200 rounded-xl p-6 
          transition-all duration-200 h-full
          hover:shadow-xl
          ${cardStyles[badgeColor]}
          ${featured ? 'ring-2 ring-offset-2 ring-' + badgeColor + '-500' : ''}
        `}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className={`
              p-3 rounded-lg transition-colors
              ${iconBgStyles[badgeColor]}
            `}>
              <Icon className={`w-6 h-6 ${iconStyles[badgeColor]}`} />
            </div>
            <span className={`
              px-3 py-1 rounded-full text-xs font-medium border
              ${badgeStyles[badgeColor]}
            `}>
              {badge}
            </span>
          </div>

          {/* Title */}
          <h3 className={`
            text-xl font-bold text-gray-900 mb-2 
            group-hover:${iconStyles[badgeColor]} 
            transition-colors
          `}>
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className={`mt-0.5 ${iconStyles[badgeColor]}`}>✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button className={`
            w-full px-4 py-3 rounded-lg font-medium 
            transition-all duration-200
            flex items-center justify-center gap-2
            ${buttonStyles[badgeColor]}
          `}>
            <span>Запустить демо</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>

          {/* Featured badge */}
          {featured && (
            <div className="mt-4 text-center">
              <span className="text-xs font-medium text-gray-500">
                ⭐ Рекомендуем начать с этого
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
