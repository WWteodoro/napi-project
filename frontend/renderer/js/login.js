document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3333/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, password })
    });

    const data = await response.json();

    if (response) {
      localStorage.setItem('username', name);
      localStorage.setItem('userid', data.user.id)
      window.location.href = 'dashboard.html';
    } else {
      alert(data.message || 'Usuário ou senha inválidos.');
    }

    return  [];
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao conectar ao servidor.');
  }
})
});
