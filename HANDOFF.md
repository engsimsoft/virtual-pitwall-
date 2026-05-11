# TMS Telos UI Prototype — Handoff

**Последнее обновление:** 2026-05-11 (overhaul in progress — critical fixes applied, manual QA pending)

> Канонический документ состояния. Журнал сессий, newest-first. Стабильный план — в [ROADMAP.md](ROADMAP.md). **Дорожная карта overhaul — в [OVERHAUL-PLAN.md](OVERHAUL-PLAN.md).**

---

## Текущая сессия: Overhaul waves 1–3 + hotfixes

**Дата:** 2026-05-11  
**Агент:** Kimi Code CLI  
**Волны:** 1 (visual system + navigation), 2 (device context), 3 (polish + heartbeat)  
**Статус:** горячие исправления применены, **мануальное тестирование НЕ ПРОВЕДЕНО**, production задеплоен  
**Последний коммит:** b110b9a

### Что сделано в этой сессии
- [x] **Волна 1 — Визуальная система + навигация:**
  - Полная тёмная automotive тема (`#0b0d12` background, CSS-переменные, переключатель светлая/тёмная).
  - Shared UI-kit: `Card`, `HeaderCell`, `StatusBadge`, `DataRow`, `IconButton`, `DeviceStatusBar`.
  - Sidebar-навигация (8 экранов, active state, mobile overlay, ThemeToggle + RoleSwitcher).
  - `AppShell` layout с `framer-motion` page transitions (`AnimatePresence`).
  - Редизайн главной страницы (`/`) под overview-dashboard.
  - Удалён мёртвый код: `Navigation.tsx`, `DashboardTopBar.tsx`.
  - `h-screen` → `h-dvh`, responsive grids (mobile-first).
- [x] **Волна 2 — Железный контекст + живые данные:**
  - `DeviceStatusBar` на Live Session и Anti-Cheat Replay (serial, firmware, LTE bars, GPS sats, latency, last packet pulse).
  - Селектор сессий в Live Session (все сессии, chip-style, role-filtered).
  - Connection pulse (`animate-pulse-live`) на LIVE-индикаторе.
- [x] **Волна 3 — Polish + forensic feel:**
  - Skeleton loaders для 4 ключевых экранов — **но вызывали Rules of Hooks ошибку, убраны**.
  - Fleet heartbeat simulation: случайный мотор меняет статус каждые 10 секунд.
  - Recharts графики используют CSS-переменные для цветов.
- [x] **Hotfixes в рамках сессии:**
  - `40b05a3` — fix(theme): hydration mismatch из-за `mounted`-guard в ThemeProvider.
  - `dee8256` — fix(hooks): Rules of Hooks violation из-за `if (loading) return` перед `useMemo`.
  - `e6e1dcd` — fix(live-session): rewrite layout, dark SVG colors, ping live indicator.
  - `ef48314` — fix(anti-cheat): visible violation windows, chart colors, axes, scrubber bands.
  - `b110b9a` — fix(layout): explicit min-height на всех chart cards для Recharts rendering.

### Известные проблемы / регрессии (требуют мануальной проверки)
- [ ] **Recharts графики:** применён fix с `min-h-[200px]` — нужно визуально подтвердить что графики рисуются и не обрезаются.
- [ ] **Violation windows на Anti-Cheat:** `fillOpacity={0.35}` — нужно проверить что красные полосы видны на тёмном фоне.
- [ ] **Mobile layout (< 1024px):** overflow behavior не проверен вручную. Карточки могут сжиматься или прыгать.
- [ ] **Playhead (оранжевая линия):** поменялся с `text-primary` на `accent` — нужно убедиться что видна на всех графиках.
- [ ] **SVG цвета (GPS, IMU):** переведены на CSS-переменные — нужно проверить что не осталось светлых пятен на тёмной теме.
- [ ] **Theme toggle:** переключение светлая/тёмная не тестировалось вручную после удаления `mounted`-guard.
- [ ] **Role switcher:** проверить что при смене роли фильтруются сессии и не ломается навигация.

### Что НЕ работает / НЕ сделано
- [ ] **Волна 4 — QA:** не проведён сквозной прогон 8 сценариев × 3 роли.
- [ ] **Lighthouse:** не проверялся performance и accessibility.
- [ ] **Zoom scrubber** (Волна 3): отложен.
- [ ] **Hash tamper simulation** (Волна 3): отложен.
- [ ] **Skeleton loaders:** удалены из-за Rules of Hooks, нужно реализовать корректно (без early return перед хуками).

