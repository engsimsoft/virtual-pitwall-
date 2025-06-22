import Link from 'next/link'
import CommentSystem from '@/components/CommentSystem'

export default function ShortCutBenefitsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Навигация */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-red-600 rounded-sm"></div>
            <span className="text-xl font-bold text-gray-900">Virtual Pitwall</span>
          </div>
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-red-600">Virtual Pitwall</Link>
            <a href="/features" className="text-gray-600 hover:text-red-600">Features</a>
            <a href="/shortcut" className="text-gray-600 hover:text-red-600">DK Racing</a>
            <a href="/shortcut/demo" className="text-gray-600 hover:text-red-600">Team Demo</a>
            <a href="/shortcut/dk" className="text-gray-600 hover:text-red-600">DK Demo</a>
            <a href="/shortcut/benefits" className="text-red-600 font-medium">Benefits</a>
            <a href="/dev" className="text-gray-500 hover:text-gray-700 flex items-center gap-1" title="Техническая документация (требует пароль)">
              🔒 Developer
            </a>
          </div>
        </div>
      </nav>

      {/* Hero секция */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Коммерческие выгоды для <span className="text-red-600">DK Racing</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Конкретные цифры экономии и новых возможностей для бизнеса
            </p>
          </div>
        </div>
      </section>

      {/* ROI калькулятор */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            ROI калькулятор для флота 100 автомобилей
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Затраты без системы */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-red-800 mb-6">❌ БЕЗ системы</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Внеплановые поломки (10%)</span>
                  <span className="font-bold text-red-600">₽500,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Перерасход ресурса (20%)</span>
                  <span className="font-bold text-red-600">₽800,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Преждевременный износ</span>
                  <span className="font-bold text-red-600">₽1,200,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Техконтроль (ручной)</span>
                  <span className="font-bold text-red-600">₽300,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Споры и переделки</span>
                  <span className="font-bold text-red-600">₽200,000</span>
                </div>
                
                <div className="border-t border-red-300 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-red-800">ИТОГО в год:</span>
                    <span className="text-2xl font-bold text-red-600">₽3,000,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Выгоды с системой */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-green-800 mb-6">✅ С системой</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Внеплановые поломки (1%)</span>
                  <span className="font-bold text-green-600">₽50,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Контролируемый ресурс</span>
                  <span className="font-bold text-green-600">₽200,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Продленный срок службы</span>
                  <span className="font-bold text-green-600">₽600,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Автоматический контроль</span>
                  <span className="font-bold text-green-600">₽50,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Объективные данные</span>
                  <span className="font-bold text-green-600">₽0</span>
                </div>
                
                <div className="border-t border-green-300 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-green-800">ИТОГО в год:</span>
                    <span className="text-2xl font-bold text-green-600">₽900,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Итоговая экономия */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">💰 ЭКОНОМИЯ ЗА ГОД</h3>
            <div className="text-5xl font-bold text-blue-600 mb-2">₽2,100,000</div>
            <p className="text-lg text-blue-700">Окупаемость системы за 4-6 месяцев</p>
          </div>
        </div>
      </section>

      {/* Выгоды для каждого уровня */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Детальные выгоды по уровням бизнеса
          </h2>

          <div className="space-y-12">
            {/* ShortCut как производитель/промоутер */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">SC</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">DK Racing</h3>
                    <p className="text-gray-600">Производитель автомобилей Shortcut</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-bold text-green-800 mb-2">🛡️ Защита двигателей (₽1,500,000/год)</h4>
                    <p className="text-sm text-green-700">
                      Автоматический контроль оборотов, температур и нагрузок. 
                      Предотвращение поломок арендованных двигателей.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-2">📊 Точный учет износа (₽800,000/год)</h4>
                    <p className="text-sm text-blue-700">
                      Справедливая система тарификации аренды на основе фактического использования.
                      Прозрачные отношения с командами.
                    </p>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-bold text-purple-800 mb-2">🏁 Престиж серии (∞)</h4>
                    <p className="text-sm text-purple-700">
                      Технологии уровня Formula 1. Привлечение серьезных команд и спонсоров.
                      Репутация честной и прогрессивной серии.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Новые источники дохода:</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Премиум-телеметрия</span>
                    <span className="font-bold text-green-600">+₽500,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Анализ настроек</span>
                    <span className="font-bold text-green-600">+₽300,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Консультации</span>
                    <span className="font-bold text-green-600">+₽200,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Лицензирование</span>
                    <span className="font-bold text-green-600">+₽400,000</span>
                  </div>
                  
                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900">Итого дохода:</span>
                      <span className="text-xl font-bold text-green-600">+₽1,400,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Команды */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">Т</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Команды</h3>
                    <p className="text-gray-600">Покупатели автомобилей Shortcut</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-2">⚖️ Справедливая аренда двигателей</h4>
                    <p className="text-sm text-blue-700">
                      Плата только за фактическое использование двигателей. Объективные данные о состоянии техники.
                    </p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-bold text-green-800 mb-2">🏆 Конкурентное преимущество</h4>
                    <p className="text-sm text-green-700">
                      G-G диаграммы, анализ настроек подвески, оптимизация времени круга.
                      Профессиональные инструменты как в Formula 1.
                    </p>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-bold text-purple-800 mb-2">🛡️ Защита инвестиций</h4>
                    <p className="text-sm text-purple-700">
                      Контроль техники пилотов, предотвращение повреждений по халатности.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-bold text-blue-900 mb-4">Экономия команды (на 5 автомобилей):</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Предотвращение поломок</span>
                    <span className="font-bold text-green-600">-₽150,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Оптимизация настроек</span>
                    <span className="font-bold text-green-600">-₽80,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Контроль пилотов</span>
                    <span className="font-bold text-green-600">-₽120,000</span>
                  </div>
                  
                  <div className="border-t border-blue-300 pt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-blue-900">Экономия в год:</span>
                      <span className="text-xl font-bold text-green-600">₽350,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Гонщики */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-yellow-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">Г</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Гонщики</h3>
                    <p className="text-gray-600">Конечные пользователи</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-bold text-red-800 mb-2">🚨 Безопасность</h4>
                    <p className="text-sm text-red-700">
                      Автоматическое обнаружение переворотов, критических G-сил.
                      Мгновенные сигналы службам безопасности.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-2">📈 Развитие навыков</h4>
                    <p className="text-sm text-blue-700">
                      Детальный анализ техники, G-G диаграммы, сравнение с лучшими пилотами.
                      Профессиональный рост как в Formula 1.
                    </p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-bold text-green-800 mb-2">⚖️ Честная конкуренция</h4>
                    <p className="text-sm text-green-700">
                      Объективные данные, прозрачная система контроля.
                      Равные условия для всех участников.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <h4 className="text-lg font-bold text-yellow-900 mb-4">Ценность для пилота:</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-yellow-700">Профессиональная телеметрия</span>
                    <span className="font-bold text-green-600">₽50,000*</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-700">Анализ техники</span>
                    <span className="font-bold text-green-600">₽30,000*</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-700">Безопасность</span>
                    <span className="font-bold text-green-600">∞</span>
                  </div>
                  
                  <div className="border-t border-yellow-300 pt-3">
                    <p className="text-sm text-yellow-800">
                      * Стоимость аналогичных систем на рынке
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества Регистратора Race Control */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Революционные возможности Регистратора Race Control
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Что дает Регистратор Race Control:</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-xs">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">G-G диаграммы</h4>
                    <p className="text-sm text-gray-600">Анализ предельных режимов как в Formula 1</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-xs">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Безопасность</h4>
                    <p className="text-sm text-gray-600">Автоматическое обнаружение переворотов и аварий</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-xs">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Анализ подвески</h4>
                    <p className="text-sm text-gray-600">Оптимизация настроек через углы крена/тангажа</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-xs">4</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Новые сервисы</h4>
                    <p className="text-sm text-gray-600">Анализ стиля вождения, тренинг пилотов</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <h3 className="text-xl font-bold text-red-800 mb-6">Конкурентные преимущества:</h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">vs AIM/MoTeC системы:</h4>
                  <p className="text-sm text-gray-600 mb-2">В 3-5 раз дешевле при том же качестве</p>
                  <div className="text-2xl font-bold text-green-600">Экономия ₽2,000,000</div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">vs простая телеметрия:</h4>
                  <p className="text-sm text-gray-600 mb-2">Уровень Formula 1 вместо базового</p>
                  <div className="text-2xl font-bold text-blue-600">Престиж серии</div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">vs отсутствие системы:</h4>
                  <p className="text-sm text-gray-600 mb-2">Полный контроль флота и безопасности</p>
                  <div className="text-2xl font-bold text-red-600">Защита ₽3,000,000</div>
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
            Экономия ₽2,100,000 в год для флота ShortCut
          </h2>
          <p className="text-lg mb-8 text-red-100">
            Окупаемость за 4-6 месяцев + новые источники дохода
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/shortcut/demo" className="bg-white text-red-600 px-8 py-3 rounded-lg font-medium hover:bg-red-50">
              Посмотреть демо
            </a>
            <a href="/shortcut" className="border border-white px-8 py-3 rounded-lg font-medium hover:bg-red-500">
              ← Вернуться к обзору
            </a>
          </div>
        </div>
      </section>

      {/* Comment System */}
      <CommentSystem pageId="benefits" pageName="Benefits - Коммерческие выгоды" />
    </div>
  );
} 