# Деплой Vercel: один проект `virtual-pitwall`, переименование отложено

**Дата:** 2026-05-11
**Контекст этапа:** закрытие критичного блокера ROADMAP «Деплой» после M4

## Контекст

С момента pivot ArtLine → TMS Telos (2026-05-10) репозиторий полностью
переориентирован: ArtLine-страницы удалены, mock-data полностью своя,
6+2 dashboards Telos готовы, брендинг разморожен. Но `vercel.json` остался
с `"name": "virtual-pitwall"`, `next.config.ts` содержал 7 редиректов на
мёртвые ArtLine-маршруты (`/legends/*`, `/torgmash-proposal/*`,
`/rental-management → /demos/fleet`, `/tracks`) и `typescript.ignoreBuildErrors: true`.
В Vercel team `engsimsoft-gmailcoms-projects` существует проект
`virtual-pitwall` (`prj_IhdNiPfjCjQvATW4iH1G2sM7oDnD`) с GitHub Integration
на `engsimsoft/virtual-pitwall-`, последний production-деплой 2025-12-28
(ArtLine-эра). Ветка `main` накопила 30 коммитов с момента pivot'а — ни
одного push не было.

Нужно было выкатить Telos на публичный URL для демонстрации.

## Решение

**Один Vercel-проект — существующий `virtual-pitwall`, без переименования
сейчас. Autodeploy через `git push origin main`. Полная зачистка
ArtLine-наследия из репозитория одним cleanup-коммитом перед push.**

Конкретно:
1. Удалить `vercel.json` целиком (поле `name` deprecated, `maxDuration`
   избыточен для чисто-клиентского прототипа).
2. `next.config.ts` сжать до пустого `NextConfig` — выкинуть 7 редиректов
   и `ignoreBuildErrors: true` (Telos прошёл 22 коммита через `tsc` чисто,
   fail-fast предпочтительнее тихих сборок).
3. Удалить 5 корневых `.md` ArtLine-эпохи (AGENT-CHEATSHEET, BACKUP-GUIDE,
   QUICK-START, README, VERCEL-DEPLOY-GUIDE), legacy `.eslintrc.json`,
   `mcp-config.json`, `scripts/backup/`, `backups/` (на диске, в `.gitignore`),
   и Next.js-template SVG в `public/`.
4. `git push origin main` → autodeploy подхватывает в существующий
   `virtual-pitwall`. Canonical URL `virtual-pitwall.vercel.app` остаётся.

Имя Vercel-проекта `virtual-pitwall` сохраняется. Косметическое
переименование в `telos-ui-prototype` требует ручного действия в Vercel
dashboard (через MCP такого API нет: `update_project`/`rename` отсутствует
среди инструментов). Не блокер: на самом сайте `<title>TMS Telos — UI
Prototype</title>`, ни строчки «ArtLine» или «Virtual Pitwall» в content
нет.

## Альтернативы

**Создать второй Vercel-проект `telos-ui-prototype`, оставить старый
`virtual-pitwall` нетронутым.** Отвергнуто: ArtLine как продукт больше не
существует ни в одном коммите репо с момента pivot'а. Сохранять «старый
URL живым» нечего — следующий же autodeploy всё равно выкатит Telos под
этим URL, потому что Git Integration привязана к main. Два проекта на одну
ветку создают коллизию Integration в Vercel; отвязывать старый —
бессмысленный лишний шаг ради переименования URL.

**Переименовать `virtual-pitwall` → `telos-ui-prototype` в dashboard
прямо сейчас, до push'а.** Отвергнуто как преждевременная оптимизация:
MCP не даёт rename, ручной шаг блокирует автоматический pipeline. URL —
косметика, продукт работает на любом имени. Если позже захочется
canonical `telos-ui-prototype.vercel.app` — один клик в Settings → General.

**Оставить `vercel.json` и `next.config.ts` как есть.** Отвергнуто:
deprecated поля и redirects на мёртвые destination'ы — это noise, а
`ignoreBuildErrors: true` скрывает реальные ошибки. Cleanup занимает один
коммит и снимает целый класс future-confusion.

**Использовать Vercel CLI (`vercel link` + `vercel deploy --prod`).**
Отвергнуто как противоречие устойчивой практике пользователя (autodeploy
через GitHub Integration, не CLI manually). CLI здесь работал бы, но
ломал бы конвенцию проекта.

## Последствия

- Production живёт на `https://virtual-pitwall.vercel.app` —
  fundamental URL для всех будущих демонстраций до явного переименования.
- Любой будущий `git push origin main` triggers autodeploy за ~30-45s
  (Next.js 16 + Turbopack).
- `typescript.ignoreBuildErrors: true` снят навсегда — TS ошибки теперь
  ломают сборку. Это правильный режим для прототипа.
- Решение «один проект» закрепляет ассоциацию URL ↔ проект — следующая
  сессия не должна спекулировать про «отдельный Telos-проект».
- Косметика: имя проекта в Vercel dashboard и URL содержат «virtual-pitwall».
  Если будет нужно показать инвесторам — переименование делается в один
  клик в Settings без передеплоя.
