# TMS Telos UI Overhaul — Полная дорожная карта

> Дата создания: 2026-05-11
> Цель: превратить UI-прототип из "набора demo-страниц" в убедительный operating tool, который заказчик воспринимает как готовое приложение.
> Статус: планирование

---

## 1. Архитектурные принципы (незыблемые на весь overhaul)

1. **Operating tool first.** Никаких hero-блоков, градиентов, маркетинговых цифр.
2. **Единый дизайн-система.** Все цвета, отступы, шрифты, радиусы — через CSS-переменные и shared UI-компоненты.
3. **Железо видно всегда.** Любой экран с живыми данными показывает статус устройства, канала связи и latency.
4. **Роли работают безупречно.** Переключение роли не ломает навигацию, не сбрасывает состояние фильтров.
5. **Mock data остаётся.** Не добавляем сервер, API, auth. Делаем вид, что сервер есть.
6. **Mobile-ready.** `100dvh`, responsive grids, touch-friendly targets (min 44×44 px).

---

## 2. Сводка волн

| Волна | Название | Срок (оценка) | Ключевой результат |
|---|---|---|---|
| 1 | Визуальная система + навигация | 1 рабочий день | Тёмная тема работает, sidebar-навигация, unified UI-kit |
| 2 | Железный контекст + живые данные | 1 рабочий день | DeviceStatusBar, connection pulse, session selector в Live, alert анимации |
| 3 | Polish + forensic feel | 1–2 рабочих дня | Skeletons, page transitions, zoom-скраббер, hash tamper-viz, heartbeat simulation |
| 4 | Интеграция и финальный QA | 0.5 дня | Единый сквозной прогон, проверка всех ролей, билд, деплой |

**Итого: 3.5–4.5 рабочих дня.**

---

## 3. Волна 1: Визуальная система + навигация

### 3.1 Тёмная тема (главный visual shift)

**Зачем:** текущий `bg-gray-50` выглядит как generic Bootstrap-админка. Automotive tool — это тёмный фон, чёткие границы, неоновые акценты.

**Как:**
- В `globals.css` создать CSS-переменные для тёмной темы (не через `prefers-color-scheme`, а через `.dark` класс на `<html>`, переключаемый кнопкой).
- Переключатель темы в Navigation (рядом с RoleSwitcher).
- Все компоненты мигрировать с хардкоженных `gray-*` на CSS-переменные.
- Recharts: custom theme через `DefaultTooltipContent` стилизацию и цвета осей.

**Цветовая схема:**
```
Background:    #0b0d12 (near-black, не чистый #000)
Surface:       #111318 (карточки, панели)
Elevated:      #1a1d24 (hover, dropdowns)
Border:        #2a2e38
Text primary:  #e8eaed
Text secondary:#9aa0a6
Accent:        #ff4f00 (tms-orange)
Data CAN:      #3b82f6 (blue)
Data Gen:      #f59e0b (amber)
Alert critical:#ef4444
Alert warn:    #f59e0b
Alert ok:      #10b981
Grid lines:    #1e222a
```

### 3.2 Единая дизайн-система

**Новые shared-компоненты:**
- `Card` — замена `ChartCard` (все варианты: с заголовком, без, с бейджем, compact).
- `HeaderCell` — уже есть, вынести в `src/components/ui/`.
- `DataRow` — label / value пара, monospace для value.
- `StatusBadge` — live / idle / offline / maintenance с пульсирующей точкой.
- `IconButton` — квадратная кнопка с иконкой, min 36×36.
- `Divider` — горизонтальная/вертикальная линия-разделитель.

**Удалить дублирование:**
- `ChartCard` из `LiveSessionDashboard` → использовать shared `Card`.
- `ChartCard` из `AntiCheatReplayDashboard` → использовать shared `Card`.
- `HeaderCell` → `src/components/ui/HeaderCell.tsx`.

### 3.3 Навигация: sidebar вместо пустой topbar

**Проблема:** `Navigation.tsx` содержит только логотип + RoleSwitcher. Чтобы перейти между экранами — обязательно на главную.

