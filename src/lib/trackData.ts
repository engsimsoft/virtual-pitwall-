export interface TrackRecord {
  time: string;
  driver: string;
  team: string;
  date: string;
  car: string;
}

export interface SectorRecord {
  sector1: TrackRecord;
  sector2: TrackRecord;
  sector3: TrackRecord;
}

export interface Track {
  id: string;
  name: string;
  location: string;
  length: string;
  sectors: number;
  elevation: string;
  opened: string;
  lapRecord: TrackRecord;
  sectorRecords: SectorRecord;
  currentActivity: {
    activeCars: number;
    sessionType: string;
    weather: string;
    temperature: string;
  };
  recentLaps: TrackRecord[];
  yearlyStats: {
    totalLaps: number;
    averageLapTime: string;
    recordBreaks: number;
    activeDrivers: number;
  };
}

export const tracks: Track[] = [
  {
    id: "moscow-raceway",
    name: "Moscow Raceway",
    location: "Волоколамск, Московская область",
    length: "2.552 км",
    sectors: 3,
    elevation: "45м над уровнем моря",
    opened: "2012",
    lapRecord: {
      time: "1:33.247",
      driver: "Михаил Алёшин",
      team: "SMP Racing",
      date: "2024-09-15",
      car: "Dallara F3 T318"
    },
    sectorRecords: {
      sector1: {
        time: "28.156",
        driver: "Артём Севериухин",
        team: "R-ace GP",
        date: "2024-08-22",
        car: "Dallara F3 T318"
      },
      sector2: {
        time: "35.891",
        driver: "Михаил Алёшин", 
        team: "SMP Racing",
        date: "2024-09-15",
        car: "Dallara F3 T318"
      },
      sector3: {
        time: "29.200",
        driver: "Никита Володин",
        team: "Carlin",
        date: "2024-07-11",
        car: "Dallara F3 T318"
      }
    },
    currentActivity: {
      activeCars: 18,
      sessionType: "Квалификация",
      weather: "Солнечно",
      temperature: "24°C"
    },
    recentLaps: [
      {
        time: "1:34.125",
        driver: "Иван Березин",
        team: "Prema Racing",
        date: "2024-12-27 14:23",
        car: "Dallara F3 T318"
      },
      {
        time: "1:33.892",
        driver: "Роман Старосельский",
        team: "Hitech GP",
        date: "2024-12-27 14:21",
        car: "Dallara F3 T318"
      },
      {
        time: "1:34.567",
        driver: "Александр Смольяр",
        team: "MP Motorsport",
        date: "2024-12-27 14:19",
        car: "Dallara F3 T318"
      }
    ],
    yearlyStats: {
      totalLaps: 15847,
      averageLapTime: "1:42.345",
      recordBreaks: 3,
      activeDrivers: 127
    }
  },
  {
    id: "kazan-ring",
    name: "Kazan Ring",
    location: "Казань, Татарстан",
    length: "2.930 км",
    sectors: 3,
    elevation: "78м над уровнем моря",
    opened: "2014",
    lapRecord: {
      time: "1:38.924",
      driver: "Денис Мицкевич",
      team: "Fortec Motorsports",
      date: "2024-06-08",
      car: "Dallara F3 T318"
    },
    sectorRecords: {
      sector1: {
        time: "31.245",
        driver: "Владимир Апасавицкий",
        team: "ART Grand Prix",
        date: "2024-05-19",
        car: "Dallara F3 T318"
      },
      sector2: {
        time: "37.679",
        driver: "Денис Мицкевич",
        team: "Fortec Motorsports", 
        date: "2024-06-08",
        car: "Dallara F3 T318"
      },
      sector3: {
        time: "30.000",
        driver: "Максим Дефурни",
        team: "MP Motorsport",
        date: "2024-04-27",
        car: "Dallara F3 T318"
      }
    },
    currentActivity: {
      activeCars: 22,
      sessionType: "Свободная практика",
      weather: "Переменная облачность",
      temperature: "19°C"
    },
    recentLaps: [
      {
        time: "1:39.445",
        driver: "Тимур Богуславский",
        team: "Van Amersfoort Racing",
        date: "2024-12-27 14:25",
        car: "Dallara F3 T318"
      },
      {
        time: "1:40.123",
        driver: "Никита Бедрин",
        team: "Jenzer Motorsport",
        date: "2024-12-27 14:23",
        car: "Dallara F3 T318"
      }
    ],
    yearlyStats: {
      totalLaps: 12567,
      averageLapTime: "1:48.567",
      recordBreaks: 2,
      activeDrivers: 89
    }
  },
  {
    id: "sochi-autodrom",
    name: "Sochi Autodrom", 
    location: "Сочи, Краснодарский край",
    length: "3.634 км",
    sectors: 3,
    elevation: "40м над уровнем моря",
    opened: "2014",
    lapRecord: {
      time: "1:47.520",
      driver: "Валттери Боттас",
      team: "Mercedes-AMG Petronas",
      date: "2020-09-27",
      car: "Mercedes W11"
    },
    sectorRecords: {
      sector1: {
        time: "29.234",
        driver: "Льюис Хэмилтон",
        team: "Mercedes-AMG Petronas",
        date: "2020-09-26",
        car: "Mercedes W11"
      },
      sector2: {
        time: "38.567",
        driver: "Валттери Боттас",
        team: "Mercedes-AMG Petronas",
        date: "2020-09-27", 
        car: "Mercedes W11"
      },
      sector3: {
        time: "39.719",
        driver: "Макс Ферстаппен",
        team: "Red Bull Racing",
        date: "2021-09-25",
        car: "Red Bull RB16B"
      }
    },
    currentActivity: {
      activeCars: 8,
      sessionType: "Частные тесты",
      weather: "Дождь",
      temperature: "16°C"
    },
    recentLaps: [
      {
        time: "2:05.234",
        driver: "Никита Мазепин",
        team: "Частная команда",
        date: "2024-12-27 14:15",
        car: "Formula 2"
      }
    ],
    yearlyStats: {
      totalLaps: 8934,
      averageLapTime: "2:12.456",
      recordBreaks: 0,
      activeDrivers: 34
    }
  },
  {
    id: "igora-drive",
    name: "Igora Drive",
    location: "Санкт-Петербург, Ленинградская область", 
    length: "4.084 км",
    sectors: 3,
    elevation: "15м над уровнем моря",
    opened: "2019",
    lapRecord: {
      time: "2:01.456",
      driver: "Роберт Шварцман",
      team: "Ferrari Driver Academy",
      date: "2024-10-14",
      car: "Dallara F2 2018"
    },
    sectorRecords: {
      sector1: {
        time: "38.234",
        driver: "Клемен Новаль",
        team: "Trident",
        date: "2024-09-28",
        car: "Dallara F2 2018"
      },
      sector2: {
        time: "42.567",
        driver: "Роберт Шварцман",
        team: "Ferrari Driver Academy",
        date: "2024-10-14",
        car: "Dallara F2 2018"
      },
      sector3: {
        time: "40.655",
        driver: "Жак Вильнёв-младший",
        team: "DAMS",
        date: "2024-08-17",
        car: "Dallara F2 2018"
      }
    },
    currentActivity: {
      activeCars: 14,
      sessionType: "Гонка",
      weather: "Солнечно",
      temperature: "22°C"
    },
    recentLaps: [
      {
        time: "2:03.789",
        driver: "Андрей Соколов",
        team: "Charouz Racing System",
        date: "2024-12-27 14:27",
        car: "Dallara F2 2018"
      },
      {
        time: "2:02.345",
        driver: "Филипп Пребо",
        team: "ART Grand Prix",
        date: "2024-12-27 14:25",
        car: "Dallara F2 2018"
      }
    ],
    yearlyStats: {
      totalLaps: 9876,
      averageLapTime: "2:15.678",
      recordBreaks: 4,
      activeDrivers: 67
    }
  },
  {
    id: "ural-ring",
    name: "Ural Ring",
    location: "Екатеринбург, Свердловская область",
    length: "2.800 км", 
    sectors: 3,
    elevation: "255м над уровнем моря",
    opened: "2017",
    lapRecord: {
      time: "1:36.789",
      driver: "Егор Олешкевич",
      team: "SMP Racing",
      date: "2024-11-03",
      car: "Dallara F3 T318"
    },
    sectorRecords: {
      sector1: {
        time: "30.567",
        driver: "Егор Олешкевич",
        team: "SMP Racing",
        date: "2024-11-03",
        car: "Dallara F3 T318"
      },
      sector2: {
        time: "36.222",
        driver: "Иван Матвеев",
        team: "Prema Racing",
        date: "2024-10-15",
        car: "Dallara F3 T318"
      },
      sector3: {
        time: "30.000",
        driver: "Кирилл Силаев",
        team: "Hitech GP",
        date: "2024-09-07",
        car: "Dallara F3 T318"
      }
    },
    currentActivity: {
      activeCars: 16,
      sessionType: "Квалификация",
      weather: "Облачно",
      temperature: "12°C"
    },
    recentLaps: [
      {
        time: "1:37.234",
        driver: "Максим Петров",
        team: "Carlin",
        date: "2024-12-27 14:29",
        car: "Dallara F3 T318"
      },
      {
        time: "1:38.567",
        driver: "Денис Козлов",
        team: "MP Motorsport",
        date: "2024-12-27 14:27",
        car: "Dallara F3 T318"
      }
    ],
    yearlyStats: {
      totalLaps: 11234,
      averageLapTime: "1:45.234",
      recordBreaks: 5,
      activeDrivers: 78
    }
  },
  {
    id: "smolensk-ring", 
    name: "Smolensk Ring",
    location: "Смоленск, Смоленская область",
    length: "3.200 км",
    sectors: 3,
    elevation: "220м над уровнем моря",
    opened: "2015",
    lapRecord: {
      time: "1:42.345",
      driver: "Артём Маркелов",
      team: "BWT HWA Racelab",
      date: "2024-08-25",
      car: "Dallara F2 2018"
    },
    sectorRecords: {
      sector1: {
        time: "32.456",
        driver: "Артём Маркелов", 
        team: "BWT HWA Racelab",
        date: "2024-08-25",
        car: "Dallara F2 2018"
      },
      sector2: {
        time: "39.889",
        driver: "Ральф Бошунг",
        team: "Campos Racing",
        date: "2024-07-18",
        car: "Dallara F2 2018"
      },
      sector3: {
        time: "30.000",
        driver: "Айюки Ивасаки",
        team: "Virtuosi Racing",
        date: "2024-06-12",
        car: "Dallara F2 2018"
      }
    },
    currentActivity: {
      activeCars: 20,
      sessionType: "Свободная практика",
      weather: "Переменная облачность", 
      temperature: "18°C"
    },
    recentLaps: [
      {
        time: "1:43.678",
        driver: "Владислав Рыбаков",
        team: "Prema Racing",
        date: "2024-12-27 14:31",
        car: "Dallara F2 2018"
      },
      {
        time: "1:44.123",
        driver: "Андрей Вишневский",
        team: "DAMS",
        date: "2024-12-27 14:29",
        car: "Dallara F2 2018"
      }
    ],
    yearlyStats: {
      totalLaps: 13456,
      averageLapTime: "1:52.567",
      recordBreaks: 2,
      activeDrivers: 95
    }
  },
  {
    id: "nizhny-novgorod-ring",
    name: "Nizhny Novgorod Ring",
    location: "Нижний Новгород, Нижегородская область",
    length: "2.685 км",
    sectors: 3,
    elevation: "145м над уровнем моря", 
    opened: "2018",
    lapRecord: {
      time: "1:35.123",
      driver: "Павел Буланцев",
      team: "Arden International",
      date: "2024-12-01",
      car: "Dallara F3 T318"
    },
    sectorRecords: {
      sector1: {
        time: "29.678",
        driver: "Павел Буланцев",
        team: "Arden International", 
        date: "2024-12-01",
        car: "Dallara F3 T318"
      },
      sector2: {
        time: "35.445",
        driver: "Сергей Симонов",
        team: "Jenzer Motorsport",
        date: "2024-11-15",
        car: "Dallara F3 T318"
      },
      sector3: {
        time: "30.000",
        driver: "Тимофей Кораблёв",
        team: "Van Amersfoort Racing", 
        date: "2024-10-22",
        car: "Dallara F3 T318"
      }
    },
    currentActivity: {
      activeCars: 24,
      sessionType: "Гонка",
      weather: "Солнечно",
      temperature: "21°C"
    },
    recentLaps: [
      {
        time: "1:35.789",
        driver: "Константин Терещенко",
        team: "Trident",
        date: "2024-12-27 14:33",
        car: "Dallara F3 T318"
      },
      {
        time: "1:36.234",
        driver: "Михаил Белов",
        team: "Campos Racing",
        date: "2024-12-27 14:31",
        car: "Dallara F3 T318"
      },
      {
        time: "1:35.456",
        driver: "Алексей Корнеев",
        team: "ART Grand Prix",
        date: "2024-12-27 14:29",
        car: "Dallara F3 T318"
      }
    ],
    yearlyStats: {
      totalLaps: 16789,
      averageLapTime: "1:44.789",
      recordBreaks: 6,
      activeDrivers: 112
    }
  }
];

