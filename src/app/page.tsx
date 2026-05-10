'use client';

import Link from 'next/link'
import { CheckCircle, Zap, Shield, Database } from 'lucide-react'
import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block mb-6">
              <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium border border-red-200">
                Система телеметрии для гоночных серий
              </span>
            </div>
            
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Virtual Pitwall
            </h1>
            
            <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Real-time контроль параметров автомобиля и соблюдения регламента. 
              Технологии уровня Formula 1 для вашей гоночной серии.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link 
                href="/demos"
                className="group bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                <span>🎮</span>
                <span>Посмотреть демо</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link 
                href="/features"
                className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-3"
              >
                <span>📖</span>
                <span>Узнать больше</span>
              </Link>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-5xl font-bold text-green-600 mb-2">&lt; 1с</div>
                <div className="text-gray-900 font-semibold mb-1">Задержка алертов</div>
                <div className="text-sm text-gray-600">Мгновенные уведомления</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-5xl font-bold text-blue-600 mb-2">25 Hz</div>
                <div className="text-gray-900 font-semibold mb-1">Частота данных</div>
                <div className="text-sm text-gray-600">Высокая точность</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-5xl font-bold text-purple-600 mb-2">99.9%</div>
                <div className="text-gray-900 font-semibold mb-1">Uptime системы</div>
                <div className="text-sm text-gray-600">Надежность</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* For Whom Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Для кого эта система?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Virtual Pitwall решает задачи на всех уровнях гоночного бизнеса
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-8"
            >
              <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Race Control</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Мониторинг всех автомобилей</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Автоматические алерты</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Борьба с читерством</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-8"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Команды</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Контроль своих автомобилей</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Предупреждение поломок</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Интеграция с MoTeC</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-8"
            >
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Производители</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Цифровой паспорт техники</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Контроль износа двигателей</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Защита от перегрузки</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Готовы увидеть систему в действии?
            </h2>
            <p className="text-xl mb-10 text-green-50">
              Интерактивные демонстрации покажут все возможности Virtual Pitwall
            </p>
            <Link 
              href="/demos"
              className="inline-flex items-center gap-3 bg-white text-green-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-green-50 transition-all duration-200 shadow-2xl hover:shadow-3xl hover:scale-105"
            >
              <span>🎮</span>
              <span>Посмотреть все демо</span>
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-gray-600">
            <p>© 2026 TMS Telos UI Prototype</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
