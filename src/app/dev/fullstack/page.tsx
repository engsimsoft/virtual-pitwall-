import { Code, Server, Car, Trophy, AlertTriangle, Settings } from 'lucide-react'
import DevAccess from '@/components/DevAccess'
import DevNavigation from '@/components/DevNavigation'

export default function FullStackPage() {
  return (
    <DevAccess>
      <div className="min-h-screen bg-gray-50">
        <DevNavigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Code className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">
                FullStack Architecture Guide
              </h1>
            </div>
            <p className="text-gray-600">
              Полная архитектурная спецификация веб-платформы - 3 ключевых компонента системы
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Архитектурные компоненты</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="#web-platform" className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <Server className="w-6 h-6 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-blue-900">Web Platform</div>
                  <div className="text-sm text-blue-700">Микросервисы, API, Real-time</div>
                </div>
              </a>
              <a href="#track-management" className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <Trophy className="w-6 h-6 text-green-600 mr-3" />
                <div>
                  <div className="font-medium text-green-900">Track Management</div>
                  <div className="text-sm text-green-700">7 треков, рекорды, лидерборды</div>
                </div>
              </a>
              <a href="#rental-fleet" className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <Car className="w-6 h-6 text-purple-600 mr-3" />
                <div>
                  <div className="font-medium text-purple-900">Rental Fleet</div>
                  <div className="text-sm text-purple-700">Арендный парк, биллинг, штрафы</div>
                </div>
              </a>
            </div>
          </div>

          {/* Web Platform Architecture */}
          <section id="web-platform" className="mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <Server className="w-7 h-7 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">🌐 Web Platform Architecture</h2>
              </div>

              {/* Platform Overview */}
              <div className="mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">🎯 Назначение и архитектурные принципы</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">Цель платформы</h4>
                      <p className="text-sm text-blue-700 mb-3">
                        Создание масштабируемой веб-платформы для обработки и отображения телеметрических данных 
                        гоночных автомобилей с поддержкой real-time мониторинга 7 треков одновременно.
                      </p>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Микросервисная архитектура</li>
                        <li>• Event-driven система</li>
                        <li>• API-first подход</li>
                        <li>• Horizontal scaling на Railway</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">Ключевые требования</h4>
                      <div className="space-y-2 text-sm text-blue-700">
                        <div className="flex justify-between">
                          <span>Пропускная способность:</span>
                          <span className="font-mono">1,000 записей/сек</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Latency:</span>
                          <span className="font-mono">&lt;100мс</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Concurrent users:</span>
                          <span className="font-mono">200 подключений</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Uptime:</span>
                          <span className="font-mono">99.9%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Data retention:</span>
                          <span className="font-mono">2 года</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Microservices Architecture */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🏗️ Микросервисная архитектура</h3>
                
                <div className="bg-gray-900 p-4 rounded-lg mb-6">
                  <h4 className="text-white mb-3">Railway Cloud Ecosystem</h4>
                  <pre className="text-green-400 text-sm font-mono">
{`Railway Cloud Ecosystem
├── Telemetry Ingress Service
├── Main API Gateway
├── Analytics Processing Engine  
├── File Management Service
├── Notification Service
└── Authentication Service`}
                  </pre>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Telemetry Ingress Service</h4>
                      <p className="text-sm text-gray-600 mb-2">Прием и первичная обработка данных от ESP32</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Protocol Buffers декодирование</li>
                        <li>• HMAC-SHA256 валидация</li>
                        <li>• Rate limiting защита</li>
                        <li>• Redis Streams publishing</li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Main API Gateway</h4>
                      <p className="text-sm text-gray-600 mb-2">Центральная точка доступа для веб-клиентов</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• REST API endpoints</li>
                        <li>• WebSocket server</li>
                        <li>• Authentication/Authorization</li>
                        <li>• Request routing</li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Analytics Processing Engine</h4>
                      <p className="text-sm text-gray-600 mb-2">Обработка телеметрии и вычисления</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Lap time detection</li>
                        <li>• Track record comparison</li>
                        <li>• Statistical calculations</li>
                        <li>• MoTeC file generation</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-medium text-yellow-900 mb-2">Event Bus Architecture</h4>
                      <div className="text-sm text-yellow-800 space-y-1">
                        <div><code>telemetry.ingress</code> → raw data from devices</div>
                        <div><code>telemetry.processed</code> → validated data</div>
                        <div><code>lap.completed</code> → lap calculations</div>
                        <div><code>alert.triggered</code> → violations</div>
                        <div><code>record.broken</code> → new records</div>
                        <div><code>session.state</code> → lifecycle events</div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">Database Design</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Single PostgreSQL с логическим разделением</li>
                        <li>• Time-series optimization</li>
                        <li>• Partitioning по дням</li>
                        <li>• Indexing для fast queries</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-2">Real-time WebSocket</h4>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Client групирование по session_id</li>
                        <li>• Redis pub/sub coordination</li>
                        <li>• Message queuing при disconnect</li>
                        <li>• Rate limiting per connection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Tasks */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Техзадания для Cursor Agent</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Frontend Tasks</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div>• Live Timing Dashboard (WebSocket integration)</div>
                      <div>• Session Management Interface</div>
                      <div>• Analytics Dashboard (charts, exports)</div>
                      <div>• Real-time alerts panel</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Backend Tasks</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div>• Telemetry Ingress API (Protocol Buffers)</div>
                      <div>• WebSocket Real-time Server</div>
                      <div>• Analytics Processing Service</div>
                      <div>• Authentication System (JWT, RBAC)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Track Management Architecture */}
          <section id="track-management" className="mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <Trophy className="w-7 h-7 text-green-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">🏁 Track Management Architecture</h2>
              </div>

              {/* Track Overview */}
              <div className="mb-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">🎯 Назначение и бизнес-ценность</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-green-800 mb-2">Цель системы</h4>
                      <p className="text-sm text-green-700 mb-3">
                        Создание централизованной системы управления 7 треками с независимой статистикой, 
                        автоматическим отслеживанием рекордов и leaderboards для каждого трека.
                      </p>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Автоматизация рекордов</li>
                        <li>• Маркетинговая ценность</li>
                        <li>• Историческая база данных</li>
                        <li>• Аналитические инсайты</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800 mb-2">Архитектурные принципы</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Track independence</li>
                        <li>• Real-time record detection</li>
                        <li>• Historical preservation</li>
                        <li>• Statistical richness</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Track Registry */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🏗️ Система 7 треков</h3>
                
                <div className="bg-gray-900 p-4 rounded-lg mb-6">
                  <h4 className="text-white mb-3">Multi-Track Ecosystem</h4>
                  <pre className="text-green-400 text-sm font-mono">
{`Multi-Track Ecosystem
├── Moscow Raceway (2.552km, 3 sectors)
├── Kazan Ring (2.930km, 3 sectors)  
├── Sochi Autodrom (3.634km, 3 sectors)
├── Igora Drive (4.084km, 3 sectors)
├── Ural Ring (2.800km, 3 sectors)
├── Smolensk Ring (3.200km, 3 sectors)
└── Nizhny Novgorod Ring (2.685km, 3 sectors)`}
                  </pre>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Track Data Model</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Unique track identifier</li>
                      <li>• Physical characteristics</li>
                      <li>• Geographic location</li>
                      <li>• Reference racing line</li>
                      <li>• Safety parameters</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-medium text-orange-900 mb-2">Sector Configuration</h4>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• 3 sectors per track (FIA format)</li>
                      <li>• Individual sector records</li>
                      <li>• Difficulty ratings</li>
                      <li>• Sector границы</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Track Metadata</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Track surface specs</li>
                      <li>• Optimal racing line</li>
                      <li>• Weather impact factors</li>
                      <li>• Safety car procedures</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Records Management */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🏆 Records Management</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Record Types</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div><strong>Primary:</strong> Overall lap, Sector records</div>
                      <div><strong>Session:</strong> Practice, Qualifying, Race</div>
                      <div><strong>Conditional:</strong> Wet weather, Car classes</div>
                      <div><strong>Secondary:</strong> Pole position, Consecutive laps</div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Record Lifecycle</h4>
                    <div className="bg-gray-900 p-3 rounded-lg">
                      <pre className="text-green-400 text-xs font-mono">
{`Lap Completion → Time Validation → 
Record Comparison → Record Update → 
Notification`}
                      </pre>
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                      <div>• Automated detection</div>
                      <div>• Data integrity validation</div>
                      <div>• Manual verification option</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leaderboards */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Leaderboard Architecture</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="font-medium text-indigo-900 mb-2">Multi-Dimensional Rankings</h4>
                    <ul className="text-sm text-indigo-800 space-y-1">
                      <li>• All-time fastest lap per track</li>
                      <li>• Current season standings</li>
                      <li>• Monthly performance rankings</li>
                      <li>• Driver consistency ratings</li>
                    </ul>
                  </div>

                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h4 className="font-medium text-teal-900 mb-2">Filtering Capabilities</h4>
                    <ul className="text-sm text-teal-800 space-y-1">
                      <li>• Time period filters</li>
                      <li>• Car class segregation</li>
                      <li>• Weather condition filtering</li>
                      <li>• Session type separation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tech Tasks */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Техзадания для Cursor Agent</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Frontend Tasks</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div>• Track Overview Dashboard</div>
                      <div>• Track Records Display</div>
                      <div>• Interactive Leaderboards</div>
                      <div>• Track Administration Panel</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Backend Tasks</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div>• Record Detection Engine</div>
                      <div>• Statistics Calculation Service</div>
                      <div>• Data Management API</div>
                      <div>• Event Processing System</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Rental Fleet Architecture */}
          <section id="rental-fleet" className="mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <Car className="w-7 h-7 text-purple-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">🚗 Rental Fleet Management</h2>
              </div>

              {/* Fleet Overview */}
              <div className="mb-8">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4">🎯 Назначение и коммерческая ценность</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-purple-800 mb-2">Бизнес-цель системы</h4>
                      <p className="text-sm text-purple-700 mb-3">
                        Создание автоматизированной системы управления арендным парком гоночных автомобилей 
                        с real-time контролем эксплуатации, объективным биллингом и защитой инвестиций.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-800 mb-2">Key Performance Indicators</h4>
                      <div className="space-y-2 text-sm text-purple-700">
                        <div className="flex justify-between">
                          <span>Asset Protection:</span>
                          <span className="font-mono">95%+ compliance</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Billing Accuracy:</span>
                          <span className="font-mono">99.9%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Customer Satisfaction:</span>
                          <span className="font-mono">90%+ rating</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Maintenance Optimization:</span>
                          <span className="font-mono">30% reduction</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fleet Configuration */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🏗️ Fleet Configuration</h3>
                
                <div className="bg-gray-900 p-4 rounded-lg mb-6">
                  <h4 className="text-white mb-3">Legends EVO Moscow Fleet Setup</h4>
                  <pre className="text-green-400 text-sm font-mono">
{`Legends EVO Moscow Fleet (Moscow Raceway):
├── Car Type: Sports Prototype Legends EVO
├── Engine: Лада 1.6л 200 л.с. (Торгмаш Инжиниринг)
├── Total Fleet Size: 100 vehicles
├── Max Concurrent Usage: 40 vehicles on track
├── Fleet Utilization: 40% peak capacity
├── Uniform specifications across all cars
└── Single pricing tier`}
                  </pre>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                    <h4 className="font-medium text-red-900">КРИТИЧЕСКИ ВАЖНЫЕ ТЕХНИЧЕСКИЕ ПАРАМЕТРЫ</h4>
                  </div>
                  <p className="text-sm text-red-800 mb-3">
                    <strong>Требуется заполнение от Торгмаш Инжиниринг для корректной настройки penalty system</strong>
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg">
                      <h5 className="font-medium text-red-900 mb-2">RPM Limits</h5>
                      <div className="text-sm text-red-700 space-y-1">
                        <div>Максимальные обороты: [ЗАПОЛНИТЬ] об/мин</div>
                        <div>Критические обороты: [ЗАПОЛНИТЬ] об/мин</div>
                        <div>Рабочий диапазон: [ЗАПОЛНИТЬ] об/мин</div>
                        <div>Warning threshold: [ЗАПОЛНИТЬ] об/мин</div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg">
                      <h5 className="font-medium text-red-900 mb-2">Temperature Limits</h5>
                      <div className="text-sm text-red-700 space-y-1">
                        <div>Макс. температура ОЖ: [ЗАПОЛНИТЬ] °C</div>
                        <div>Критическая температура ОЖ: [ЗАПОЛНИТЬ] °C</div>
                        <div>Макс. температура масла: [ЗАПОЛНИТЬ] °C</div>
                        <div>Рабочие температуры: [ЗАПОЛНИТЬ] °C</div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg">
                      <h5 className="font-medium text-red-900 mb-2">Pressure Specifications</h5>
                      <div className="text-sm text-red-700 space-y-1">
                        <div>Мин. давление масла: [ЗАПОЛНИТЬ] bar</div>
                        <div>Критически низкое: [ЗАПОЛНИТЬ] bar</div>
                        <div>Рабочее давление: [ЗАПОЛНИТЬ] bar</div>
                        <div>Давление топлива: [ЗАПОЛНИТЬ] bar</div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg">
                      <h5 className="font-medium text-red-900 mb-2">Maintenance Requirements</h5>
                      <div className="text-sm text-red-700 space-y-1">
                        <div>Интервалы ТО: [ЗАПОЛНИТЬ] часов</div>
                        <div>Износостойкость: [ЗАПОЛНИТЬ] моточасов</div>
                        <div>Замена масла: [ЗАПОЛНИТЬ] моточасов</div>
                        <div>Замена фильтров: [ЗАПОЛНИТЬ] моточасов</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Smart Engine Tracking */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">⚙️ Smart Engine Usage Tracking</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Operating Mode Classification</h4>
                    <div className="bg-gray-900 p-3 rounded-lg mb-3">
                      <pre className="text-green-400 text-xs font-mono">
{`Operating Intensity Spectrum:
Idle → Normal → Racing Light → Racing Intensive → Extreme
(0.3x) (0.6x)    (1.0x)        (2.0x)           (3.0x)`}
                      </pre>
                    </div>
                    <div className="text-sm text-gray-700">
                      <div>• RPM-based classification</div>
                      <div>• Temperature correlation</div>
                      <div>• G-force analysis</div>
                      <div>• Weighted hour calculation</div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Component Wear Modeling</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Engine wear (RPM, temperature, pressure)</li>
                      <li>• Transmission wear (shifting patterns)</li>
                      <li>• Brake wear (deceleration forces)</li>
                      <li>• Tire wear (lateral forces)</li>
                      <li>• Suspension wear (G-forces)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Automated Billing */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">💰 Automated Billing Architecture</h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Multi-Tier Pricing</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Hourly rental rates by class</li>
                      <li>• Peak/off-peak multipliers</li>
                      <li>• Seasonal adjustments</li>
                      <li>• Volume discounts</li>
                      <li>• Loyalty program benefits</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Usage-Based Pricing</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Engine intensity multipliers</li>
                      <li>• Wear acceleration charges</li>
                      <li>• Fuel consumption billing</li>
                      <li>• Maintenance impact fees</li>
                      <li>• Performance optimization credits</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">Billing Accuracy</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• Multi-source data validation</li>
                      <li>• GPS tracking correlation</li>
                      <li>• Automated invoice generation</li>
                      <li>• Dispute resolution framework</li>
                      <li>• Audit trail maintenance</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Penalty System */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🚨 Penalty System Architecture</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Violation Detection</h4>
                    <div className="bg-gray-900 p-3 rounded-lg mb-3">
                      <pre className="text-green-400 text-xs font-mono">
{`Severity Levels:
Minor → Moderate → Severe → Critical → Emergency
(Info) (Warning) (Penalty) (Stop) (Immediate Action)`}
                      </pre>
                    </div>
                    <div className="text-sm text-gray-700">
                      <div>• Real-time monitoring</div>
                      <div>• Automated penalty assessment</div>
                      <div>• Context-aware adjustments</div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Fair Penalty Framework</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Objective assessment criteria</li>
                      <li>• Clear threshold definitions</li>
                      <li>• Consistent applications</li>
                      <li>• Appeal process availability</li>
                      <li>• Evidence preservation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tech Tasks */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Техзадания для Cursor Agent</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Fleet Management Tasks</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div>• Fleet Overview Dashboard</div>
                      <div>• Usage Tracking Interface</div>
                      <div>• Automated Billing System</div>
                      <div>• Penalty Management Panel</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Backend Processing</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div>• Usage Classification Engine</div>
                      <div>• Billing Calculation Service</div>
                      <div>• Penalty Detection System</div>
                      <div>• Fleet Analytics Engine</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Summary */}
          <div className="bg-gradient-to-r from-blue-50 via-green-50 to-purple-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-start">
              <Settings className="w-6 h-6 text-gray-600 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Статус архитектурной документации</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Полная архитектурная спецификация веб-платформы состоит из 3 ключевых компонентов. 
                  Каждый компонент имеет детальное техническое описание и готовые техзадания для разработки.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Server className="w-4 h-4 text-blue-600 mr-2" />
                      <div className="font-medium text-blue-900">Web Platform</div>
                    </div>
                    <div className="text-blue-700">Микросервисы, Railway, Real-time</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Trophy className="w-4 h-4 text-green-600 mr-2" />
                      <div className="font-medium text-green-900">Track Management</div>
                    </div>
                    <div className="text-green-700">7 треков, рекорды, лидерборды</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Car className="w-4 h-4 text-purple-600 mr-2" />
                      <div className="font-medium text-purple-900">Rental Fleet</div>
                    </div>
                    <div className="text-purple-700">100 автомобилей, биллинг, штрафы</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DevAccess>
  )
}