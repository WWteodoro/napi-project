document.addEventListener("DOMContentLoaded", () => {
  const placeId = localStorage.getItem("selectedPlaceId");
  
  if (!placeId) {
    alert("Erro: Lugar não selecionado. Voltando ao dashboard...");
    window.location.href = "session.html";
    return;
  }

  // Botão de voltar
  document.getElementById("btn-back").addEventListener("click", () => {
    window.location.href = "session.html";
  });

  // Variável que guarda a instância atual do gráfico
  let myChart = null;
  const ctx = document.getElementById("analyticsChart").getContext("2d");

  // Função para buscar os dados no Backend
  async function fetchGraphData(rota) {
    try {
      const response = await fetch(`http://127.0.0.1:3333/note/${rota}/${placeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}) // Manda vazio por padrão, mas pronto para receber filtros no futuro
      });

      if (!response.ok) throw new Error("Erro ao buscar dados do gráfico.");
      
      let data = await response.json();
      
      // O backend devolve uma string "JSON.stringify()", então precisamos fazer o parse se vier como string
      if (typeof data === "string") {
        data = JSON.parse(data);
      }
      
      return data;
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar o gráfico. Verifique o console.");
      return null;
    }
  }

  // Construtor do Gráfico
  async function renderChart(rota, chartType, labelTitle, colors) {
    const rawData = await fetchGraphData(rota);
    if (!rawData) return;

    // Se já existe um gráfico na tela, destrói para não sobrepor
    if (myChart) {
      myChart.destroy();
    }

    // Cria o novo gráfico
    myChart = new Chart(ctx, {
      type: chartType,
      data: {
        labels: rawData.labels,
        datasets: [{
          label: labelTitle,
          data: rawData.data,
          backgroundColor: colors.bg,
          borderColor: colors.border,
          borderWidth: 1,
          fill: chartType === 'line',
          tension: 0.3 // Deixa a linha suave/curvada
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: chartType !== 'bar', // Esconde a legenda em gráficos de barra para ficar mais limpo
            position: 'top'
          }
        },
        scales: chartType === 'pie' || chartType === 'doughnut' ? {} : {
          y: { beginAtZero: true } // Garante que eixos de linhas/barras comecem no zero
        }
      }
    });
  }

  // --- Mapeamento das Abas ---
  const configs = {
    "abundancia": {
      rota: "abundancia",
      type: "bar",
      label: "Total de Indivíduos Registrados",
      colors: { bg: 'rgba(108, 99, 255, 0.6)', border: 'rgba(108, 99, 255, 1)' }
    },
    "relogio": {
      rota: "relogio",
      type: "line",
      label: "Atividade por Horário",
      colors: { bg: 'rgba(243, 156, 18, 0.2)', border: 'rgba(243, 156, 18, 1)' }
    },
    "frequencia": {
      rota: "frequencia",
      type: "doughnut",
      label: "Registros por Câmera",
      colors: { 
        // Array de cores para gráficos de rosca
        bg: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'], 
        border: '#ffffff' 
      }
    },
    "tendencia": {
      rota: "tendencia",
      type: "line",
      label: "Tendência Sazonal (Mês/Ano)",
      colors: { bg: 'rgba(46, 204, 113, 0.2)', border: 'rgba(46, 204, 113, 1)' }
    }
  };

  // Gerencia o clique nos botões das abas
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      // Remove a classe active de todos
      tabBtns.forEach(b => b.classList.remove("active"));
      // Adiciona no clicado
      e.target.classList.add("active");

      // Renderiza o gráfico correto
      const target = e.target.getAttribute("data-target");
      const conf = configs[target];
      renderChart(conf.rota, conf.type, conf.label, conf.colors);
    });
  });

  // Carrega o primeiro gráfico (Abundância) por padrão ao abrir a tela
  renderChart(configs["abundancia"].rota, configs["abundancia"].type, configs["abundancia"].label, configs["abundancia"].colors);
});