# TMS Telos UI Prototype — Roadmap

**Версия документа:** 2026-05-10 (создан при пивоте проекта)

> Канонический план работ. Стабильный документ — обновляется при пересмотре стратегии или закрытии этапа, не при каждом коммите. Сессионный журнал — в [HANDOFF.md](HANDOFF.md).

---

## Что это за проект

Интерактивный mockup веб-интерфейса облачной части TMS Telos в браузере. **Operating tool prototype**, не маркетинг-сайт. Назначение — показать руководству TMS и инвесторам, как будет выглядеть ПО, через которое TMS-инженер, клиент-арендатор и гонщик работают с данными прибора Telos.

Папка проекта называется `ArtLine Virtual Pitwall` — историческое наследие, переименование отложено. С 2026-05-10 содержимое полностью переориентировано на TMS Telos. Подробности в [presentation.md](presentation.md) (продуктовый нарратив, 372 строки).

## Протокол захода в сессию

Перед началом работы новая сессия читает в порядке:

1. **Этот документ** (ROADMAP.md) — план и принципы
2. [HANDOFF.md](HANDOFF.md) — верхняя запись (где остановились)
3. Последние 1-2 файла в `decisions/`, если они появились с прошлой сессии
4. Проверить `git status` и `git log -5` для актуального состояния

[presentation.md](presentation.md) (372 строки, продуктовый нарратив TMS Telos) — справочник, открывается селективно по нужным диапазонам строк (anti-cheat математика, BOM, дорожная карта), не часть обязательного входа. Memory pivot-файл загружается автоматически через `MEMORY.md` в системный промпт — отдельным шагом не требуется.

После этого выдать пользователю короткий доклад (3-5 строк: где мы, что следующее, что нужно подтвердить) и **ждать подтверждения** перед началом работы. Не приступать сразу.

Альтернативно — пользователь может вызвать `/resume` (см. `.claude/commands/resume.md`), команда делает то же самое.

## Технический стек (зафиксирован)

- Next.js 16, React 19, Tailwind CSS 4
- Framer Motion (анимации), Recharts (графики), Lucide (иконки)
- Полностью клиентский mockup, серверной части и API нет — всё на mock-data
- Деплой Vercel
- TypeScript

Не пересматривать стек без явной причины (например, блокер с пакетом). Не вводить новые библиотеки без необходимости.

## Принципы прототипа

- **Operating tool, не маркетинг.** Плотная компоновка, monospace для чисел, минимум декоративных hero-блоков. Цвет — функция (состояние), не настроение.
- **Тёмная automotive-палитра.** Тёмно-серый фон, неоновые акценты для активных значений, контрастные state-цвета (red/amber/green) только для алертов.
- **Role-switcher над общими экранами.** Не три отдельных продукта для TMS/клиент/гонщик, а один с переключателем роли, меняющим что видно. Решение зафиксировано в `decisions/2026-05-10-role-switcher-over-shared-screens.md`.
- **Anti-cheat — флагман.** Двойной RPM-канал и boost cross-check через GPS+IMU+дайно-кривую — это фирменный экран Telos, на котором держится отличие от любого racing dashboard. Делается одним из первых.
- **Mock data с заложенными нарушениями.** Без сценариев нарушений (CAN RPM ≠ Gen pulses, boost ≠ dyno-estimate, launch control при V_GPS<30) показывать на anti-cheat replay нечего.

## Роли в системе

Плоский ICP (заказчик — TMS Motorsport), три уровня доступа в одной системе:

- **TMS-инженер** — полный доступ. Все моторы, все сессии, все алерты, все доказательные цепочки, настройки регламента.
- **Клиент-арендатор** — свой парк. Видит свои моторы, свои сессии, свою историю. Не видит криптоподписи и доказательные events в форме «нарушение зафиксировано» (это позиция TMS в споре).
- **Гонщик** — свои сессии. Видит only-его данные конкретной сессии (post-event), без алертов и доказательной части.

## Инвентарь экранов

| ID | Path | Описание | Этап | Статус |
|---|---|---|---|---|
| landing | `/` | Entry point прототипа: сетка экранов, контекст ролей | M4 | not started |
| fleet | `/demos/fleet` | Парк моторов TMS, heartbeat, активные сессии, недавние алерты | M3 | not started |
| live-session | `/demos/live-session` | Один мотор в реальном времени: двойной RPM, boost cross-check, GPS-трек, IMU, температуры | M2 | not started |
| anti-cheat-replay | `/demos/anti-cheat-replay` | Replay инцидента: scrubbable timeline, расхождение каналов, момент превышения, криптоподпись лога | M2 | not started |
| engine-passport | `/demos/engine-passport` | Цифровой паспорт мотора: история, наработка, нарушения, контракт, ремонты | M3 | not started |
| incidents | `/demos/incidents` | Журнал push-алертов, deep-link в момент сессии, статусы | M3 | not started |
| black-box | `/demos/black-box` | Viewer записи с криптоцепочкой, экспорт в юр-формате | M3 | not started |
| drop-zone | `/demos/drop-zone` | Статус WiFi-инфраструктуры на Казань-Ринге, edge-сервер | M5 | not started |
| settings | `/demos/settings` | Регламент: лимиты RPM/boost/temp на контракт/мотор/клиента | M5 | not started |

