import Link from 'next/link'
import { CheckCircle, AlertTriangle, Clock, Shield, BarChart3, Zap, Database, Radio, Eye } from 'lucide-react'
import CommentSystem from '@/components/CommentSystem'
import Navigation from '@/components/Navigation'

export default function Features() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation title="🏁 Virtual Pitwall" />

      <div className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Возможности системы телеметрии
          </h1>
          <p className="text-gray-600">
            Полный функционал для контроля параметров автомобиля и соблюдения регламента
          </p>
        </div>

        {/* Core Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Real-time Monitoring */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Real-time мониторинг</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Контролируемые параметры:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Температура двигателя (вода, масло)</li>
                  <li>• Давление топлива и масла</li>
                  <li>• Обороты двигателя (RPM)</li>
                  <li>• Скорость автомобиля</li>
                  <li>• Положение дроссельной заслонки</li>
                  <li>• Температура выхлопных газов</li>
                </ul>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-gray-600">Частота обновления: <strong className="font-mono">25 Hz</strong></span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-gray-600">Задержка алертов: <strong className="font-mono">&lt; 1 секунды</strong></span>
              </div>
            </div>
          </div>

          {/* Regulation Control */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Контроль регламента</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Автоматические проверки:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Превышение максимальных оборотов</li>
                  <li>• Критические температуры</li>
                  <li>• Аномальные давления</li>
                  <li>• Нестандартное поведение ЭБУ</li>
                  <li>• Соответствие техническому регламенту</li>
                  <li>• Флаговая сигнализация</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-red-100 text-red-800 p-2 rounded text-center font-medium">
                  КРИТИЧНО
                </div>
                <div className="bg-yellow-100 text-yellow-800 p-2 rounded text-center font-medium">
                  ВНИМАНИЕ
                </div>
                <div className="bg-green-100 text-green-800 p-2 rounded text-center font-medium">
                  НОРМА
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Как работает система
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
                <Radio className="w-8 h-8 text-blue-600 mx-auto" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">1. Сбор данных</h3>
              <p className="text-sm text-gray-600">Бортовой регистратор получает данные с ЭБУ автомобиля</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
                <Database className="w-8 h-8 text-green-600 mx-auto" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">2. Передача</h3>
              <p className="text-sm text-gray-600">Данные передаются в облачную систему в реальном времени</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
                <BarChart3 className="w-8 h-8 text-purple-600 mx-auto" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">3. Анализ</h3>
              <p className="text-sm text-gray-600">Автоматическая проверка соответствия регламенту</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
                <AlertTriangle className="w-8 h-8 text-red-600 mx-auto" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">4. Уведомления</h3>
              <p className="text-sm text-gray-600">Мгновенные алерты при обнаружении нарушений</p>
            </div>
          </div>
        </div>

        {/* Hybrid Data Strategy */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            🛡️ Гибридная стратегия передачи данных
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Система адаптируется к условиям связи для гарантированной работы на любом треке
          </p>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Good Connection Scenario */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Хорошая LTE связь</h3>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                  Стандартные треки
                </div>
              </div>
              
              <div className="mb-4">
                <div className="bg-white border border-green-200 rounded-lg p-4">
                  <div className="font-mono text-sm text-gray-800 mb-2">
                    ESP32 → LTE → Облако → Real-time интерфейсы
                  </div>
                  <div className="text-xs text-gray-600">
                    Прямая передача данных с минимальной задержкой
                  </div>
                </div>
              </div>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Мгновенная передача данных</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Live timing в реальном времени</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Немедленные алерты</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Задержка &lt; 1 секунды</span>
                </li>
              </ul>
            </div>

            {/* Poor Connection Scenario */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Shield className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Плохая связь</h3>
                <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                  Казань Ринг и подобные
                </div>
              </div>
              
              <div className="mb-4">
                <div className="bg-white border border-yellow-200 rounded-lg p-4">
                  <div className="font-mono text-sm text-gray-800 mb-2">
                    ESP32 → SD Card → WiFi в питлейн → Облако
                  </div>
                  <div className="text-xs text-gray-600">
                    Локальное хранение с синхронизацией в зонах покрытия
                  </div>
                </div>
              </div>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-600" />
                  <span>Запись всех данных локально на SD карту</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-600" />
                  <span>Автоматическая синхронизация при въезде в питлейн</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-600" />
                  <span>Восстановление live timing после синхронизации</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-600" />
                  <span>Буферизация критических алертов</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Technical Details */}
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              Техническая реализация гибридной системы
            </h4>
            
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Умное переключение режимов</h5>
                <ul className="space-y-1 text-gray-600">
                  <li>• Автоматическое определение качества сигнала</li>
                  <li>• Переход в offline режим при потере связи</li>
                  <li>• Восстановление online режима при появлении сигнала</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Буферизация данных</h5>
                <ul className="space-y-1 text-gray-600">
                  <li>• SD карта 32GB для хранения сессий</li>
                  <li>• Сжатие данных для экономии места</li>
                  <li>• Приоритизация критических алертов</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Синхронизация</h5>
                <ul className="space-y-1 text-gray-600">
                  <li>• WiFi точки доступа в питлейн зонах</li>
                  <li>• Автоматическая передача накопленных данных</li>
                  <li>• Проверка целостности после синхронизации</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Для Race Control</h2>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">Мониторинг всех автомобилей</div>
                  <div className="text-sm text-gray-600">Единый центр контроля за соблюдением регламента</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">Автоматические алерты</div>
                  <div className="text-sm text-gray-600">Мгновенные уведомления о нарушениях</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">Доказательная база</div>
                  <div className="text-sm text-gray-600">Записи данных для технических протестов</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">Борьба с читерством</div>
                  <div className="text-sm text-gray-600">Выявление несанкционированных модификаций</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Для команд</h2>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">Контроль своих автомобилей</div>
                  <div className="text-sm text-gray-600">Мониторинг состояния техники в реальном времени</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">Предупреждение поломок</div>
                  <div className="text-sm text-gray-600">Ранние предупреждения о критических параметрах</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">Интеграция с MoTeC</div>
                  <div className="text-sm text-gray-600">Прямое подключение к существующей системе анализа</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">Стратегическое планирование</div>
                  <div className="text-sm text-gray-600">Данные для принятия решений о пит-стопах</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Технические характеристики</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Производительность</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Частота данных:</span>
                  <span className="font-mono font-medium">25 Hz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Задержка алертов:</span>
                  <span className="font-mono font-medium">&lt; 1 сек</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Uptime системы:</span>
                  <span className="font-mono font-medium">99.9%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Макс. автомобилей:</span>
                  <span className="font-mono font-medium">50+</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Интеграция</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">MoTeC i2 Pro:</span>
                  <span className="text-green-600 font-medium">✓ Поддерживается</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Облачный доступ:</span>
                  <span className="text-green-600 font-medium">✓ Доступен</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">API интеграция:</span>
                  <span className="text-green-600 font-medium">✓ REST/WebSocket</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Мобильное приложение:</span>
                  <span className="text-blue-600 font-medium">В разработке</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Безопасность</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Шифрование:</span>
                  <span className="text-green-600 font-medium">✓ AES-256</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Аутентификация:</span>
                  <span className="text-green-600 font-medium">✓ OAuth 2.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Резервные копии:</span>
                  <span className="text-green-600 font-medium">✓ Автоматически</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Аудит логов:</span>
                  <span className="text-green-600 font-medium">✓ Полный</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Demos Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
            🚀 Попробуйте в действии
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Интерактивные демо показывают real-time возможности системы
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Fleet Control Demo */}
            <Link href="/rental-management" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Database className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    Business Solution
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Цифровой паспорт техники
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Узнайте, как телеметрия решает проблему информационной асимметрии между производителями, командами и пилотами
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-medium text-sm group-hover:text-blue-700">
                    Открыть Fleet Control →
                  </span>
                  <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Track Management Demo */}
            <Link href="/tracks" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                    Future Vision
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  Система управления треками
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Централизованная система рекордов и статистики для 7 треков с автоматическим определением достижений
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-purple-600 font-medium text-sm group-hover:text-purple-700">
                    Исследовать систему →
                  </span>
                  <div className="bg-purple-50 p-2 rounded-lg group-hover:bg-purple-100 transition-colors">
                    <BarChart3 className="w-4 h-4 text-purple-600" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Team Demo */}
            <Link href="/shortcut/demo" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-green-300 hover:shadow-lg transition-all duration-200 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                    Live Demo
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  Взгляд изнутри команды
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Посмотрите на real-time мониторинг 5 автомобилей глазами команды - G-G диаграммы, алерты, анализ
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-medium text-sm group-hover:text-green-700">
                    Запустить Team Demo →
                  </span>
                  <div className="bg-green-50 p-2 rounded-lg group-hover:bg-green-100 transition-colors">
                    <Zap className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              </div>
            </Link>

            {/* DK Demo */}
            <Link href="/shortcut/dk" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-red-300 hover:shadow-lg transition-all duration-200 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-100 p-3 rounded-lg group-hover:bg-red-200 transition-colors">
                    <Eye className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
                    Interactive
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  Панорама гоночного уикенда
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Оцените полную картину: 20 автомобилей, 4 команды, таблица результатов с телеметрией
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-medium text-sm group-hover:text-red-700">
                    Посмотреть DK Demo →
                  </span>
                  <div className="bg-red-50 p-2 rounded-lg group-hover:bg-red-100 transition-colors">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>


      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="text-center text-gray-600">
            <p>© 2025 Virtual Pitwall. Система телеметрии для гоночных серий.</p>
          </div>
        </div>
      </footer>

      {/* Comment System */}
      <CommentSystem pageId="features" pageName="Features - Возможности системы" />
    </div>
  )
} 