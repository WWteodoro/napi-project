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
  let selectedBoxId = null;
  let currentComment = null; // 🔹 armazena comentário atual

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

  // Busca animais da sessão
  async function fetchSessionAnimals() {
    try {
      const session = await (await fetch(`http://localhost:3333/session/${sessionId}`)).json();
      const animalListId = session.animalListId || session.animalList?.id;

      if (!animalListId) throw new Error("animalListId não encontrado");
      const arr = await (await fetch(`http://localhost:3333/animalMember/list/${animalListId}`)).json();
      animalSelect.innerHTML = "";
      arr.forEach(a => {
        const opt = document.createElement("option");
        opt.value = a.name;
        opt.textContent = a.name;
        animalSelect.appendChild(opt);
      });
    } catch (e) {
      console.error("Erro ao buscar animais da sessão:", e);
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
      drawBoxes();
      selectedBoxId = null;
      fetchSessionAnimals();
    } catch (e) {
      console.error("Erro ao buscar boxes:", e);
      boxes = [];
    }
    fetchComments(v.id); // 🔹 busca comentário do vídeo
  }

  async function fetchComments(videoId) {
    try {
      const res = await fetch(`http://localhost:3333/note/video/${videoId}`);
      const arr = await res.json();

      if (arr && arr.length > 0) {
        currentComment = arr[0];
        document.getElementById("content").value = currentComment.content || "";
        document.getElementById("quantity").value = currentComment.quantity || 1;
        document.getElementById("location").value = currentComment.location || "";
        document.getElementById("time").value = currentComment.time ? currentComment.time.join(", ") : "";
        document.getElementById("animalSelect").value = currentComment.animal || "";
      } else {
        currentComment = null;
        document.getElementById("content").value = "";
        document.getElementById("quantity").value = 1;
        document.getElementById("location").value = "";
        document.getElementById("time").value = "";
      }
    } catch (err) {
      console.error("Erro ao buscar comentário:", err);
    }
  }

  function drawBoxes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = player.currentTime();
    const delta = 0.1;
    const currentBoxes = boxes.filter(b => Math.abs(b.time - t) <= delta);
    currentBoxes.forEach(b => {
      const x = b.x0 * canvas.width;
      const y = b.y0 * canvas.height;
      const w = (b.x1 - b.x0) * canvas.width;
      const h = (b.y1 - b.y0) * canvas.height;
      ctx.strokeStyle = selectedBoxId === b.id ? "orange" : "lime";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);
    });
  }

  player.on("timeupdate", drawBoxes);

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
      if (!res.ok) throw new Error("Falha ao salvar box");
      boxes = await (await fetch(`http://localhost:3333/box/video/${normBox.videoId}`)).json();
    } catch (err) { console.error(err); }

    dctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
    drawing = false;
    drawCanvas.style.pointerEvents = "none";
  });

  // Selecionar box clicando
  canvas.addEventListener("click", e => {
    const rect = canvas.getBoundingClientRect();
    const xClick = (e.clientX - rect.left) / canvas.width;
    const yClick = (e.clientY - rect.top) / canvas.height;

    selectedBoxId = null;
    for (const b of boxes) {
      if (xClick >= b.x0 && xClick <= b.x1 && yClick >= b.y0 && yClick <= b.y1) {
        selectedBoxId = b.id;
        break;
      }
    }
    drawBoxes();
  });

  // Comentários
  btnAdd.addEventListener("click", async () => {
    const animal = animalSelect.value;
    const quantity = document.getElementById("quantity")?.value || 1;
    const content = document.getElementById("content")?.value?.trim() || "";
    const location = document.getElementById("location")?.value?.trim() || "desconhecida";
    const dateTime = new Date().toLocaleString();
    const userId = localStorage.getItem("userid") || "anon";
    const videoId = videos[currentIndex]?.id;

    if (!videoId) {
      return;
    }

    const timeInput = document.getElementById("time")?.value?.trim();
    const time = timeInput
      ? timeInput.split(",").map(t => parseFloat(t.trim())).filter(t => !isNaN(t))
      : [player.currentTime()];

    const commentData = {
      videoId,
      quantity: Number(quantity),
      dateTime,
      location,
      content,
      animal,
      userId,
      time
    };

    try {
      let res;
      if (currentComment) {
        // 🔹 Atualiza se já existir
        res = await fetch(`http://localhost:3333/note/${currentComment.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(commentData)
        });
      } else {
        // 🔹 Cria novo se não existir
        res = await fetch("http://localhost:3333/note", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(commentData)
        });
      }

      if (!res.ok) throw new Error("Falha ao salvar comentário");
      fetchComments(videoId);
    } catch (err) {
      console.error("Erro ao enviar comentário:", err);
    }
  });

  document.getElementById("btnPrev").addEventListener("click", () => {
    if (currentIndex > 0) loadVideo(currentIndex - 1);
  });
  document.getElementById("btnNext").addEventListener("click", () => {
    if (currentIndex < videos.length - 1) loadVideo(currentIndex + 1);
  });

  fetchVideos();
});
