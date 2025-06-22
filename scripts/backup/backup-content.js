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

// Запуск скрипта
if (require.main === module) {
  console.log('🔄 Создание бэкапа контента...');
  backupContent();
}

module.exports = { backupContent }; 