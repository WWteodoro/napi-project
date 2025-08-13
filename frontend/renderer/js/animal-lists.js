let isEditingList = false; // flag global para evitar abrir modal enquanto edita

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newListForm");
  const searchButton = document.getElementById("searchButton");

  form.addEventListener("submit", handleNewList);
  searchButton.addEventListener("click", handleSearch);

  // Fechar modal membros ao clicar no botão fechar
  const box = document.getElementById("animalBox");
  const closeBtn = document.getElementById("closeAnimalBox");
  closeBtn.onclick = () => {
    box.classList.add("hidden");
    clearMembersBox();
  };

  loadLists();
});

async function handleNewList(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const name = nameInput.value.trim();
  if (!name) return;

  try {
    const response = await fetch("http://localhost:3333/animalList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    if (response.ok) {
      nameInput.value = "";
      await loadLists();
    } else {
      await response.json();
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

async function loadLists(query = "") {
  try {
    let url = "http://localhost:3333/animalList";
    if (query) {
      url = `http://localhost:3333/animalList/name/${encodeURIComponent(query)}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Falha ao carregar as listas");

    const lists = await res.json();
    const listContainer = document.getElementById("animalLists");
    listContainer.innerHTML = "";

    lists.forEach(list => {
      const li = document.createElement("li");
      li.style.cursor = "pointer";

      const nameSpan = document.createElement("span");
      nameSpan.textContent = list.name;

      const actionsDiv = document.createElement("div");
      actionsDiv.classList.add("list-actions");

      const editBtn = document.createElement("button");
      editBtn.textContent = "Editar";
      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        startEditList(li, list);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Excluir";
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteList(list.id);
      });

      const addAnimalBtn = document.createElement("button");
      addAnimalBtn.textContent = "Adicionar Animal";
      addAnimalBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        addAnimal(list.id);
      });

      actionsDiv.appendChild(editBtn);
      actionsDiv.appendChild(deleteBtn);
      actionsDiv.appendChild(addAnimalBtn);

      li.appendChild(nameSpan);
      li.appendChild(actionsDiv);

      // Só abre modal se não estiver editando
      li.addEventListener("click", () => {
        if (!isEditingList) {
          showMembersModal(list);
        }
      });

      listContainer.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao carregar as listas:", error);
  }
}

function startEditList(li, list) {
  isEditingList = true;

  const input = document.createElement("input");
  input.type = "text";
  input.value = list.name;
  input.style.marginRight = "8px";

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Salvar";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancelar";

  li.innerHTML = "";
  li.className = "edit-box";

  li.appendChild(input);
  li.appendChild(saveBtn);
  li.appendChild(cancelBtn);

  saveBtn.addEventListener("click", async () => {
    const newName = input.value.trim();
    if (!newName) return;

    try {
      const res = await fetch(`http://localhost:3333/animalList/${list.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName })
      });

      if (!res.ok) {
        let errorMessage = "Erro ao editar a lista.";
        try {
          const data = await res.json();
          errorMessage = data.message || errorMessage;
        } catch (_) {}
        throw new Error(errorMessage);
      }

      isEditingList = false;
      await loadLists();
    } catch (error) {
      console.error("Erro ao editar:", error);
    }
  });

  cancelBtn.addEventListener("click", () => {
    isEditingList = false;
    loadLists();
  });
}

function handleSearch() {
  const query = document.getElementById("searchInput").value.trim();
  loadLists(query);
}

