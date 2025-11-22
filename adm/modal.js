// Usuário e senha definidos aqui
const USER = "admin";
const PASS = "1234";

function validarLogin() {
    const user = document.getElementById("loginUser").value.trim();
    const pass = document.getElementById("loginPass").value.trim();

    if (user === USER && pass === PASS) {
        document.getElementById("loginModal").style.display = "none";
    } else {
        alert("Usuário ou senha incorretos!");
    }
}
