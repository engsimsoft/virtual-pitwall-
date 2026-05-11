# TMS Telos UI Prototype — Handoff

**Последнее обновление:** 2026-05-11 (вторая сессия дня)

> Канонический документ состояния. Журнал сессий, newest-first. Каждая сессия добавляет одну компактную запись через `/handoff` в конце. Стабильный план — в [ROADMAP.md](ROADMAP.md).

---

## Где остановились

M4 закрыт целиком одной сессией 2026-05-11 — четыре коммита: `ba1292d`
landing card-grid из 6 экранов на `/` (заменил ArtLine-маркетинг) + nav
cleanup от стейл `/features`/`/demos` + back-to-home topbar во всех 6
dashboards; `efb8370` RoleProvider в layout + RoleSwitcher (pill-tabs)
в Navigation/topbar с pinned CLI-03/DRV-04 (выбраны так, чтобы matchнули
SES-008 — единственную live-сессию); `8381a5a` каскадная фильтрация в
6 dashboards с двухуровневой авторизацией (dashboardVisibleToRole +
entity-sub-filter) и общим `<EmptyForRole>`; `7e4735c` бонус — parametric
GPS shapes per-track вместо круга. ADR `2026-05-11-role-context-prototype-scope.md`
фиксирует scope, матрицу доступов, рациональ pinned IDs. Дорога открыта
в M5 (опциональные экраны + polish) или к критичному blocker'у деплоя.

`.claude/settings.json` остаётся локально modified — не часть рабочего
стейта сессии, не коммитится.

## Сделано в последних сессиях

- **2026-05-11 (вторая сессия дня, M4 целиком + GPS bonus)** — четыре
  feat-коммита закрыли M4: landing на `/` с card-grid из 6 экранов
  (live-session/anti-cheat-replay/fleet/passport/incidents/black-box) +
  очистка Navigation от стейл-ссылок `/features` и `/demos` + удаление
  стейл-страниц и осиротевшего `DemoCard`; общий `<DashboardTopBar>` с
  ← На главную + role-switcher во всех 6 dashboards (заодно убран
  дублирующийся eyebrow TMS Telos из Pattern A — fleet/incidents/black-box).
  RoleProvider в root layout, persist в localStorage, type
  `Role = 'tms-engineer' | 'client' | 'driver'`. Pinned IDs **CLI-03 /
  DRV-04** — выбраны под SES-008 (engineId=ENG-007, clientId=CLI-03,
  driverId=DRV-04), чтобы и client, и driver видели живую сессию.
  Двухуровневая авторизация в `lib/role/access.ts`: сначала
  `dashboardVisibleToRole` (driver видит только live-session, остальные
  5 экранов — EmptyForRole), затем `engineVisibleToRole`/`sessionVisibleToRole`
  для sub-фильтра внутри доступного экрана. Селекторы (engine-passport
  EngineSelector, anti-cheat-replay/black-box bundle pickers) автоматом
  fallback'ятся на первый visible bundle при смене роли через useEffect.
  Бонус по запросу пользователя: GPS-трек был sin/cos lapPhase (буквальный
  круг) — заменён на per-track parametric shape с шиканами/S-связками, 5
  разных silhouettes по трассам. ADR
  `2026-05-11-role-context-prototype-scope.md` фиксирует scope прототипа
  (не auth, не subject picker, не SSR-консистентность), матрицу доступов
  по ROADMAP-ролям и рациональ pinned IDs. Все 4 коммита прошли tsc +
  curl-smoke + браузерную верификацию пользователя.

