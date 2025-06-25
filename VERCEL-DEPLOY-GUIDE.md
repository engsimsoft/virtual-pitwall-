# 🚀 Vercel Deploy Guide для Cursor Agent

> **Для Cursor Agent**: Полное руководство по правильному деплою Next.js проектов на Vercel

---

## ✅ ПРАВИЛЬНЫЙ ПРОЦЕСС ДЕПЛОЯ

### **Основное правило: НИКОГДА не используй `vercel login` и `vercel --prod`**

**Правильный процесс:**
1. `git add .` - добавить изменения в staging
2. `git commit -m "описание изменений"` - зафиксировать изменения  
3. `git push origin main` - отправить в репозиторий
4. **Vercel автоматически** подхватывает изменения и делает деплой

---

## 🔧 НАСТРОЙКА VERCEL (один раз)

### **1. GitHub Integration**
- Vercel должен быть подключен к GitHub репозиторию
- Включен "Auto Deploy" для main ветки
- Проект должен быть linked в Vercel Dashboard

### **2. Правильный vercel.json для Next.js 15**
```json
{
  "name": "virtual-pitwall",
  "functions": {
    "src/app/**/*.tsx": {
      "maxDuration": 10
    }
  },
  "framework": "nextjs",
  "buildCommand": "npm run build"
}
```

**❌ НЕ ИСПОЛЬЗУЙ устаревший синтаксис:**
```json
{
  "version": 2,
  "builds": [...],  // ❌ Устарело
  "routes": [...],  // ❌ Конфликтует с Next.js 15
  "env": {...}      // ❌ Не нужно для авто деплоя
}
```

---

## 🐛 ТИПИЧНЫЕ ПРОБЛЕМЫ И РЕШЕНИЯ

### **1. TypeScript ошибки: "Unexpected any"**

**Проблема:**
```typescript
// ❌ Неявный any в тернарном операторе
return `base-classes ${condition ? 'active' : ''}`
```

**Решение:**
```typescript
// ✅ Явная типизация функции
const getClassName = (condition: boolean): string => {
  const baseClasses = "base-classes"
  const activeClasses = condition ? " active" : ""
  return baseClasses + activeClasses
}
```

### **2. ESLint правило @typescript-eslint/no-explicit-any**

**Если нужно отключить конкретное правило:**
```json
// eslint.config.mjs
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
];
```

### **3. PowerShell && не работает**

**❌ Неправильно:**
```bash
git add . && git commit -m "fix" && git push
```

**✅ Правильно (по отдельности):**
```bash
git add .
git commit -m "fix: описание изменений"
git push origin main
```

---

## 🔍 ДИАГНОСТИКА ПРОБЛЕМ

### **1. Локальная проверка перед push**
```bash
npm run build      # Проверка сборки (должна показать все страницы)
npx next lint      # Проверка ESLint  
npx tsc --noEmit   # Проверка TypeScript
npm run dev        # Тест локального сервера
```

**Для Virtual Pitwall проверь что все страницы компилируются:**
- ✅ `/` (Virtual Pitwall)
- ✅ `/about` (О проекте) 
- ✅ `/features` (с интерактивными карточками)
- ✅ `/mvp_tech_spec` (публичная версия)
- ✅ `/rental-management` (Fleet Control)
- ✅ `/shortcut` (DK Racing)
- ✅ `/shortcut/demo` (Team Demo)
- ✅ `/shortcut/dk` (DK Demo) 
- ✅ `/shortcut/benefits` (Benefits)

### **2. Если деплой падает**
1. **Проверь vercel.json** - убери устаревший синтаксис
2. **Проверь TypeScript** - исправь any типы
3. **Проверь ESLint** - исправь линтер ошибки
4. **Проверь GitHub Integration** в Vercel Dashboard
5. **Специфично для Virtual Pitwall:**
   - Проверь что CommentSystem.tsx не использует any типы
   - Проверь что все импорты Lucide React корректны
   - Проверь что mockData.ts экспортируется правильно

### **3. Если автодеплой не работает**
- Проверь что репозиторий linked в Vercel
- Проверь что Auto Deploy включен для main ветки
- Проверь что нет конфликтующих настроек в vercel.json

---

## 📋 ЧЕКЛИСТ ПЕРЕД ДЕПЛОЕМ

- [ ] Локальная сборка проходит: `npm run build`
- [ ] ESLint проверка чистая: `npx next lint`
- [ ] TypeScript ошибок нет: `npx tsc --noEmit`
- [ ] vercel.json не содержит устаревший синтаксис
- [ ] Все 9 страниц компилируются (включая Features с интерактивными карточками)
- [ ] Система комментариев работает локально
- [ ] Создан бэкап: `node scripts/backup/backup-content.js`
- [ ] Изменения закоммичены с осмысленным сообщением
- [ ] GitHub репозиторий обновлен: `git push origin main`

---

## 🎯 ВАЖНЫЕ ПРИНЦИПЫ

### **1. Автоматизация > Ручные действия**
- Vercel CLI нужен только для первоначальной настройки
- Все деплои должны идти через GitHub integration
- Никогда не используй `vercel --prod` для регулярных деплоев

### **2. Конфигурация > Императивные команды**
- Настрой vercel.json один раз правильно
- Используй стандартные настройки Next.js
- Не переопределяй настройки без необходимости

### **3. Проверка > Предположения**
- Всегда проверяй сборку локально перед push
- Используй TypeScript strict mode
- Не игнорируй предупреждения ESLint

---

## 🚨 КРАСНЫЕ ФЛАГИ

**Если видишь это - ОСТАНОВИСЬ:**
- `vercel login` в терминале
- `npx vercel --prod` команды
- `"builds": [...]` в vercel.json
- `"routes": [...]` в vercel.json
- Игнорирование TypeScript ошибок
- Множественные попытки деплоя без анализа ошибок

---

## ✨ УСПЕШНЫЙ ДЕПЛОЙ

**Признаки успешного деплоя:**
- ✅ Компиляция прошла без ошибок
- ✅ Linting прошел чисто
- ✅ GitHub push прошел успешно
- ✅ Vercel автоматически запустил деплой
- ✅ Сайт доступен по URL через 1-2 минуты

**Для Virtual Pitwall проверь после деплоя:**
- ✅ Главная страница загружается с дашбордом
- ✅ Features страница показывает интерактивные карточки
- ✅ Система комментариев работает (синяя кнопка)
- ✅ Навигация работает на всех устройствах
- ✅ Developer area защищена паролем `pitwall2025`

---

## 🎯 СПЕЦИФИКА VIRTUAL PITWALL

### **Важные файлы для деплоя:**
- `src/components/Navigation.tsx` - единая навигация
- `src/components/CommentSystem.tsx` - система комментариев
- `src/lib/mockData.ts` - данные для демо
- `vercel.json` - конфигурация Vercel

### **Критические проверки:**
1. **Features страница** должна показывать 3 интерактивные карточки
2. **Система комментариев** должна работать на всех страницах
3. **Мобильная навигация** должна открываться/закрываться
4. **Developer area** должна требовать пароль

---

**📅 Создано**: Январь 2025  
**👤 Автор**: Cursor Agent (на основе опыта Virtual Pitwall проекта)  
**🔄 Статус**: Обновлено для Virtual Pitwall v4.2 - UX оптимизация завершена 