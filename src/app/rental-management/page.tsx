import Navigation from '@/components/Navigation'
import { Shield, FileText, AlertTriangle, CheckCircle, Clock, Settings, BarChart3 } from 'lucide-react'

export default function FleetControlPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Заголовок */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Fleet Control: Цифровой паспорт техники
          </h1>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-3">Дополнительные возможности PitWall</h2>
            <p className="text-blue-700">
              PitWall — это прежде всего система гоночной телеметрии. Fleet Control — дополнительная возможность для производителей двигателей и владельцев арендных парков, которые сталкиваются с проблемой объективного контроля эксплуатации техники.
            </p>
          </div>
        </div>
      </section>

      {/* Проблема информационной асимметрии */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Проблема информационной асимметрии</h2>

          {/* Торгмаш Инжиниринг */}
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Для производителей двигателей (Торгмаш Инжиниринг)</h3>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                <strong>Торгмаш Инжиниринг</strong> — основной производитель гоночных двигателей для автомобилей Legends EVO.
              </p>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Техническая ситуация:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Ресурс гоночного двигателя: <strong>1000 минут работы ИЛИ 2000 км</strong> (что наступает раньше)</li>
                  <li>• Одна гоночная сессия: ~20 минут</li>
                  <li>• Теоретический ресурс: ~50 сессий при правильной эксплуатации</li>
                </ul>
              </div>
            </div>

            <h4 className="text-lg font-bold text-gray-900 mb-4">Два типа клиентов создают разные проблемы:</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h5 className="font-bold text-yellow-800 mb-3">Тип 1: Команды-гонщики (цель — побеждать)</h5>
                <ul className="space-y-2 text-yellow-700 text-sm">
                  <li>• Прислушиваются к рекомендациям Торгмаш, но часто лукавят</li>
                  <li>• Скрывают: какое масло заливали, сколько реально проехали, когда делали ТО</li>
                  <li>• При гарантийных случаях: &quot;мы всё делали правильно&quot;</li>
                  <li>• Заявляют: &quot;2 гонки&quot; (40 минут), реально: 2 гонки + 5 тестов + прогревы = 200+ минут</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h5 className="font-bold text-red-800 mb-3">Тип 2: Команды-рентеры (цель — зарабатывать на аренде)</h5>
                <ul className="space-y-2 text-red-700 text-sm">
                  <li>• Вообще не следят за регламентом эксплуатации</li>
                  <li>• Приезжают к Торгмаш когда двигатель уже убили</li>
                  <li>• При поломках: &quot;это заводской брак, не наша вина&quot;</li>
                  <li>• Результат: гарантийные претензии на двигателе с критическим износом</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Владельцы арендных парков */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-orange-800 mb-4">Для владельцев арендных парков</h3>
            
            <div className="mb-6">
              <h4 className="font-bold text-orange-800 mb-3">Типичные споры:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-orange-300">
                  <div className="space-y-2 text-orange-700">
                    <div>• &quot;Машина была исправна&quot; vs &quot;Вы ее перегрели&quot;</div>
                    <div>• &quot;Мы соблюдали обороты&quot; vs &quot;Датчики показывают превышение&quot;</div>
                    <div>• &quot;Это заводской брак&quot; vs &quot;Нарушили регламент эксплуатации&quot;</div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-orange-300">
                  <p className="text-orange-700">
                    <strong>Отсутствие объективных данных</strong> приводит к потерям времени на разбор конфликтов и невозможности справедливого возмещения ущерба.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Как телеметрия решает проблему */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Как телеметрия решает проблему</h2>

          {/* Неопровержимый цифровой паспорт */}
          <div className="bg-white rounded-lg p-8 border border-gray-200 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Неопровержимый цифровой паспорт</h3>
            </div>
            
            <p className="text-gray-700 mb-6">
              Каждый автомобиль или двигатель получает <strong>полную историю эксплуатации</strong> с момента первого запуска:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <Clock className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-bold text-blue-800 mb-2">Точный учет времени работы</h4>
                <p className="text-sm text-blue-700">(каждая секунда)</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <BarChart3 className="w-8 h-8 text-green-600 mb-3" />
                <h4 className="font-bold text-green-800 mb-2">Полная история оборотных режимов</h4>
                <p className="text-sm text-green-700">Детальная статистика нагрузок</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <AlertTriangle className="w-8 h-8 text-red-600 mb-3" />
                <h4 className="font-bold text-red-800 mb-2">Температурная карта эксплуатации</h4>
                <p className="text-sm text-red-700">История тепловых режимов</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <Shield className="w-8 h-8 text-yellow-600 mb-3" />
                <h4 className="font-bold text-yellow-800 mb-2">Журнал всех критических событий</h4>
                <p className="text-sm text-yellow-700">Превышения, перегревы, аварии</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <CheckCircle className="w-8 h-8 text-purple-600 mb-3" />
                <h4 className="font-bold text-purple-800 mb-2">Невозможность подделки данных</h4>
                <p className="text-sm text-purple-700">(криптографическая подпись)</p>
              </div>
            </div>
          </div>

          {/* Интеллектуальный учет износа */}
          <div className="bg-white rounded-lg p-8 border border-gray-200 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Интеллектуальный учет износа</h3>
            </div>
            
            <p className="text-gray-700 mb-6">
              Система использует <strong>взвешенные моточасы</strong> вместо простого времени работы:
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-bold text-gray-900">Режим работы</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-900">Обороты</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-900">Коэффициент износа</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-900">Описание</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-3 font-medium text-gray-900">Холостой ход</td>
                    <td className="px-6 py-3 text-gray-700">800-2000 об/мин</td>
                    <td className="px-6 py-3 text-green-600 font-bold">× 0.3</td>
                    <td className="px-6 py-3 text-gray-700">Прогрев, холостой ход</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-900">Питлейн</td>
                    <td className="px-6 py-3 text-gray-700">2000-3000 об/мин</td>
                    <td className="px-6 py-3 text-yellow-600 font-bold">× 0.6</td>
                    <td className="px-6 py-3 text-gray-700">Движение по питлейн</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-medium text-gray-900">Гоночный</td>
                    <td className="px-6 py-3 text-gray-700">3000-8000 об/мин</td>
                    <td className="px-6 py-3 text-red-600 font-bold">× 1.0</td>
                    <td className="px-6 py-3 text-gray-700">Нормальная гоночная нагрузка</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
              <h4 className="font-bold text-blue-800 mb-3">Пример расчета:</h4>
              <div className="space-y-2 text-blue-700">
                <div>• 100 минут на холостом ходу = 30 эквивалентных минут износа</div>
                <div>• 100 минут в гоночном режиме = 100 эквивалентных минут износа</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Практические кейсы */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Практические кейсы</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Кейс 1 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Торгмаш Инжиниринг</h3>
              <div className="space-y-3 text-blue-700">
                <div><strong>Проблема:</strong> Клиенты нарушают регламент, потом требуют гарантийный ремонт</div>
                <div><strong>Решение:</strong> Цифровой паспорт каждого двигателя с неопровержимыми данными</div>
                <div><strong>Результат:</strong> Снижение необоснованных претензий на 80%</div>
              </div>
            </div>

            {/* Кейс 2 */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-8">
              <h3 className="text-xl font-bold text-green-800 mb-4">ArtLine Engineering</h3>
              <div className="space-y-4 text-green-700">
                <div><strong>Проблема:</strong> Управление резервным парком из 15 двигателей Торгмаш</div>
                <div><strong>Решение:</strong> Автоматический мониторинг состояния и планирование ТО</div>
                
                {/* Пример управления резервным парком */}
                <div className="bg-white border border-green-300 rounded-lg p-4 mt-4">
                  <h4 className="font-bold text-green-800 mb-3">Пример управления резервным парком:</h4>
                  <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
                    <div className="text-blue-600 font-bold mb-2">🏭 РЕЗЕРВНЫЙ ПАРК DK RACING - 15 двигателей Торгмаш</div>
                    <div className="space-y-1 text-gray-700">
                      <div>├── 🟢 Готовые к аренде: 8 двигателей</div>
                      <div>├── 🔵 В аренде: 5 двигателей</div>
                      <div>├── 🔴 На ТО: 2 двигателя</div>
                      <div>└── 📊 Средняя загрузка парка: 76%</div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-300">
                      <div className="text-purple-600 font-bold mb-2">🔧 ДВИГАТЕЛЬ #TM-HU5566 (в аренде)</div>
                      <div className="space-y-1 text-gray-700">
                        <div>├── Арендатор: Team Velocity Racing</div>
                        <div>├── Аренда с: 20.06.2025 (3 дня)</div>
                        <div>├── Наработка за аренду: 45 минут</div>
                        <div>├── Текущее состояние: ✅ В норме</div>
                        <div>└── Возврат планируется: 25.06.2025</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div><strong>Результат:</strong> Повышение эффективности использования на 35%</div>
              </div>
            </div>

            {/* Кейс 3 */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-8">
              <h3 className="text-xl font-bold text-purple-800 mb-4">Legends EVO team owners</h3>
              <div className="space-y-3 text-purple-700">
                <div><strong>Проблема:</strong> Контроль эксплуатации арендуемых автомобилей</div>
                <div><strong>Решение:</strong> Real-time мониторинг и автоматические алерты</div>
                <div><strong>Результат:</strong> Сокращение ущерба от неправильной эксплуатации на 60%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Цифровой паспорт двигателя */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Цифровой паспорт двигателя</h2>
          
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <p className="text-gray-700 mb-6">
              Каждый двигатель получает уникальный цифровой паспорт, который содержит полную историю эксплуатации 
              с момента первого запуска до утилизации.
            </p>
            
            <div className="bg-black rounded-lg p-6 font-mono text-sm overflow-x-auto mb-6">
              <div className="text-green-400">$ engine_passport --id SC_2024_001 --summary</div>
              <div className="text-white mt-2">
                <div className="text-yellow-400">🔧 ДВИГАТЕЛЬ: SC_2024_001</div>
                <div>• Производитель: Торгмаш Инжиниринг</div>
                <div>• Модель: Legends EVO Racing 2024</div>
                <div>• Дата производства: 15.03.2024</div>
                <div>• Первый запуск: 22.03.2024 14:30</div>
                <div></div>
                <div className="text-yellow-400">⏱️ СТАТИСТИКА РАБОТЫ:</div>
                <div>• Общее время работы: 187.3 минуты</div>
                <div>• Взвешенные моточасы: 162.4 минуты</div>
                <div>• Количество запусков: 23</div>
                <div>• Пробег: 412 км</div>
                <div></div>
                <div className="text-yellow-400">⚠️ СОБЫТИЯ:</div>
                <div>• Превышение 8000 об/мин: 3 раза (макс. 8150)</div>
                <div>• Температура &gt;100°C: 12 минут (макс. 103°C)</div>
                <div>• Остаточный ресурс: 812.7 минут (81.3%)</div>
                <div></div>
                <div className="text-green-400">📊 РЕКОМЕНДАЦИИ:</div>
                <div>• Плановое ТО через 62.7 минут работы</div>
                <div>• Повышенный износ из-за агрессивной эксплуатации</div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-bold text-blue-800 mb-3">Интеграция с MoTeC i2 Pro</h4>
              <p className="text-blue-700 mb-3">Все данные автоматически экспортируются в формат MoTeC для детального анализа:</p>
              <div className="grid md:grid-cols-2 gap-4 text-blue-700 text-sm">
                <div>
                  <div>• Полная история оборотных режимов</div>
                  <div>• Температурные карты по времени</div>
                </div>
                <div>
                  <div>• Корреляция нагрузок и износа</div>
                  <div>• Сравнительный анализ различных сессий</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Технические преимущества */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Технические преимущества</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Для производителей двигателей</h3>
              <div className="space-y-3 text-blue-700">
                <div><strong>Объективная база для принятия решений:</strong></div>
                <ul className="space-y-1 text-sm">
                  <li>• Неопровержимые данные о характере эксплуатации</li>
                  <li>• Автоматическая классификация нарушений регламента</li>
                  <li>• История обслуживания и ремонтов</li>
                  <li>• Статистика надежности по партиям двигателей</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-8">
              <h3 className="text-xl font-bold text-green-800 mb-4">Для владельцев арендных парков</h3>
              <div className="space-y-3 text-green-700">
                <div><strong>Прозрачный контроль эксплуатации:</strong></div>
                <ul className="space-y-1 text-sm">
                  <li>• Автоматическое выявление нарушений без человеческого фактора</li>
                  <li>• Точное планирование технического обслуживания</li>
                  <li>• Объективные данные для страховых случаев</li>
                  <li>• Мотивация арендаторов к бережной эксплуатации</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-8">
              <h3 className="text-xl font-bold text-purple-800 mb-4">Для арендаторов техники</h3>
              <div className="space-y-3 text-purple-700">
                <div><strong>Справедливость и прозрачность:</strong></div>
                <ul className="space-y-1 text-sm">
                  <li>• Понимание принципов расчета износа</li>
                  <li>• Возможность оптимизации стиля вождения</li>
                  <li>• Объективные данные при спорных ситуациях</li>
                  <li>• Техническая обратная связь для улучшения результатов</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Автоматические отчеты */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Автоматические отчеты</h2>
          
          <div className="bg-white rounded-lg p-8 border border-gray-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ежедневный отчет эксплуатации</h3>
            <p className="text-gray-700 mb-6">
              Каждый день система автоматически генерирует детальные отчеты по каждому двигателю в парке.
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <h4 className="text-lg font-bold text-gray-900">ОТЧЕТ ИСПОЛЬЗОВАНИЯ - Двигатель #CBR19-HU5566</h4>
                </div>
                
                <div className="text-gray-700">
                  <strong>Дата:</strong> 22.06.2025 | <strong>Общая наработка:</strong> 187.3 мин
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-bold text-gray-900">МОТОЧАСЫ:</span>
                  </div>
                  <ul className="space-y-1 ml-5 text-gray-700">
                    <li>• Время работы за день: 1ч 15мин</li>
                    <li>• Эквивалентная наработка: 1ч 42мин</li>
                    <li>• Режим эксплуатации: Интенсивный (×1.37)</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="font-bold text-gray-900">СОБЫТИЯ:</span>
                  </div>
                  <ul className="space-y-1 ml-5 text-gray-700">
                    <li>• Превышение 8000 об/мин: 3 раза (макс. 8150)</li>
                    <li>• Температура &gt;100°C: 12 минут (макс. 103°C)</li>
                    <li>• Остаточный ресурс: 812.7 минут (81.3%)</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-bold text-gray-900">РЕКОМЕНДАЦИИ:</span>
                  </div>
                  <ul className="space-y-1 ml-5 text-gray-700">
                    <li>• Плановое ТО через 62.7 минут работы</li>
                    <li>• Повышенный износ из-за агрессивной эксплуатации</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-bold text-blue-800 mb-3">Автоматическая рассылка отчетов:</h4>
              <div className="grid md:grid-cols-2 gap-4 text-blue-700">
                <div>
                  <div>• Владельцам парка — ежедневно в 8:00</div>
                  <div>• Арендаторам — после каждой сессии</div>
                </div>
                <div>
                  <div>• Производителю — еженедельные сводки</div>
                  <div>• Экспорт в Excel/PDF для отчетности</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Стратегия автоматических штрафов */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Стратегия автоматических штрафов</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Философия справедливых наказаний</h3>
            <p className="text-blue-700 text-lg">
              Штрафы мотивируют, а не наказывают. Цель — сохранить технику, а не заработать на нарушениях.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-6">Градация штрафов по тяжести нарушений</h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Превышение оборотов */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-yellow-500 rounded-full mr-3"></div>
                <h4 className="text-xl font-bold text-yellow-800">Превышение оборотов</h4>
              </div>
              <p className="text-yellow-700 mb-4 text-sm">Лимит: 8000 об/мин</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 px-4 bg-green-50 rounded border border-green-200">
                  <span className="text-green-700">+1-100 об/мин</span>
                  <span className="font-bold text-green-600">500₽</span>
                </div>
                <div className="text-xs text-green-600 ml-4">Легкое превышение</div>
                
                <div className="flex justify-between items-center py-2 px-4 bg-yellow-50 rounded border border-yellow-200">
                  <span className="text-yellow-700">+101-300 об/мин</span>
                  <span className="font-bold text-yellow-600">2,000₽</span>
                </div>
                <div className="text-xs text-yellow-600 ml-4">Заметное превышение</div>
                
                <div className="flex justify-between items-center py-2 px-4 bg-orange-50 rounded border border-orange-200">
                  <span className="text-orange-700">+301-500 об/мин</span>
                  <span className="font-bold text-orange-600">5,000₽</span>
                </div>
                <div className="text-xs text-orange-600 ml-4">Серьезное нарушение</div>
                
                <div className="flex justify-between items-center py-2 px-4 bg-red-50 rounded border border-red-200">
                  <span className="text-red-700">+500+ об/мин</span>
                  <span className="font-bold text-red-600">15,000₽</span>
                </div>
                <div className="text-xs text-red-600 ml-4">+ немедленная остановка</div>
              </div>
            </div>

            {/* Езда в отсечке */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-yellow-500 rounded-full mr-3"></div>
                <h4 className="text-xl font-bold text-yellow-800">Езда в отсечке</h4>
              </div>
              <p className="text-yellow-700 mb-4 text-sm">Лимит: 8000 об/мин</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 px-4 bg-green-50 rounded border border-green-200">
                  <span className="text-green-700">+0.5-1.0 сек</span>
                  <span className="font-bold text-green-600">500₽</span>
                </div>
                <div className="text-xs text-green-600 ml-4">Легкое превышение</div>
                
                <div className="flex justify-between items-center py-2 px-4 bg-yellow-50 rounded border border-yellow-200">
                  <span className="text-yellow-700">+1.0-2.5 сек</span>
                  <span className="font-bold text-yellow-600">2,000₽</span>
                </div>
                <div className="text-xs text-yellow-600 ml-4">Заметное превышение</div>
                
                <div className="flex justify-between items-center py-2 px-4 bg-orange-50 rounded border border-orange-200">
                  <span className="text-orange-700">+2.5-5.5 сек</span>
                  <span className="font-bold text-orange-600">5,000₽</span>
                </div>
                <div className="text-xs text-orange-600 ml-4">Серьезное нарушение</div>
                
                <div className="flex justify-between items-center py-2 px-4 bg-red-50 rounded border border-red-200">
                  <span className="text-red-700">+5.0+ сек</span>
                  <span className="font-bold text-red-600">15,000₽</span>
                </div>
                <div className="text-xs text-red-600 ml-4">+ немедленная остановка</div>
              </div>
            </div>

            {/* Перегрев двигателя */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-red-500 rounded-full mr-3"></div>
                <h4 className="text-xl font-bold text-red-800">Перегрев двигателя</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 px-4 bg-yellow-50 rounded border border-yellow-200">
                  <span className="text-yellow-700">100-105°C</span>
                  <span className="font-bold text-yellow-600">1,000₽</span>
                </div>
                <div className="text-xs text-yellow-600 ml-4">Предупреждение</div>
                
                <div className="flex justify-between items-center py-2 px-4 bg-orange-50 rounded border border-orange-200">
                  <span className="text-orange-700">105-110°C</span>
                  <span className="font-bold text-orange-600">3,000₽</span>
                </div>
                <div className="text-xs text-orange-600 ml-4">Опасно</div>
                
                <div className="flex justify-between items-center py-2 px-4 bg-red-50 rounded border border-red-200">
                  <span className="text-red-700">110°C+</span>
                  <span className="font-bold text-red-600">10,000₽</span>
                </div>
                <div className="text-xs text-red-600 ml-4">+ принудительная остановка</div>
              </div>
            </div>

            {/* Низкое давление масла */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-purple-500 rounded-full mr-3"></div>
                <h4 className="text-xl font-bold text-purple-800">Низкое давление масла</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 px-4 bg-yellow-50 rounded border border-yellow-200">
                  <span className="text-yellow-700">1.5-2.5 bar</span>
                  <span className="font-bold text-yellow-600">1,500₽</span>
                </div>
                <div className="text-xs text-yellow-600 ml-4">Снижение</div>
                
                <div className="flex justify-between items-center py-2 px-4 bg-orange-50 rounded border border-orange-200">
                  <span className="text-orange-700">1.5-2.0 bar</span>
                  <span className="font-bold text-orange-600">5,000₽</span>
                </div>
                <div className="text-xs text-orange-600 ml-4">Опасно низкое</div>
                
                <div className="flex justify-between items-center py-2 px-4 bg-red-50 rounded border border-red-200">
                  <span className="text-red-700">&lt;1.5 bar</span>
                  <span className="font-bold text-red-600">20,000₽</span>
                </div>
                <div className="text-xs text-red-600 ml-4">+ немедленная остановка</div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="font-bold text-green-800 mb-3">Автоматическое применение штрафов:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-green-700">
              <div>
                <div>• Мгновенное уведомление арендатора</div>
                <div>• Автоматическое списание с депозита</div>
              </div>
              <div>
                <div>• Детальный отчет с доказательствами</div>
                <div>• Возможность аппеляции в спорных случаях</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Система работает автоматически */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Система работает автоматически</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Установка и настройка</h3>
              <div className="space-y-3 text-gray-700">
                <div><strong>Время установки:</strong> 30 минут на автомобиль</div>
                <div><strong>Подключение:</strong> CAN-шина, GPS-антенна, питание 12V</div>
                <div><strong>Настройка:</strong> Загрузка профиля двигателя/автомобиля</div>
                <div><strong>Калибровка:</strong> Автоматическая по первым 10 минутам работы</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Автономная работа</h3>
              <div className="space-y-3 text-gray-700">
                <div><strong>Локальное хранение:</strong> До 1000 часов телеметрии на SD-карте</div>
                <div><strong>Передача данных:</strong> LTE + WiFi (резервирование)</div>
                <div><strong>Питание:</strong> От бортовой сети автомобиля</div>
                <div><strong>Защита данных:</strong> Криптографическая подпись, невозможность подделки</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Интеграция с облачной платформой</h3>
              <div className="space-y-3 text-gray-700">
                <div><strong>Real-time мониторинг:</strong> Отслеживание всех автомобилей парка</div>
                <div><strong>Автоматические алерты:</strong> Уведомления о критических событиях</div>
                <div><strong>Отчетность:</strong> Ежедневные, недельные, месячные сводки</div>
                <div><strong>API доступ:</strong> Интеграция с внешними системами учета</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Начать использование */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Начать использование</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
            <p className="text-blue-700 text-lg mb-6">
              Fleet Control доступен как дополнительная опция для существующих пользователей PitWall или как отдельное решение для fleet management.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-blue-800 mb-4">Техническая поддержка:</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Консультация по настройке параметров двигателей</li>
                  <li>• Помощь в интеграции с существующими системами учета</li>
                  <li>• Обучение персонала работе с отчетами</li>
                  <li>• Техническая поддержка 24/7</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-blue-800 mb-4">Демонстрация возможностей:</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Тестовая установка на один автомобиль</li>
                  <li>• Настройка параметров под ваши требования</li>
                  <li>• Генерация пробных отчетов</li>
                  <li>• Оценка применимости для вашего парка</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Техническая надежность */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Техническая надежность</h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <div className="space-y-3 text-gray-700">
                  <div><strong>Точность измерений:</strong> 99.9% (проверено сравнением с эталонными приборами)</div>
                  <div><strong>Время работы системы:</strong> 99.9% uptime (резервирование каналов связи)</div>
                </div>
              </div>
              <div>
                <div className="space-y-3 text-gray-700">
                  <div><strong>Сохранность данных:</strong> 100% с локальным и облачным резервированием</div>
                  <div><strong>Защита от вмешательства:</strong> Криптографическая защита на аппаратном уровне</div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-green-700">
                <strong>Сертификация:</strong> Система соответствует требованиям FIA по точности измерений для профессионального автоспорта.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Система комментариев */}
    </div>
  )
} 