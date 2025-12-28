'use client'

import { useState, useEffect } from 'react'
import { tracks, Track, getRandomLapTime, getRandomDriver, getRandomTeam } from '@/lib/trackData'
import { Trophy, MapPin, Clock, Users, Activity, BarChart3, TrendingUp } from 'lucide-react'
import Navigation from '@/components/Navigation'

export default function TracksPage() {
  const [selectedTrack, setSelectedTrack] = useState<Track>(tracks[0])
  const [liveUpdates, setLiveUpdates] = useState<{[key: string]: {
    timestamp: string;
    lapTime: string;
    driver: string;
    team: string;
    sessionType: string;
  }}>({})

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const trackId = selectedTrack.id
      const newUpdate = {
        timestamp: new Date().toLocaleTimeString(),
        lapTime: getRandomLapTime(trackId),
        driver: getRandomDriver(),
        team: getRandomTeam(),
        sessionType: selectedTrack.currentActivity.sessionType
      }
      
      setLiveUpdates(prev => ({
        ...prev,
        [trackId]: newUpdate
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [selectedTrack])

  // Get top 3 tracks by lap record
  const fastestTracks = tracks
    .slice()
    .sort((a, b) => {
      const timeA = parseFloat(a.lapRecord.time.replace(':', '').replace('.', ''))
      const timeB = parseFloat(b.lapRecord.time.replace(':', '').replace('.', ''))
      return timeA - timeB
    })
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      <Navigation title="🏁 Track Management System" />

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🏁 Система управления треками
          </h1>
          <p className="text-gray-600">
            Централизованная система рекордов и статистики для 7 российских треков с автоматическим определением достижений
          </p>
        </div>

        {/* Track Overview Cards */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Всего треков</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">7</div>
            <div className="text-sm text-gray-600">Российские автодромы</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Активно сейчас</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {tracks.reduce((sum, track) => sum + track.currentActivity.activeCars, 0)}
            </div>
            <div className="text-sm text-gray-600">Автомобилей на треках</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Рекорды в 2024</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {tracks.reduce((sum, track) => sum + track.yearlyStats.recordBreaks, 0)}
            </div>
            <div className="text-sm text-gray-600">Новых рекордов</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Активных пилотов</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {tracks.reduce((sum, track) => sum + track.yearlyStats.activeDrivers, 0)}
            </div>
            <div className="text-sm text-gray-600">В этом году</div>
          </div>
        </div>

        {/* Track Selection */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Выберите трек</h2>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => setSelectedTrack(track)}
                className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                  selectedTrack.id === track.id
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium text-gray-900 mb-1">{track.name}</div>
                <div className="text-sm text-gray-600 mb-2">{track.location}</div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{track.length}</span>
                  <span>{track.currentActivity.activeCars} авто</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Track Details */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Track Information */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{selectedTrack.name}</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{selectedTrack.location}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{selectedTrack.length} • {selectedTrack.elevation}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Открыт в {selectedTrack.opened}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Текущая активность</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Автомобилей:</span>
                    <span className="font-mono font-medium">{selectedTrack.currentActivity.activeCars}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Сессия:</span>
                    <span className="font-medium">{selectedTrack.currentActivity.sessionType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Погода:</span>
                    <span className="font-medium">{selectedTrack.currentActivity.weather}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Температура:</span>
                    <span className="font-mono font-medium">{selectedTrack.currentActivity.temperature}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Track Statistics */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium text-gray-900 mb-4">Статистика 2024</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Всего кругов:</span>
                  <span className="font-mono font-medium">{selectedTrack.yearlyStats.totalLaps.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Ср. время круга:</span>
                  <span className="font-mono font-medium">{selectedTrack.yearlyStats.averageLapTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Новых рекордов:</span>
                  <span className="font-mono font-medium">{selectedTrack.yearlyStats.recordBreaks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Активных пилотов:</span>
                  <span className="font-mono font-medium">{selectedTrack.yearlyStats.activeDrivers}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lap Record & Sector Records */}
          <div className="lg:col-span-2">
            {/* Overall Lap Record */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Рекорд трека</h3>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-800 font-mono mb-2">
                  {selectedTrack.lapRecord.time}
                </div>
                <div className="text-yellow-700 font-medium mb-1">
                  {selectedTrack.lapRecord.driver} • {selectedTrack.lapRecord.team}
                </div>
                <div className="text-sm text-yellow-600">
                  {selectedTrack.lapRecord.car} • {selectedTrack.lapRecord.date}
                </div>
              </div>
            </div>

            {/* Sector Records */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Рекорды по секторам</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                {/* Sector 1 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-sm font-medium text-blue-800 mb-2">СЕКТОР 1</div>
                  <div className="text-xl font-bold text-blue-900 font-mono mb-1">
                    {selectedTrack.sectorRecords.sector1.time}
                  </div>
                  <div className="text-sm text-blue-700 font-medium">
                    {selectedTrack.sectorRecords.sector1.driver}
                  </div>
                  <div className="text-xs text-blue-600">
                    {selectedTrack.sectorRecords.sector1.team}
                  </div>
                </div>

                {/* Sector 2 */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-sm font-medium text-green-800 mb-2">СЕКТОР 2</div>
                  <div className="text-xl font-bold text-green-900 font-mono mb-1">
                    {selectedTrack.sectorRecords.sector2.time}
                  </div>
                  <div className="text-sm text-green-700 font-medium">
                    {selectedTrack.sectorRecords.sector2.driver}
                  </div>
                  <div className="text-xs text-green-600">
                    {selectedTrack.sectorRecords.sector2.team}
                  </div>
                </div>

                {/* Sector 3 */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="text-sm font-medium text-red-800 mb-2">СЕКТОР 3</div>
                  <div className="text-xl font-bold text-red-900 font-mono mb-1">
                    {selectedTrack.sectorRecords.sector3.time}
                  </div>
                  <div className="text-sm text-red-700 font-medium">
                    {selectedTrack.sectorRecords.sector3.driver}
                  </div>
                  <div className="text-xs text-red-600">
                    {selectedTrack.sectorRecords.sector3.team}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Updates & Recent Laps */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Live Updates */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Live Updates</h3>
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Real-time
              </div>
            </div>

            {liveUpdates[selectedTrack.id] && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-800">Новый круг</span>
                  <span className="text-xs text-green-600 font-mono">
                    {liveUpdates[selectedTrack.id].timestamp}
                  </span>
                </div>
                <div className="text-lg font-bold text-green-900 font-mono mb-1">
                  {liveUpdates[selectedTrack.id].lapTime}
                </div>
                <div className="text-sm text-green-700">
                  {liveUpdates[selectedTrack.id].driver} • {liveUpdates[selectedTrack.id].team}
                </div>
              </div>
            )}

            <div className="space-y-3">
              {selectedTrack.recentLaps.map((lap, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <div className="font-mono font-medium text-gray-900">{lap.time}</div>
                    <div className="text-sm text-gray-600">{lap.driver}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{lap.team}</div>
                    <div className="text-xs text-gray-500">{lap.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fastest Tracks Leaderboard */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Самые быстрые треки</h3>
            </div>

            <div className="space-y-4">
              {fastestTracks.map((track, index) => (
                <div key={track.id} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{track.name}</div>
                    <div className="text-sm text-gray-600">{track.location}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-mono font-bold text-gray-900">{track.lapRecord.time}</div>
                    <div className="text-sm text-gray-600">{track.lapRecord.driver}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600 text-center">
                Рейтинг основан на абсолютных рекордах треков
              </div>
            </div>
          </div>
        </div>

        {/* Future Features Section */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-8 mb-8">
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Будущие возможности системы
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Track Management System - это концепт будущего развития Virtual Pitwall. 
              Планируемые функции включают автоматическое определение рекордов, 
              multi-dimensional leaderboards и интеграцию с чемпионатами.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="bg-white bg-opacity-50 rounded-lg p-4">
                <div className="font-medium text-gray-900 mb-1">🔄 Auto Record Detection</div>
                <div className="text-gray-600">Мгновенное обнаружение новых рекордов</div>
              </div>
              <div className="bg-white bg-opacity-50 rounded-lg p-4">
                <div className="font-medium text-gray-900 mb-1">📊 Multi-Track Analytics</div>
                <div className="text-gray-600">Сравнительный анализ по трекам</div>
              </div>
              <div className="bg-white bg-opacity-50 rounded-lg p-4">
                <div className="font-medium text-gray-900 mb-1">🏆 Championship Integration</div>
                <div className="text-gray-600">Интеграция с официальными чемпионатами</div>
              </div>
              <div className="bg-white bg-opacity-50 rounded-lg p-4">
                <div className="font-medium text-gray-900 mb-1">📱 Mobile Apps</div>
                <div className="text-gray-600">Мобильные уведомления о рекордах</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="text-center text-gray-600">
            <p>© 2025 Virtual Pitwall. Track Management System - концепт будущего развития.</p>
          </div>
        </div>
      </footer>

      {/* Comment System */}
    </div>
  )
} 