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

        {/* Call to Action */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Готовы увидеть систему в действии?
          </h2>
          <p className="text-gray-600 mb-4">
            Протестируйте возможности системы на интерактивном демо
          </p>
          <Link 
            href="/demo"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 inline-flex items-center gap-2"
          >
            <BarChart3 className="w-5 h-5" />
            Открыть демо
          </Link>
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