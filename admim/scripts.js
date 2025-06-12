// Configuração
const SENHA_ADMIN = "ATA@2025"; // Altere para sua senha
const DADOS_KEY = "jornalATA_data";

// Elementos
const loginForm = document.getElementById("loginForm");
const dashboard = document.getElementById("dashboard");

// Verificar login
function verificarSenha() {
    const senha = document.getElementById("senha").value;
    if (senha === SENHA_ADMIN) {
        loginForm.style.display = "none";
        dashboard.style.display = "block";
        carregarDados();
    } else {
        alert("Senha incorreta!");
    }
}

// Gerenciamento de dados
function salvarDados(dados) {
    localStorage.setItem(DADOS_KEY, JSON.stringify(dados));
}

function carregarDados() {
    return JSON.parse(localStorage.getItem(DADOS_KEY)) || {
        destaque: { titulo: "", texto: "" },
        plantaoDuvidas: []
    };
}

// Exemplo: Salvar Destaque
function salvarDestaque() {
    const dados = carregarDados();
    dados.destaque = {
        titulo: document.getElementById("destaque-titulo").value,
        texto: document.getElementById("destaque-texto").value
    };
    salvarDados(dados);
    alert("Destaque salvo com sucesso!");
}

// Adicionar linha editável
function addLinhaDuvidas() {
    const dados = carregarDados();
    dados.plantaoDuvidas.push({
        materia: "",
        dia: "",
        local: ""
    });
    salvarDados(dados);
    atualizarTabelaDuvidas();
      }// Configuração
const SENHA_ADMIN = "ATA@2025"; // Altere para sua senha
const DADOS_KEY = "jornalATA_data";

// Elementos
const loginForm = document.getElementById("loginForm");
const dashboard = document.getElementById("dashboard");

// Verificar login
function verificarSenha() {
    const senha = document.getElementById("senha").value;
    if (senha === SENHA_ADMIN) {
        loginForm.style.display = "none";
        dashboard.style.display = "block";
        carregarDados();
    } else {
        alert("Senha incorreta!");
    }
}

// Gerenciamento de dados
function salvarDados(dados) {
    localStorage.setItem(DADOS_KEY, JSON.stringify(dados));
}

function carregarDados() {
    return JSON.parse(localStorage.getItem(DADOS_KEY)) || {
        destaque: { titulo: "", texto: "" },
        plantaoDuvidas: []
    };
}

// Exemplo: Salvar Destaque
function salvarDestaque() {
    const dados = carregarDados();
    dados.destaque = {
        titulo: document.getElementById("destaque-titulo").value,
        texto: document.getElementById("destaque-texto").value
    };
    salvarDados(dados);
    alert("Destaque salvo com sucesso!");
}

// Adicionar linha editável
function addLinhaDuvidas() {
    const dados = carregarDados();
    dados.plantaoDuvidas.push({
        materia: "",
        dia: "",
        local: ""
    });
    salvarDados(dados);
    atualizarTabelaDuvidas();
  }