// Real-time data updates simulation
export function getRandomLapTime(trackId: string): string {
  const track = tracks.find(t => t.id === trackId);
  if (!track) return "0:00.000";
  
  const baseTime = parseFloat(track.lapRecord.time.replace(':', '').replace('.', ''));
  const variation = Math.random() * 10 + 2; // 2-12 seconds slower than record
  const newTime = baseTime + variation * 100;
  
  const minutes = Math.floor(newTime / 10000);
  const seconds = Math.floor((newTime % 10000) / 100);
  const milliseconds = Math.floor(newTime % 100);
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

export function getRandomDriver(): string {
  const drivers = [
    "Александр Смольяр", "Никита Володин", "Артём Севериухин", "Михаил Алёшин",
    "Роман Старосельский", "Иван Березин", "Денис Мицкевич", "Тимур Богуславский",
    "Роберт Шварцман", "Егор Олешкевич", "Артём Маркелов", "Павел Буланцев",
    "Максим Петров", "Владислав Рыбаков", "Константин Терещенко", "Алексей Корнеев"
  ];
  return drivers[Math.floor(Math.random() * drivers.length)];
}

export function getRandomTeam(): string {
  const teams = [
    "SMP Racing", "Prema Racing", "ART Grand Prix", "Hitech GP", 
    "MP Motorsport", "Carlin", "Trident", "DAMS", "Arden International",
    "Van Amersfoort Racing", "Jenzer Motorsport", "Campos Racing"
  ];
  return teams[Math.floor(Math.random() * teams.length)];
} 