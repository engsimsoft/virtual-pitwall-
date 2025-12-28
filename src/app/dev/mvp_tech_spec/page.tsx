'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DevNavigation from '../../../components/DevNavigation'
import { Cpu, Wifi, Database, Shield, Zap, Activity, MapPin, Settings } from 'lucide-react'

export default function MVPTechSpec() {
  const router = useRouter()

  useEffect(() => {
    if (sessionStorage.getItem('dev-access') !== 'granted') {
      router.push('/dev')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50">
      <DevNavigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            MVP Technical Specification
          </h1>
          <p className="text-lg text-gray-600">
            Полная техническая спецификация системы телеметрии для гоночной серии
          </p>
        </div>

        {/* Что такое MVP */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
            <Settings className="w-6 h-6 mr-3 text-blue-600" />
            💡 Что такое MVP?
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <div className="bg-white p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">MVP = Minimum Viable Product</h3>
                <p className="text-gray-700 mb-4">
                  <strong>Минимально жизнеспособный продукт</strong> - самая простая версия продукта, которая:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    ✅ Решает основную проблему клиента
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    ✅ Можно быстро сделать и запустить
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    ✅ Позволяет получить обратную связь
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    ❌ НЕ включает все возможные функции
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <div className="bg-white p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">🚀 Зачем MVP подход?</h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium text-green-800">Быстрый запуск</div>
                      <div className="text-sm text-green-600">3-4 месяца vs 12+ месяцев полная версия</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium text-blue-800">Проверка спроса</div>
                      <div className="text-sm text-blue-600">Готовы ли платить за базовые функции?</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium text-purple-800">Обратная связь</div>
                      <div className="text-sm text-purple-600">Что реально важно пользователям?</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium text-yellow-800">Деньги раньше</div>
                      <div className="text-sm text-yellow-600">Начинаем зарабатывать быстрее</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* MVP границы для нашей телеметрии */}
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-3">✅ Включаем в MVP (приоритет 1)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Сбор данных с CAN шины IPAC</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>GPS координаты и скорость</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Передача в облако (real-time)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Простой веб-интерфейс Live Timing</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Базовые алерты (превышение оборотов)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Экспорт для MoTeC i2 Pro</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Race Control мониторинг нарушений</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-green-50 rounded text-xs">
                <strong>Этого достаточно, чтобы:</strong><br/>
                • Промоутер видел нарушения регламента<br/>
                • Команды получали данные для анализа<br/>
                • Система окупалась и приносила пользу
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <h3 className="text-lg font-semibold text-red-800 mb-3">❌ НЕ включаем в MVP (v2.0+)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span>Сложный траекторный анализ</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span>Детальное сравнение кругов</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span>ML-рекомендации по настройке</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span>Мобильное приложение</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span>Социальные функции и рейтинги</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span>Интеграция с внешними API</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span>Продвинутая аналитика с ИИ</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-red-50 rounded text-xs">
                <strong>Отложено потому что:</strong><br/>
                • Сложно в разработке (месяцы работы)<br/>
                • Неясна ценность для пользователей<br/>
                • Можем добавить после получения feedback
              </div>
            </div>
          </div>
        </div>

        {/* Концепция проекта */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Zap className="w-6 h-6 mr-3 text-blue-600" />
            🎯 Концепция проекта
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Цель проекта</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <strong>Real-time мониторинг</strong> всех участников соревнований
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <strong>Автоматический контроль</strong> соблюдения регламента
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <strong>Интеграция с MoTeC i2 Pro</strong> (мировой стандарт)
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <strong>Траекторный анализ</strong> уровня AIM/MoTeC
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <strong>Борьба с читерством</strong> через объективные данные
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">MVP vs Полная версия</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-4">
                  <h4 className="font-medium text-green-700 mb-2">✅ MVP (4 месяца):</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Live timing</li>
                    <li>• Базовые алерты</li>
                    <li>• MoTeC экспорт</li>
                    <li>• Простая карта трассы</li>
                    <li>• Race Control</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">🚀 Полная версия (12+ месяцев):</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Траекторный анализ</li>
                    <li>• ML-рекомендации</li>
                    <li>• Сравнение кругов</li>
                    <li>• Детальная аналитика</li>
                    <li>• Мобильное приложение</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Техническая архитектура */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Cpu className="w-6 h-6 mr-3 text-green-600" />
            🔧 Техническая архитектура
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Бортовой регистратор */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Cpu className="w-5 h-5 mr-2 text-green-600" />
                Бортовой регистратор
              </h3>
              <div className="space-y-2 text-sm">
                <div><strong>Контроллер:</strong> ESP32 WROOM-32</div>
                <div><strong>CAN:</strong> MCP2515 (SPI)</div>
                <div><strong>LTE:</strong> SIMCOM A7672E</div>
                <div><strong>GPS:</strong> u-blox NEO-9M</div>
                <div><strong>IMU:</strong> Bosch BMX055 (9-axis)</div>
                <div><strong>Память:</strong> 32GB microSD</div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded text-xs">
                <strong>BMX055 Характеристики:</strong><br/>
                • 3-осевой акселерометр (±16g)<br/>
                • 3-осевой гироскоп (±2000°/s)<br/>
                • 3-осевой магнетометр<br/>
                • Частота: до 2000 Hz<br/>
                • 14-бит АЦП
              </div>
            </div>

            {/* Протокол данных */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Database className="w-5 h-5 mr-2 text-blue-600" />
                Протокол данных
              </h3>
              <div className="space-y-2 text-sm">
                <div><strong>Формат:</strong> Protocol Buffers</div>
                <div><strong>Сжатие:</strong> до 10x меньше JSON</div>
                <div><strong>Безопасность:</strong> HMAC-SHA256</div>
                <div><strong>Частота:</strong> 25Hz основные данные</div>
                <div><strong>IMU частота:</strong> 100Hz</div>
              </div>
              
              <div className="mt-4 p-3 bg-green-50 rounded text-xs">
                <strong>Основные каналы:</strong><br/>
                • Engine RPM, Coolant Temp<br/>
                • GPS Lat/Lng, Speed<br/>
                • Lateral/Longitudinal G<br/>
                • Roll/Pitch/Yaw<br/>
                • Oil Pressure, Throttle
              </div>
            </div>

            {/* Облачная платформа */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Wifi className="w-5 h-5 mr-2 text-purple-600" />
                Облачная платформа
              </h3>
              <div className="space-y-2 text-sm">
                <div><strong>Хостинг:</strong> Railway Cloud</div>
                <div><strong>Backend:</strong> Node.js + Express</div>
                <div><strong>База:</strong> PostgreSQL</div>
                <div><strong>Кэш:</strong> Redis</div>
                <div><strong>WebSocket:</strong> Real-time данные</div>
                <div><strong>Uptime:</strong> 99.9%</div>
              </div>
              
              <div className="mt-4 p-3 bg-purple-50 rounded text-xs">
                <strong>Производительность:</strong><br/>
                • 25Hz на канал данных<br/>
                • Алерты &lt; 1 секунды<br/>
                • До 1000+ автомобилей<br/>
                • Масштабируемость
              </div>
            </div>
          </div>
        </div>

        {/* Гибридная стратегия передачи */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Wifi className="w-6 h-6 mr-3 text-orange-600" />
            📡 Гибридная стратегия передачи данных
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-3">🟢 Хорошая LTE связь</h3>
              <div className="text-sm text-green-700 space-y-2">
                <div className="font-mono bg-white p-2 rounded text-xs">
                  ESP32 → LTE → Облако → Real-time
                </div>
                <ul className="space-y-1">
                  <li>• Мгновенная передача</li>
                  <li>• Live timing в реальном времени</li>
                  <li>• Немедленные алерты</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-3">🟡 Плохая связь</h3>
              <div className="text-sm text-yellow-700 space-y-2">
                <div className="font-mono bg-white p-2 rounded text-xs">
                  ESP32 → SD → WiFi → Облако
                </div>
                <ul className="space-y-1">
                  <li>• Запись локально</li>
                  <li>• Синхронизация в питлейн</li>
                  <li>• Восстановление live timing</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-800 mb-3">🔴 Критические алерты</h3>
              <div className="text-sm text-red-700 space-y-2">
                <div className="font-mono bg-white p-2 rounded text-xs">
                  ESP32 → Приоритет → Уведомления
                </div>
                <ul className="space-y-1">
                  <li>• Аварии (&gt;8G удар)</li>
                  <li>• Переворот (&gt;90° крен)</li>
                  <li>• Критические температуры</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Система контроля регламента */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Shield className="w-6 h-6 mr-3 text-red-600" />
            🏁 Система контроля регламента
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Real-time мониторинг нарушений</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-red-50 rounded-lg">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium text-red-800">Обороты двигателя</div>
                    <div className="text-sm text-red-600">Мгновенный алерт при &gt;8000 об/мин</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium text-yellow-800">Максимальная скорость</div>
                    <div className="text-sm text-yellow-600">Контроль по участкам трассы</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium text-orange-800">Аномальное ускорение</div>
                    <div className="text-sm text-orange-600">Выявление подозрительных значений</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium text-blue-800">Температурные режимы</div>
                    <div className="text-sm text-blue-600">Контроль перегрева компонентов</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Контроль с BMX055 IMU</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Лимиты G-сил:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div>Поперечные: <span className="font-mono text-red-600">3.5G</span></div>
                  <div>Продольные: <span className="font-mono text-red-600">4.0G</span></div>
                  <div>Крен: <span className="font-mono text-red-600">45°</span></div>
                  <div>Тангаж: <span className="font-mono text-red-600">30°</span></div>
                </div>
                
                <h4 className="font-medium text-gray-800 mb-2">Система безопасности:</h4>
                <div className="space-y-1 text-sm">
                  <div>🚨 <strong>КРИТИЧЕСКИЙ:</strong> Переворот &gt;90°</div>
                  <div>⚠️ <strong>АВАРИЯ:</strong> Удар &gt;8G</div>
                  <div>🟡 <strong>ПРЕВЫШЕНИЕ:</strong> G-силы выше лимита</div>
                  <div>📊 <strong>АНАЛИЗ:</strong> Агрессивное вождение</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MoTeC Integration */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Activity className="w-6 h-6 mr-3 text-indigo-600" />
            📊 Интеграция с MoTeC i2 Pro
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Автоматическая конвертация</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Преобразование телеметрии в .ld файлы
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Сохранение всех каналов с правильной структурой
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Корректное масштабирование и единицы
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Временная синхронизация данных
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">IMU каналы в i2 Pro</h3>
              <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-1 font-medium">Канал</th>
                      <th className="text-left py-1 font-medium">Единицы</th>
                      <th className="text-left py-1 font-medium">Частота</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-1">
                    <tr><td>Engine_RPM</td><td>rpm</td><td>25Hz</td></tr>
                    <tr><td>Coolant_Temp</td><td>°C</td><td>25Hz</td></tr>
                    <tr><td>Ground_Speed</td><td>km/h</td><td>25Hz</td></tr>
                    <tr><td>Lateral_G</td><td>g</td><td>100Hz</td></tr>
                    <tr><td>Longitudinal_G</td><td>g</td><td>100Hz</td></tr>
                    <tr><td>Roll_Angle</td><td>deg</td><td>50Hz</td></tr>
                    <tr><td>Pitch_Angle</td><td>deg</td><td>50Hz</td></tr>
                    <tr><td>Yaw_Rate</td><td>deg/s</td><td>100Hz</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Траекторный анализ */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-6 h-6 mr-3 text-teal-600" />
            🛣️ Система траекторного анализа
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-teal-50 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-800 mb-3">GPS + IMU фьюжн</h3>
              <div className="text-sm text-teal-700 space-y-2">
                <div>• Kalman Filter для повышения точности</div>
                <div>• Компенсация задержки GPS (150ms)</div>
                <div>• Сглаживание траектории</div>
                <div>• Предсказание позиции по IMU</div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-3">Автодетекция трассы</h3>
              <div className="text-sm text-blue-700 space-y-2">
                <div>• Поиск повторяющихся кругов</div>
                <div>• Усредненная линия трассы</div>
                <div>• Автоматические сектора</div>
                <div>• Определение направления</div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-3">Визуализация</h3>
              <div className="text-sm text-purple-700 space-y-2">
                <div>• Heat Map скоростей</div>
                <div>• Time Delta по дистанции</div>
                <div>• Цветовая траектория</div>
                <div>• Сравнение кругов</div>
              </div>
            </div>
          </div>
        </div>

        {/* База данных */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Database className="w-6 h-6 mr-3 text-gray-600" />
            💾 Структура базы данных PostgreSQL
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Основные таблицы</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-medium text-gray-800">sessions</div>
                  <div className="text-sm text-gray-600">id, track_id, session_type, start_time, status</div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-medium text-gray-800">telemetry_points</div>
                  <div className="text-sm text-gray-600">session_id, car_id, timestamp, gps_lat/lng, rpm, speed, g-forces</div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-medium text-gray-800">lap_times</div>
                  <div className="text-sm text-gray-600">session_id, car_id, lap_number, lap_time, sector_times, trajectory_data</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Дополнительные таблицы</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-medium text-gray-800">alerts</div>
                  <div className="text-sm text-gray-600">session_id, car_id, alert_type, severity, timestamp, acknowledged</div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-medium text-gray-800">track_layouts</div>
                  <div className="text-sm text-gray-600">id, name, country, svg_path, sectors, reference_line</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 