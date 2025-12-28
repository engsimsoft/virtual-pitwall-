'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Settings, TrendingUp, Zap, Shield, DollarSign, ChevronRight, ChevronDown, Calculator } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

// Данные для сравнительных графиков
const comparisonData = [
  { rpm: 3200, torgmash_hp: 65.7, dk_hp: 52.7, torgmash_nm: 144.1, dk_nm: 115.7 },
  { rpm: 3400, torgmash_hp: 70.9, dk_hp: 57.5, torgmash_nm: 146.4, dk_nm: 118.7 },
  { rpm: 3600, torgmash_hp: 78.5, dk_hp: 69.1, torgmash_nm: 153.2, dk_nm: 134.9 },
  { rpm: 3800, torgmash_hp: 80.7, dk_hp: 82.4, torgmash_nm: 149.2, dk_nm: 152.3 },
  { rpm: 4000, torgmash_hp: 86.5, dk_hp: 92.3, torgmash_nm: 151.9, dk_nm: 162.1 },
  { rpm: 4200, torgmash_hp: 98.4, dk_hp: 102.0, torgmash_nm: 164.5, dk_nm: 170.6 },
  { rpm: 4400, torgmash_hp: 110.7, dk_hp: 110.2, torgmash_nm: 176.7, dk_nm: 176.0 },
  { rpm: 4600, torgmash_hp: 119.1, dk_hp: 115.3, torgmash_nm: 181.8, dk_nm: 176.0 },
  { rpm: 4800, torgmash_hp: 128.9, dk_hp: 118.1, torgmash_nm: 181.3, dk_nm: 172.3 },
  { rpm: 5000, torgmash_hp: 130.7, dk_hp: 126.1, torgmash_nm: 183.5, dk_nm: 177.2 },
  { rpm: 5200, torgmash_hp: 140.2, dk_hp: 136.0, torgmash_nm: 189.4, dk_nm: 183.7 },
  { rpm: 5400, torgmash_hp: 150.9, dk_hp: 145.2, torgmash_nm: 196.3, dk_nm: 188.9 },
  { rpm: 5600, torgmash_hp: 159.2, dk_hp: 150.2, torgmash_nm: 199.7, dk_nm: 188.4 },
  { rpm: 5800, torgmash_hp: 164.2, dk_hp: 149.8, torgmash_nm: 198.8, dk_nm: 181.4 },
  { rpm: 6000, torgmash_hp: 168.6, dk_hp: 148.7, torgmash_nm: 197.4, dk_nm: 174.1 },
  { rpm: 6200, torgmash_hp: 173.8, dk_hp: 153.1, torgmash_nm: 196.9, dk_nm: 173.5 },
  { rpm: 6400, torgmash_hp: 180.5, dk_hp: 164.1, torgmash_nm: 198.1, dk_nm: 180.1 },
  { rpm: 6600, torgmash_hp: 187.4, dk_hp: 178.1, torgmash_nm: 199.4, dk_nm: 189.5 },
  { rpm: 6800, torgmash_hp: 192.8, dk_hp: 186.2, torgmash_nm: 199.1, dk_nm: 192.3 },
  { rpm: 7000, torgmash_hp: 195.9, dk_hp: 190.2, torgmash_nm: 196.6, dk_nm: 190.9 },
  { rpm: 7200, torgmash_hp: 197.5, dk_hp: 191.8, torgmash_nm: 192.6, dk_nm: 187.1 },
  { rpm: 7400, torgmash_hp: 198.0, dk_hp: 192.0, torgmash_nm: 187.9, dk_nm: 182.2 },
  { rpm: 7600, torgmash_hp: 197.9, dk_hp: 192.2, torgmash_nm: 182.9, dk_nm: 177.7 },
  { rpm: 7800, torgmash_hp: 196.7, dk_hp: 194.6, torgmash_nm: 177.2, dk_nm: 175.2 },
  { rpm: 8000, torgmash_hp: 194.6, dk_hp: 198.2, torgmash_nm: 170.8, dk_nm: 174.0 },
  { rpm: 8200, torgmash_hp: 193.0, dk_hp: 201.9, torgmash_nm: 165.3, dk_nm: 172.9 }
];