**Решение:**
- Вертикальный sidebar слева (ширина 240 px desktop, 64 px collapsed, скрыт на mobile с overlay).
- Иконки + текст для каждого из 8 экранов.
- Активный экран: оранжевый акцент + `bg-elevated`.
- Сверху: логотип TMS (compact).
- Снизу: RoleSwitcher + ThemeToggle.
- `DashboardTopBar` убрать полностью. "Назад на главную" не нужна — sidebar делает это избыточным.
- На главной (`/`) оставить landing как dashboard-overview, но убрать карточки-ссылки (теперь они в sidebar).

**Структура sidebar:**
```
[Logo TMS]
---
Dashboard      (icon: LayoutDashboard)
Live Session   (icon: Activity)        ← highlight: live pulse
Anti-Cheat     (icon: ShieldCheck)
Fleet          (icon: Server)
Engine Passport(icon: FileText)
Incidents      (icon: AlertTriangle)   ← badge: count
Black Box      (icon: Archive)
Drop Zone      (icon: Wifi)
Regulations    (icon: SlidersHorizontal)
---
[ThemeToggle]
[RoleSwitcher]
```

### 3.4 Layout: единый shell

**Новый компонент:** `AppShell` — обёртка для всех страниц `/demos/*`.
```tsx
<AppShell>
  <Sidebar />
  <main className="flex-1 overflow-auto">
    {children}
  </main>
</AppShell>
```
- Sidebar фиксированный.
- Main content скроллится внутри себя.
- `h-dvh` на корневом контейнере (не `h-screen`).

### 3.5 Главная страница — редизайн

Текущая `/` — сетка карточек-ссылок. После появления sidebar эти карточки избыточны.

**Новая главная:**
- Overview dashboard: сводка парка (количество моторов, live/idle/maintenance).
- Последние инциденты (топ-5).
- Быстрый доступ к последним сессиям.
- Карта / статус Drop Zone (если есть offline-сессии).

### 3.6 Критерии готовности Волны 1

- [ ] Все 8+ экранов отображаются в тёмной теме без визуальных артефактов.
- [ ] Переключатель темы работает и сохраняет выбор в localStorage.
- [ ] Sidebar показывает все экраны, активный подсвечен.
- [ ] На mobile sidebar скрывается под гамбургер, overlay открывается.
- [ ] `Card`, `HeaderCell`, `StatusBadge`, `DataRow` используются повсеместно.
- [ ] Билд проходит (`npm run build`), TypeScript чистый.
- [ ] Lighthouse Accessibility ≥ 90.

---

## 4. Волна 2: Железный контекст + живые данные

### 4.1 DeviceStatusBar

**Компонент:** `DeviceStatusBar` — горизонтальная полоска под header каждого экрана с живыми данными.

**Содержимое (зависит от экрана):**
| Поле | Live Session | Replay | Fleet | Passport |
|---|---|---|---|---|
| Telos Serial | TMS-TLS-0042 | TMS-TLS-0042 | — | TMS-TLS-0042 |
| Firmware | v2.1.4 | v2.1.4 | — | v2.1.4 |
| LTE Signal | 4/5 bars, МТС | МТС (archive) | — | — |
| WiFi | — | — | — | — |
| GPS Lock | 12 спутников | 12 спутников | — | — |
| Latency | 180 мс | — | — | — |
| Last Packet | 0.2 с назад | — | — | — |
| Buffer | — | — | — | — |

**Визуально:** мелкий monospace текст, цветные индикаторы (зелёный = ok, жёлтый = degraded, красный = offline).

### 4.2 Connection Pulse

**Live Session:**
- Пульсирующая зелёная точка рядом со статусом "LIVE" (CSS animation, не JS).
- При нарушении (delta > warn) точка мигает оранжевым.
- При critical — красным.
- "Последний пакет: X с назад" обновляется каждую секунду (useEffect + interval).

### 4.3 Селектор сессий в Live Session

**Проблема:** жёсткая привязка `DEFAULT_SESSION_ID = 'SES-008'`.

**Решение:**
- `SessionSelector` (такой же, как в Anti-Cheat Replay) над графиками.
- Фильтр по статусу: Live / Completed / Offline-uploading.
- Для роли driver — только его сессии.
- Для роли client — сессии его парка.
- При переключении сессии — smooth transition (fade out / fade in).

### 4.4 Alert Animation

**IncidentTicker:**
- При появлении нового инцидента — `framer-motion` layout animation (slide in from right).
- Severity = violation: красная вспышка border на 0.5 сек.
- Severity = warn: оранжевая вспышка.

