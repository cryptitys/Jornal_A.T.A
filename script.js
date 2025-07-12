// Menu responsivo
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.querySelector("ul").classList.toggle("show");
});

// Simulados
function abrirSimulado(materia) {
  let links = {
    portugues: "https://exemplo.com/simulado-portugues",
    historia: "https://exemplo.com/simulado-historia",
    geografia: "https://exemplo.com/simulado-geografia",
    matematica: "https://exemplo.com/simulado-matematica",
    financas: "https://exemplo.com/simulado-financas"
  };

  if (links[materia]) {
    window.open(links[materia], "_blank");
  }
}

// Contador regressivo para o próximo evento
function iniciarContador(dataEvento) {
  const contador = document.getElementById("contador");
  const alvo = new Date(dataEvento).getTime();

  setInterval(() => {
    const agora = new Date().getTime();
    const tempoRestante = alvo - agora;

    if (tempoRestante <= 0) {
      contador.textContent = "Evento em andamento!";
      return;
    }

    const dias = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));
    const horas = Math.floor((tempoRestante / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((tempoRestante / (1000 * 60)) % 60);

    contador.textContent = `Faltam ${dias} dias, ${horas}h e ${minutos}min`;
  }, 1000);
}

// Iniciar o contador para o próximo evento (exemplo: 2 de agosto de 2025)
iniciarContador("2025-08-02T08:00:00");
