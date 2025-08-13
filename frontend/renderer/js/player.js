document.addEventListener("DOMContentLoaded", () => {
  const sessionId = localStorage.getItem("sessaoId");
  const videoList = document.getElementById("videoList");
  const filtro = document.getElementById("filtroAnimais");
  const animalSelect = document.getElementById("animalSelect");
  const btnAdd = document.getElementById("btnAddComment");
  const statsTotal = document.getElementById("processados");
  const statsWith = document.getElementById("comAnimais");
  const canvas = document.getElementById("bboxCanvas");
  const drawCanvas = document.getElementById("drawCanvas");
  const ctx = canvas.getContext("2d");
  const dctx = drawCanvas.getContext("2d");

  const player = videojs("videoPlayer", {
    controls: true,
    autoplay: false,
    preload: "auto"
  });

  let videos = [], boxes = [], currentIndex = 0;
  let drawing = false, start = null, drawBox = null;

  function resizeCanvases() {
    const wrapper = document.getElementById("videoWrapper");
    const rect = wrapper.getBoundingClientRect();

    [canvas, drawCanvas].forEach(c => {
      c.width = rect.width;
      c.height = rect.height;
      c.style.width = rect.width + "px";
      c.style.height = rect.height + "px";
      c.style.position = "absolute";
      c.style.top = "0px";
      c.style.left = "0px";
      c.style.pointerEvents = drawing && c === drawCanvas ? "auto" : "none";
    });
  }

  window.addEventListener("resize", resizeCanvases);
  player.ready(() => {
    resizeCanvases();
    new ResizeObserver(() => resizeCanvases()).observe(document.getElementById("videoWrapper"));
  });

  async function fetchAnimals() {
    try {
      const arr = await (await fetch("http://localhost:3333/animalList")).json();
      animalSelect.innerHTML = "";
      arr.forEach(a => {
        const opt = document.createElement("option");
        opt.value = a;
        opt.textContent = a;
        animalSelect.appendChild(opt);
      });
    } catch (e) {
      console.error("Erro ao buscar animais:", e);
    }
  }

  async function fetchVideos(f = "todos") {
    try {
      const url = f === "com" || f === "sem"
        ? `http://localhost:3333/video/${f === "com"}/` + sessionId
        : `http://localhost:3333/video/${sessionId}`;
      const arr = await (await fetch(url)).json();
      videos = arr.map(v => ({
        id: v.id,
        url: v.url,
        name: `Vídeo ${v.id.slice(0, 6)}`,
        hasAnimal: v.hasAnimals
      }));
      renderList();
      statsTotal.textContent = videos.length;
      statsWith.textContent = videos.filter(v => v.hasAnimal).length;
      if (videos.length) loadVideo(0);
    } catch (e) {
      console.error("Erro ao buscar vídeos:", e);
    }
  }

  function renderList() {
    videoList.innerHTML = "";
    videos.forEach((v, i) => {
      const li = document.createElement("li");
      li.textContent = v.name + (v.hasAnimal ? " 🐾" : "");
      li.onclick = () => loadVideo(i);
      li.style.background = i === currentIndex ? "#d0e0ff" : "";
      videoList.appendChild(li);
    });
  }

  async function loadVideo(i) {
    currentIndex = i;
    const v = videos[i];
    player.src({ type: "video/mp4", src: v.url });
    try { await player.play(); } catch {}
    renderList();
    try {
      boxes = await (await fetch(`http://localhost:3333/box/video/${v.id}`)).json();
    } catch (e) {
      console.error("Erro ao buscar boxes:", e);
      boxes = [];
    }
  }

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = player.currentTime();
    const delta = 0.1;
    const currentBoxes = boxes.filter(b => Math.abs(b.time - t) <= delta);
    currentBoxes.forEach(b => {
      const x = b.x0 * canvas.width;
      const y = b.y0 * canvas.height;
      const w = (b.x1 - b.x0) * canvas.width;
      const h = (b.y1 - b.y0) * canvas.height;
      ctx.strokeStyle = "lime";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);
    });
  }

  player.on("timeupdate", drawFrame);

  filtro.addEventListener("change", () => fetchVideos(filtro.value));

  // Desenho manual

  document.getElementById("btnDraw").addEventListener("click", () => {
    drawing = !drawing;
    drawCanvas.style.pointerEvents = drawing ? "auto" : "none";
    if (!drawing) dctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
  });

  drawCanvas.addEventListener("mousedown", e => {
    if (!drawing) return;
    start = { x: e.offsetX, y: e.offsetY };
    drawBox = null;
  });

  drawCanvas.addEventListener("mousemove", e => {
    if (!drawing || !start) return;
    const x = Math.min(e.offsetX, start.x);
    const y = Math.min(e.offsetY, start.y);
    const w = Math.abs(e.offsetX - start.x);
    const h = Math.abs(e.offsetY - start.y);

    dctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
    dctx.strokeStyle = "red";
    dctx.lineWidth = 2;
    dctx.strokeRect(x, y, w, h);
    drawBox = { x0: x, y0: y, x1: x + w, y1: y + h };
  });

  drawCanvas.addEventListener("mouseup", async e => {
  if (!drawing || !drawBox) return;

  start = null;

  // Normalizar as coordenadas para o backend
  const normBox = {
    videoId: videos[currentIndex].id,
    time: player.currentTime(),
    x0: drawBox.x0 / canvas.width,
    y0: drawBox.y0 / canvas.height,
    x1: drawBox.x1 / canvas.width,
    y1: drawBox.y1 / canvas.height,
  };

  try {
    const res = await fetch("http://localhost:3333/box", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(normBox),
    });

    if (!res.ok) throw new Error("Falha ao salvar box no backend");

    
    // Atualiza localmente a lista de boxes após o envio
    boxes = await (await fetch(`http://localhost:3333/box/video/${normBox.videoId}`)).json();
  } catch (error) {
  }

  // Limpa desenho e desativa o modo desenho para evitar mais boxes
  dctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
  drawing = false;
  drawCanvas.style.pointerEvents = "none";
});


  // Botão adicionar comentário (implementação simples)
  btnAdd.addEventListener("click", () => {
    
  });

  // Botões navegação
  document.getElementById("btnPrev").addEventListener("click", () => {
    if (currentIndex > 0) loadVideo(currentIndex - 1);
  });
  document.getElementById("btnNext").addEventListener("click", () => {
    if (currentIndex < videos.length - 1) loadVideo(currentIndex + 1);
  });

  // Inicializar
  fetchAnimals();
  fetchVideos();
});
