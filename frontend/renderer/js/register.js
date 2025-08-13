document.getElementById('register-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3333/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, password })
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = 'login.html';
    } else {
      alert(data.message || 'Erro ao registrar usuário.');
    }

    return [];
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao conectar ao servidor.');
  }
});
