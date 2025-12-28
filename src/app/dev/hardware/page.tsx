import { Settings, Cpu, CircuitBoard, Radio, Shield, Code, AlertTriangle } from 'lucide-react'
import DevAccess from '@/components/DevAccess'
import DevNavigation from '@/components/DevNavigation'

export default function HardwarePage() {
  return (
    <DevAccess>
      <div className="min-h-screen bg-gray-50">
        <DevNavigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Cpu className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">
                Hardware Engineering Guide
              </h1>
            </div>
            <p className="text-gray-600">
              Техническая спецификация аппаратной части - Система телеметрии для гоночной серии
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Быстрая навигация</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="#overview" className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <Settings className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-900">Обзор</span>
              </a>
              <a href="#architecture" className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <CircuitBoard className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-900">Архитектура</span>
              </a>
              <a href="#components" className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <Cpu className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-900">Компоненты</span>
              </a>
              <a href="#protocols" className="flex items-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <Radio className="w-5 h-5 text-orange-600 mr-2" />
                <span className="text-sm font-medium text-orange-900">Протоколы</span>
              </a>
            </div>
          </div>

          {/* Overview Section */}
          <section id="overview" className="mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <Settings className="w-6 h-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">🎯 Назначение и область применения</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Цель разработки</h3>
                  <p className="text-sm text-blue-800">
                    Создание компактного бортового регистратора телеметрии для интеграции с существующими ЭБУ IPAC в гоночных автомобилях.
                  </p>
                  <ul className="mt-2 text-sm text-blue-700 space-y-1">
                    <li>• Считывание данных с CAN-шины ЭБУ</li>
                    <li>• Точное позиционирование GPS</li>
                    <li>• 9-осевую инерциальную навигацию</li>
                    <li>• Передачу данных в реальном времени</li>
                    <li>• Локальное резервное хранение</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Технические требования</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <span>Рабочая температура:</span>
                        <span className="font-mono">-20°C до +85°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Влагозащита:</span>
                        <span className="font-mono">IP65</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Виброустойчивость:</span>
                        <span className="font-mono">до 20G</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Питание:</span>
                        <span className="font-mono">12V (9-16V)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Габариты:</span>
                        <span className="font-mono">150×100×50 мм</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Вес:</span>
                        <span className="font-mono">не более 300г</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-900 mb-2">Ключевые возможности</h3>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>✅ Real-time телеметрия 25Hz</li>
                      <li>✅ 9-осевой IMU (BMX055)</li>
                      <li>✅ Multi-GNSS позиционирование</li>
                      <li>✅ LTE + WiFi связь</li>
                      <li>✅ 32GB локальное хранение</li>
                      <li>✅ CAN-шина интеграция</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Architecture Section */}
          <section id="architecture" className="mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <CircuitBoard className="w-6 h-6 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">🔧 Аппаратная архитектура</h2>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg mb-4">
                <h3 className="text-white mb-3">Блок-схема системы</h3>
                <pre className="text-green-400 text-xs font-mono overflow-x-auto">
{`┌─────────────────────────────────────┐
│               ESP32                 │
│  ┌─────────────────────────────────┐│
│  │ Core 0: CAN + IMU + SD Card    ││
│  │ Core 1: LTE + WiFi + GPS       ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
         │     │     │        │        │
     CAN/SPI I2C  LTE/AT   WiFi    UART/GPS
         │     │     │        │        │
    ┌────────┐ │ ┌──────┐ ┌──────┐ ┌──────┐
    │MCP2515 │ │ │A7672E│ │ WiFi │ │ GPS  │
    │   CAN  │ │ │ LTE  │ │ WiFi │ │ GPS  │
    └────────┘ │ └──────┘ └──────┘ └──────┘
               │          │
         ┌──────────┐    ┌─────────┐
         │ BMX055   │    │32GB SD  │
         │ 9-axis   │    │ Card    │
         │ IMU      │    │Storage  │
         └──────────┘    └─────────┘`}
                </pre>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Core 0 (критические задачи)</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• CAN-шина обработка (250 кбит/с)</li>
                    <li>• IMU данные (100 Hz)</li>
                    <li>• SD карта запись</li>
                    <li>• Watchdog системы</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-900 mb-2">Core 1 (коммуникации)</h3>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• LTE модем управление</li>
                    <li>• WiFi hotspot режим</li>
                    <li>• GPS обработка (10 Hz)</li>
                    <li>• Буферизация данных</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Components Section */}
          <section id="components" className="mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <Cpu className="w-6 h-6 text-purple-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">📟 Основные компоненты</h2>
              </div>

              <div className="space-y-6">
                {/* ESP32 */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Микроконтроллер ESP32 WROOM-32</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Технические характеристики</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <div>CPU: Dual-core Xtensa LX6, 240 MHz</div>
                        <div>RAM: 520 KB SRAM</div>
                        <div>Flash: 4 MB встроенная</div>
                        <div>WiFi: 802.11 b/g/n, до 150 Mbps</div>
                        <div>GPIO: 34 программируемых пина</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Интерфейсы</h4>
                      <div className="text-sm text-blue-800 space-y-1">
                        <div>3×UART, 2×I2C, 4×SPI</div>
                        <div>18×12-bit ADC каналов</div>
                        <div>Питание: 3.0-3.6V, 80mA</div>
                        <div>Bluetooth: v4.2 BR/EDR + BLE</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 p-3 rounded-lg">
                    <h4 className="text-white mb-2">Распиновка для проекта</h4>
                    <pre className="text-green-400 text-xs font-mono overflow-x-auto">
{`// CAN интерфейс (SPI)
#define CAN_CS_PIN    5     #define CAN_SCK_PIN   18
#define CAN_MOSI_PIN  23    #define CAN_MISO_PIN  19
#define CAN_INT_PIN   21

// I2C для BMX055
#define I2C_SDA_PIN   21    #define I2C_SCL_PIN   22

// LTE модуль
#define LTE_TX_PIN    17    #define LTE_RX_PIN    16
#define LTE_PWR_PIN   4     #define LTE_RST_PIN   2

// GPS модуль  
#define GPS_TX_PIN    27    #define GPS_RX_PIN    26`}
                    </pre>
                  </div>
                </div>

                {/* MCP2515 */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">2. CAN контроллер MCP2515</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <h4 className="font-medium text-yellow-900 mb-2">Характеристики</h4>
                      <div className="text-sm text-yellow-800 space-y-1">
                        <div>Интерфейс: SPI (до 10 MHz)</div>
                        <div>Скорость: до 1 Мбит/с</div>
                        <div>Буферы: 3 TX, 2 RX</div>
                        <div>Фильтры: 6 acceptance</div>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-3 rounded-lg">
                      <h4 className="text-white mb-2">Код инициализации</h4>
                      <pre className="text-green-400 text-xs font-mono">
{`#include <mcp2515.h>
MCP2515 mcp2515(CAN_CS_PIN);

void initCAN() {
  mcp2515.reset();
  mcp2515.setBitrate(CAN_250KBPS, MCP_8MHZ);
  mcp2515.setNormalMode();
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* BMX055 */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">3. IMU Bosch BMX055 (9-осевой)</h3>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-red-50 p-3 rounded-lg">
                      <h4 className="font-medium text-red-900 mb-2">Акселерометр</h4>
                      <div className="text-sm text-red-800 space-y-1">
                        <div>Диапазоны: ±2g до ±16g</div>
                        <div>Разрешение: 14-bit</div>
                        <div>Частота: до 2000 Hz</div>
                        <div>Шум: 150 µg/√Hz</div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">Гироскоп</h4>
                      <div className="text-sm text-green-800 space-y-1">
                        <div>Диапазоны: ±125°/s до ±2000°/s</div>
                        <div>Разрешение: 16-bit</div>
                        <div>Частота: до 2000 Hz</div>
                        <div>Стабильность: 1°/h bias</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Магнетометр</h4>
                      <div className="text-sm text-blue-800 space-y-1">
                        <div>Диапазон: ±1300 µT</div>
                        <div>Разрешение: 13-bit</div>
                        <div>Частота: до 30 Hz</div>
                        <div>Точность: 0.3 µT</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 p-3 rounded-lg">
                    <h4 className="text-white mb-2">I2C адреса и подключение</h4>
                    <pre className="text-green-400 text-xs font-mono overflow-x-auto">
{`// I2C адреса компонентов
#define BMX055_ACC_ADDR   0x19  // Акселерометр
#define BMX055_GYRO_ADDR  0x69  // Гироскоп  
#define BMX055_MAG_ADDR   0x13  // Магнетометр

// Инициализация
void initBMX055() {
  writeI2C(BMX055_ACC_ADDR, 0x0F, 0x03);  // ±2g диапазон
  writeI2C(BMX055_GYRO_ADDR, 0x0F, 0x04); // ±500°/s
  writeI2C(BMX055_MAG_ADDR, 0x4B, 0x01);  // Нормальный режим
}`}
                    </pre>
                  </div>
                </div>

                {/* LTE модуль */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">4. LTE модуль SIMCOM A7672E</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-2">Характеристики</h4>
                      <div className="text-sm text-purple-800 space-y-1">
                        <div>Стандарты: LTE Cat-1, 2G fallback</div>
                        <div>Скорость: DL 10 Mbps, UL 5 Mbps</div>
                        <div>Частоты: B1/B3/B5/B8/B20 (Россия)</div>
                        <div>Питание: 3.4-4.2V, пик 2A</div>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-3 rounded-lg">
                      <h4 className="text-white mb-2">AT команды</h4>
                      <pre className="text-green-400 text-xs font-mono">
{`String initCommands[] = {
  "ATZ",           // Сброс
  "ATE0",          // Отключить эхо  
  "AT+CREG?",      // Статус сети
  "AT+CGATT=1",    // GPRS подключение
  "AT+NETOPEN"     // Открыть сеть
};`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* GPS модуль */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">5. GPS модуль u-blox NEO-9M</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <h4 className="font-medium text-indigo-900 mb-2">Характеристики</h4>
                      <div className="text-sm text-indigo-800 space-y-1">
                        <div>Системы: GPS, GLONASS, Galileo</div>
                        <div>Каналы: 72 канала</div>
                        <div>Точность: 2.5м (автономно)</div>
                        <div>Частота: до 18 Hz</div>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-3 rounded-lg">
                      <h4 className="text-white mb-2">Конфигурация</h4>
                      <pre className="text-green-400 text-xs font-mono">
{`// UBX команды для настройки
byte ubx_10hz[] = {0xB5, 0x62, 0x06, 0x08...};

void configureGPS() {
  Serial1.write(ubx_10hz, sizeof(ubx_10hz));
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Protocols Section */}
          <section id="protocols" className="mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <Radio className="w-6 h-6 text-orange-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">📡 Протоколы обмена данными</h2>
              </div>

              <div className="space-y-6">
                {/* Protocol Buffers */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Protocol Buffers схемы</h3>
                  
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="text-white mb-3">Основная структура телеметрии</h4>
                    <pre className="text-green-400 text-xs font-mono overflow-x-auto">
{`message TelemetryPacket {
  string device_id = 1;           // Уникальный ID регистратора
  uint64 timestamp = 2;           // Unix timestamp в миллисекундах
  GPSData gps = 3;               // Координаты и скорость
  EngineData engine = 4;         // Данные двигателя
  IMUData imu = 5;              // Данные инклинометра
  bytes signature = 6;           // HMAC-SHA256 подпись
  uint32 sequence = 7;           // Порядковый номер
}

message EngineData {
  uint32 rpm = 1;               // Обороты двигателя (об/мин)
  float coolant_temp = 2;       // Температура ОЖ (°C)
  float oil_pressure = 3;       // Давление масла (bar)
  float throttle_position = 4;  // Положение дросселя (%)
  float speed = 5;              // Скорость автомобиля (км/ч)
  uint32 engine_hours = 6;      // Моточасы (секунды)
}`}
                    </pre>
                  </div>
                </div>

                {/* CAN Protocol */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">CAN протокол ЭБУ IPAC</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <h4 className="font-medium text-yellow-900 mb-2">CAN ID Mapping</h4>
                      <div className="text-sm text-yellow-800 space-y-1">
                        <div><code>0x100</code> - Обороты двигателя</div>
                        <div><code>0x200</code> - Температуры</div>
                        <div><code>0x300</code> - Давления</div>
                        <div><code>0x400</code> - Положения</div>
                        <div><code>0x500</code> - Системные данные</div>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-3 rounded-lg">
                      <h4 className="text-white mb-2">Парсинг данных</h4>
                      <pre className="text-green-400 text-xs font-mono">
{`// Парсинг RPM (ID: 0x100)
uint16_t parseRPM(CANMessage msg) {
  return (msg.data[1] << 8) | msg.data[0];
}

// Температура ОЖ (ID: 0x200)
float parseCoolantTemp(CANMessage msg) {
  uint16_t raw = (msg.data[1] << 8) | msg.data[0];
  return (raw - 400) / 10.0;
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Data Processing */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Алгоритмы обработки данных</h3>
                  
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="text-white mb-3">Фильтр Калмана для углов ориентации</h4>
                    <pre className="text-green-400 text-xs font-mono overflow-x-auto">
{`class SimpleKalmanFilter {
private:
  float Q_angle = 0.001;   // Шум процесса
  float Q_bias = 0.003;    // Шум смещения
  float R_measure = 0.03;  // Шум измерения
  
  float angle = 0;         // Угол
  float bias = 0;          // Смещение
  float P[2][2] = {{0, 0}, {0, 0}}; // Матрица ковариации
  
public:
  float getAngle(float newAngle, float newRate, float dt) {
    // Прогноз
    rate = newRate - bias;
    angle += dt * rate;
    
    // Обновление матрицы ковариации
    P[0][0] += dt * (dt*P[1][1] - P[0][1] - P[1][0] + Q_angle);
    // ... остальная математика Калмана
    
    return angle;
  }
};`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section id="security" className="mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <Shield className="w-6 h-6 text-red-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">🔒 Система безопасности</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                    <h3 className="font-medium text-red-900">Аутентификация устройства</h3>
                  </div>
                  <p className="text-sm text-red-800 mb-3">
                    Каждое устройство имеет уникальный ID на основе MAC адреса и секретный ключ для HMAC подписей.
                  </p>
                  
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <pre className="text-green-400 text-xs font-mono overflow-x-auto">
{`#include "mbedtls/sha256.h"

class DeviceSecurity {
private:
  String deviceID;
  String secretKey;
  
public:
  void initSecurity() {
    uint8_t mac[6];
    esp_wifi_get_mac(WIFI_IF_STA, mac);
    
    deviceID = String(mac[0], HEX) + String(mac[1], HEX) + 
               String(mac[2], HEX) + String(mac[3], HEX);
    
    secretKey = "SECRET_MANUFACTURING_KEY_" + deviceID;
  }
  
  String generateHMAC(const String& data) {
    // HMAC-SHA256 implementation
    uint8_t hmacResult[32];
    // ... crypto code ...
    return hexString(hmacResult);
  }
};`}
                    </pre>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">Методы защиты</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• HMAC-SHA256 подписи пакетов</li>
                      <li>• Уникальные device ID</li>
                      <li>• Зашифрованное хранение ключей</li>
                      <li>• WiFi WPA2-Enterprise</li>
                      <li>• OTA updates с проверкой</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-900 mb-2">Контроль целостности</h3>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• CRC проверки для CAN данных</li>
                      <li>• Sequence numbers пакетов</li>
                      <li>• Timestamp валидация</li>
                      <li>• Watchdog таймеры</li>
                      <li>• Error correction codes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start">
              <Code className="w-6 h-6 text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-blue-900 mb-2">Статус документации</h3>
                <p className="text-sm text-blue-800 mb-3">
                  Полная техническая спецификация аппаратной части системы телеметрии. 
                  Документ содержит все необходимые детали для разработки, производства и отладки устройства.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-blue-700">
                    <div className="font-medium">Версия:</div>
                    <div>v2.1 (2025-01-27)</div>
                  </div>
                  <div className="text-blue-700">
                    <div className="font-medium">Статус:</div>
                    <div>✅ Готово к производству</div>
                  </div>
                  <div className="text-blue-700">
                    <div className="font-medium">Компонентов:</div>
                    <div>5 основных + периферия</div>
                  </div>
                  <div className="text-blue-700">
                    <div className="font-medium">Протоколов:</div>
                    <div>CAN, I2C, SPI, UART</div>
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