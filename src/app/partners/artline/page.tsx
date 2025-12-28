import Navigation from '@/components/Navigation'

export default function LegendsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero секция */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Система телеметрии для <span className="text-red-600">ArtLine Engineering</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Революционное решение для контроля спортпрототипов Legends EVO и будущих CN 1600
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">100</div>
                <div className="text-sm text-red-700">автомобилей под контролем</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-green-700">надежность системы</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">40%</div>
                <div className="text-sm text-blue-700">экономия на обслуживании</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Бизнес-модель */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Контроль на всех уровнях бизнеса
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Legends EVO */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">SC</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">ArtLine Engineering</h3>
                  <p className="text-sm text-gray-600">Производитель спортпрототипов Legends EVO</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Производство Legends EVO и CN 1600</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Контроль износа двигателей</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Защита от перегрузки</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Престиж серии</span>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-800">Главная выгода:</p>
                <p className="text-sm text-green-700">Полный контроль арендованных двигателей</p>
              </div>
            </div>

            {/* Команды */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">Т</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">Команды</h3>
                  <p className="text-sm text-gray-600">Покупатели спортпрототипов Legends EVO</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Покупают Legends EVO у ArtLine</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Сдают машины гонщикам</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Контроль техники пилотов</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Оптимизация настроек</span>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Главная выгода:</p>
                <p className="text-sm text-blue-700">Защита инвестиций в автомобили</p>
              </div>
            </div>

            {/* Гонщики */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">Г</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">Гонщики</h3>
                  <p className="text-sm text-gray-600">Конечные пользователи</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Арендуют машины у команд</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Анализ техники вождения</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Безопасность на трассе</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Честная конкуренция</span>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">Главная выгода:</p>
                <p className="text-sm text-yellow-700">Развитие навыков и безопасность</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Революционные возможности Регистратора Race Control */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Революционные возможности Регистратора Race Control
            </h2>
            <p className="text-lg text-gray-600">
              Технологии уровня Formula 1 для контроля флота и анализа
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">🚨</span>
              </div>
              <h3 className="text-lg font-bold text-red-800 mb-2">Безопасность</h3>
              <p className="text-sm text-red-700">
                Автоматическое обнаружение переворотов и аварий. Мгновенная отправка координат службам.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">📊</span>
              </div>
              <h3 className="text-lg font-bold text-blue-800 mb-2">G-G Диаграммы</h3>
              <p className="text-sm text-blue-700">
                Анализ предельных режимов как в Formula 1. Оптимизация техники прохождения поворотов.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">🔧</span>
              </div>
              <h3 className="text-lg font-bold text-green-800 mb-2">Настройки</h3>
              <p className="text-sm text-green-700">
                Анализ настроек подвески через углы крена и тангажа. Конкурентное преимущество спортпрототипов Legends EVO.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">💰</span>
              </div>
              <h3 className="text-lg font-bold text-purple-800 mb-2">Новые сервисы</h3>
              <p className="text-sm text-purple-700">
                Анализ стиля вождения, тренинг пилотов, консультации по настройкам - дополнительные доходы.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Система контроля */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Система контроля арендованных двигателей
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Real-time мониторинг</h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                  <div>
                    <p className="font-medium text-gray-900">Обороты двигателя</p>
                    <p className="text-sm text-gray-600">Мгновенный алерт при превышении 8000 об/мин</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-4"></div>
                  <div>
                    <p className="font-medium text-gray-900">Температуры</p>
                    <p className="text-sm text-gray-600">Контроль перегрева ОЖ и масла</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-4"></div>
                  <div>
                    <p className="font-medium text-gray-900">Критические G-силы</p>
                    <p className="text-sm text-gray-600">Обнаружение экстремальных нагрузок &gt;8G</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Экономическая эффективность</h3>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">-40%</div>
                    <div className="text-sm text-gray-600">затрат на обслуживание</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">+30%</div>
                    <div className="text-sm text-gray-600">срок службы двигателей</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">100%</div>
                    <div className="text-sm text-gray-600">учет износа</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">0</div>
                    <div className="text-sm text-gray-600">внеплановых поломок</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">
            Готовы вывести Legends EVO на новый уровень?
          </h2>
          <p className="text-lg mb-8 text-red-100">
            Технологии уровня Formula 1 для контроля флота и развития бизнеса
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/demos/team" className="bg-white text-red-600 px-8 py-3 rounded-lg font-medium hover:bg-red-50">
              Посмотреть демо
            </a>
            <a href="/demos/artline" className="border border-white px-8 py-3 rounded-lg font-medium hover:bg-red-500">
              ArtLine Demo
            </a>
          </div>
        </div>
      </section>

    </div>
  );
} 