**Anti-Cheat Replay:**
- При scrub к окну нарушения — zoom на timeline (анимация scaleX).
- Подсветка текущего violation window на графиках (вертикальная полоса).

### 4.5 Критерии готовности Волны 2

- [ ] `DeviceStatusBar` показывается на Live Session, Replay, Passport.
- [ ] Пульсирующий индикатор live-статуса работает (CSS animation).
- [ ] Селектор сессий в Live Session работает для всех 3 ролей.
- [ ] При переключении роли селектор фильтрует сессии корректно.
- [ ] Анимация появления инцидентов в ticker работает.
- [ ] Билд чистый.

---

## 5. Волна 3: Polish + forensic feel

### 5.1 Skeleton Loaders

**Новый компонент:** `DashboardSkeleton` — для каждого типа layout:
- Live Session: 3 chart-skeleton blocks + sidebar skeleton.
- Fleet: grid skeleton cards + sidebar skeleton.
- Replay: timeline skeleton + chart skeletons.

**Реализация:** CSS-анимация shimmer через `background-gradient` + `animate-pulse`. Без JS-интервалов.

### 5.2 Page Transitions

**Реализация:** `AnimatePresence` + `motion.div` в layout-обёртке.
- Exit: opacity 1 → 0, duration 0.1s.
- Enter: opacity 0 → 1, y: 8 → 0, duration 0.2s.
- Layout stays (sidebar не анимируется).

### 5.3 Anti-Cheat: Zoom Scrubber

**Проблема:** таймлайн показывает всю сессию. Для длинных сессий нарушения — маленькие полоски.

**Решение:**
- Два режима таймлайна: Overview (вся сессия) и Zoom (±15 сек от current).
- Переключатель: кнопки "Обзор" / "Увеличение" или Ctrl+Scroll.
- В Zoom-режиме scrub двигает окно, не иглу.

### 5.4 HashChain: Tamper Visualization

**Компонент:** `HashChainViz` enhancement.
- Hover на блок: показывать prevHash → hash связь (маленькие стрелки).
- "Simulate tamper" кнопка (dev-only или демо-режим): ломает один хеш, вся цепочка после него краснеет.
- Это **сильный момент для заказчика** — он видит, почему криптография работает.

### 5.5 Fleet: Heartbeat Simulation

**Реализация:**
- `useEffect` + `setInterval` в `FleetDashboard`.
- Каждые 10 секунд случайный мотор меняет статус (idle → live → idle).
- Анимация: `StatusBadge` плавно меняет цвет.
- Показывает, что система отслеживает реальный статус устройств.

### 5.6 Tooltip Enhancement

**Все графики:**
- Custom tooltip через Recharts: monospace значения, фон `surface`, рамка `border`.
- Показывать delta RPM прямо в tooltip.
- Показывать статус блока хеш-цепочки для текущего времени.

### 5.7 Responsive Enhancement

- Fleet grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5` вместо жёсткого `grid-cols-5`.
- Live Session: на планшете (md) — 2 колонки вместо 3, на mobile — 1 колонка, графики stacked.
- Sidebar: на mobile — полноэкранный overlay.

### 5.8 Критерии готовности Волны 3

- [ ] Skeleton loaders на всех экранах.
- [ ] Переходы между страницами плавные (framer-motion).
- [ ] Zoom-скраббер в Anti-Cheat Replay работает.
- [ ] HashChain tamper simulation работает.
- [ ] Fleet heartbeat simulation работает (статусы меняются).
- [ ] Все экраны адекватны на mobile (320 px+) и tablet (768 px+).
- [ ] Билд чистый.

---

## 6. Волна 4: Интеграция и финальный QA

### 6.1 Сквозной прогон

**Сценарии (каждый проходить для 3 ролей):**
1. Открыть `/` → видно overview.
2. Перейти в Live Session → выбрать сессию → увидеть pulse + device status.
3. Перейти в Anti-Cheat Replay → выбрать нарушительную сессию → scrub до violation → zoom → посмотреть hash chain.
4. Перейти в Fleet → увидеть heartbeat → кликнуть на мотор → перейти в Engine Passport.
5. Из Passport → кликнуть на инцидент → deep-link в Anti-Cheat Replay.
6. Переключить роль на client → убедиться, что виден только свой скоуп.
7. Переключить роль на driver → убедиться, что доступны только свои сессии.
8. Переключить тему → убедиться, что всё перекрасилось.

### 6.2 Performance check

- Lighthouse Performance ≥ 85 (mobile).
- First Contentful Paint < 1.5s.
- Нет memory leaks (useEffect cleanup проверить).
- Bundle size: `next build` анализ.

### 6.3 Деплой

- `git push origin main` → Vercel autodeploy.
- Проверить production URL.
- Сделать скриншоты ключевых экранов для заказчика.

### 6.4 Критерии готовности Волны 4

- [ ] Все 8 сквозных сценария пройдены для 3 ролей.
- [ ] Lighthouse ≥ 85 performance, ≥ 90 accessibility.
- [ ] Production деплой успешен.
- [ ] Скриншоты/запись экрана для заказчика готовы.
- [ ] ROADMAP.md обновлён.

---

## 7. Протокол Handoff (передача смены)

### 7.1 Файл `HANDOFF.md`

**Структура:**
```
## Текущая сессия
- Дата: 2026-05-11
- Агент: Kimi Code CLI
- Волна: X
- Статус: in-progress / blocked / done
- Последний коммит: abc1234

