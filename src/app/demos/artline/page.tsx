'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

export default function VirtualPitwallArtLinePage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sessionType] = useState('Квалификация');

  // Команды и их машины
  const teams = [
    { name: 'Red Bull Racing', color: 'bg-blue-600', textColor: 'text-blue-600' },
    { name: 'Ferrari', color: 'bg-red-600', textColor: 'text-red-600' },
    { name: 'Mercedes', color: 'bg-gray-600', textColor: 'text-gray-600' },
    { name: 'McLaren', color: 'bg-orange-600', textColor: 'text-orange-600' }
  ];

  // Генерация данных для 20 машин (4 команды по 5 машин)
  const [raceData, setRaceData] = useState(() => {
    const drivers = [
      'Verstappen M.', 'Perez S.', 'Norris L.', 'Piastri O.', 'Hamilton L.',
      'Russell G.', 'Leclerc C.', 'Sainz C.', 'Alonso F.', 'Stroll L.',
      'Gasly P.', 'Ocon E.', 'Albon A.', 'Sargeant L.', 'Tsunoda Y.',
      'Ricciardo D.', 'Hulkenberg N.', 'Magnussen K.', 'Bottas V.', 'Zhou G.'
    ];

    return Array.from({ length: 20 }, (_, i) => {
      const teamIndex = Math.floor(i / 5);
      const carNumber = (i % 5) + 1 + (teamIndex * 10);
      const bestTime = 82.5 + Math.random() * 3; // 1:22.5 - 1:25.5
      const lastLap = bestTime + (Math.random() - 0.5) * 2;
      const sector1 = 25 + Math.random() * 2;
      const sector2 = 28 + Math.random() * 2;
      const sector3 = bestTime - sector1 - sector2;

      return {
        id: i + 1,
        carNumber,
        team: teams[teamIndex].name,
        teamColor: teams[teamIndex].color,
        teamTextColor: teams[teamIndex].textColor,
        driver: drivers[i],
        bestTime: bestTime,
        lastLap: lastLap,
        sector1: sector1,
        sector2: sector2,
        sector3: sector3,
        laps: 12 + Math.floor(Math.random() * 8),
        status: Math.random() > 0.85 ? (Math.random() > 0.5 ? 'warning' : 'critical') : 'ok'
      };
    });
  });

  // Обновление данных каждые 3 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      setRaceData(prev => prev.map(car => {
        const newLastLap = car.bestTime + (Math.random() - 0.3) * 2;
        const newBestTime = Math.min(car.bestTime, newLastLap);
        
        return {
          ...car,
          bestTime: newBestTime,
          lastLap: newLastLap,
          laps: car.laps + (Math.random() > 0.7 ? 1 : 0),
          status: Math.random() > 0.9 ? (Math.random() > 0.5 ? 'warning' : 'critical') : 'ok'
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Сортировка по лучшему времени
  const sortedData = [...raceData].sort((a, b) => a.bestTime - b.bestTime);

  // Лучшие сектора
  const bestSector1 = Math.min(...raceData.map(car => car.sector1));
  const bestSector2 = Math.min(...raceData.map(car => car.sector2));
  const bestSector3 = Math.min(...raceData.map(car => car.sector3));

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(3);
    return `${minutes}:${secs.padStart(6, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok': return 'bg-green-50 text-green-600';
      case 'warning': return 'bg-yellow-50 text-yellow-600';
      case 'critical': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getSectorColor = (time: number, bestTime: number) => {
    return Math.abs(time - bestTime) < 0.01 ? 'bg-purple-100 text-purple-800 font-bold' : '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation title="Virtual Pitwall ArtLine" />

      {/* Заголовок */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Virtual Pitwall <span className="text-red-600">ArtLine</span>
              </h1>
              <p className="text-gray-600">Демо гоночного уикенда - 4 команды, 20 спортпрототипов Legends EVO</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono text-gray-900">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-sm text-gray-500">Moscow Raceway • {sessionType}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Статистика сессии */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Команды</p>
                <p className="text-2xl font-bold text-blue-600">4</p>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Автомобили</p>
                <p className="text-2xl font-bold text-green-600">20</p>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Лучшее время</p>
                <p className="text-lg font-bold text-purple-600">{formatTime(Math.min(...raceData.map(car => car.bestTime)))}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Активные</p>
                <p className="text-2xl font-bold text-green-600">{raceData.filter(car => car.status === 'ok').length}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Проблемы</p>
                <p className="text-2xl font-bold text-red-600">{raceData.filter(car => car.status !== 'ok').length}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Основная таблица результатов */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Результаты сессии</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Поз</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">№</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Команда</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Гонщик</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Лучшее время</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Последний круг</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сектор 1</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сектор 2</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сектор 3</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Круги</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedData.map((car, index) => (
                    <tr key={car.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{index + 1}</td>
                      <td className="px-4 py-3">
                        <div className={`w-8 h-8 ${car.teamColor} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                          {car.carNumber}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{car.team}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{car.driver}</td>
                      <td className="px-4 py-3 text-sm font-mono font-bold text-gray-900">{formatTime(car.bestTime)}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-600">{formatTime(car.lastLap)}</td>
                      <td className={`px-4 py-3 text-sm font-mono ${getSectorColor(car.sector1, bestSector1)}`}>
                        {car.sector1.toFixed(3)}
                      </td>
                      <td className={`px-4 py-3 text-sm font-mono ${getSectorColor(car.sector2, bestSector2)}`}>
                        {car.sector2.toFixed(3)}
                      </td>
                      <td className={`px-4 py-3 text-sm font-mono ${getSectorColor(car.sector3, bestSector3)}`}>
                        {car.sector3.toFixed(3)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{car.laps}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(car.status)}`}>
                          {car.status === 'ok' ? '✅ OK' : car.status === 'warning' ? '⚠️ Warning' : '🚨 Critical'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Анализ по командам */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Анализ по командам</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teams.map((team, teamIndex) => {
              const teamCars = raceData.filter((_, i) => Math.floor(i / 5) === teamIndex);
              const bestTeamTime = Math.min(...teamCars.map(car => car.bestTime));
              const avgTime = teamCars.reduce((sum, car) => sum + car.bestTime, 0) / teamCars.length;
              
              return (
                <div key={team.name} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-4 h-4 ${team.color} rounded-full mr-3`}></div>
                    <h3 className="font-bold text-gray-900">{team.name}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Лучшее время:</span>
                      <span className="text-sm font-mono font-bold">{formatTime(bestTeamTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Среднее время:</span>
                      <span className="text-sm font-mono">{formatTime(avgTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Автомобили:</span>
                      <span className="text-sm font-bold">{teamCars.length}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
} 