- **2026-05-11 (одна большая сессия, M3 целиком)** — 9 feat-коммитов закрыли все 4 M3-экрана. Расширены моки: новый тип `MaintenanceEvent` + `MAINTENANCE` (9 событий), 2 historic sessions на ENG-009 (SES-009/010), 4 новых overrev mis-shift инцидента (severity=warn для pilot error, отдельно от cheating-violation). Брендинг разморожен: SVG-логотипы скопированы в `public/tms-logo-{graphite,white}.svg`, `--color-tms-orange: #ff4f00` и `--color-tms-graphite: #39393f` в `@theme inline`, заменён красный квадрат-плейсхолдер в Navigation на `next/image`-логотип, hover-цвет `red-600` → `tms-orange`. Снят ArtLine-наследный глобальный CSS-ban `transition/animation: none !important` — мешал heartbeat-индикатору. Извлечён `src/components/ui/SeverityDot` (третье использование triggered rule of three). Сквозная навигация: fleet → engine-passport (drill-down с EngineCard), fleet/passport/incidents → anti-cheat-replay/live-session (deep-link через whitelist+inert pattern). Anti-cheat-replay получил `?session=&seek=` parsing с graceful fallback на default. Три новых ADR: branding-unlock, overrev-severity-policy (mis-shift→warn vs cheating→violation), deep-link-whitelist+inert. Auto-memory дополнена feedback'ом «прототип = визуализация, не data pipeline» (поводом стало предложение пользователя про реальные стендовые дайно-листы из соседнего проекта `presentation.md/`, мы решили использовать как визуальный референс формата, не подменять моки). По пути закрыты два «Важных» open question'а в ROADMAP (дайно-кривые, криптоподпись), пользователь продолжает верифицировать визуально каждый закрываемый экран до движения вперёд.
- **2026-05-11 (одна сессия, M2 целиком)** — шесть feat-коммитов в две стадии. `/demos/live-session` (три коммита): server-shell пинован на SES-008, client LiveSessionDashboard с 200 ms тикером по 600 сэмплам и 30 s rolling window, charts на Recharts (dual RPM с delta-badge green/amber/red, boost CAN vs estimate dotted, speed/throttle dual-axis), IMU SVG ±1.5G, GPS-полилиния без карт-библиотек, current-values 10-row моноширинная таблица, footer ticker (двухрежимный: сессия или фид парка) + SignedBlockBar с playhead-cursor. `/demos/anti-cheat-replay` (три коммита): server-shell бандлит 4 violation-сессии (SES-003/004/005/006, дефолт SES-004), client-dashboard с chip-селектором, ScrubTimeline drag-to-seek + violation-band, ReplayRpmChart/BoostChart/SpeedThrottleChart c ReferenceArea+ReferenceLine, IncidentSummary с click-to-seek по incident.tMs, HashChainViz вертикальная с подсветкой violation-блоков, PlayControls (play/pause + ±1s + reset + ▶▶/◀◀ jump-to-prev/next-violation). По пути: ADR `2026-05-11-session-selector-scope-by-screen.md` (per-screen селекторы ок, глобальный — M4 role-switcher); экспорт `VIOLATION_WINDOWS` из `sessions.ts` через `index.ts` как новый публичный API; пользователь визуально верифицировал только live-session, replay не подтверждался.
- **2026-05-10 (третья сессия)** — закрытие M1: четыре коммита (`43f94fe` 6 файлов reference data, `a512368` 4 файла генератор/сессии/инциденты с детерминированным синтезом, `bc8741a` ROADMAP без dark-theme, `b7bd703` format.ts + MonoNumber.tsx). По пути: ADR `2026-05-10-defer-dark-theme-until-branding.md` (палитра ждёт брендинг TMS); смотр-tест tsx через npx упёрся в Node ESM/CJS из-за отсутствия `"type": "module"` в package.json — не бага, проверка через tsc + ручная инспекция математики окон нарушений достаточны для прототипа. Окна нарушений в генераторе принудительно поднимают rpmCan/throttle/vGPS до WOT-значений на прямой, чтобы сценарий совпадал с текстом incident summary независимо от фазы лап-цикла.
- **2026-05-10 (вторая сессия)** — закрытие M0 (брендинг и metadata) тремя коммитами + старт M1: `d0feb4e` пивот-цельный коммит (46 файлов: deletes ArtLine + scaffolding ROADMAP/HANDOFF/decisions/.claude/presentation), `952dbe6` rebrand (5 файлов), `6061a93` types.ts. ArtLine-маркетинг в `page.tsx` (hero, секции Race Control / Команды / Производители) намеренно не тронут — открытым вопросом перенесён в ROADMAP, замена landing — задача M4. Stale-маршруты `/demos`, `/features` в `mainLinks` Navigation тоже флагнуты в открытых вопросах.
- **2026-05-10 (первая сессия)** — Пивот ArtLine Virtual Pitwall → TMS Telos UI Prototype: удаление ArtLine-страниц и данных, проектирование структуры long-running коллаборации (ROADMAP, HANDOFF, decisions/, slash-команды), фиксация ключевых архитектурных решений. Реструктуризация шаблона: stable canon (open questions, «что не делать», реестр ADR, резюме одной фразой) полностью переехал в ROADMAP; HANDOFF сужен до журнала и снимка текущего состояния, чтобы избежать двойного источника правды.

## Следующий шаг

**Закрыть критичный блокер — деплой Vercel для Telos UI Prototype.**
`vercel.json` всё ещё содержит конфиг ArtLine-проекта; до публичной
демонстрации нужно или (а) создать отдельный Vercel-проект для Telos
и переписать конфиг под него, или (б) перенастроить нынешний проект
под новое имя/метаданные. Проверить также `package.json` name
(`telos-ui-prototype`), что `next build` собирается без ошибок, что
landing на `/` и все 6 dashboards рендерятся в production-режиме (SSG/SSR
вопрос для role-зависимых dashboards — провайдер клиентский, default
'tms-engineer' на сервере, hydrate из localStorage; в production
hydration mismatch не должен быть error'ом, но проверить визуально).
После деплоя поделиться preview URL и снять блокер из ROADMAP открытых
вопросов.

Альтернативный путь, если деплой откладывается: M5 — опциональные
экраны (`/demos/drop-zone` статус WiFi-инфраструктуры на Казань-Ринге +
`/demos/settings` регламент лимитов RPM/boost/temp на контракт/мотор)
и polish (motion-переходы между экранами, loading skeletons). M5
помечен как опциональный в ROADMAP — обогащает демо, но не блокирует
показ.
