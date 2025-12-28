'use client';

import Navigation from '@/components/Navigation';
import DemoCard from '@/components/DemoCard';
import { Users, Eye, BarChart3, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DemosPage() {
  const demos = [
    {
      title: 'Team Demo',
      description: 'Взгляд изнутри команды. Посмотрите на real-time мониторинг 5 автомобилей глазами команды',
      icon: Users,
      badge: '🟢 Live Demo',
      badgeColor: 'green' as const,
      features: [
        'Real-time данные 5 автомобилей',
        'G-G диаграммы для анализа',
        'Алерты и уведомления',
        'Анализ производительности'
      ],
      href: '/demos/team',
      featured: true
    },
    {
      title: 'ArtLine Demo',
      description: 'Панорама гоночного уикенда. Оцените полную картину: 20 автомобилей, 4 команды, таблица результатов',
      icon: Eye,
      badge: '🔵 Interactive',
      badgeColor: 'red' as const,
      features: [
        '20 автомобилей под контролем',
        '4 команды в реальном времени',
        'Таблица результатов с телеметрией',
        'Полная картина гоночного дня'
      ],
      href: '/demos/artline'
    },
    {
      title: 'Fleet Control',
      description: 'Цифровой паспорт техники. Узнайте, как телеметрия решает проблему информационной асимметрии',
      icon: BarChart3,
      badge: '🟣 Business Solution',
      badgeColor: 'blue' as const,
      features: [
        'Учет износа двигателей',
        'Автоматические отчеты',
        'Система штрафов',
        'Интеграция с MoTeC'
      ],
      href: '/demos/fleet'
    },
    {
      title: 'Track Management',
      description: 'Управление треками. Централизованная система рекордов и статистики для 7 треков',
      icon: MapPin,
      badge: '🟡 Future Vision',
      badgeColor: 'purple' as const,
      features: [
        '7 треков с рекордами',
        'Автоматическое определение достижений',
        'Статистика по классам',
        'История всех заездов'
      ],
      href: '/demos/tracks'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium border border-green-200">
              🎮 Интерактивные демонстрации
            </span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Попробуйте в действии
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Интерактивные демо показывают real-time возможности системы Virtual Pitwall. 
            Выберите демонстрацию и оцените профессиональный уровень решения.
          </p>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Все демо работают в реальном времени</span>
            </div>
          </div>
        </motion.div>

        {/* Featured Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-12"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ⭐ Рекомендуем начать с этого
            </h2>
            <p className="text-gray-600">
              Самое популярное демо - покажет основные возможности системы
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <DemoCard {...demos[0]} />
          </div>
        </motion.div>

        {/* All Demos Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Все демонстрации
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demos.slice(1).map((demo, index) => (
              <motion.div
                key={demo.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                <DemoCard {...demo} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8 text-center"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Нужна помощь в выборе?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Если вы впервые знакомитесь с системой, рекомендуем начать с <strong>Team Demo</strong> - 
            оно покажет основные возможности мониторинга в понятном формате.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/features" 
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              📖 Узнать о возможностях
            </a>
            <a 
              href="/mvp_tech_spec" 
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              📚 Техническая документация
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
