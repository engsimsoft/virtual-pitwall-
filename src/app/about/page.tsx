import { MessageSquare, Users, Code, Shield, Lightbulb, Zap, Target, Rocket, Eye, Lock } from 'lucide-react'
import Link from 'next/link'
import CommentSystem from '@/components/CommentSystem'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Virtual Pitwall
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-red-600 transition-colors">Virtual Pitwall</Link>
              <Link href="/features" className="text-gray-600 hover:text-red-600 transition-colors">Features</Link>
              <Link href="/shortcut" className="text-gray-600 hover:text-red-600 transition-colors">DK Racing</Link>
              <Link href="/about" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">📚 Начать здесь</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Современная разработка продуктов
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Добро пожаловать в новую эру совместного создания технологических решений. 
            Этот проект - не просто сайт, а <span className="text-red-600 font-semibold">живая платформа для совместной работы</span> над вашим продуктом.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 max-w-4xl mx-auto rounded-r-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-2xl">🖥️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Desktop Pitwall Experience
                </h3>
                <p className="text-blue-800 mb-2">
                  Эта веб-платформа разработана специально для <strong>настольных компьютеров и ноутбуков</strong>. 
                  Как настоящий pitwall в Формуле 1 - для полноценной работы инженеров требуется большой экран.
                </p>
                <div className="text-sm text-blue-700">
                  <div>✅ Оптимально: 1920x1080 и выше</div>
                  <div>✅ Множественные графики и данные одновременно</div>
                  <div>✅ Профессиональный инструмент для команд</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Development Process */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Как это работает</h2>
            <p className="text-lg text-gray-700">Современная методология совместной разработки продуктов</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Вы исследуете</h3>
              <p className="text-gray-600 mb-4">
                Изучаете все страницы проекта, тестируете функции, смотрите демо. 
                Видите как будет выглядеть финальный продукт.
              </p>
              <div className="text-sm text-green-700 font-medium">
                ↗ Открытая часть проекта
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Вы комментируете</h3>
              <p className="text-gray-600 mb-4">
                Оставляете комментарии о том, что нравится, что нужно изменить, 
                какие функции добавить. Ваше мнение - основа для улучшений.
              </p>
              <div className="text-sm text-blue-700 font-medium">
                ↔ Обратная связь в реальном времени
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Мы воплощаем</h3>
              <p className="text-gray-600 mb-4">
                Команда разработчиков видит ваши комментарии и воплощает пожелания в коде. 
                Продукт эволюционирует под ваши потребности.
              </p>
              <div className="text-sm text-purple-700 font-medium">
                ⚡ Быстрые итерации
              </div>
            </div>
          </div>
        </div>

        {/* Comment System Guide */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-16">
          <div className="flex items-center mb-6">
            <MessageSquare className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Система комментариев</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Как оставить комментарий</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Найдите синюю кнопку</div>
                    <div className="text-sm text-gray-600">Плавающая кнопка комментариев на каждой странице</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Введите ваше имя</div>
                    <div className="text-sm text-gray-600">Для идентификации комментариев</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Выберите категорию</div>
                    <div className="text-sm text-gray-600">Поможет команде правильно обработать ваш отзыв</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">4</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Опишите ваши мысли</div>
                    <div className="text-sm text-gray-600">Чем детальнее, тем лучше результат</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Категории комментариев</h3>
              <div className="space-y-4">
                <div className="border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                    <div className="font-medium text-purple-900">UI/UX</div>
                  </div>
                  <p className="text-sm text-purple-800">
                    <strong>User Interface / User Experience</strong> - внешний вид, удобство использования, 
                    расположение кнопок, цвета, размеры, навигация
                  </p>
                </div>

                <div className="border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <div className="font-medium text-blue-900">Функционал</div>
                  </div>
                  <p className="text-sm text-blue-800">
                    Новые возможности, изменение логики работы, дополнительные функции, 
                    которые вы хотели бы видеть в системе
                  </p>
                </div>

                <div className="border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <div className="font-medium text-green-900">Техническое</div>
                  </div>
                  <p className="text-sm text-green-800">
                    Ошибки, баги, проблемы с производительностью, предложения по 
                    техническим улучшениям
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <Lightbulb className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
              <div>
                <div className="font-medium text-yellow-900 mb-1">Совет</div>
                <div className="text-sm text-yellow-800">
                  Ваши комментарии видят все участники команды. Будьте конкретны в описаниях - 
                  это поможет быстрее воплотить ваши идеи в жизнь.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Glossary */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <div className="flex items-center mb-6">
            <Target className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Словарь терминов</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-900 mb-2">Frontend (Фронтенд)</div>
                <div className="text-sm text-gray-700">
                  Видимая часть проекта - интерфейс, с которым взаимодействует пользователь. 
                  Это то, что вы видите в браузере.
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-900 mb-2">Backend (Бэкенд)</div>
                <div className="text-sm text-gray-700">
                  Скрытая серверная часть - обработка данных, логика работы, базы данных. 
                  Секретная информация для разработчиков.
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-900 mb-2">Real-time (Реал-тайм)</div>
                <div className="text-sm text-gray-700">
                  Обновление данных в режиме реального времени, без перезагрузки страницы. 
                  Как в гоночной телеметрии.
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-900 mb-2">API (АПИ)</div>
                <div className="text-sm text-gray-700">
                  Application Programming Interface - способ обмена данными между 
                  различными частями системы.
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-900 mb-2">Responsive (Адаптивный)</div>
                <div className="text-sm text-gray-700">
                  Дизайн, который корректно отображается на разных устройствах - 
                  компьютеры, планшеты, телефоны.
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-900 mb-2">Dashboard (Дашборд)</div>
                <div className="text-sm text-gray-700">
                  Панель управления с ключевой информацией и элементами управления. 
                  Как приборная панель автомобиля.
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-900 mb-2">Deploy (Деплой)</div>
                <div className="text-sm text-gray-700">
                  Размещение готового продукта в интернете, чтобы им могли пользоваться 
                  пользователи по всему миру.
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-900 mb-2">Iteration (Итерация)</div>
                <div className="text-sm text-gray-700">
                  Цикл разработки: получение обратной связи → внесение изменений → 
                  тестирование → следующая итерация.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mb-16">
          <div className="flex items-center mb-6">
            <Shield className="w-8 h-8 text-red-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Безопасность и доступ</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="text-xl font-semibold text-green-900">Открытая зона</h3>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm text-gray-700 space-y-2">
                  <div>✅ Все основные страницы проекта</div>
                  <div>✅ Демо и презентационные материалы</div>
                  <div>✅ Система комментариев</div>
                  <div>✅ Общая документация</div>
                </div>
                <div className="mt-3 text-xs text-green-700 font-medium">
                  Доступно всем участникам проекта
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-red-600 mr-2" />
                <h3 className="text-xl font-semibold text-red-900">Защищённая зона</h3>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm text-gray-700 space-y-2">
                  <div>🔒 Техническая архитектура</div>
                  <div>🔒 Конфиденциальные спецификации</div>
                  <div>🔒 Серверная логика и алгоритмы</div>
                  <div>🔒 Внутренние процессы разработки</div>
                </div>
                <div className="mt-3 text-xs text-red-700 font-medium">
                  Только для команды разработчиков
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Excellence */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-8">
          <div className="text-center">
            <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Уровень профессионализма</h2>
            <p className="text-xl text-gray-300 mb-6">
              Вы работаете с командой, использующей передовые технологии разработки
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div className="font-semibold text-blue-400">Next.js 15</div>
              <div className="text-sm text-gray-400">Современный React фреймворк</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="font-semibold text-green-400">TypeScript</div>
              <div className="text-sm text-gray-400">Типизированный JavaScript</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div className="font-semibold text-purple-400">Vercel Deploy</div>
              <div className="text-sm text-gray-400">Мгновенный деплой</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="font-semibold text-red-400">Agile методы</div>
              <div className="text-sm text-gray-400">Быстрые итерации</div>
            </div>
          </div>

          <div className="text-center mt-8 pt-6 border-t border-gray-700">
            <p className="text-gray-300">
              🏎️ <strong className="text-white">Virtual Pitwall</strong> - проект уровня команд Формулы 1
            </p>
          </div>
        </div>
      </div>

      <CommentSystem />
    </div>
  )
} 