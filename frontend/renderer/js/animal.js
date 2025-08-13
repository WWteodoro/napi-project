document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newAnimalForm");
  const searchButton = document.getElementById("searchButton");

  form.addEventListener("submit", handleNewAnimal);
  searchButton.addEventListener("click", handleSearch);

  loadAnimals(); // carrega todos no início
});

async function handleNewAnimal(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const name = nameInput.value.trim();
  if (!name) return;

  try {
    const response = await fetch("http://localhost:3333/animal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    if (response.ok) {
      nameInput.value = "";
      await loadAnimals();
    } else {
      const data = await response.json();
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

async function loadAnimals(query = "") {
  try {
    let url = "http://localhost:3333/animal";
    if (query) {
      url = `http://localhost:3333/animal/name/${encodeURIComponent(query)}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Erro ao carregar os animais.");

    let animals = await res.json();

    if (!Array.isArray(animals)) {
      animals = animals ? [animals] : [];
    }

    const listContainer = document.getElementById("animalList");
    listContainer.innerHTML = "";

    if (animals.length === 0) {
      listContainer.innerHTML = "<li>Nenhum animal encontrado.</li>";
      return;
    }

    animals.forEach(animal => {
      const li = document.createElement("li");

      const nameSpan = document.createElement("span");
      nameSpan.textContent = animal.name;

      const actionsDiv = document.createElement("div");
      actionsDiv.classList.add("animal-actions");

      // Botão Editar
      const editBtn = document.createElement("button");
      editBtn.textContent = "Editar";
      editBtn.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = animal.name;
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
            const res = await fetch(`http://localhost:3333/animal/${animal.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name: newName })
            });

            if (!res.ok) {
              let message = "Erro ao atualizar.";
              try {
                const data = await res.json();
                message = data.message || message;
              } catch (_) {}
              throw new Error(message);
            }

            await loadAnimals();
          } catch (err) {
            console.error("Erro ao editar:", err);
          }
        });

        cancelBtn.addEventListener("click", () => loadAnimals());
      });

      // Botão Excluir
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Excluir";
      deleteBtn.addEventListener("click", async () => {
        if (!confirm("Deseja realmente excluir este animal?")) return;

        try {
          const res = await fetch(`http://localhost:3333/animal/${animal.id}`, {
            method: "DELETE"
          });
          if (!res.ok) throw new Error("Erro ao excluir o animal.");
          await loadAnimals();
        } catch (error) {
          console.error("Erro ao excluir:", error);
        }
      });

      actionsDiv.appendChild(editBtn);
      actionsDiv.appendChild(deleteBtn);

      li.appendChild(nameSpan);
      li.appendChild(actionsDiv);

      listContainer.appendChild(li);
    });
  } catch (err) {
    console.error("Erro ao carregar os animais:", err);
  }
}


function handleSearch() {
  const query = document.getElementById("searchInput").value.trim();
  loadAnimals(query);
}
