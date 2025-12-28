'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function LegendsDemoPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCar, setSelectedCar] = useState(1);
  const [alertsCount, setAlertsCount] = useState(0);

  // Mock данные для G-G диаграммы
  const ggData = [
    { x: 0, y: 0 }, { x: 0.2, y: 0.8 }, { x: 0.5, y: 0.6 }, { x: 0.8, y: 0.3 },
    { x: 1.0, y: 0 }, { x: 0.8, y: -0.5 }, { x: 0.5, y: -0.8 }, { x: 0.2, y: -1.0 },
    { x: 0, y: -1.2 }, { x: -0.2, y: -1.0 }, { x: -0.5, y: -0.8 }, { x: -0.8, y: -0.5 },
    { x: -1.0, y: 0 }, { x: -0.8, y: 0.3 }, { x: -0.5, y: 0.6 }, { x: -0.2, y: 0.8 }
  ];

  // Mock данные для телеметрии
  const [telemetryData, setTelemetryData] = useState([
    { time: 0, rpm: 6500, pressure: 3.2, speed: 120, gLateral: 0.8, gLong: -0.3 },
    { time: 1, rpm: 7200, pressure: 3.1, speed: 125, gLateral: 1.2, gLong: 0.5 },
    { time: 2, rpm: 7800, pressure: 2.9, speed: 135, gLateral: -0.9, gLong: -1.1 },
    { time: 3, rpm: 7500, pressure: 3.0, speed: 140, gLateral: 1.5, gLong: 0.2 },
    { time: 4, rpm: 6800, pressure: 3.3, speed: 130, gLateral: -1.3, gLong: -0.8 }
  ]);

  // Флот спортпрототипов Legends EVO
  const [fleetData, setFleetData] = useState([
    { id: 1, driver: "Иванов А.", position: 1, lapTime: "1:23.456", status: "ok", rpm: 7200, pressure: 3.2, gForce: 1.2 },
    { id: 7, driver: "Петров В.", position: 2, lapTime: "1:23.892", status: "warning", rpm: 7850, pressure: 1.8, gForce: 1.8 },
    { id: 15, driver: "Сидоров С.", position: 3, lapTime: "1:24.123", status: "ok", rpm: 7100, pressure: 3.1, gForce: 1.1 },
    { id: 23, driver: "Козлов Д.", position: 4, lapTime: "1:24.567", status: "critical", rpm: 8200, pressure: 1.5, gForce: 2.1 },
    { id: 42, driver: "Морозов К.", position: 5, lapTime: "1:24.789", status: "ok", rpm: 6900, pressure: 3.3, gForce: 0.9 }
  ]);

  // Симуляция real-time обновлений
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      // Обновляем данные телеметрии
      setTelemetryData(prev => {
        const newData = [...prev];
        const lastTime = newData[newData.length - 1].time;
        const rpm = 6000 + Math.random() * 2000;
        const pressure = 2.5 + Math.random() * 1.5; // 2.5-4.0 Бар
        const speed = 100 + Math.random() * 50;
        const gLateral = (Math.random() - 0.5) * 3;
        const gLong = (Math.random() - 0.5) * 2.5;
        
        newData.push({
          time: lastTime + 1,
          rpm: Math.round(rpm),
          pressure: Math.round(pressure * 10) / 10,
          speed: Math.round(speed),
          gLateral: Math.round(gLateral * 10) / 10,
          gLong: Math.round(gLong * 10) / 10
        });
        
        return newData.slice(-20); // Сохраняем последние 20 точек
      });

      // Обновляем флот
      setFleetData(prev => prev.map(car => ({
        ...car,
        rpm: 6000 + Math.random() * 2500,
        pressure: 2.5 + Math.random() * 1.5, // 2.5-4.0 Бар
        gForce: Math.random() * 2.5,
        lapTime: `1:${23 + Math.floor(Math.random() * 3)}.${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`
      })));

      // Симуляция алертов
      if (Math.random() < 0.1) {
        setAlertsCount(prev => prev + 1);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok': return '✅';
      case 'warning': return '⚠️';
      case 'critical': return '🚨';
      default: return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation title="Virtual Pitwall Team" />

      {/* Заголовок демо */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'Демо', href: '/demos' },
            { label: 'Team Demo' }
          ]} />
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Virtual Pitwall <span className="text-red-600">Team</span>
              </h1>
              <p className="text-gray-600">Демо для команды - мониторинг 5 автомобилей команды</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono text-gray-900">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-sm text-gray-500">Moscow Raceway</div>
            </div>
          </div>
        </div>
      </section>

      {/* Статистика в реальном времени */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Автомобили на трассе</p>
                  <p className="text-2xl font-bold text-gray-900">{fleetData.length}</p>
                </div>
                <div className="text-3xl">🏎️</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Активные алерты</p>
                  <p className="text-2xl font-bold text-red-600">{alertsCount}</p>
                </div>
                <div className="text-3xl">🚨</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Лучшее время</p>
                  <p className="text-2xl font-bold text-green-600">1:23.456</p>
                </div>
                <div className="text-3xl">⏱️</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Контроль оборотов</p>
                  <p className="text-2xl font-bold text-blue-600">100%</p>
                </div>
                <div className="text-3xl">📊</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Главная панель */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Левая панель - Флот автомобилей */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🏁 Флот спортпрототипов Legends EVO</h2>
              <div className="space-y-3">
                {fleetData.map((car) => (
                  <div 
                    key={car.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedCar === car.id 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedCar(car.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {car.id}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{car.driver}</p>
                          <p className="text-sm text-gray-500">Поз. {car.position}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(car.status)}`}>
                        {getStatusIcon(car.status)} {car.status.toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Время: </span>
                        <span className="font-mono">{car.lapTime}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">RPM: </span>
                        <span className={`font-mono ${car.rpm > 8000 ? 'text-red-600 font-bold' : 'text-gray-900'}`}>
                          {Math.round(car.rpm)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Давл: </span>
                        <span className={`font-mono ${car.pressure < 2.0 ? 'text-red-600 font-bold' : 'text-gray-900'}`}>
                          {car.pressure.toFixed(1)} Бар
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">G-силы: </span>
                        <span className={`font-mono ${car.gForce > 2.0 ? 'text-red-600 font-bold' : 'text-gray-900'}`}>
                          {car.gForce.toFixed(1)}G
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Система алертов */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🚨 Критические алерты</h3>
                <div className="space-y-2">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-red-800">Авто #23 - Превышение оборотов</p>
                    <p className="text-xs text-red-600">8200 об/мин &gt; лимит 8000</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-yellow-800">Авто #7 - Высокая температура</p>
                    <p className="text-xs text-yellow-600">92°C приближается к лимиту</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая панель - Графики */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* G-G Диаграмма */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    📊 G-G диаграмма автомобиля #{selectedCar}
                  </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Анализ предельных режимов как в Formula 1
                </p>
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={ggData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        type="number" 
                        dataKey="x" 
                        domain={[-1.5, 1.5]}
                        axisLine={true}
                        tickLine={true}
                        tick={{ fontSize: 12 }}
                        label={{ value: 'Боковые G-силы', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="y" 
                        domain={[-1.5, 1.5]}
                        axisLine={true}
                        tickLine={true}
                        tick={{ fontSize: 12 }}
                        label={{ value: 'Продольные G-силы', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip 
                        formatter={(value, name) => [
                          `${typeof value === 'number' ? value.toFixed(2) : value}G`, 
                          name === 'x' ? 'Боковые' : 'Продольные'
                        ]}
                      />
                      <Scatter dataKey="y" fill="#dc2626" />
                      
                      {/* Лимитные окружности */}
                      <defs>
                        <pattern id="limit-circle" patternUnits="userSpaceOnUse" width="100%" height="100%">
                          <circle cx="50%" cy="50%" r="40%" stroke="#ef4444" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                        </pattern>
                      </defs>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 flex justify-between text-sm text-gray-600">
                  <span>🔴 Красная зона: критические G-силы</span>
                  <span>✅ Текущие значения в норме</span>
                </div>
              </div>

              {/* Телеметрия в реальном времени */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Обороты двигателя */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    ⚙️ Обороты двигателя (RPM)
                  </h3>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={telemetryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                        <YAxis domain={[5000, 8500]} tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(value) => [`${value} об/мин`, 'RPM']} />
                        <Line 
                          type="monotone" 
                          dataKey="rpm" 
                          stroke="#dc2626" 
                          strokeWidth={2}
                          dot={{ fill: '#dc2626', strokeWidth: 2, r: 3 }}
                        />
                        {/* Лимитная линия */}
                        <Line 
                          type="monotone" 
                          dataKey={() => 8000} 
                          stroke="#ef4444" 
                          strokeWidth={2}
                          strokeDasharray="5,5"
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    🔴 Красная линия: лимит 8000 об/мин
                  </p>
                </div>

                {/* Давление масла */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    🛢️ Давление масла
                  </h3>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={telemetryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                        <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(value) => [`${value} Бар`, 'Давление']} />
                        <Line 
                          type="monotone" 
                          dataKey="pressure" 
                          stroke="#f59e0b" 
                          strokeWidth={2}
                          dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
                        />
                        {/* Лимитная линия */}
                        <Line 
                          type="monotone" 
                          dataKey={() => 2.0} 
                          stroke="#ef4444" 
                          strokeWidth={2}
                          strokeDasharray="5,5"
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    🔴 Красная линия: критический мин давление 2.0 Бара
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Race Control dashboard */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Race Control dashboard для оперативного управления
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🚨</span>
                </div>
                                 <h3 className="text-lg font-bold text-gray-900 mb-2">Система безопасности</h3>
                 <p className="text-sm text-gray-600 mb-4">
                   Автоматическое обнаружение аварийных ситуаций и мгновенные алерты медицинской службе
                 </p>
                 <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                   <p className="text-sm font-medium text-green-800">✅ Все автомобили под контролем</p>
                   <p className="text-xs text-green-600">Real-time мониторинг 24/7</p>
                 </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📊</span>
                </div>
                                 <h3 className="text-lg font-bold text-gray-900 mb-2">Профессиональная аналитика</h3>
                 <p className="text-sm text-gray-600 mb-4">
                   Анализ динамики автомобиля уровня Formula 1 для оптимизации настроек
                 </p>
                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                   <p className="text-sm font-medium text-blue-800">📈 Улучшение времени на 2-3%</p>
                   <p className="text-xs text-blue-600">Через профессиональный анализ</p>
                 </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💰</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Экономия для ArtLine</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Контроль износа двигателей и предотвращение поломок флота
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-800">💵 ₽2,100,000 экономии/год</p>
                  <p className="text-xs text-green-600">Для флота 100 автомобилей</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
} 