const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
import path from "path";
import process from "process";
import fs from "fs";

function setupFfmpegPath() {
  try {
    // 🔍 Detecta se o app está empacotado
    const isPackaged = app.isPackaged;

    // 🔧 Caminho base (quando empacotado, fica em …\resources\)
    const basePath = isPackaged
      ? process.resourcesPath
      : path.join(__dirname, "..");

    // 📁 Pasta onde você colocou o ffmpeg no build
    const ffmpegDir = path.join(basePath, "backend", "dist", "resources", "ffmpeg");

    // Verifica se a pasta realmente existe
    if (!fs.existsSync(ffmpegDir)) {
      console.error("❌ FFmpeg directory not found:", ffmpegDir);
      return;
    }

    console.log("📌 FFmpeg folder loaded:", ffmpegDir);

    // 🧩 Adiciona ao PATH (somente local, sem registrar no windows)
    process.env.PATH = `${process.env.PATH};${ffmpegDir}`;
    console.log("🔧 PATH atualizado com FFmpeg.");

  } catch (err) {
    console.error("Erro ao configurar FFmpeg PATH:", err);
  }
}

// Chame ANTES do app.ready()
setupFfmpegPath();


let backendProcess;
let aiProcess;

function log(msg) {
  console.log(`[MAIN] ${msg}`);
}

function startProcess(name, command, args = [], env = process.env) {
  if (!fs.existsSync(command) && !fs.existsSync(args[0])) {
    log(`❌ ERRO: ${name} não encontrado em: ${command} ${args.join(' ')}`);
    dialog.showErrorBox(
      `Erro ao iniciar ${name}`,
      `O arquivo não foi encontrado:\n${command} ${args.join(' ')}`
    );
    return null;
  }

  log(`🚀 Iniciando ${name}... (${command} ${args.join(' ')})`);

  const proc = spawn(command, args, { env });

  proc.stdout.on('data', data => log(`[${name}] ${data.toString().trim()}`));
  proc.stderr.on('data', data => log(`[${name} ERRO] ${data.toString().trim()}`));

  proc.on('exit', code => log(`[${name}] finalizado com código ${code}`));
  proc.on('error', err => log(`[${name} FALHOU AO INICIAR] ${err.message}`));

  return proc;
}

// --- Handler para abrir seletor de pastas ---
ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  if (result.canceled || result.filePaths.length === 0) return null;
  return result.filePaths[0]; // caminho da pasta selecionada
});

function createWindow() {
  log('🪟 Criando janela principal...');
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#121212',
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });

  const dashboardPath = path.join(__dirname, 'renderer', 'dashboard.html');
  if (fs.existsSync(dashboardPath)) {
    win.loadFile(dashboardPath);
    log(`✅ Dashboard carregada: ${dashboardPath}`);
  } else {
    log(`❌ ERRO: dashboard.html não encontrado em ${dashboardPath}`);
    dialog.showErrorBox('Erro crítico', `Arquivo dashboard.html não encontrado:\n${dashboardPath}`);
  }

  win.on('closed', () => log('🪟 Janela fechada.'));
}

app.whenReady().then(() => {
  try {
    const resourcesPath = app.isPackaged 
    ? path.join(process.resourcesPath)  // build: resources ficam aqui
    : path.join(__dirname, 'resources'); // dev

    if (app.isPackaged) {
    // MODO PRODUÇÃO (.exe)
    // O backend foi copiado para dentro de resources/backend/dist
    backendJsPath = path.join(process.resourcesPath, 'backend', 'dist', 'main.js');
} else {
    // MODO DESENVOLVIMENTO (yarn start)
    // Caminho relativo original para sair do frontend e ir pro backend
    // Ajuste o '..' conforme onde seu main.js está. 
    // Se main.js está na raiz do frontend:
    backendJsPath = path.join(__dirname, '..', 'backend', 'dist', 'main.js');
}
    //const backendJsPath = path.join('..', 'backend', 'dist', 'main.js'); 
    const aiPath = path.join(resourcesPath, 'detection_service.exe');

    const env = { 
      ...process.env, 
      DATABASE_URL: path.join('..', 'backend', 'prisma', 'dev.db'),
      JWT_SECRET: 'campiolo'
    };

    backendProcess = startProcess('BACKEND', 'node', [backendJsPath], env);
    aiProcess = startProcess('IA', aiPath);

    createWindow();
  } catch (err) {
    log(`❌ Erro na inicialização: ${err.message}`);
  }
});

app.on('window-all-closed', () => {
  log('🧹 Encerrando aplicação...');
  if (backendProcess) backendProcess.kill();
  if (aiProcess) aiProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});
