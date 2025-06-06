const names = [
  "João Silva",
  "Maria Santos",
  "Pedro Oliveira",
  "Ana Pereira",
  "Carlos Rocha",
  "Fernanda Almeida",
  "Rafael Lima",
  "Mariana Costa",
  "Lucas Souza",
  "Juliana Pereira",
  "Gustavo Santos",
  "Camila Oliveira",
  "André Rocha",
  "Isabela Almeida",
  "Fábio Lima",
  "Vanessa Costa",
  "Rodrigo Souza",
  "Cristina Pereira",
  "Ricardo Rocha",
  "Laura Almeida",
  "Renato Lima",
  "Amanda Costa",
  "Daniel Souza",
  "Isabella Pereira",
  "Eduardo Santos",
  "Patrícia Oliveira",
  "Bruno Almeida",
  "Carolina Lima",
  "Marcos Rocha",
];

// Nomes aleatórios para simulação
const locais = [
  { estado: "São Paulo", cidade: "São Paulo" },
  { estado: "Rio de Janeiro", cidade: "Rio de Janeiro" },
  { estado: "Minas Gerais", cidade: "Belo Horizonte" },
  { estado: "Bahia", cidade: "Salvador" },
  { estado: "Paraná", cidade: "Curitiba" },
  { estado: "Rio Grande do Sul", cidade: "Porto Alegre" },
  { estado: "Ceará", cidade: "Fortaleza" },
  { estado: "Pernambuco", cidade: "Recife" },
  { estado: "Amazonas", cidade: "Manaus" },
  { estado: "Goiás", cidade: "Goiânia" },
];

// ---------------

// Função para gerar nome aleatório
function getRandomName() {
  return names[Math.floor(Math.random() * names.length)];
}
// Função para gerar nome aleatório
function getRandomLocal() {
  return locais[Math.floor(Math.random() * locais.length)].estado;
}

// Função para mostrar notificação
function showNotification() {
  const container = document.getElementById("notification-container");

  const elementsNotification = `
          <h4 class="notification-title">Nova compra</h4>
          <span class="notification-name">${getRandomName()}</span>
          <span class="notification-location">${getRandomLocal()}</span>
          <button class="button-not-showed-notification-buy">Não ver mais</button>`;

  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.innerHTML = elementsNotification;

  container.appendChild(notification);

  setTimeout(() => {
    container.removeChild(notification);
  }, 4000); // Exibir por 5 segundos
}

function showRandomNotification() {
  const randomInterval = Math.floor(
    Math.random() * (20000 - 3000) + 2000
  );
  setTimeout(showRandomNotification, randomInterval);
}

setTimeout(showRandomNotification, 0);