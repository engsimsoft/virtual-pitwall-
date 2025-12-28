# 🚀 Быстрая Инструкция по Деплою

> **Для быстрого выполнения деплоя ArtLine Virtual Pitwall**

---

## ⚡ Быстрый Старт (5 шагов)

### 1️⃣ Проверка Проекта (5 минут)
```bash
# Сборка проекта
npm run build

# Проверка TypeScript
npx tsc --noEmit

# Проверка ESLint
npx next lint

# Создание бэкапа
node scripts/backup/backup-content.js
```

### 2️⃣ Настройка Git (2 минуты)
```bash
# Инициализация (если нужно)
git init

# Добавление файлов
git add .

# Первый коммит
git commit -m "feat: initial commit - ArtLine Virtual Pitwall with complete UX overhaul"
```

### 3️⃣ GitHub Репозиторий (3 минуты)

**Создать на GitHub:**
1. Перейти: https://github.com/new
2. Название: `artline-virtual-pitwall`
3. Visibility: Public/Private
4. ❌ НЕ добавлять README, .gitignore
5. Create repository

**Подключить локально:**
```bash
# Замените YOUR_USERNAME на ваш GitHub username
git remote add origin https://github.com/YOUR_USERNAME/artline-virtual-pitwall.git
git branch -M main
git push -u origin main
```

### 4️⃣ Vercel Деплой (5 минут)

**Настройка:**
1. Перейти: https://vercel.com/signup
2. Continue with GitHub
3. Add New → Project
4. Import `artline-virtual-pitwall`
5. Deploy (настройки по умолчанию)

**Ожидать:**
- ⏳ Сборка: 2-5 минут
- ✅ Production URL: `https://artline-virtual-pitwall.vercel.app`

### 5️⃣ Проверка (2 минуты)

**Открыть и проверить:**
- ✅ `/` - Главная
- ✅ `/features` - Функции
- ✅ `/demos` - Демонстрации
- ✅ `/demos/team` - Team Demo
- ✅ `/partners/artline` - ArtLine Partner

---

## 🔄 Workflow После Настройки

```bash
# 1. Разработка локально
npm run dev

# 2. Проверка перед деплоем
npm run build

# 3. Коммит изменений
git add .
git commit -m "описание изменений"

# 4. Push (автоматический деплой)
git push origin main

# 5. Проверка на production URL
# Vercel автоматически деплоит через 2-3 минуты
```

---

## 📋 Чеклист

### Перед Деплоем
- [ ] `npm run build` успешно
- [ ] `npx tsc --noEmit` без ошибок
- [ ] `npx next lint` без критичных ошибок
- [ ] Бэкап создан

### GitHub
- [ ] Репозиторий создан
- [ ] Remote подключен
- [ ] Первый push выполнен

### Vercel
- [ ] Аккаунт создан
- [ ] Проект импортирован
- [ ] Деплой успешен
- [ ] Production URL работает

---

## 🚨 Если Что-то Пошло Не Так

### Build Failed
```bash
# Проверить локально
npm run build

# Посмотреть ошибки в Vercel Dashboard
# Deployments → Latest → Build Logs
```

### Git Push Failed
```bash
# Проверить remote
git remote -v

# Переподключить если нужно
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/artline-virtual-pitwall.git
```

### 404 на Production
- Проверить что все файлы закоммичены: `git status`
- Проверить Build Logs в Vercel
- Проверить что нет ошибок в [`next.config.ts`](../next.config.ts)

---

## 📚 Полная Документация

Для детальной информации смотрите:
- [`DEPLOYMENT_PLAN.md`](./DEPLOYMENT_PLAN.md) - Полный план деплоя
- [`VERCEL-DEPLOY-GUIDE.md`](../VERCEL-DEPLOY-GUIDE.md) - Руководство по Vercel

---

**Время выполнения**: ~15-20 минут  
**Сложность**: Средняя  
**Следующий шаг**: Переключиться в Code mode для выполнения команд
