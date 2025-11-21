import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, onValue } 
  from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAAkBk52aOoo9IZsbEIHRBwOyIZ66Mbhx0",
    authDomain: "mural-af763.firebaseapp.com",
    databaseURL: "https://mural-af763-default-rtdb.firebaseio.com",
    projectId: "mural-af763",
    storageBucket: "mural-af763.firebasestorage.app",
    messagingSenderId: "418040841130",
    appId: "1:418040841130:web:9d96121172ccede5dea1d3"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const muralBox = document.getElementById("mural-container");

onValue(ref(db, "mural"), (snap) => {
    muralBox.innerHTML = "";
    snap.forEach((item) => {
        const aviso = item.val();

        muralBox.innerHTML += `
            <div class="aviso-card">
                <h3>${aviso.titulo}</h3>
                <p>${aviso.mensagem}</p>
                <span class="data">${aviso.data}</span>
            </div>
        `;
    });
});
