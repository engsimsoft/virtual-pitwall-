# TMS Telos UI Prototype — Handoff

**Последнее обновление:** 2026-05-10

> Канонический документ состояния. Журнал сессий, newest-first. Каждая сессия добавляет одну компактную запись через `/handoff` в конце. Стабильный план — в [ROADMAP.md](ROADMAP.md).

---

## Где остановились

M1 закрыт полностью четырьмя feat-коммитами этой сессии (`43f94fe` reference data, `a512368` time-series + incidents, `bc8741a` drop dark-theme из M1, `b7bd703` format-утилиты). Mock-корпус целостный: 3 клиента / 5 водителей / 5 трасс / 10 моторов / 10 дайно-кривых / 8 сессий с детерминированной 5 Hz телеметрией / 6 инцидентов / signed-block цепочки. ID-конвенция зафиксирована (CLI-NN, DRV-NN, TRK-NN для low-cardinality; ENG-NNN, SES-NNN, INC-NNN для high). Format-утилиты `formatRpm`/`formatLapTime` + `MonoNumber` готовы к UI. Все коммиты прошли tsc --noEmit начисто. Тёмная палитра вынесена за M1-M2 — см. ADR `decisions/2026-05-10-defer-dark-theme-until-branding.md`. Дорога открыта в M2.

## Сделано в последних сессиях

- **2026-05-10 (третья сессия)** — закрытие M1: четыре коммита (`43f94fe` 6 файлов reference data, `a512368` 4 файла генератор/сессии/инциденты с детерминированным синтезом, `bc8741a` ROADMAP без dark-theme, `b7bd703` format.ts + MonoNumber.tsx). По пути: ADR `2026-05-10-defer-dark-theme-until-branding.md` (палитра ждёт брендинг TMS); смотр-tест tsx через npx упёрся в Node ESM/CJS из-за отсутствия `"type": "module"` в package.json — не бага, проверка через tsc + ручная инспекция математики окон нарушений достаточны для прототипа. Окна нарушений в генераторе принудительно поднимают rpmCan/throttle/vGPS до WOT-значений на прямой, чтобы сценарий совпадал с текстом incident summary независимо от фазы лап-цикла.
- **2026-05-10 (вторая сессия)** — закрытие M0 (брендинг и metadata) тремя коммитами + старт M1: `d0feb4e` пивот-цельный коммит (46 файлов: deletes ArtLine + scaffolding ROADMAP/HANDOFF/decisions/.claude/presentation), `952dbe6` rebrand (5 файлов), `6061a93` types.ts. ArtLine-маркетинг в `page.tsx` (hero, секции Race Control / Команды / Производители) намеренно не тронут — открытым вопросом перенесён в ROADMAP, замена landing — задача M4. Stale-маршруты `/demos`, `/features` в `mainLinks` Navigation тоже флагнуты в открытых вопросах.
- **2026-05-10 (первая сессия)** — Пивот ArtLine Virtual Pitwall → TMS Telos UI Prototype: удаление ArtLine-страниц и данных, проектирование структуры long-running коллаборации (ROADMAP, HANDOFF, decisions/, slash-команды), фиксация ключевых архитектурных решений. Реструктуризация шаблона: stable canon (open questions, «что не делать», реестр ADR, резюме одной фразой) полностью переехал в ROADMAP; HANDOFF сужен до журнала и снимка текущего состояния, чтобы избежать двойного источника правды.

## Следующий шаг

**M2 — старт с `/demos/live-session`.** Это первый из двух flagship-экранов anti-cheat showcase. Маршрута сейчас нет; создать `src/app/demos/live-session/page.tsx`. Перед кодом — design pass: что выше fold (двойной RPM-чарт двумя линиями rpmCan/rpmGen + delta-индикатор, текущий boost CAN vs дайно-estimate, sparkline скорости/throttle, IMU-блок с G-circle, GPS-mini); как рисовать GPS-трек без карт-библиотеки (SVG-овал по lat/lon из samples, пометка текущей позиции); как чарты подключаются к live-сессии SES-008 (партиал 2 мин). Recharts уже в проекте — использовать. Чарты dual-axis для RPM или две линии в одном Y-домене — определить по плотности.

Anti-cheat-replay (`/demos/anti-cheat-replay`) — следующий за live-session экран в M2, на завершённых сессиях с инцидентами (SES-003, SES-004, SES-005, SES-006). Замок: scrubbable timeline + подсветка violation-windows + визуализация signed-block цепочки.
