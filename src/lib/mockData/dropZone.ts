import type { DropZoneSite } from './types'

// Drop Zone — комплект WiFi+edge+LTE-backup на проблемной трассе (presentation.md
// §«Drop Zone — отдельная история про Казань-Ринг»). Один комплект на Казань-Ринг
// (TRK-02) — единственная российская трасса без LTE-покрытия в каньоне реки
// Меша. Состав железа взят из presentation: MikroTik mANTBox ax 15s,
// iROBO 6000, MikroTik LtAP LTE6 + Kroks KAA20.
//
// Состояние на момент мокапа: WiFi online, edge online, LTE backup degraded
// (дождь, RSRP сел) — это показывает что система переживает деградацию
// одного канала без потери операционной готовности.
export const DROP_ZONES: DropZoneSite[] = [
  {
    id: 'DZ-KAZ-01',
    trackId: 'TRK-02',
    name: 'Drop Zone — Казань-Ринг',
    costRub: 195_000,
    lastSyncMinutesAgo: 12,
    bufferSessions: 0,
    bufferBlocks: 0,
    components: [
      {
        id: 'DZ-WIFI',
        kind: 'wifi-ap',
        model: 'MikroTik mANTBox ax 15s',
        status: 'online',
        uptimeHours: 437,
        metrics: [
          { label: 'Стандарт', value: 'WiFi 6 · 5 ГГц' },
          { label: 'Клиентов', value: '6' },
          { label: 'Throughput', value: '142 Мбит/с' },
          { label: 'RSSI медиана', value: '−54 дБм' },
        ],
        note: 'Секторная антенна на парк-ферме, покрытие — пит-лейн и стартовая прямая.',
      },
      {
        id: 'DZ-EDGE',
        kind: 'edge-server',
        model: 'iROBO 6000',
        status: 'online',
        uptimeHours: 437,
        metrics: [
          { label: 'CPU', value: '14 %' },
          { label: 'RAM', value: '4.2 / 16 GB' },
          { label: 'Storage', value: '78 / 512 GB' },
          { label: 'Очередь к облаку', value: '0 блоков' },
        ],
        note: 'Промышленный edge-узел в трейлере промоутера. Принимает потоки WiFi, подписывает блоки, реплицирует в облако через LTE-аплинк.',
      },
      {
        id: 'DZ-LTE',
        kind: 'lte-backup',
        model: 'MikroTik LtAP LTE6 + Kroks KAA20',
        status: 'degraded',
        uptimeHours: 437,
        metrics: [
          { label: 'Оператор', value: 'МегаФон · B7' },
          { label: 'RSRP', value: '−112 дБм' },
          { label: 'SINR', value: '4 дБ' },
          { label: 'Uplink', value: '3.1 Мбит/с' },
        ],
        note: 'Направленная антенна KAA20 на крыше боксов смотрит на ближайшую вышку через хребет. Сейчас деградация из-за осадков, последняя синхронизация прошла, очередь пуста.',
      },
    ],
  },
]
