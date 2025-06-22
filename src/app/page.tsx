import Link from 'next/link'
import { AlertTriangle, CheckCircle, Activity, Database, Clock, Users, Lock } from 'lucide-react'
import CommentSystem from '@/components/CommentSystem'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header - профессиональный стиль */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-gray-900">
                🏁 Virtual Pitwall
              </div>
              <div className="hidden sm:block text-sm text-gray-500 border-l pl-4">
                Система телеметрии и контроля регламента
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/about" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                📚 Начать здесь
              </Link>
              <Link href="/" className="text-red-600 font-medium">
                Virtual Pitwall
              </Link>
              <Link href="/features" className="text-gray-700 hover:text-red-600 font-medium">
                Features
              </Link>
              <Link href="/shortcut" className="text-gray-700 hover:text-red-600 font-medium">
                DK Racing
              </Link>
              <Link href="/dev" className="text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1" title="Техническая документация (требует пароль)">
                <Lock className="w-4 h-4" />
                Developer
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* System Status Dashboard */}
      <section className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Система мониторинга телеметрии
          </h1>
          <p className="text-gray-600">
            Real-time контроль параметров автомобиля и соблюдения регламента гоночной серии
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Статус системы</h3>
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Uptime</span>
                <span className="font-mono font-semibold text-green-600">99.9%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Задержка</span>
                <span className="font-mono font-semibold text-green-600">&lt; 1с</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Частота данных</span>
                <span className="font-mono font-semibold text-blue-600">25 Hz</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Активные сессии</h3>
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Race Control</span>
                <span className="font-mono font-semibold text-green-600">ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Команды</span>
                <span className="font-mono font-semibold text-blue-600">12/24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Автомобили</span>
                <span className="font-mono font-semibold text-blue-600">18/24</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Нарушения</h3>
              <AlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">За сегодня</span>
                <span className="font-mono font-semibold text-orange-600">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Критичные</span>
                <span className="font-mono font-semibold text-red-600">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Предупреждения</span>
                <span className="font-mono font-semibold text-orange-600">2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Быстрые действия</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              href="/demo"
              className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium text-center hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Activity className="w-5 h-5" />
              Открыть демо
            </Link>
            <Link 
              href="/features"
              className="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium text-center hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Database className="w-5 h-5" />
              Возможности
            </Link>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              История сессий
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Управление
            </button>
          </div>
        </div>

        {/* System Capabilities */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Основные возможности</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">Real-time мониторинг</div>
                  <div className="text-sm text-gray-600">Мгновенные алерты при превышении лимитов</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">Автоматический контроль</div>
                  <div className="text-sm text-gray-600">Проверка соблюдения технического регламента</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">Интеграция MoTeC</div>
                  <div className="text-sm text-gray-600">Прямое подключение к i2 Pro системе</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">Облачный доступ</div>
                  <div className="text-sm text-gray-600">Работа из любой точки трассы</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Технические параметры</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Задержка алертов</span>
                  <span className="font-mono text-xl font-bold text-green-600">&lt; 1с</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '95%'}}></div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Частота обновления</span>
                  <span className="font-mono text-xl font-bold text-blue-600">25 Hz</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Uptime системы</span>
                  <span className="font-mono text-xl font-bold text-green-600">99.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '99%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="text-center text-gray-600">
            <p>© 2025 Virtual Pitwall. Система телеметрии для гоночных серий.</p>
          </div>
        </div>
      </footer>

      {/* Comment System */}
      <CommentSystem pageId="home" pageName="Virtual Pitwall - Главная" />
    </div>
  )
}
