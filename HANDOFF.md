# TMS Telos UI Prototype — Handoff

**Последнее обновление:** 2026-05-10

> Канонический документ состояния. Журнал сессий, newest-first. Каждая сессия добавляет одну компактную запись через `/handoff` в конце. Стабильный план — в [ROADMAP.md](ROADMAP.md).

---

## Где остановились

M0 закрыт полностью. Брендинг и метаданные обновлены: `package.json` name, `layout.tsx` (title/description/lang=ru), Navigation default title `🏁 TMS Telos` + dropdownSections очищены и дроп-кнопка скрывается при пустом массиве, footer `page.tsx`. M1 стартован: `src/lib/mockData/types.ts` фиксирует типы всех 9 доменных сущностей (Engine, Session, TelemetrySample с двумя анти-чит каналами, Incident, DynoCurve, Track, Client, Driver, Regulation). Барреля `index.ts` нет — заведётся вместе с первым data-файлом. Все коммиты этой сессии прошли typecheck `tsc --noEmit` начисто.

## Сделано в последних сессиях

- **2026-05-10 (вторая сессия)** — закрытие M0 (брендинг и metadata) тремя коммитами + старт M1: `d0feb4e` пивот-цельный коммит (46 файлов: deletes ArtLine + scaffolding ROADMAP/HANDOFF/decisions/.claude/presentation), `952dbe6` rebrand (5 файлов), `6061a93` types.ts. ArtLine-маркетинг в `page.tsx` (hero, секции Race Control / Команды / Производители) намеренно не тронут — открытым вопросом перенесён в ROADMAP, замена landing — задача M4. Stale-маршруты `/demos`, `/features` в `mainLinks` Navigation тоже флагнуты в открытых вопросах.
- **2026-05-10 (первая сессия)** — Пивот ArtLine Virtual Pitwall → TMS Telos UI Prototype: удаление ArtLine-страниц и данных, проектирование структуры long-running коллаборации (ROADMAP, HANDOFF, decisions/, slash-команды), фиксация ключевых архитектурных решений. Реструктуризация шаблона: stable canon (open questions, «что не делать», реестр ADR, резюме одной фразой) полностью переехал в ROADMAP; HANDOFF сужен до журнала и снимка текущего состояния, чтобы избежать двойного источника правды.

## Следующий шаг

**M1 шаг 2 — reference data (без time series).** Создать в `src/lib/mockData/`:

- `clients.ts` — 3-4 клиента-арендатора (`Client[]`)
- `drivers.ts` — по 1-2 гонщика на клиента (`Driver[]`)
- `tracks.ts` — минимум 5 трасс из [presentation.md](presentation.md) (Москва/Moscow Raceway, Казань/Kazan Ring, Сочи Автодром, Игора Драйв, ADM Raceway), `Track[]`
- `engines.ts` — 8-12 моторов, разнесены по клиентам, разные `EngineStatus` (несколько `live`, остальные `idle`/`maintenance`/`decommissioned` для инвентаря парка), `Engine[]`
- `dyno.ts` — `DynoCurve` на каждый мотор, синтетическая, разумной формы (peak torque ~5500 rpm, peak power ~7500-8000 rpm, redline согласно `bornAt`/модели)
- `index.ts` — barrel: re-export типов и data-массивов

Тайм-серии и инциденты — отдельный шаг 3, на этих данных. После reference надо будет выбрать набор UUID/format-конвенции (короткие стабильные ID типа `ENG-001` против hash-like) и зафиксировать в первом data-файле — все остальные подхватят паттерн.
