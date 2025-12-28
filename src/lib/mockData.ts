// Mock данные для демонстрации телеметрии

export interface TelemetryData {
  timestamp: number;
  rpm: number;
  speed: number;
  throttle: number;
  engineTemp: number;
  oilPressure: number;
  gpsLat: number;
  gpsLng: number;
  lapTime?: number;
}

export interface ViolationAlert {
  id: string;
  carNumber: number;
  type: 'warning' | 'minor' | 'major' | 'critical';
  message: string;
  timestamp: number;
  parameter: string;
  value: number;
  limit: number;
}

// Генерация реалистичных данных телеметрии
export function generateTelemetryData(startTime: number = Date.now()): TelemetryData[] {
  const data: TelemetryData[] = [];
  const baseTime = startTime;
  
  // Эмуляция одного круга (примерно 2 минуты)
  for (let i = 0; i < 300; i++) { // 300 точек = 12 секунд при 25Hz
    const progress = i / 300; // от 0 до 1
    
    // Эмуляция прохождения поворотов
    const isCorner = Math.sin(progress * Math.PI * 4) > 0.5;
    const isStraight = !isCorner;
    
    data.push({
      timestamp: baseTime + i * 40, // 25Hz = каждые 40ms
      rpm: 6500 + Math.sin(progress * Math.PI * 6) * 1200 + Math.random() * 200,
      speed: isStraight ? 180 + Math.random() * 40 : 120 + Math.random() * 30,
      throttle: isCorner ? 40 + Math.random() * 30 : 85 + Math.random() * 15,
      engineTemp: 85 + Math.sin(progress * Math.PI * 2) * 8 + Math.random() * 3,
      oilPressure: 4.2 + Math.sin(progress * Math.PI * 3) * 0.8 + Math.random() * 0.2,
      gpsLat: 55.7558 + Math.sin(progress * Math.PI * 2) * 0.01,
      gpsLng: 37.6176 + Math.cos(progress * Math.PI * 2) * 0.01,
    });
  }
  
  return data;
}

// Генерация нарушений для демонстрации
export function generateViolations(): ViolationAlert[] {
  return [
    {
      id: '1',
      carNumber: 27,
      type: 'warning',
      message: 'Приближение к лимиту оборотов',
      timestamp: Date.now() - 45000,
      parameter: 'RPM',
      value: 7800,
      limit: 8000
    },
    {
      id: '2', 
      carNumber: 15,
      type: 'major',
      message: 'Превышение лимита скорости',
      timestamp: Date.now() - 120000,
      parameter: 'Speed',
      value: 205,
      limit: 200
    },
    {
      id: '3',
      carNumber: 33,
      type: 'critical',
      message: 'Критическое превышение оборотов',
      timestamp: Date.now() - 30000,
      parameter: 'RPM',
      value: 8200,
      limit: 8000
    },
    {
      id: '4',
      carNumber: 7,
      type: 'minor',
      message: 'Повышенная температура двигателя',
      timestamp: Date.now() - 180000,
      parameter: 'Engine Temp',
      value: 98,
      limit: 95
    }
  ];
}

// Симуляция real-time данных
export class TelemetrySimulator {
  private intervalId: NodeJS.Timeout | null = null;
  private callbacks: ((data: TelemetryData) => void)[] = [];
  private currentData: TelemetryData;
  
  constructor() {
    this.currentData = {
      timestamp: Date.now(),
      rpm: 6500,
      speed: 150,
      throttle: 75,
      engineTemp: 88,
      oilPressure: 4.5,
      gpsLat: 55.7558,
      gpsLng: 37.6176
    };
  }
  
  start() {
    if (this.intervalId) return;
    
    this.intervalId = setInterval(() => {
      // Генерируем новую точку данных
      this.currentData = {
        ...this.currentData,
        timestamp: Date.now(),
        rpm: Math.max(1000, Math.min(8500, this.currentData.rpm + (Math.random() - 0.5) * 400)),
        speed: Math.max(0, Math.min(250, this.currentData.speed + (Math.random() - 0.5) * 20)),
        throttle: Math.max(0, Math.min(100, this.currentData.throttle + (Math.random() - 0.5) * 15)),
        engineTemp: Math.max(70, Math.min(110, this.currentData.engineTemp + (Math.random() - 0.5) * 2)),
        oilPressure: Math.max(2, Math.min(6, this.currentData.oilPressure + (Math.random() - 0.5) * 0.3)),
        gpsLat: this.currentData.gpsLat + (Math.random() - 0.5) * 0.0001,
        gpsLng: this.currentData.gpsLng + (Math.random() - 0.5) * 0.0001,
      };
      
      // Уведомляем всех подписчиков
      this.callbacks.forEach(callback => callback(this.currentData));
    }, 40); // 25Hz
  }
  
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  
  subscribe(callback: (data: TelemetryData) => void) {
    this.callbacks.push(callback);
    
    // Возвращаем функцию для отписки
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }
}

// Конфигурация лимитов для демонстрации контроля регламента
export const LIMITS = {
  rpm: {
    warning: 7500,
    critical: 8000
  },
  speed: {
    warning: 190, 
    critical: 200
  },
  engineTemp: {
    warning: 95,
    critical: 105
  },
  oilPressure: {
    warningLow: 3.0,
    criticalLow: 2.5
  }
};

// Проверка нарушений
export function checkViolations(data: TelemetryData): ViolationAlert[] {
  const violations: ViolationAlert[] = [];
  
  // RPM проверка
  if (data.rpm > LIMITS.rpm.critical) {
    violations.push({
      id: `rpm_${data.timestamp}`,
      carNumber: 27,
      type: 'critical',
      message: 'КРИТИЧЕСКОЕ превышение оборотов!',
      timestamp: data.timestamp,
      parameter: 'RPM',
      value: Math.round(data.rpm),
      limit: LIMITS.rpm.critical
    });
  } else if (data.rpm > LIMITS.rpm.warning) {
    violations.push({
      id: `rpm_${data.timestamp}`,
      carNumber: 27,
      type: 'warning',
      message: 'Приближение к лимиту оборотов',
      timestamp: data.timestamp,
      parameter: 'RPM', 
      value: Math.round(data.rpm),
      limit: LIMITS.rpm.critical
    });
  }
  
  // Speed проверка
  if (data.speed > LIMITS.speed.critical) {
    violations.push({
      id: `speed_${data.timestamp}`,
      carNumber: 27,
      type: 'major',
      message: 'Превышение лимита скорости',
      timestamp: data.timestamp,
      parameter: 'Speed',
      value: Math.round(data.speed),
      limit: LIMITS.speed.critical
    });
  }
  
  // Temperature проверка
  if (data.engineTemp > LIMITS.engineTemp.critical) {
    violations.push({
      id: `temp_${data.timestamp}`,
      carNumber: 27,
      type: 'major',
      message: 'Критическая температура двигателя',
      timestamp: data.timestamp,
      parameter: 'Engine Temp',
      value: Math.round(data.engineTemp),
      limit: LIMITS.engineTemp.critical
    });
  }
  
  return violations;
} 