## Mock-data design rules

Перед сценариями — спроектировать TMS-парк (8-12 моторов, разные клиенты, разные трассы РФ из presentation.md: Москва, Казань, Сочи, Игора, Смоленск, Нижний Новгород, ADM Raceway). На каждый мотор — синтетическая дайно-кривая (мощность/момент по RPM), которая работает как эталон для boost cross-check.

Минимальный набор сессий-сценариев:

- 1-2 «честные»: CAN RPM ≈ Gen pulses, boost CAN ≈ GPS-IMU estimate.
- 2-3 «нарушительные»: расхождение CAN/Gen (пример из [presentation.md:126](presentation.md#L126) — CAN 7500, Gen 9200).
- 1 launch control: boost > 0.8 при V_GPS < 30.
- 1 «офлайн в Drop Zone»: сессия с буфером и последующим upload.

Структура — `src/lib/mockData/` (вместо одного файла), разбито по сущностям: `engines.ts`, `sessions.ts`, `tracks.ts`, `dyno.ts`, `incidents.ts`, плюс типизация в `types.ts`.

## Этапы

### M0 — Чистка и инфраструктура

**Цель:** убрать ArtLine-наследие, поставить систему long-running коллаборации.

- [x] Удалить ArtLine/Legends/Торгмаш страницы, plans/, docs/, корневые ассеты, lib/cn1600Data.ts, lib/trackData.ts, lib/mockData.ts (старая)
- [x] Pivot project memory
- [x] ROADMAP.md, HANDOFF.md
- [x] `.claude/commands/handoff.md`, `.claude/commands/resume.md`
- [x] `decisions/` папка + первое решение
- [x] Удалить устаревший PROJECT-MEMORY.md
- [x] Обновить брендинг: `package.json` name, `layout.tsx` метаданные, `Navigation` дефолтный title, footer-копирайт. Очистить навигацию от ссылок на удалённые страницы.

### M1 — Mock data

**Цель:** фундамент для всех экранов. Без него остальные этапы упрутся.

- [x] Спроектировать `src/lib/mockData/` структуру и типы
- [x] Сгенерировать парк моторов TMS, 8-12 единиц
- [x] Сгенерировать 6-8 сессий по mock-data design rules (включая нарушения)
- [x] Дайно-кривые на каждый мотор (синтетические, разумные)
- [x] Утилиты: `formatRpm`, `formatLapTime`, monospace-числовой компонент

M1 закрыт 2026-05-10. Тёмная automotive-палитра вынесена за пределы M1-M2 до фиксации брендинга TMS — см. `decisions/2026-05-10-defer-dark-theme-until-branding.md`.

### M2 — Anti-cheat showcase (ядро отличия Telos)

**Цель:** главные два экрана, на которых стоит весь смысл прототипа.

- [x] `/demos/live-session` — двойной RPM-чарт, boost CAN vs estimate, GPS-трек, IMU-блок
- [x] `/demos/anti-cheat-replay` — scrubbable timeline, синхронный replay двух каналов, подсветка моментов расхождения, визуализация криптоподписи блока

M2 закрыт 2026-05-11. Шесть feat-коммитов через две сессии (live-session: `d73130d`, `b32619c`, `241c54a`; anti-cheat-replay: `1fc8508`, `662fe21`, `9debd83`). Селектор сессий — per-screen, глобальный отложен до M4 role-switcher, см. `decisions/2026-05-11-session-selector-scope-by-screen.md`.

### M3 — Парк, паспорт, инциденты, чёрный ящик

**Цель:** контекст вокруг flagship-экранов.

- [x] `/demos/fleet`
- [x] `/demos/engine-passport`
- [x] `/demos/incidents`
- [x] `/demos/black-box`

M3 закрыт 2026-05-11. Девять feat-коммитов в одну сессию: fleet (`f98f40b`/`36e19a5`), branding-unlock (`0325910`), engine-passport (`92300ea`/`bb4463b`/`4eeb850`/`f19b1af`), incidents (`a25f266`), black-box (`0c702c9`). По пути закрыт критичный открытый вопрос «Брендинг Telos» (логотипы TMS + tms-orange/graphite в `@theme`); расширены моки maintenance-событиями и mis-shift overrev-инцидентами (pilot-error, severity=warn, в отличие от cheating-violation); сделана сквозная навигация fleet → passport (drill-down с EngineCard) и из incidents/passport → anti-cheat-replay/live-session по deep-link.

### M4 — Role switcher + landing

**Цель:** склеить экраны в product-feel.

- [x] Role context (TMS/клиент/гонщик), переключатель в Navigation
- [x] Адаптация всех существующих экранов под role-фильтрацию
- [x] Landing (`/`) — entry point со сеткой экранов, краткий контекст

M4 закрыт 2026-05-11. Четыре коммита одной сессией: `ba1292d` (landing
card-grid + nav cleanup + back-to-home topbar в каждом dashboard),
`efb8370` (RoleProvider в layout + RoleSwitcher в Navigation/topbar,
pinned CLI-03/DRV-04), `8381a5a` (каскадная фильтрация в 6 dashboards
с двухуровневой авторизацией: `dashboardVisibleToRole` + entity
предикаты, EmptyForRole для empty/denied case), `7e4735c` (бонус:
parametric GPS shapes per-track вместо круга). По пути: ADR
`2026-05-11-role-context-prototype-scope.md` — scope прототипа,
матрица доступов, рациональ pinned IDs.

### M5 — Опциональные экраны

- [ ] `/demos/drop-zone`
- [ ] `/demos/settings`
- [ ] Polish: motion-переходы между экранами, loading skeletons

## Принятые решения

Лежат в `decisions/`. В этом разделе — только список с одной строкой и ссылкой.

- 2026-05-10 — Pivot ArtLine Virtual Pitwall → TMS Telos UI Prototype — `decisions/2026-05-10-pivot-artline-to-tms-telos.md`
- 2026-05-10 — Role-switcher над общими экранами вместо трёх отдельных дашбордов — `decisions/2026-05-10-role-switcher-over-shared-screens.md`
- 2026-05-10 — Тёмная палитра отложена до фиксации брендинга TMS — `decisions/2026-05-10-defer-dark-theme-until-branding.md`
- 2026-05-11 — Селектор сессий — per-screen, глобальный откладывается до M4 role-switcher — `decisions/2026-05-11-session-selector-scope-by-screen.md`
- 2026-05-11 — Branding unlock: TMS логотипы и фирменный оранжевый/графит зафиксированы; тёмная палитра остаётся отложенной по новому критерию — `decisions/2026-05-11-branding-unlock-tms-logos.md`
- 2026-05-11 — Severity для overrev: pilot error (mis-shift) → warn, cheating → violation; один kind, разделение через severity+summary — `decisions/2026-05-11-overrev-severity-pilot-error-vs-cheating.md`
- 2026-05-11 — Deep-link policy: whitelist `LIVE_SESSION_IDS`/`REPLAY_SESSION_IDS` в каждом page.tsx + inert fallback в компоненте — `decisions/2026-05-11-deep-link-whitelist-and-inert-fallback.md`
- 2026-05-11 — Role context — scope for the prototype: pinned CLI-03/DRV-04, двухуровневая авторизация dashboard-access + entity-sub-filter, без UX-выбора конкретного субъекта — `decisions/2026-05-11-role-context-prototype-scope.md`

## Открытые вопросы

### Критичные

- **Деплой.** В `vercel.json` — конфиг ArtLine-проекта. Проверить, не будет ли коллизий, сделать ли отдельный Vercel-проект для Telos. Стало блокером для публичной демонстрации после закрытия M4.

### Важные

_Все ранее открытые «Важные» вопросы закрыты в M3 (дайно — синтетика достаточна, реальные стендовые листы используются только как визуальный референс формата; криптоподпись — реализована как HashChainViz в anti-cheat-replay и как полноэкранный chain viewer + JSON-экспорт в `/demos/black-box`)._

## Что НЕ делать

- Не возвращаться к маркетинг-стилю (light marketing, hero-блоки с громкими цифрами, градиенты).
- Не воссоздавать ICP-разбиение Race Control / Команды / Производители из старого Virtual Pitwall — в Telos плоский ICP с тремя уровнями доступа.
- Не строить серверную часть, не вводить аутентификацию, не делать настоящую базу — это прототип UI, всё на mock.
- Не дублировать функцию AIM-ПО для гонщика. Гонщик в Telos UI видит только сводку post-event, не live-DAQ.
- Не изобретать собственный stack для графиков/анимаций — Recharts + Framer Motion уже в проекте.
- Не подменять моки реальными данными из внешних источников (стендовые PDF, реальные телеметрии). Реальные источники — только визуальный референс формата и порядков величин для синтетики и оформления экранов. Подмена тяжёлых полей в `DYNO_CURVES`/`SESSIONS`/`INCIDENTS` создаёт несоразмерный риск (например, ломает уже-готовый boost cross-check на anti-cheat-replay) при нулевом visual upside для прототипа. Подробности — в auto-memory `feedback_visualisation_not_data_pipeline.md`.
- Не моделировать TMS-внутренние workflow (статусы инцидентов acknowledged/resolved, очереди задач, таймеры обработки). Прототип показывает данные как они выглядят для оператора в моменте, не имитирует процесс разбора. Status-поля можно добавить позже как отдельный явный scope.

## Резюме одной фразой

UI-прототип облачной части TMS Telos с фирменным flagship-экраном античита и role-switcher TMS/клиент/гонщик; M0-M4 закрыты (инфраструктура, mock data, anti-cheat showcase, парк/паспорт/инциденты/чёрный ящик, role context + landing), брендинг разморожен, GPS-трек заменён на parametric per-track shapes. Дорога открыта в M5 (опциональные экраны drop-zone/settings + polish). Критичный блокер для публичной демонстрации — деплой Vercel. Тёмная палитра остаётся отложенной как отдельный visual overhaul.