### Критичное правило для следующей сессии
> **Мануальное тестирование перед каждым коммитом.** Открыть localhost в браузере, проверить:
> 1. Открывается ли экран без белого экрана / ошибок консоли.
> 2. Рисуются ли графики (Recharts SVG виден).
> 3. При ресайзе окна ничего не наезжает и не пропадает.
> 4. Переключение ролей и темы работает.
> 5. Мобильный вид (DevTools → responsive) читаем.
>
> **НЕ КОММИТИТЬ** изменения layout без визуальной проверки в браузере.

### Следующий шаг (мануальный QA)
1. Открыть http://localhost:3000/demos/live-session — проверить графики, pulse, селектор сессий.
2. Открыть http://localhost:3000/demos/anti-cheat-replay — проверить violation windows, playhead, scrubber, инциденты.
3. Переключить роли (TMS → Клиент → Гонщик) на обоих экранах.
4. Переключить тему (тёмная → светлая → тёмная).
5. DevTools → Responsive → iPhone SE / iPad — проверить mobile layout.
6. Если всё ок — `git push origin main` → проверить production.
7. Если есть проблемы — исправить, перетестировать, потом коммит.

### Коммиты (все в main, pushed)
- `c27c004` overhaul(wave-1): dark theme, sidebar navigation, shared UI kit, AppShell
- `892e183` overhaul(wave-2): DeviceStatusBar, live session selector, dark theme polish
- `7e59746` overhaul(wave-3): skeleton loaders, page transitions, fleet heartbeat
- `40b05a3` fix(theme): remove mounted guard causing hydration mismatch in dev
- `dee8256` fix(hooks): remove loading skeleton early returns causing Rules of Hooks violation
- `e6e1dcd` fix(live-session): rewrite layout, fix overlapping charts, dark SVG colors, ping live indicator
- `ef48314` fix(anti-cheat): visible violation windows, chart colors, axes, scrubber bands, live layout
- `b110b9a` fix(layout): explicit min-height on all chart cards for Recharts rendering

---

## Что ещё можно улучшить (приоритеты)

### Must (перед показом заказчику)
1. **Мануальный QA всего прототипа** — пройти все 8 экранов, проверить 3 роли, dark/light темы, mobile.
2. **Anti-Cheat Replay — zoom scrubber** — сейчас scrubber показывает всю сессию, violation windows — маленькие полоски. Два режима: Overview + Zoom (±15 сек от current) сделают нарушения читаемыми.
3. **Hash tamper simulation** — кнопка "Симулировать взлом" в Black Box / HashChainViz: ломает один хеш, вся цепочка после него краснеет. Сильный момент для заказчика — он видит, почему криптография работает.

### Should (улучшит впечатление)
4. **Skeleton loaders (корректная реализация)** — без `if (loading) return`, через Suspense или через CSS-only shimmer overlay поверх контента.
5. **Page transition polish** — сейчас fade-in/out работает, но можно добавить stagger для карточек внутри дашборда.
6. **Fleet — real-time simulation** — сейчас статусы меняются каждые 10 сек. Можно добавить "heartbeat lost" анимацию (красная пульсация на карточке мотора).

### Nice to have
7. **Sound alerts** — короткий beep при появлении violation в Live Session. Чисто визуальный (Web Audio API), не требует assets.
8. **Export screenshot** — кнопка "Сохранить скриншот" на Anti-Cheat Replay для юридического архива.
9. **Keyboard shortcuts** — пробел = play/pause, стрелки = ±1 сек, J/K = jump to prev/next violation (как в видеоплеерах).

---

## Исторические сессии

### Overhaul kickoff

**Дата:** 2026-05-11  
**Волна:** планирование  
**Последний коммит:** dd9d3a1  

- [x] Полный аудит кодовой базы: 8 dashboards, 40+ компонентов, mock-data система, role-access, build, deploy.
- [x] Выявлены 7 кластеров проблем.
- [x] Составлен план из 4 волн.
- [x] Создан `OVERHAUL-PLAN.md`.
- [x] Обновлён `HANDOFF.md`.

---

## Исторические сессии (пред-overhaul)

**Последнее обновление:** 2026-05-11 (третья сессия дня)

> Канонический документ состояния. Журнал сессий, newest-first. Каждая сессия добавляет одну компактную запись через `/handoff` в конце. Стабильный план — в [ROADMAP.md](ROADMAP.md).

---

## Где остановились

