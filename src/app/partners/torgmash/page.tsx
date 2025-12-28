'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Settings, TrendingUp, Zap, ChevronRight, ChevronDown, Rocket, Gauge, Activity, Target } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { cn1600Data, cn1600Specs } from '@/lib/cn1600Data';

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

        {/* Раздел 2: CN 1600 - Концепт двигателя будущего */}
        <div className="bg-white border border-gray-200 rounded-lg mb-8">
          <button
            onClick={() => toggleSection('cn1600')}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center">
              <Rocket className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">CN 1600 - Концепт двигателя будущего</h2>
            </div>
            {expandedSection === 'cn1600' ?
              <ChevronDown className="h-6 w-6 text-gray-400" /> :
              <ChevronRight className="h-6 w-6 text-gray-400" />
            }
          </button>
          
          {expandedSection === 'cn1600' && (
            <div className="px-6 pb-6 border-t border-gray-100">
              {/* Описание проекта */}
              <div className="mt-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Описание проекта</h3>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Компания <strong>ArtLine</strong> планирует запуск производства новых спортивных прототипов
                      и обратилась к команде <strong>Торгмаш Инжиниринг</strong> с задачей спроектировать и
                      рассчитать современный гоночный двигатель.
                    </p>
                    <p>
                      <strong>Результат:</strong> CN 1600 Ver_1.1 - концепт высокооборотного двигателя объемом
                      1600 cc, разработанный с использованием передового программного обеспечения
                      <strong> 1D ENGINE SIMULATION</strong>.
                    </p>
                    <p className="text-purple-800 font-medium">
                      Проект демонстрирует возможности команды в области виртуального
                      проектирования и оптимизации силовых установок для спортивных применений.
                    </p>
                  </div>
                </div>
              </div>

              {/* Технические характеристики */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Технические характеристики</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-6 rounded-lg text-center border border-blue-200">
                    <Gauge className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-900">{cn1600Specs.displacement}</div>
                    <div className="text-blue-700 font-medium">cc</div>
                    <div className="text-sm text-blue-600 mt-1">Объем двигателя</div>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg text-center border border-green-200">
                    <Zap className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-900">{cn1600Specs.peakPower.value}</div>
                    <div className="text-green-700 font-medium">PS</div>
                    <div className="text-sm text-green-600 mt-1">@ {cn1600Specs.peakPower.rpm} об/мин</div>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-lg text-center border border-purple-200">
                    <Activity className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-purple-900">{cn1600Specs.peakTorque.value}</div>
                    <div className="text-purple-700 font-medium">N·m</div>
                    <div className="text-sm text-purple-600 mt-1">@ {cn1600Specs.peakTorque.rpm} об/мин</div>
                  </div>
                  
                  <div className="bg-orange-50 p-6 rounded-lg text-center border border-orange-200">
                    <Target className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-orange-900">{cn1600Specs.rpmRange.min}-{cn1600Specs.rpmRange.max}</div>
                    <div className="text-orange-700 font-medium">об/мин</div>
                    <div className="text-sm text-orange-600 mt-1">Рабочий диапазон</div>
                  </div>
                </div>
              </div>

              {/* Интерактивные графики */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Характеристики двигателя CN 1600 Ver_1.1</h3>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* График мощности */}
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Zap className="h-5 w-5 text-green-600 mr-2" />
                      Мощность (PS)
                    </h4>
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={cn1600Data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="rpm"
                          type="number"
                          domain={[3000, 8600]}
                          tickFormatter={(value) => `${value}`}
                          label={{ value: 'Обороты (об/мин)', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis
                          domain={[60, 220]}
                          label={{ value: 'Мощность (PS)', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip
                          labelFormatter={(label) => `${label} об/мин`}
                          formatter={(value) => [`${Number(value).toFixed(2)} PS`, 'Мощность']}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #10b981' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="power"
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={{ fill: '#10b981', r: 3 }}
                          activeDot={{ r: 6 }}
                          name="Мощность"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="mt-4 text-center">
                      <div className="inline-block bg-white px-4 py-2 rounded-lg border border-green-300">
                        <span className="text-sm text-gray-600">Пиковая мощность: </span>
                        <span className="font-bold text-green-700">{cn1600Specs.peakPower.value} PS @ {cn1600Specs.peakPower.rpm} об/мин</span>
                      </div>
                    </div>
                  </div>

                  {/* График крутящего момента */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Activity className="h-5 w-5 text-purple-600 mr-2" />
                      Крутящий момент (N·m)
                    </h4>
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={cn1600Data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="rpm"
                          type="number"
                          domain={[3000, 8600]}
                          tickFormatter={(value) => `${value}`}
                          label={{ value: 'Обороты (об/мин)', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis
                          domain={[130, 210]}
                          label={{ value: 'Момент (N·m)', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip
                          labelFormatter={(label) => `${label} об/мин`}
                          formatter={(value) => [`${Number(value).toFixed(2)} N·m`, 'Крутящий момент']}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #8b5cf6' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="torque"
                          stroke="#8b5cf6"
                          strokeWidth={3}
                          dot={{ fill: '#8b5cf6', r: 3 }}
                          activeDot={{ r: 6 }}
                          name="Крутящий момент"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="mt-4 text-center">
                      <div className="inline-block bg-white px-4 py-2 rounded-lg border border-purple-300">
                        <span className="text-sm text-gray-600">Пиковый момент: </span>
                        <span className="font-bold text-purple-700">{cn1600Specs.peakTorque.value} N·m @ {cn1600Specs.peakTorque.rpm} об/мин</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Программное обеспечение */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Программное обеспечение и методология</h3>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <div className="flex items-start">
                    <Settings className="h-12 w-12 text-blue-600 mr-4 flex-shrink-0" />
                    <div className="space-y-3 text-gray-700">
                      <p>
                        Расчет выполнен в программном комплексе <strong>1D ENGINE SIMULATION</strong>, который
                        позволяет с высокой точностью моделировать рабочие процессы двигателя,
                        оптимизировать газодинамику впускных и выпускных систем, подбирать
                        оптимальные фазы газораспределения.
                      </p>
                      <p>
                        Виртуальное проектирование позволило достичь оптимальных характеристик
                        еще до изготовления физического прототипа, что существенно сокращает
                        время и стоимость разработки.
                      </p>
                      <div className="bg-white p-4 rounded border-l-4 border-blue-500 mt-4">
                        <p className="font-semibold text-blue-900">
                          Точность моделирования: ±2-3% от реальных стендовых испытаний
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Преимущества для спортпрототипов */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Преимущества для спортпрототипов</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <TrendingUp className="h-8 w-8 text-green-600 mb-4" />
                    <h4 className="font-semibold text-green-900 mb-3">Широкое плато крутящего момента</h4>
                    <p className="text-green-800 text-sm mb-2">
                      185-200 N·m в диапазоне 5000-7000 об/мин
                    </p>
                    <ul className="text-green-700 space-y-1 text-sm">
                      <li>• Отличная тяга на средних оборотах</li>
                      <li>• Предсказуемое поведение на треке</li>
                      <li>• Легкость управления для пилота</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <Zap className="h-8 w-8 text-blue-600 mb-4" />
                    <h4 className="font-semibold text-blue-900 mb-3">Высокая удельная мощность</h4>
                    <p className="text-blue-800 text-sm mb-2">
                      {cn1600Specs.specificPower.toFixed(1)} PS/литр
                    </p>
                    <ul className="text-blue-700 space-y-1 text-sm">
                      <li>• Конкурентоспособность в классе</li>
                      <li>• Компактные размеры и малый вес</li>
                      <li>• Эффективное использование объема</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                    <Target className="h-8 w-8 text-purple-600 mb-4" />
                    <h4 className="font-semibold text-purple-900 mb-3">Оптимизация под гоночные условия</h4>
                    <p className="text-purple-800 text-sm mb-2">
                      Широкий рабочий диапазон {cn1600Specs.rpmRange.min}-{cn1600Specs.rpmRange.max} об/мин
                    </p>
                    <ul className="text-purple-700 space-y-1 text-sm">
                      <li>• Линейная характеристика мощности</li>
                      <li>• Минимальные провалы в тяге</li>
                      <li>• Оптимальная работа трансмиссии</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Заключение */}
              <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 p-6 rounded-lg border border-purple-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Заключение</h3>
                <div className="space-y-3 text-gray-700">
                  <p>
                    Двигатель <strong>CN 1600 Ver_1.1</strong> представляет собой современное решение
                    для спортивных прототипов, сочетающее высокую мощность, широкий рабочий диапазон
                    и надежность конструкции.
                  </p>
                  <p>
                    Проект демонстрирует возможности команды <strong>Торгмаш Инжиниринг</strong> в области
                    виртуального проектирования с использованием передового программного обеспечения
                    <strong> 1D ENGINE SIMULATION</strong>.
                  </p>
                  <div className="bg-white p-4 rounded border-l-4 border-purple-500 mt-4">
                    <p className="font-semibold text-purple-900">
                      Готовы к дальнейшей оптимизации и адаптации под конкретные требования заказчика.
                    </p>
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