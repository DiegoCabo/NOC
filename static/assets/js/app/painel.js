async function fazGetChat() {
  try {
    const response = await fetch("/teste");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

    const table = doc.getElementById("tb_1");
    if (!table) {
      console.error("Tabela 'tb_1' não encontrada no HTML");
      return;
    }

    const rows = table.querySelectorAll("tbody tr");
    const departments = [
      "HELP DESK SUDESTE1", "SAC", "HELP DESK WEBBY", "SAC WEBBY",
      "HELP DESK CE", "HELP DESK RN/PB", "HELP DESK AZZA", "SAC AZZA"
    ];

    for (const row of rows) {
      try {
        const departmentCell = row.querySelector("td:nth-child(1)");
        if (!departmentCell) continue;
        console.log(departmentCell)
        const department = departmentCell.textContent.trim();

        if (departments.includes(department)) {
          const qtyCell = row.querySelector("td:nth-child(2)");
          if (!qtyCell) continue;
          console.log(qtyCell)

          const qty = parseInt(qtyCell.textContent.trim()) || 0;

          // Atualiza o elemento correspondente ao departamento
          const elementId = `counter-${department.replace(/\s+/g, '-').toUpperCase()}`; // Formata o ID
          const element = document.getElementById(elementId);
          if (element) {
            element.innerHTML = qty; // Atualiza o valor
          } else {
            console.warn(`Elemento com ID '${elementId}' não encontrado: ${elementId}`);
          }
        }
      } catch (rowError) {
        console.warn("Erro ao processar linha:", rowError);
        continue;
      }
    }

  } catch (error) {
    console.error('Erro ao carregar dados do chat:', error);
  }
}

function chat() {
  fazGetChat();
}

setInterval(() => {
  fazGetChat();
}, 300000);