const { contextBridge, ipcRenderer } = require('electron');
const Renderer = require('electron/renderer');

contextBridge.exposeInMainWorld('api', {
  // Abre seletor de pasta e retorna o caminho
  selectFolder: async () => {
    const folderPath = await ipcRenderer.invoke('select-folder');
    return folderPath;
  }
});