Третья сессия 2026-05-11 закрыла критичный блокер деплоя и большую часть
M5. Production живёт на https://virtual-pitwall.vercel.app (autodeploy
из `main` через GitHub Integration на существующий Vercel-проект
`virtual-pitwall` в team `engsimsoft-gmailcoms-projects`); ADR
`2026-05-11-deploy-vercel-keep-single-project.md` фиксирует
single-project подход и почему переименование в `telos-ui-prototype`
отложено как косметика. Репозиторий очищен от ArtLine-наследия одним
`chore`-коммитом — 15 файлов (`vercel.json`, 7 редиректов из
`next.config.ts`, `ignoreBuildErrors: true`, 5 корневых `.md`,
`.eslintrc.json`/`mcp-config.json`, `scripts/backup/`, Next.js-template
SVG в `public/`, локально `backups/`). M5 закрыт по двум экранам:
`/demos/drop-zone` (TMS-only) и `/demos/settings` (TMS+client) —
остался только polish (motion-переходы + loading skeletons), отложен
как объединённый visual overhaul с тёмной палитрой под брендинг TMS.
Цепочка коммитов: docs handoff `f69466c` → cleanup `2d492fd` → push
30 коммитов в origin (первый деплой 42s) → M5 пять коммитов (`8db6881`
моки, `cb1ff69` access, `4efb1cd` settings, `f532909` drop-zone,
`dd9d3a1` landing 6→8) → push (второй деплой 30s).

`.claude/settings.json` остаётся локально modified — не часть рабочего
стейта сессии, не коммитится.

## Сделано в последних сессиях

- **2026-05-11 (третья сессия дня, deploy unblock + M5 без polish)** — два
  раздельных шага одной сессией. Деплой: cleanup ArtLine-наследия одним
  `chore`-коммитом `2d492fd` (`vercel.json` удалён; `next.config.ts`
  сжат до пустого `NextConfig` без 7 редиректов и `ignoreBuildErrors`;
  5 корневых `.md` ArtLine-эпохи, legacy `.eslintrc.json`,
  `mcp-config.json`, `scripts/backup/`, Next.js-template SVG в `public/`,
  локально `backups/`); 32 коммита push в `origin/main`; autodeploy
  через GitHub Integration на существующий `virtual-pitwall` за 42s,
  production https://virtual-pitwall.vercel.app, 6 dashboards 200 OK.
  ADR `2026-05-11-deploy-vercel-keep-single-project.md` объясняет выбор
  one-project vs two и причины не переименовывать. M5: пять коммитов —
  `8db6881` моки (REGULATIONS три регламента per-client + DROP_ZONES
  Казань-Ринг WiFi/edge/LTE-backup, новые типы в `types.ts`); `cb1ff69`
  access matrix расширена двумя экранами (drop-zone TMS-only, settings
  TMS+client); `4efb1cd` `/demos/settings` (селектор клиента, 4
  параметра лимитов + dwell, aside «Связанные нарушения» с
  `kind→limit` mapping и сравнением лимит vs наблюдалось из evidence);
  `f532909` `/demos/drop-zone` (aggregate-status worst-wins, 3
  component-карточки с metrics/uptime/note, aside «Очередь в облако»
  с buffer + last sync + cost); `dd9d3a1` landing 6→8 карточек.
  Второй autodeploy 30s, все 8 экранов 200 OK, landing рендерит «8
  экранов». Polish (motion-переходы + loading skeletons) отложен как
  отдельный visual проход — связали с отложенной тёмной палитрой,
  имеет смысл объединять под фиксацию брендинга. По пути: проектное
  решение **не расширять SESSIONS** под drop-zone (изоляция M1-моков
  важнее богатства буфера), buffer показывается как «0» и
  объясняется текстом «всё уже доставлено» — валидный visual state.

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

**M5 polish: motion-переходы между экранами + loading skeletons.**
Единственный оставшийся пункт ROADMAP — самостоятельный visual проход.
Рассмотреть объединение с отложенной тёмной automotive-палитрой
(`decisions/2026-05-10-defer-dark-theme-until-branding.md`) и
branding-unlock (`decisions/2026-05-11-branding-unlock-tms-logos.md`)
под цельный visual overhaul, чтобы не дробить визуальную работу на
мелкие проходы. Если приоритет сместится — альтернативы: ручное
переименование Vercel-проекта `virtual-pitwall` → `telos-ui-prototype`
через dashboard (один клик в Settings, не требует коммитов; canonical
URL станет `telos-ui-prototype.vercel.app`); или какие-то новые
функциональные расширения, которые могут возникнуть после демонстрации.
