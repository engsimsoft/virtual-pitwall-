import type { Track } from './types'

// 5 RF circuits from presentation.md. Lap lengths are public approximate
// figures from the venues' published configurations.
export const TRACKS: Track[] = [
  { id: 'TRK-01', name: 'Moscow Raceway', city: 'Волоколамск', lapLengthMeters: 3955 },
  { id: 'TRK-02', name: 'Kazan Ring', city: 'Иннополис', lapLengthMeters: 3354 },
  { id: 'TRK-03', name: 'Сочи Автодром', city: 'Сочи', lapLengthMeters: 5848 },
  { id: 'TRK-04', name: 'Игора Драйв', city: 'Сосново', lapLengthMeters: 4086 },
  { id: 'TRK-05', name: 'ADM Raceway', city: 'Мячково', lapLengthMeters: 3060 },
]
