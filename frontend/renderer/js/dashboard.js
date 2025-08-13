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
const folderInput = document.createElement('input');
folderInput.type = 'file';
folderInput.webkitdirectory = true;
folderInput.style.display = 'none';
document.body.appendChild(folderInput);

// Função para carregar animais da API
async function carregarListaAnimais() {
  try {
    const response = await fetch('http://localhost:3333/animalList');
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
}

// Abrir modal ao clicar no botão "Criar nova seção"
createSectionBtn.addEventListener('click', () => {
  carregarListaAnimais();
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
async function enviarPastaParaAPI(sectionId, folderPath) {
  try {
    const response = await fetch(`http://localhost:3333/session/${sectionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folder: folderPath })
    });

    if (!response.ok) throw new Error(`Erro na requisição: ${response.statusText}`);
    
  } catch (error) {
  }
}

// Criar nova seção
createSectionForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('section-name').value.trim();
  const animalListId = animalListSelect.value;
  const userId = localStorage.getItem('userid');

  if (!name || !animalListId) return;

  try {
    const response = await fetch('http://localhost:3333/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, userId, animalListId })
    });

    if (response.ok) {
      window.location.href = 'dashboard.html';
    } else {
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
    const response = await fetch('http://localhost:3333/session');
    if (!response.ok) throw new Error('Erro ao buscar sessões');

    const sessoes = await response.json();
    sections.innerHTML = ''; // limpa o container

    if (sessoes.length === 0) {
      sections.innerHTML = '<p>Nenhuma seção criada ainda.</p>';
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
  <p>${progressoTexto}</p>
  <div class="progress-container">
    <div class="progress-bar" style="width: ${porcentagem}%"></div>
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
      sections.appendChild(card);
    });
  } catch (error) {
    console.error('Erro ao carregar sessões:', error);
    sections.innerHTML = '<p>Erro ao carregar sessões.</p>';
  }
}



window.addEventListener('DOMContentLoaded', () => {
  carregarSessoes();
  setInterval(carregarSessoes, 5000); // Atualiza a cada 5 segundos

});

// Selecionar pasta e enviar para API
async function selecionarPasta(sectionId) {
  const folderPath = await window.api.selectFolder();
  
  if (folderPath) {
    enviarPastaParaAPI(sectionId, folderPath);
  } else {
  }
}



