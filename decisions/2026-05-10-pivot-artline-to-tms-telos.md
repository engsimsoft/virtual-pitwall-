# 2026-05-10 — Pivot: ArtLine Virtual Pitwall → TMS Telos UI Prototype

## Контекст

Проект в директории `/Users/mactm/Projects/VS Code/ArtLine Virtual Pitwall/` создавался как marketing-сайт + UI-демо системы Virtual Pitwall, ориентированной на клиента ArtLine Engineering (производитель спортпрототипов Legends EVO, CN 1600). Содержал ICP-разбиение на три сегмента (Race Control / Команды / Производители), отдельные страницы партнёров (ArtLine, Торгмаш Инжиниринг), и UI-демо в светлой marketing-палитре.

10 мая 2026 владелец проекта (engsimsoft) сменил направление: новым заказчиком становится **TMS Motorsport**, продуктом — **Telos** (контрольный hardware-прибор арендодателя гоночных моторов с функциями чёрного ящика, античита, LTE-телематики, ЭБУ-иммобилайзера и GPS+IMU фундамента для будущего анализатора TMS). Презентация продукта Telos уже подготовлена в [presentation.md](../presentation.md) (372 строки) — это отдельный закрытый артефакт.

Текущая задача проекта — **переориентировать существующие UI-демо с Virtual Pitwall/ArtLine на интерактивный mockup веб-интерфейса облачной части ПО Telos**.

## Решение

1. Тип проекта меняется: **operating tool prototype**, не маркетинг-сайт.
2. Заказчик — **TMS Motorsport**, продукт — **Telos**, бренд **ArtLine** уходит из проекта целиком.
3. Удалено всё ArtLine-наследие: страницы `/legends/*`, `/partners/*`, `/torgmash-proposal/*`, `/rental-management`, `/tracks`, `/mvp_tech_spec`, `/demos/{artline,fleet,tracks,team}`, `/api`, data-файлы `lib/cn1600Data.ts`, `lib/trackData.ts`, `lib/mockData.ts`, корневые ассеты (`CN 1600 Spec.jpeg`, `Multi-Project-Comparison_PowerTorque_2025-12-28.png`, `data-$CN 1600 Ver_1.1.csv`, `artline_strategy_v4_final.md`), директории `plans/` и `docs/`.
4. Папка проекта **не переименовывается** до окончания миграции — на главное это не влияет, риск перебить пути меньше пользы.
5. Технический стек сохраняется (Next.js 16, React 19, Tailwind 4, Framer Motion, Recharts, Lucide, TypeScript, Vercel) — пересмотр не нужен.
6. Палитра меняется со light marketing на тёмную automotive.
7. Поставлена инфраструктура long-running коллаборации: ROADMAP.md, HANDOFF.md, `decisions/`, slash-команды `/handoff` и `/resume` — наследование паттерна из non-coding-starter-kit.
8. Старый `PROJECT-MEMORY.md` (599 строк, ArtLine legacy от Cursor Agent) удаляется — конфликтует с новой системой по роли, контент устарел вместе с пивотом.

## Альтернативы

- **Сохранить ArtLine-сайт в отдельной ветке/папке** — отвергнуто. Усложнение без пользы: ArtLine-проект не возобновляется, история есть в git.
- **Сделать оба проекта рядом (multi-tenant)** — отвергнуто. Это разные продукты с разной природой (маркетинг vs operating tool, разный ICP), общего каркаса для их совмещения нет, попытка всё уравнять снизит качество обоих.
- **Начать TMS Telos с нуля в новом репозитории** — отвергнуто. Существующий каркас ([Navigation.tsx](../src/components/Navigation.tsx), [Breadcrumbs.tsx](../src/components/Breadcrumbs.tsx), [DemoCard.tsx](../src/components/DemoCard.tsx), стек, конфиги, Vercel-настройки) пригоден как есть. Потеря этих наработок неоправдана.
- **Переименовать папку проекта сейчас** — отложено. Активная миграция, переименование сейчас рискует ломать пути и git-связи без выгоды.

## Последствия

- Все будущие сессии работают только с TMS Telos нарративом. ArtLine, Legends, Торгмаш, CN 1600 — мёртвые сущности, не возвращаются.
- ICP проекта плоский: TMS Motorsport как единственный заказчик. Внутри системы — три уровня доступа (TMS-инженер / клиент-арендатор / гонщик), реализуемые через role-switcher (см. соседний ADR `2026-05-10-role-switcher-over-shared-screens.md`).
- Mock data полностью переписывается под TMS-парк, дайно-кривые на каждый мотор, сценарии нарушений, связь с трассами РФ из presentation.md.
- Дальнейшая работа по этапам M0…M5 в ROADMAP.md.
