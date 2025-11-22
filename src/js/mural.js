    // IMPORTS
    import { initializeApp }
        from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
    import { getAnalytics }
        from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
    import { getDatabase, ref, onValue }
        from "https://www.gstatic.com/firebasejs/12.6.0/firebasedatabase.js";

    // CONFIGURAÇÃO
    const firebaseConfig = {
        apiKey: "AIzaSyAAkBk52aOoo9IZsbEIHRBwOyIZ66Mbhx0",
        authDomain: "mural-af763.firebaseapp.com",
        projectId: "mural-af763",
        storageBucket: "mural-af763.firebasestorage.app",
        messagingSenderId: "418040841130",
        appId: "1:418040841130:web:9d96121172ccede5dea1d3",
        measurementId: "G-W4QTRV47TM"
    };

    // INIT
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getDatabase(app);

    // REFERÊNCIA DO BANCO
    const muralRef = ref(db, "mural");
    const container = document.getElementById("avisos-container");

    // CARREGAR EM TEMPO REAL
    onValue(muralRef, (snapshot) => {
        container.innerHTML = "";

        snapshot.forEach(child => {
            const aviso = child.val();

            const card = document.createElement("div");
            card.className = `aviso-card ${aviso.cor}`;

            card.innerHTML = `
                <h3>${aviso.titulo}</h3>
                <p>${aviso.mensagem}</p>
            `;

            container.appendChild(card);
        });
    });