## Что сделано в этой сессии
- [ ] пункт

## Что осталось в текущей волне
- [ ] пункт

## Следующая волна (если текущая закрыта)
- Волна Y: название

## Известные проблемы / блокеры
- проблема

## Контекст для следующей сессии
- что важно помнить
```

### 7.2 Правила обновления

1. **Начало сессии:** прочитать `OVERHAUL-PLAN.md` (этот файл) → найти текущую волну → прочитать `HANDOFF.md` (верхнюю запись).
2. **Во время сессии:** если что-то отклоняется от плана (например, обнаружен баг) — записать в HANDOFF.md в раздел "Известные проблемы".
3. **Конец сессии:**
   - Обновить `HANDOFF.md` — новая запись сверху (старые записи не удалять, это журнал).
   - Закоммитить с сообщением формата: `overhaul(wave-N): что сделано`.
   - Если волна закрыта — отметить все чекбоксы в `OVERHAUL-PLAN.md` для этой волны.

### 7.3 Формат коммитов

```
overhaul(wave-1): add dark theme, sidebar navigation, shared UI kit
overhaul(wave-2): add DeviceStatusBar, live pulse, session selector
overhaul(wave-3): add skeletons, page transitions, zoom scrubber
overhaul(wave-4): final QA, lighthouse fix, deploy
```

### 7.4 Если сессия прерывается

1. Закоммитить всё (даже WIP — можно `git commit -m "WIP: wave-X partial"`).
2. Записать в `HANDOFF.md` точное состояние.
3. Следующая сессия начинает с `git status` и чтения `HANDOFF.md`.

---

## 8. Чеклист приоритетов (если время кончится)

Если нужно уложиться в меньший срок, вот порядок отсечения (от наименее к наиболее важному):

1. ❌ ~~Zoom scrubber (волна 3)~~ — nice to have, базовый scrubber уже работает.
2. ❌ ~~Hash tamper simulation (волна 3)~~ — можно показать статичную цепочку.
3. ❌ ~~Fleet heartbeat simulation (волна 3)~~ — статичный fleet тоже работает.
4. ❌ ~~Page transitions (волна 3)~~ — fade-in/out не критичен.
5. ✅ **Skeleton loaders (волна 3)** — важно для восприятия "реального приложения".
6. ✅ **DeviceStatusBar (волна 2)** — критично для "это железо".
7. ✅ **Тёмная тема (волна 1)** — критично для visual identity.
8. ✅ **Sidebar навигация (волна 1)** — критично для "это приложение, не набор страниц".

---

## 9. Резюме

Этот план превращает прототип из **статичного mockup'а** в **убедительный operating tool** через:

1. **Единый визуальный язык** (тёмная тема, дизайн-система).
2. **Единую навигацию** (sidebar, а не набор карточек).
3. **Ощущение живой системы** (pulse, device status, heartbeat).
4. **Польская обработку** (анимации, скелетоны, responsive).
5. **Forensic credibility** (hash chain viz, tamper demo, zoom scrub).

**Следующий шаг:** пользователь подтверждает план → агент начинает Волну 1.
