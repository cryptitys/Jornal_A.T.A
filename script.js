// Menu responsivo
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.querySelector("ul").classList.toggle("show");
});

// Função para simulados
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
