// Controle do menu lateral com 1 botão só
document.getElementById('menu-button').addEventListener('click', () => {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('main-content');
  sidebar.classList.toggle('collapsed');
  mainContent.classList.toggle('collapsed');
});

// Modal e criação de seção
const createSectionBtn = document.getElementById('create-section');
const modal = document.getElementById('create-section-modal');
const closeModalBtn = document.getElementById('close-modal');
const createSectionForm = document.getElementById('create-section-form');
const sections = document.getElementById('sections');

// O select da Lista de Animais
const animalListSelect = document.getElementById('animal-list');

// Input oculto para selecionar pasta
const folderInput = document.createElement('input');
folderInput.type = 'file';
folderInput.webkitdirectory = true;
folderInput.style.display = 'none';
document.body.appendChild(folderInput);

// --- Função para carregar as Listas de Animais da API ---
async function carregarListaAnimais() {
  try {
    const response = await fetch('http://127.0.0.1:3333/animalList');
    if (!response.ok) throw new Error('Erro ao buscar listas de animais');

    const listas = await response.json();
    animalListSelect.innerHTML = ''; // Limpa opções anteriores

    if (listas.length === 0) {
      animalListSelect.innerHTML = '<option disabled>Nenhuma lista encontrada</option>';
      return;
    }

    listas.forEach(lista => {
      const option = document.createElement('option');
      option.value = lista.id;
      option.textContent = lista.name;
      animalListSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar lista de animais:', error);
    animalListSelect.innerHTML = '<option disabled>Erro ao carregar</option>';
  }
}

// Abrir modal ao clicar no botão "Criar nova seção"
createSectionBtn.addEventListener('click', () => {
  carregarListaAnimais(); // Carrega as opções de animais antes de abrir
  modal.style.display = 'flex';
});

// Fechar modal ao clicar no X
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Fechar modal ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// --- Botão para acessar a tela de gráficos ---
const btnViewCharts = document.getElementById('btn-view-charts');
if (btnViewCharts) {
  btnViewCharts.addEventListener('click', () => {
    const placeId = localStorage.getItem('selectedPlaceId');
    if (!placeId) {
      alert("Erro: Lugar não selecionado. Volte ao dashboard.");
      return;
    }
    // Redireciona para a nova página de gráficos
    window.location.href = 'charts.html';
  });
}

// Enviar pasta para a API
async function enviarPastaParaAPI(sectionId, folderPath) {
  try {
    const response = await fetch(`http://127.0.0.1:3333/session/${sectionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folder: folderPath })
    });

    if (!response.ok) throw new Error(`Erro na requisição: ${response.statusText}`);
    
    // Atualiza a tela para exibir possível mudança de progresso
    carregarSessoes();
  } catch (error) {
    console.error('Erro ao enviar pasta:', error);
  }
}

// Criar nova seção (Câmera)
createSectionForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('section-name').value;
  // Pegando a lista selecionada no HTML
  const animalListId = animalListSelect.value;
  
  // Campos de coordenadas
  const latitude = document.getElementById('latitude')?.value || "00";
  const longitude = document.getElementById('longitude')?.value || "00";

  // Recupera os IDs do contexto do usuário
  const placeId = localStorage.getItem('selectedPlaceId'); 
  const userId = localStorage.getItem('userid') || "7d263756-c7d9-4726-9063-e383040f88d0"; // Fallback de segurança

  if (!placeId) {
    alert("Erro: Lugar não selecionado. Volte ao dashboard.");
    return;
  }
  if (!animalListId) {
    alert("Erro: Você precisa selecionar uma lista de animais.");
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:3333/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name, 
        userId,
        animalListId, // Adicionado de volta!
        latitude, 
        longitude,
        placeId 
      })
    });

    if (response.ok) {
      modal.style.display = 'none';
      createSectionForm.reset();
      carregarSessoes(); // Recarrega a lista de câmeras
    } else {
      console.error('Erro ao criar câmera');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
});

// LOGIN / LOGOUT
const userGreeting = document.getElementById('user-greeting');
const loginLogoutBtn = document.getElementById('login-logout-btn');

function updateLoginState() {
  const username = localStorage.getItem('username');

  if (username) {
    userGreeting.textContent = `Olá, ${username}`;
    loginLogoutBtn.textContent = 'Sair';
  } else {
    userGreeting.textContent = 'Olá';
    loginLogoutBtn.textContent = 'Entrar';
  }
}

loginLogoutBtn.addEventListener('click', () => {
  const username = localStorage.getItem('username');

  if (username) {
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    updateLoginState();
  } else {
    window.location.href = 'login.html';
  }
});

updateLoginState();

// Carregar sessões e montar cards
async function carregarSessoes() {
  const placeId = localStorage.getItem('selectedPlaceId');

  if (!placeId) {
    sections.innerHTML = '<p>Erro: Lugar não identificado. Volte ao Dashboard.</p>';
    return;
  }

  try {
    // Buscando apenas as sessões correspondentes ao placeId
    //const response = await fetch(`http://127.0.0.1:3333/session?placeId=${placeId}`);
    const response = await fetch(`http://127.0.0.1:3333/session/place/${placeId}`);
    if (!response.ok) throw new Error('Erro ao buscar câmeras');

    const sessoes = await response.json();
    sections.innerHTML = ''; // limpa o container

    if (sessoes.length === 0) {
      sections.innerHTML = '<p>Nenhuma câmera cadastrada ainda para este lugar.</p>';
      return;
    }

    sessoes.forEach(sessao => {
      const card = document.createElement('div');
      card.classList.add('session-card');

      // Redirecionar ao clicar no card
      card.addEventListener('click', () => {
        localStorage.setItem('sessaoId', sessao.id);
        window.location.href = 'player.html';
      });

      // Cálculos de Progresso (Processamento da IA)
      const total = sessao.totalVideos;
      const processados = sessao.processedVideos;
      const pctProcessados = total > 0 ? Math.round((processados / total) * 100) : 0;
      
      // Cálculos de Progresso (Anotação Manual)
      const anotados = sessao.annotatedVideos || 0; // Fallback para 0 caso o backend ainda não envie
      const pctAnotados = total > 0 ? Math.round((anotados / total) * 100) : 0;

      // Textos das barras
      const txtProcessados = total > 0 ? `${processados}/${total} processados (${pctProcessados}%)` : 'Nenhum vídeo ainda';
      const txtAnotados = total > 0 ? `${anotados}/${total} anotados (${pctAnotados}%)` : 'Nenhum vídeo anotado';

      // Conteúdo do card com DUAS barras independentes
      card.innerHTML = `
        <h3>${sessao.name}</h3>
        <p style="font-size: 0.85rem; color: #b3b3b3; margin-bottom: 15px;">📍 Lat: ${sessao.latitude || '--'} | Long: ${sessao.longitude || '--'}</p>
        
        <div style="margin-bottom: 15px;">
          <p style="font-size: 0.85rem; margin-bottom: 4px;">⚙️ IA: ${txtProcessados}</p>
          <div class="progress-container" style="height: 6px; background-color: #e0e0e0; border-radius: 4px; overflow: hidden;">
            <div class="progress-bar" style="width: ${pctProcessados}%; height: 100%; background-color: #007bff; transition: width 0.3s;"></div>
          </div>
        </div>

        <div style="margin-bottom: 15px;">
          <p style="font-size: 0.85rem; margin-bottom: 4px;">📝 Manual: ${txtAnotados}</p>
          <div class="progress-container" style="height: 6px; background-color: #e0e0e0; border-radius: 4px; overflow: hidden;">
            <div class="progress-bar" style="width: ${pctAnotados}%; height: 100%; background-color: #28a745; transition: width 0.3s;"></div>
          </div>
        </div>
      `;

      // Botão "Selecionar Pasta"
      const btnSelecionarPasta = document.createElement('button');
      btnSelecionarPasta.textContent = 'Selecionar Pasta';
      btnSelecionarPasta.addEventListener('click', (e) => {
        e.stopPropagation(); // impede redirecionamento
        selecionarPasta(sessao.id);
      });
      card.appendChild(btnSelecionarPasta);

      // Botão "Excluir Câmera"
      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir Câmera';
      btnExcluir.classList.add('delete-btn'); // <- adiciona a classe para ficar vermelho
      btnExcluir.addEventListener('click', async (e) => {
        e.stopPropagation();
        if(confirm(`Deseja excluir a câmera "${sessao.name}"?`)){
          try {
            const resp = await fetch(`http://127.0.0.1:3333/session/${sessao.id}`, { method: 'DELETE' });
            if (resp.ok) card.remove();
            else console.error('Erro ao deletar câmera');
          } catch (err) {
            console.error('Erro ao deletar câmera:', err);
          }
        }
      });
      card.appendChild(btnExcluir);

      // Botão "Exportar CSV da Sessão"
      const btnExportar = document.createElement('button');
      btnExportar.textContent = 'Exportar CSV';
      btnExportar.addEventListener('click', async (e) => {
        e.stopPropagation();

        try {
          // Se estivermos no Electron, usamos o seletor de pastas nativo
          let folderPath = null;
          try {
            const { ipcRenderer } = require('electron');
            folderPath = await ipcRenderer.invoke('select-folder');
          } catch (err) {
            // não estamos em Electron (ou ipcRenderer não disponível)
          }

          if (folderPath) {
            // 1) Envia o caminho selecionado para o backend para que ele crie o CSV no disco
            const resp = await fetch(`http://127.0.0.1:3333/note/csv/${sessao.id}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ exportPath: folderPath })
            });

            if (resp.ok) {
              const data = await resp.json(); // espera { path: 'C:\\...\\notes-session-....csv' }
              alert(`CSV salvo em:\n${data.path}`);
            } else {
              console.error('Erro ao exportar CSV da câmera (server retornou erro)');
            }
          } else {
            // 2) Fallback: backend antigo que retorna o CSV como blob (navegador)
            const resp = await fetch(`http://127.0.0.1:3333/note/csv/${sessao.id}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' }
            });

            if (resp.ok) {
              const blob = await resp.blob();
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `sessao-${sessao.id}.csv`;
              a.click();
              URL.revokeObjectURL(url);
            } else {
              console.error('Erro ao exportar CSV da câmera (fallback blob)');
            }
          }
        } catch (err) {
          console.error('Erro ao exportar CSV da câmera:', err);
        }
      });
      card.appendChild(btnExportar);

      sections.appendChild(card);
    });
  } catch (error) {
    console.error('Erro ao carregar câmeras:', error);
    sections.innerHTML = '<p>Erro ao carregar câmeras.</p>';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  carregarSessoes();
  setInterval(carregarSessoes, 5000); // Atualiza a cada 5 segundos
});

// Selecionar pasta e enviar para API
async function selecionarPasta(sectionId) {
  const { ipcRenderer } = require('electron');
  const folderPath = await ipcRenderer.invoke('select-folder');

  if (folderPath) enviarPastaParaAPI(sectionId, folderPath);
}

// --- Botão exportar CSV de todas as sessões ---
const btnExportAll = document.createElement('button');
btnExportAll.textContent = 'Exportar todas as câmeras';
btnExportAll.id = 'export-all';
btnExportAll.style.position = 'fixed';
btnExportAll.style.bottom = '20px';
btnExportAll.style.right = '20px';
btnExportAll.style.zIndex = 1000;

btnExportAll.addEventListener('click', async () => {
  try {
    // 0️⃣ Resgata o ID do lugar atual
    const placeId = localStorage.getItem('selectedPlaceId');

    if (!placeId) {
      alert("Erro: Lugar não identificado. Volte ao Dashboard para selecionar um lugar.");
      return;
    }

    // 1️⃣ Pede para o usuário escolher a pasta (via Electron)
    let folderPath = null;
    try {
      const { ipcRenderer } = require('electron');
      folderPath = await ipcRenderer.invoke('select-folder');
    } catch (err) {
      console.warn("Electron não detectado. (Fallback para navegador não implementado para escolha de pasta)");
    }

    if (!folderPath) {
      console.log('Nenhuma pasta selecionada.');
      return;
    }

    // 2️⃣ Envia o caminho selecionado para o backend na nova rota
    const resp = await fetch(`http://127.0.0.1:3333/note/Fullycsv/${placeId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exportPath: folderPath })
    });

    // 3️⃣ Mostra o resultado
    if (resp.ok) {
      const data = await resp.json();
      alert(`CSV exportado com sucesso em:\n${data.path}`);
    } else {
      console.error('Erro ao exportar CSV total. O servidor retornou um status:', resp.status);
      alert('Erro ao exportar CSV total. Verifique o console do backend.');
    }
  } catch (err) {
    console.error('Erro ao exportar CSV total:', err);
  }
});

document.body.appendChild(btnExportAll);