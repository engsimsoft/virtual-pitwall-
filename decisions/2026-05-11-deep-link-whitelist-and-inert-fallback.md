# Deep-link policy: whitelist в page + inert fallback в компоненте

**Дата:** 2026-05-11
**Контекст:** M3 — построение сквозной навигации между парком, паспортом мотора, журналом инцидентов и детальными экранами (live-session, anti-cheat-replay)

## Контекст

В M3 четыре места показывают список инцидентов или сессий, каждый ряд — потенциальный deep-link на детальный экран:

- **Fleet incidents panel** (правая колонка `/demos/fleet`) — топ инцидентов парка с deep-link.
- **Engine-passport sessions log** — сессии конкретного мотора с deep-link.
- **Engine-passport incidents log** — инциденты конкретного мотора с deep-link.
- **Incidents screen** (`/demos/incidents`) — полно-экранный журнал всех инцидентов с deep-link.

Не все сессии загружаемы на детальном экране. На `live-session` живёт только SES-008 (единственная мок-сессия со статусом `live`); на `anti-cheat-replay` загружаются только 4 violation-сессии SES-003/004/005/006. Остальные сессии (SES-001/002 honest, SES-007 honest на ENG-001, SES-009/010 historic на ENG-009) детального экрана не имеют — у них есть метаданные и инциденты, но нет смысла открывать full replay для honest-трасы или для historic-сессии без telemetry-пиков.

Без правила это ломается двумя способами: либо broken link на 404, либо `notFound()` на детальном экране (которое тоже выглядит как ошибка для зрителя демо).

## Решение

**Whitelist + inert fallback:**

1. Каждый `page.tsx` (server component), который собирает строки для списка с deep-link, держит **локальные whitelists**:

   ```ts
   const LIVE_SESSION_IDS = new Set(['SES-008'])
   const REPLAY_SESSION_IDS = new Set(['SES-003', 'SES-004', 'SES-005', 'SES-006'])
   ```

2. При сборке row резолвит `href: string | null`:

   ```ts
   let href: string | null = null
   if (LIVE_SESSION_IDS.has(sessionId)) href = '/demos/live-session'
   else if (REPLAY_SESSION_IDS.has(sessionId))
     href = `/demos/anti-cheat-replay?session=${sessionId}&seek=${tMs}`
   // else: href остаётся null
   ```

3. Компонент-рендерер в каждой строке смотрит на `row.href`:
   - если задан — рендерит `<Link>` с hover-стилем, ведёт в детальный экран;
   - если `null` — рендерит **inert** `<div>` (или `<span>` для table cell action) с пометкой «без deep-link отчёта» (или прочерк «—» в табличном виде).

Inert-row выглядит как обычная строка списка, не как broken-link — пользователь видит данные инцидента, понимает что детальный экран не предусмотрен, не пытается кликнуть. Это **не ошибка** UX, это **корректный** UX для данных без детальной развёртки.

## Альтернативы

1. **Расширить anti-cheat-replay чтобы принимал любую сессию** (включая honest без violation). Отвергнуто: anti-cheat-replay — это showcase античита, не universal session viewer. На honest-сессии экран теряет смысл (показать-нечего, violation-bands нет, нечего scrubbing'ом разглядывать). Расширение размывает фокус flagship-экрана.
2. **Показывать broken link и обрабатывать 404 на детальном экране.** Отвергнуто: для зрителя демо «404» = «прототип сломан». Не приемлемо для презентации руководству.
3. **Lift whitelist в общий util** (`src/lib/sessionLinks.ts`). Отвергнуто **пока** (rule of three): сейчас четыре использования с одинаковыми whitelists. При появлении пятого — extract. Сейчас inline-копия в каждом page.tsx читаемее, и whitelist — не такая структура, чтобы её прятать (это бизнес-факт «кто из сессий имеет детальный экран»).
4. **Server-side validation: проверять при resolve что session существует и пробрасывать metadata-only fallback.** Отвергнуто: усложняет на ровном месте. Whitelist short и стабильный, меняется только при добавлении новой сессии в моках с детальной поддержкой.

## Последствия

- **При добавлении новой violation-сессии в моки**: добавить ID в `REPLAY_SESSION_IDS` whitelist в **каждом** из 4 page.tsx (`fleet`, `engine-passport`, `incidents`, и сам `anti-cheat-replay/page.tsx` — там whitelist `VIOLATION_SESSION_IDS` под другим именем). Поиск `SES-003` по проекту показывает все места одновременно.
- **При добавлении новой live-сессии** (например, второй параллельной): расширить `LIVE_SESSION_IDS`. Сейчас live-session screen pinned на single SES-008, для multi-live потребуется и его обновить (М4 role-switcher это вероятно подхватит).
- **Пятое использование** (например, в M5 settings или drop-zone) → пора extract в `src/lib/sessionLinks.ts` с чистой функцией `resolveSessionDetailHref(sessionId, tMs?): string | null`. Сейчас это преждевременная абстракция.
- **Новый детальный экран** (например, отдельный `lap-analysis` для конкретной сессии) → новый whitelist + новая ветка в resolver.
- **На UI** inert fallback должен оставаться **визуально однородным** между всеми четырьмя местами (одинаковая пометка / прочерк), чтобы зритель учился паттерну быстро. Сейчас текст «без deep-link отчёта» используется в трёх компонентах (FleetIncidentsPanel, IncidentsLog, SessionsLog), в IncidentsTable — короткий «—» как table-cell action. Различие оправдано: в таблице длинная строка нарушает grid.
