import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAAkBk52aOoo9IZsbEIHRBwOyIZ66Mbhx0",
    authDomain: "mural-af763.firebaseapp.com",
    projectId: "mural-af763",
    storageBucket: "mural-af763.firebasestorage.app",
    messagingSenderId: "418040841130",
    appId: "1:418040841130:web:9d96121172ccede5dea1d3",
    measurementId: "G-W4QTRV47TM"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const noticiasRef = ref(db, "noticias");
const container = document.getElementById("noticiasContainer");

onValue(noticiasRef, snapshot => {
    container.innerHTML = "";
    snapshot.forEach(child => {
        const n = child.val();
        const div = document.createElement("div");
        div.className = "card-noticia";
        div.innerHTML = `
            <h3>${n.titulo}</h3>
            <p>${n.descricao}</p>
            <a href="${n.url}" target="_blank">Ler a notícia completa</a>
        `;
        container.appendChild(div);
    });
});