async function deleteList(id) {
  try {
    const res = await fetch(`http://localhost:3333/animalList/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Erro ao excluir a lista");
    await loadLists();
  } catch (error) {
    console.error("Erro ao excluir:", error);
  }
}

function addAnimal(listId) {
  const box = document.getElementById("animalBox");
  const closeBtn = document.getElementById("closeAnimalBox");

  const searchInput = document.getElementById("boxSearchInput");
  const searchBtn = document.getElementById("boxSearchBtn");

  const newAnimalForm = document.getElementById("boxNewAnimalForm");
  const newAnimalName = document.getElementById("boxNewAnimalName");

  const animalList = document.getElementById("boxAnimalList");

  box.classList.remove("hidden");

  async function loadAnimals(query = "") {
    try {
      let url = "http://localhost:3333/animal";
      if (query) url = `http://localhost:3333/animal/name/${encodeURIComponent(query)}`;

      const res = await fetch(url);
      let animals = await res.json();

      // Garantir que animals seja um array mesmo que retorne um objeto único
      if (!Array.isArray(animals)) {
        animals = animals ? [animals] : [];
      }

      animalList.innerHTML = "";

      animals.forEach(animal => {
        const li = document.createElement("li");
        li.textContent = animal.name;

        const addBtn = document.createElement("button");
        addBtn.textContent = "Adicionar";
        addBtn.addEventListener("click", async () => {
          try {
            const linkRes = await fetch(`http://localhost:3333/animalMember/animal/${animal.id}/list/${listId}`, {
              method: "POST"
            });

            if (!linkRes.ok) {
              const data = await linkRes.json();
              throw new Error(data.message || "Erro ao adicionar animal.");
            }

            box.classList.add("hidden");
          } catch (err) {
            console.error(err);
          }
        });

        li.appendChild(addBtn);
        animalList.appendChild(li);
      });

      if (animals.length === 0) {
        animalList.innerHTML = "<li>Nenhum animal encontrado.</li>";
      }
    } catch (err) {
      console.error("Erro ao carregar animais:", err);
    }
  }

  searchBtn.onclick = () => {
    const q = searchInput.value.trim();
    loadAnimals(q);
  };

  newAnimalForm.onsubmit = async (e) => {
    e.preventDefault();
    const name = newAnimalName.value.trim();
    if (!name) return;

    try {
      const res = await fetch("http://localhost:3333/animal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });

      if (!res.ok) throw new Error("Erro ao cadastrar animal.");
      newAnimalName.value = "";
      await loadAnimals();
    } catch (err) {
      console.error(err);
    }
  };

  closeBtn.onclick = () => {
    box.classList.add("hidden");
  };

  loadAnimals();
}


async function showMembersModal(list) {
  const box = document.getElementById("animalBox");
  const boxTitle = box.querySelector(".box-content h2");
  const animalListUl = document.getElementById("boxAnimalList");
  const searchInput = document.getElementById("boxSearchInput");
  const searchBtn = document.getElementById("boxSearchBtn");
  const newAnimalForm = document.getElementById("boxNewAnimalForm");

  boxTitle.textContent = `Animais da lista: ${list.name}`;

  searchInput.style.display = "none";
  searchBtn.style.display = "none";
  newAnimalForm.style.display = "none";

  animalListUl.innerHTML = "<li>Carregando animais...</li>";
  box.classList.remove("hidden");

  try {
    const res = await fetch(`http://localhost:3333/animalMember/list/${list.id}`);
    if (!res.ok) throw new Error("Erro ao carregar animais da lista.");

    const members = await res.json();

    animalListUl.innerHTML = "";

    if (members.length === 0) {
      animalListUl.innerHTML = "<li>Nenhum animal nesta lista.</li>";
      return;
    }

    members.forEach(member => {
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.justifyContent = "space-between";
      li.style.alignItems = "center";

      const span = document.createElement("span");
      span.textContent = member.name;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remover";
      removeBtn.style.marginLeft = "10px";
      removeBtn.style.cursor = "pointer";
      removeBtn.addEventListener("click", async () => {
        if (!confirm(`Remover o animal "${member.name}" da lista?`)) return;
        try {
          const resDel = await fetch(`http://localhost:3333/animalMember/${member.id}/list/${list.id}`, {
            method: "DELETE"
          });
          if (!resDel.ok) throw new Error("Erro ao remover o animal.");
          showMembersModal(list);
        } catch (err) {
          console.error(err);
        }
      });

      li.appendChild(span);
      li.appendChild(removeBtn);
      animalListUl.appendChild(li);
    });

  } catch (error) {
    animalListUl.innerHTML = "<li>Erro ao carregar animais.</li>";
    console.error(error);
  }
}
