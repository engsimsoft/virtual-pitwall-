const fs = require('fs');
const path = require('path');

const BACKUP_DIR = path.join(__dirname, '../../backups');

function createTimestamp() {
  const now = new Date();
  return now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
}

function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}

function backupContent() {
  ensureBackupDir();
  
  const timestamp = createTimestamp();
  const backupName = `content-backup-${timestamp}`;
  const backupPath = path.join(BACKUP_DIR, backupName);
  
  try {
    // Создаем папку для бэкапа
    fs.mkdirSync(backupPath, { recursive: true });
    
    // Копируем документацию
    const docsPath = path.join(__dirname, '../../docs');
    if (fs.existsSync(docsPath)) {
      copyDirectory(docsPath, path.join(backupPath, 'docs'));
      console.log('✅ Документация скопирована');
    }
    
    // Копируем src/app (страницы)
    const srcPath = path.join(__dirname, '../../src/app');
    if (fs.existsSync(srcPath)) {
      copyDirectory(srcPath, path.join(backupPath, 'src-app'));
      console.log('✅ Страницы приложения скопированы');
    }
    
    // Копируем публичные файлы
    const publicPath = path.join(__dirname, '../../public');
    if (fs.existsSync(publicPath)) {
      copyDirectory(publicPath, path.join(backupPath, 'public'));
      console.log('✅ Публичные файлы скопированы');
    }
    
    // Создаем manifest файл
    const manifest = {
      timestamp: new Date().toISOString(),
      type: 'content-backup',
      includes: ['docs', 'src/app', 'public'],
      size: getDirectorySize(backupPath)
    };
    
    fs.writeFileSync(
      path.join(backupPath, 'manifest.json'), 
      JSON.stringify(manifest, null, 2)
    );
    
    console.log(`🎉 Бэкап создан: ${backupName}`);
    console.log(`📁 Размер: ${formatBytes(manifest.size)}`);
    console.log(`📍 Путь: ${backupPath}`);
    
  } catch (error) {
    console.error('❌ Ошибка создания бэкапа:', error.message);
    process.exit(1);
  }
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      // Пропускаем node_modules и .next
      if (entry.name === 'node_modules' || entry.name === '.next') {
        continue;
      }
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function getDirectorySize(dirPath) {
  let size = 0;
  
  function calculateSize(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        calculateSize(fullPath);
      } else {
        size += fs.statSync(fullPath).size;
      }
    }
  }
  
  calculateSize(dirPath);
  return size;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function listBackups() {
  ensureBackupDir();
  
  const backups = fs.readdirSync(BACKUP_DIR)
    .filter(name => name.startsWith('content-backup-'))
    .map(name => {
      const backupPath = path.join(BACKUP_DIR, name);
      const manifestPath = path.join(backupPath, 'manifest.json');
      
      if (fs.existsSync(manifestPath)) {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        return {
          name,
          timestamp: manifest.timestamp,
          size: manifest.size,
          path: backupPath
        };
      }
      return null;
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  return backups;
}

function restoreFromBackup(backupName = null) {
  const backups = listBackups();
  
  if (backups.length === 0) {
    console.log('❌ Нет доступных бэкапов для восстановления');
    return;
  }
  
  // Если не указано имя бэкапа, берем последний
  const backup = backupName 
    ? backups.find(b => b.name === backupName)
    : backups[0];
  
  if (!backup) {
    console.log(`❌ Бэкап "${backupName}" не найден`);
    console.log('\nДоступные бэкапы:');
    backups.forEach((b, i) => {
      console.log(`  ${i + 1}. ${b.name} (${new Date(b.timestamp).toLocaleString('ru-RU')})`);
    });
    return;
  }
  
  console.log(`🔄 Восстановление из бэкапа: ${backup.name}`);
  console.log(`📅 Дата создания: ${new Date(backup.timestamp).toLocaleString('ru-RU')}`);
  
  try {
    // Восстанавливаем docs
    const docsBackupPath = path.join(backup.path, 'docs');
    const docsTargetPath = path.join(__dirname, '../../docs');
    if (fs.existsSync(docsBackupPath)) {
      if (fs.existsSync(docsTargetPath)) {
        fs.rmSync(docsTargetPath, { recursive: true, force: true });
      }
      copyDirectory(docsBackupPath, docsTargetPath);
      console.log('✅ Документация восстановлена');
    }
    
    // Восстанавливаем src/app
    const srcBackupPath = path.join(backup.path, 'src-app');
    const srcTargetPath = path.join(__dirname, '../../src/app');
    if (fs.existsSync(srcBackupPath)) {
      if (fs.existsSync(srcTargetPath)) {
        fs.rmSync(srcTargetPath, { recursive: true, force: true });
      }
      copyDirectory(srcBackupPath, srcTargetPath);
      console.log('✅ Страницы приложения восстановлены');
    }
    
    // Восстанавливаем public
    const publicBackupPath = path.join(backup.path, 'public');
    const publicTargetPath = path.join(__dirname, '../../public');
    if (fs.existsSync(publicBackupPath)) {
      if (fs.existsSync(publicTargetPath)) {
        fs.rmSync(publicTargetPath, { recursive: true, force: true });
      }
      copyDirectory(publicBackupPath, publicTargetPath);
      console.log('✅ Публичные файлы восстановлены');
    }
    
    console.log(`🎉 Восстановление завершено успешно!`);
    console.log('💡 Рекомендуется перезапустить сервер разработки');
    
  } catch (error) {
    console.error('❌ Ошибка восстановления:', error.message);
    process.exit(1);
  }
}

// Запуск скрипта
if (require.main === module) {
  const command = process.argv[2];
  const backupName = process.argv[3];
  
  if (command === 'restore') {
    restoreFromBackup(backupName);
  } else if (command === 'list') {
    const backups = listBackups();
    console.log('📋 Доступные бэкапы:');
    if (backups.length === 0) {
      console.log('  Нет бэкапов');
    } else {
      backups.forEach((backup, i) => {
        const date = new Date(backup.timestamp).toLocaleString('ru-RU');
        const size = formatBytes(backup.size);
        console.log(`  ${i + 1}. ${backup.name}`);
        console.log(`     📅 ${date}`);
        console.log(`     📁 ${size}`);
        console.log('');
      });
    }
  } else {
    console.log('🔄 Создание бэкапа контента...');
    backupContent();
  }
}

module.exports = { backupContent, restoreFromBackup, listBackups }; 