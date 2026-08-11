const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const { fork } = require('child_process');
const fs = require('fs');

let backendProcess;
let aiProcess;

const isDev = !app.isPackaged;

function log(msg) {
  console.log(`[MAIN] ${msg}`);
}

/**
 * Copia o banco de dados para o AppData caso não exista.
 */
function setupDatabase() {
  const userDataPath = app.getPath('userData');
  const dbDestino = path.join(userDataPath, 'database2.sqlite');

  let dbOrigem;

  if (isDev) {
    dbOrigem = path.join(__dirname, 'backend', 'prisma', 'prisma', 'dev.db2');
  } else {
    dbOrigem = path.join(process.resourcesPath, 'backend', 'prisma', 'prisma', 'dev.db2');
  }

  if (!fs.existsSync(dbOrigem)) {
    dialog.showErrorBox(
      'Erro de Banco de Dados',
      `Banco não encontrado.\nCaminho: ${dbOrigem}`
    );
    return null;
  }

  if (!fs.existsSync(dbDestino)) {
    try {
      fs.copyFileSync(dbOrigem, dbDestino);
      log(`🆕 Banco copiado para ${dbDestino}`);
    } catch (err) {
      dialog.showErrorBox('Erro ao copiar banco', err.message);
      return null;
    }
  }

  return dbDestino;
}

/**
 * Inicia o backend usando fork — sem depender de Node instalado
 */
function startBackend(dbUrl, finalDbPath) {
  const backendPath = isDev
    ? path.join(__dirname, 'backend', 'dist', 'main.js')
    : path.join(process.resourcesPath, 'backend', 'dist', 'main.js');

  if (!fs.existsSync(backendPath)) {
    dialog.showErrorBox(
      'Erro Backend',
      `Backend não encontrado em:\n${backendPath}`
    );
    return null;
  }

  log("🚀 Iniciando BACKEND via fork: " + backendPath);

  const env = {
    ...process.env,
    DATABASE_URL: dbUrl,
    DB_FILE_PATH: finalDbPath,
    JWT_SECRET: "campiolo"
  };

  const proc = fork(backendPath, {
    env,
    stdio: "inherit"
  });

  proc.on("error", err => log(`[BACKEND ERROR] ${err}`));
  proc.on("exit", code => log(`[BACKEND EXIT] ${code}`));

  return proc;
}

/**
 * IA — detection_service.exe
 */
function startAI() {
  const aiPath = isDev
    ? path.join(__dirname, 'frontend', 'resources', 'detection_service.exe')
    : path.join(process.resourcesPath, 'detection_service.exe');

  if (!fs.existsSync(aiPath)) {
    dialog.showErrorBox(
      'Erro IA',
      `Executable IA não encontrado:\n${aiPath}`
    );
    return null;
  }

  const { spawn } = require("child_process");

  log("🚀 Iniciando IA: " + aiPath);

  const proc = spawn(aiPath);

  proc.stdout.on("data", d => log(`[IA] ${d}`));
  proc.stderr.on("data", d => log(`[IA ERROR] ${d}`));
  proc.on("exit", c => log(`[IA EXIT] ${c}`));

  return proc;
}

function getFfmpegPath() {
  if (app.isPackaged) {
    // dentro do .exe
    return path.join(process.resourcesPath, "ffmpeg", "ffmpeg.exe");
  } else {
    // dev
    return path.join(__dirname, "frontend", "resources", "ffmpeg", "ffmpeg.exe");
  }
}


/**
 * Janela principal
 */
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#121212',
    webPreferences: { nodeIntegration: true, contextIsolation: false },
    icon: fs.existsSync(path.join(__dirname, 'frontend', 'resources', 'icon.ico'))
      ? path.join(__dirname, 'frontend', 'resources', 'icon.ico')
      : undefined
  });

  const dashboardPath = path.join(__dirname, 'frontend', 'renderer', 'login.html');

  if (fs.existsSync(dashboardPath)) {
    win.loadFile(dashboardPath);
  } else {
    dialog.showErrorBox('Erro crítico', `Dashboard não encontrada:\n${dashboardPath}`);
  }
}


/**
 * APP READY
 */
app.whenReady().then(() => {
  try {
    // 1) Banco
    const finalDbPath = setupDatabase();
    if (!finalDbPath) return app.quit();

    const dbUrl = `file:${finalDbPath.replace(/\\/g, '/')}`;

    // 2) Backend via fork
    backendProcess = startBackend(dbUrl, finalDbPath);

    // 3) IA
    aiProcess = startAI();

    // 4) UI
    createWindow();
  } catch (err) {
    dialog.showErrorBox("Erro Fatal", err.message);
  }
});

/**
 * FECHAR TUDO
 */
app.on('window-all-closed', () => {
  if (backendProcess) backendProcess.kill();
  if (aiProcess) aiProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  return result.filePaths[0]; // Caminho da pasta selecionada
});
