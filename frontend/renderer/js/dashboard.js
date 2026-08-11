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
const animalListSelect = document.getElementById('animal-list');
const sections = document.getElementById('sections');

// Input oculto para selecionar pasta
/*const folderInput = document.createElement('input');
folderInput.type = 'file';
folderInput.webkitdirectory = true;
folderInput.style.display = 'none';
document.body.appendChild(folderInput);*/

// Função para carregar animais da API
/*async function carregarListaAnimais() {
  try {
    const response = await fetch('http://127.0.0.1:3333/animalList');
    if (!response.ok) throw new Error('Erro ao buscar animais');

    const animais = await response.json();
    animalListSelect.innerHTML = '';

    animais.forEach(animal => {
      const option = document.createElement('option');
      option.value = animal.id;
      option.textContent = animal.name;
      animalListSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar lista de animais:', error);
    animalListSelect.innerHTML = '<option disabled>Erro ao carregar</option>';
  }
}*/

// Abrir modal ao clicar no botão "Criar nova seção"
createSectionBtn.addEventListener('click', () => {
  //carregarListaAnimais();
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

// Enviar pasta para a API
/*async function enviarPastaParaAPI(sectionId, folderPath) {
  try {
    const response = await fetch(`http://127.0.0.1:3333/session/${sectionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folder: folderPath })
    });

    if (!response.ok) throw new Error(`Erro na requisição: ${response.statusText}`);
    
  } catch (error) {
    console.error('Erro ao enviar pasta:', error);
  }
}*/

// Criar nova seção
createSectionForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('section-name').value.trim();
  //const animalListId = animalListSelect.value;
  const userId = localStorage.getItem('userid');

  if (!name) return;

  try {
    const response = await fetch('http://127.0.0.1:3333/place', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, /*userId, animalListId*/ })
    });

    if (response.ok) {
      window.location.href = 'dashboard.html';
    } else {
      console.error('Erro ao criar seção');
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
    updateLoginState();
  } else {
    window.location.href = 'login.html';
  }
});

updateLoginState();

// Carregar sessões e montar cards
async function carregarSessoes() {
  try {
    const response = await fetch('http://127.0.0.1:3333/place');
    if (!response.ok) throw new Error('Erro ao buscar lugares');

    const sessoes = await response.json();
    sections.innerHTML = ''; // limpa o container

    if (sessoes.length === 0) {
      sections.innerHTML = '<p>Nenhum lugar cadastrado ainda.</p>';
      return;
    }

    sessoes.forEach(sessao => {
      const card = document.createElement('div');
      card.classList.add('session-card');

      // Localize onde você cria o card do lugar dentro do sessoes.forEach
card.addEventListener('click', () => {
  // Salva o ID do lugar clicado para usar na próxima tela
  localStorage.setItem('selectedPlaceId', sessao.id); 
  window.location.href = 'session.html';
});

      // Calcular progresso
      const total = sessao.totalVideos;
      const processados = sessao.processedVideos;
      const porcentagem = total > 0 ? Math.round((processados / total) * 100) : 0;
      const progressoTexto = total > 0
        ? `${processados}/${total} processado${processados === 1 ? '' : 's'} (${porcentagem}%)`
        : 'Nenhum vídeo ainda';

      // Conteúdo do card
      card.innerHTML = `
        <h3>${sessao.name}</h3>
      `;

      // Botão "Selecionar Pasta"
      /*const btnSelecionarPasta = document.createElement('button');
      btnSelecionarPasta.textContent = 'Selecionar Pasta';
      btnSelecionarPasta.addEventListener('click', (e) => {
        e.stopPropagation(); // impede redirecionamento
        selecionarPasta(sessao.id);
      });
      card.appendChild(btnSelecionarPasta);*/

      // Botão "Excluir Sessão"
const btnExcluir = document.createElement('button');
btnExcluir.textContent = 'Excluir Lugar';
btnExcluir.classList.add('delete-btn');
btnExcluir.addEventListener('click', async (e) => {
  e.stopPropagation();
  //if (confirm(`Deseja excluir o lugar "${sessao.name}"?`)) {
    try {
      // Passando o ID na URL conforme definido no placeRouter.ts
      const resp = await fetch(`http://127.0.0.1:3333/place/${sessao.id}`, { 
        method: 'DELETE' 
      });
      if (resp.ok) {
        card.remove();
      } else {
        console.error('Erro ao deletar lugar');
      }
    } catch (err) {
      console.error('Erro ao deletar lugar:', err);
    }
  }
);
card.appendChild(btnExcluir);


      // Botão "Exportar CSV da Sessão"


  

    
     

   

      sections.appendChild(card);
    });
  } catch (error) {
    console.error('Erro ao carregar câmeras:', error);
    sections.innerHTML = '<p>Erro ao carregar câmeras.</p>';
  }
}

// --- Botão de Resetar Dados ---
const btnResetData = document.getElementById('btn-reset-data');

if (btnResetData) {
  btnResetData.addEventListener('click', async () => {
    // Dupla verificação para evitar desastres
    const confirmacao1 = confirm("CUIDADO: Isso vai apagar TODOS os lugares, câmeras, vídeos e anotações do sistema. Deseja continuar?");
    
    if (confirmacao1) {
      const confirmacao2 = confirm("Tem certeza absoluta? Essa ação não pode ser desfeita!");
      
      if (confirmacao2) {
        try {
          // Muda o texto do botão para mostrar que está carregando
          btnResetData.textContent = "⏳ Resetando...";
          btnResetData.disabled = true;

          // Faz a requisição para a sua rota (assumindo que você criou como POST)
          const response = await fetch('http://127.0.0.1:3333/resetData', {
            method: 'POST', // Se a sua rota for GET ou DELETE, mude aqui!
            headers: { 'Content-Type': 'application/json' }
          });

          if (response.ok) {
            alert("Banco de dados resetado e repovoado com sucesso!");
            window.location.reload(); // Recarrega a página para limpar a tela
          } else {
            console.error('Erro ao resetar:', response.statusText);
            alert("Erro ao tentar resetar o banco de dados. Verifique o console do backend.");
          }
        } catch (error) {
          console.error("Erro na requisição de reset:", error);
          alert("Erro de conexão com o servidor ao tentar resetar.");
        } finally {
          // Restaura o botão
          btnResetData.textContent = "⚠️ Resetar Banco";
          btnResetData.disabled = false;
        }
      }
    }
  });
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
// --- Botão exportar CSV de todas as sessões ---




    

document.body.appendChild(btnExportAll);