// Интегральные данные по диапазонам
const integralData = [
  { range: 'Низкие\n(4400-5600)', torgmash: 103.7, dk: 100.0, advantage: 3.7 },
  { range: 'Средние\n(5600-7000)', torgmash: 108.2, dk: 100.0, advantage: 8.2 },
  { range: 'Высокие\n(7000-8000)', torgmash: 102.2, dk: 100.0, advantage: 2.2 }
];

export default function TorgmashProposal() {
  const [expandedSection, setExpandedSection] = useState<string | null>('modeling');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Settings className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">
              Торгмаш Инжиниринг
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            25+ лет экспертизы в моделировании и производстве гоночных двигателей. 
            Техническое предложение по повышению надежности силовых установок ArtLine Engineering.
          </p>
        </div>

        {/* Раздел 1: О моделировании ДВС */}
        <div className="bg-white border border-gray-200 rounded-lg mb-8">
          <button
            onClick={() => toggleSection('modeling')}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">1D ENGINE SIMULATION - Современное моделирование ДВС</h2>
            </div>
            {expandedSection === 'modeling' ? 
              <ChevronDown className="h-6 w-6 text-gray-400" /> : 
              <ChevronRight className="h-6 w-6 text-gray-400" />
            }
          </button>
          
          {expandedSection === 'modeling' && (
            <div className="px-6 pb-6 border-t border-gray-100">
              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Философия виртуального проектирования</h3>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      <strong>1D ENGINE SIMULATION</strong> – это современное программное обеспечение для инженеров, 
                      позволяющее моделировать, прогнозировать и анализировать двигатели внутреннего сгорания, 
                      будь то серийный или гоночный.
                    </p>
                    <p>
                      Моделирование двигателя является обязательным при оценке общей конструкции ДВС, 
                      а также при выборе компонентов и оценке их влияния на производительность.
                    </p>
                    <p>
                      Компьютерное моделирование позволяет увидеть, какие изменения в двигателе приводят 
                      к увеличению или снижению мощности и крутящего момента.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Экономическая эффективность</h3>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Больше не нужно покупать новые детали, устанавливать их и проверять каждое изменение 
                      в конструкции ДВС на динамометрическом стенде для выяснения того, дают ли изменения 
                      желаемое влияние на характеристики.
                    </p>
                    <p>
                      С помощью программного обеспечения для моделирования двигателей можно анализировать 
                      и сравнивать новые или скорректированные концепции <strong>виртуально</strong> еще до того, 
                      как эти компоненты будут изготовлены.
                    </p>
                    <p>
                      Все это помогает сэкономить время на разработку и тем самым значительно снизить 
                      затраты на испытания и работу на динамометрическом стенде.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Применение технологии</h3>
                <p className="text-blue-800">
                  Эта технология применяется как на начальных этапах разработки концепции двигателя, 
                  так и является очень полезным инструментом для проектирования компонентов. 
                  Помогает в понимании сложных процессов — от газодинамики в коллекторах и ГБЦ 
                  до подробного анализа горения.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Раздел 2: Техническое предложение */}
        <div className="bg-white border border-gray-200 rounded-lg mb-8">
          <button
            onClick={() => toggleSection('proposal')}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center">
              <Zap className="h-6 w-6 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Техническое предложение: Переход на &quot;Торгмаш Версия&quot;</h2>
            </div>
            {expandedSection === 'proposal' ? 
              <ChevronDown className="h-6 w-6 text-gray-400" /> : 
              <ChevronRight className="h-6 w-6 text-gray-400" />
            }
          </button>
          
          {expandedSection === 'proposal' && (
            <div className="px-6 pb-6 border-t border-gray-100">
              {/* Проблематика */}
              <div className="mt-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Исходная проблематика</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">Текущая ситуация</h4>
                    <ul className="text-red-800 space-y-1 text-sm">
                      <li>• ArtLine Engineering Version: пик мощности при 8200+ об/мин</li>
                      <li>• Регламентное ограничение: 8000 об/мин</li>
                      <li>• Гонщики регулярно достигают отсечки</li>
                      <li>• Негативное влияние на надежность</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Предлагаемое решение</h4>
                    <ul className="text-green-800 space-y-1 text-sm">
                      <li>• Торгмаш Версия: пик мощности при 7600 об/мин</li>
                      <li>• Работа в регламентном диапазоне</li>
                      <li>• Исключение отсечки оборотов</li>
                      <li>• Уменьшение инерционных нагрузок на 10,5%</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Сравнительные графики */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Сравнительный анализ характеристик</h3>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* График мощности */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Мощность (л.с.)</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="rpm" 
                          type="number"
                          domain={[3000, 8500]}
                          tickFormatter={(value) => `${value}`}
                        />
                        <YAxis domain={[50, 210]} />
                        <Tooltip 
                          labelFormatter={(label) => `${label} об/мин`}
                          formatter={(value) => `${Number(value).toFixed(1)} л.с.`}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="torgmash_hp" 
                          stroke="#2563eb" 
                          strokeWidth={2}
                          name="Торгмаш Версия"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="dk_hp" 
                          stroke="#dc2626" 
                          strokeWidth={2}
                          name="ArtLine Engineering Version"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* График крутящего момента */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Крутящий момент (Н·м)</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="rpm" 
                          type="number"
                          domain={[3000, 8500]}
                          tickFormatter={(value) => `${value}`}
                        />
                        <YAxis domain={[100, 220]} />
                        <Tooltip 
                          labelFormatter={(label) => `${label} об/мин`}
                          formatter={(value) => `${Number(value).toFixed(1)} Н·м`}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="torgmash_nm" 
                          stroke="#2563eb" 
                          strokeWidth={2}
                          name="Торгмаш Версия"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="dk_nm" 
                          stroke="#dc2626" 
                          strokeWidth={2}
                          name="ArtLine Engineering Version"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Интегральный анализ */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Интегральный анализ по диапазонам оборотов</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={integralData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis domain={[95, 115]} />
                      <Tooltip 
                        formatter={(value, name) => [
                          `${Number(value).toFixed(1)}%`, 
                          name === 'torgmash' ? 'Торгмаш' : 'ArtLine Engineering'
                        ]}
                      />
                      <Legend />
                      <Bar dataKey="dk" fill="#dc2626" name="ArtLine Engineering Version" />
                      <Bar dataKey="torgmash" fill="#2563eb" name="Торгмаш Версия" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-900">+3.7%</div>
                    <div className="text-blue-700">Низкие обороты</div>
                    <div className="text-sm text-blue-600">4400-5600 об/мин</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-900">+8.2%</div>
                    <div className="text-green-700">Средние обороты</div>
                    <div className="text-sm text-green-600">5600-7000 об/мин</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-900">+2.2%</div>
                    <div className="text-yellow-700">Высокие обороты</div>
                    <div className="text-sm text-yellow-600">7000-8000 об/мин</div>
                  </div>
                </div>
              </div>

              {/* Ключевые преимущества */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Ключевые преимущества перехода</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="border border-green-200 bg-green-50 p-6 rounded-lg">
                    <Shield className="h-8 w-8 text-green-600 mb-4" />
                    <h4 className="font-semibold text-green-900 mb-2">Повышение надежности</h4>
                    <ul className="text-green-800 space-y-1 text-sm">
                      <li>• Снижение скорости поршня на 10,5%</li>
                      <li>• Уменьшение инерционных нагрузок</li>
                      <li>• Исключение работы на отсечке</li>
                    </ul>
                    <Link 
                      href="/torgmash-proposal/analysis"
                      className="inline-flex items-center mt-3 text-green-700 hover:text-green-900 font-medium text-sm"
                    >
                      📊 Детальный анализ влияния нагрузок →
                    </Link>
                  </div>
                  
                  <div className="border border-blue-200 bg-blue-50 p-6 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-blue-600 mb-4" />
                    <h4 className="font-semibold text-blue-900 mb-2">Улучшение характеристик</h4>
                    <ul className="text-blue-800 space-y-1 text-sm">
                      <li>• Рост мощности до +5.7 л.с.</li>
                      <li>• Увеличение момента +5.04%</li>
                      <li>• Оптимизация под регламент</li>
                    </ul>
                  </div>
                  
                  <div className="border border-yellow-200 bg-yellow-50 p-6 rounded-lg">
                    <DollarSign className="h-8 w-8 text-yellow-600 mb-4" />
                    <h4 className="font-semibold text-yellow-900 mb-2">Экономическая эффективность</h4>
                    <ul className="text-yellow-800 space-y-1 text-sm">
                      <li>• Стоимость: 30 000 рублей</li>
                      <li>• Замена выпускного коллектора</li>
                      <li>• Минимальный простой</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Заключение */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Заключение и рекомендации</h3>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Общие интегральные показатели в рабочем диапазоне (4400-8000 об/мин):</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Интеграл крутящего момента:</strong> Торгмаш 686 530 vs ArtLine Engineering 653 600 Н·м·об/мин (+5.04%)</li>
                    <li><strong>Интеграл мощности:</strong> Торгмаш 605 590 vs ArtLine Engineering 576 980 л.с.·об/мин (+4.96%)</li>
                  </ul>
                  <div className="bg-white p-4 rounded border-l-4 border-green-500 mt-4">
                    <p className="font-semibold text-green-900">
                      Рекомендуется к немедленному внедрению для повышения надежности и конкурентоспособности автомобилей Legends EVO.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Раздел 3: Анализ влияния инерционных нагрузок */}
        <div className="bg-white border border-gray-200 rounded-lg mb-8">
          <button
            onClick={() => toggleSection('analysis')}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center">
              <Calculator className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Анализ влияния инерционных нагрузок</h2>
            </div>
            {expandedSection === 'analysis' ? 
              <ChevronDown className="h-6 w-6 text-gray-400" /> : 
              <ChevronRight className="h-6 w-6 text-gray-400" />
            }
          </button>
          
          {expandedSection === 'analysis' && (
            <div className="px-6 pb-6 border-t border-gray-100">
              <div className="mt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Математическое обоснование</h3>
                    <div className="space-y-4 text-gray-700">
                      <p>
                        Снижение инерционных нагрузок на <strong>10,5%</strong> в предлагаемой 
                        &quot;Торгмаш Версии&quot; имеет критическое значение для увеличения ресурса 
                        критических компонентов гоночного ДВС.
                      </p>
                      <p>
                        Согласно <strong>кривой Велера (S-N кривая)</strong>, зависимость между 
                        напряжением и количеством циклов до разрушения следует степенному закону 
                        с показателем m = 6-9 для высокопрочных сталей.
                      </p>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-purple-800 font-medium">
                          Формула: N₂/N₁ = (σ₁/σ₂)ᵐ
                        </p>
                        <p className="text-purple-700 text-sm mt-1">
                          При m=7: снижение нагрузки на 10,5% → увеличение ресурса в 2,1 раза
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Практическое влияние</h3>
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">Шатуны</h4>
                        <p className="text-green-800 text-sm">
                          Ресурс увеличивается с 1000 до 2100 минут (+110%)
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Поршни</h4>
                        <p className="text-blue-800 text-sm">
                          Ресурс увеличивается с 1000 до 1800 минут (+80%)
                        </p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-900 mb-2">Болты шатунов</h4>
                        <p className="text-yellow-800 text-sm">
                          Ресурс увеличивается с 1000 до 2400 минут (+140%)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Научная база расчетов</h3>
                  <div className="grid md:grid-cols-3 gap-6 text-sm">
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-2">Международные стандарты</h4>
                      <ul className="text-purple-700 space-y-1">
                        <li>• ASTM E466-15</li>
                        <li>• ISO 12107:2012</li>
                        <li>• DIN 50100</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Научные публикации</h4>
                      <ul className="text-blue-700 space-y-1">
                        <li>• Heywood &quot;Designing Against Fatigue&quot;</li>
                        <li>• Bannantine &quot;Metal Fatigue Analysis&quot;</li>
                        <li>• Suresh &quot;Fatigue of Materials&quot;</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-900 mb-2">Гоночные данные</h4>
                      <ul className="text-indigo-700 space-y-1">
                        <li>• SAE Paper 2019-01-0074</li>
                        <li>• NHRA Technical Reports</li>
                        <li>• MAHLE Motorsport Guidelines</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Link 
                      href="/torgmash-proposal/analysis"
                      className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Calculator className="h-5 w-5 mr-2" />
                      Полный анализ влияния инерционных нагрузок
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Контактная информация */}
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Торгмаш Инжиниринг</h3>
          <p className="text-gray-600">25+ лет экспертизы в разработке и производстве гоночных двигателей</p>
          <p className="text-sm text-gray-500 mt-2">
            Документ подготовлен на основании результатов стендовых испытаний двигателей
          </p>
        </div>
      </main>

    </div>
  );
} 