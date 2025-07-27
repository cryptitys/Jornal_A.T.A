document.addEventListener('DOMContentLoaded', function () {
  // --- MENU MOBILE ---
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  menuToggle.addEventListener('click', function () {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('show');
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('show');
      document.body.style.overflow = '';
    });
  });

  // --- CARROSSEL DE DESTAQUES ---
  const carrossel = document.querySelector('.carrossel');
  const carrosselItems = document.querySelectorAll('.destaque-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentIndex = 0;
  let itemWidth = 0;
  const gap = 24;
  let autoSlideInterval = null;

  if (carrossel && carrosselItems.length > 0) {
    const resizeObserver = new ResizeObserver(() => {
      itemWidth = carrosselItems[0].offsetWidth;
      goToSlide(currentIndex);
    });
    resizeObserver.observe(carrosselItems[0]);

    function updateDots() {
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      const scrollPosition = index * (itemWidth + gap);
      carrossel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      updateDots();
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });

    prevBtn?.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + carrosselItems.length) % carrosselItems.length;
      goToSlide(currentIndex);
    });

    nextBtn?.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % carrosselItems.length;
      goToSlide(currentIndex);
    });

    function startAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % carrosselItems.length;
        goToSlide(currentIndex);
      }, 5000);
    }

    startAutoSlide();
    carrossel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carrossel.addEventListener('mouseleave', startAutoSlide);
  }

  // --- SIMULADOS COM ALERTA ---
  document.querySelectorAll('.btn-simulado').forEach(btn => {
    btn.addEventListener('click', function () {
      const materia = this.textContent;
      alert(`Simulado de ${materia} será aberto em uma nova página!`);
      // window.open('link-do-simulado', '_blank');
    });
  });

  // --- EVENTOS ---
  document.querySelectorAll('.btn-evento').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const evento = this.closest('.evento-card')?.querySelector('h3')?.textContent || 'evento';
      alert(`Você será redirecionado para mais informações sobre: ${evento}`);
    });
  });

  // --- AVISOS (REDIRECIONAMENTO) ---
  document.querySelectorAll('.btn-saiba-mais').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const aviso = this.closest('.aviso-card')?.querySelector('h3')?.textContent || 'aviso';
      const url = this.getAttribute('href');
      alert(`Você será redirecionado para mais informações sobre: ${aviso}`);
      window.location.href = url;
    });
  });

  // --- MODAL DE AVISO ---
  const avisoModal = document.getElementById('avisoModal');
  const fecharAviso = document.getElementById('fecharAviso');
  const avisoFechado = localStorage.getItem('avisoFechado');

  if (!avisoFechado && avisoModal) {
    setTimeout(() => {
      avisoModal.style.display = 'flex';
    }, 1000);
  }

  fecharAviso?.addEventListener('click', function () {
    avisoModal.style.display = 'none';
    localStorage.setItem('avisoFechado', 'true');
  });

  avisoModal?.addEventListener('click', function (e) {
    if (e.target === avisoModal) {
      avisoModal.style.display = 'none';
      localStorage.setItem('avisoFechado', 'true');
    }
  });

  // --- MOSTRAR AVISOS DINÂMICOS ---
  const avisos = [
    "📝 Prova de matemática dia 30/07 às 9h.",
    "📢 Reunião de pais e mestres na próxima sexta-feira.",
    "🎓 Inscrições abertas para o simulado ENEM.",
    "🚫 Não haverá aula no dia 01/08 (feriado municipal)."
  ];
  const listaAvisos = document.getElementById('lista-avisos');
  avisos.forEach(aviso => {
    const li = document.createElement('li');
    li.textContent = aviso;
    listaAvisos?.appendChild(li);
  });

  // --- MOSTRA/ESCONDE SIMULADOS ---
  document.getElementById('toggleSimulados')?.addEventListener('click', function () {
    document.getElementById('simuladosContainer')?.classList.toggle('hidden');
  });

  // --- LINKS SEM DESTINO (#) ---
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      history.replaceState(null, null, ' ');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      if (!document.getElementById(targetId)) {
        e.preventDefault();
        history.replaceState(null, null, ' ');
      }
    });
  });
});

// --- FUNÇÃO DE MENSAGEM VIA API (opcional) ---
async function enviarMensagem(mensagemUsuario) {
  const resposta = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: mensagemUsuario })
  });

  const data = await resposta.json();
  return data.reply;
}

// --- LINKS E SENHAS DOS SIMULADOS ---
const linksSimulados = {
  "Português": { senha: "123456", url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...portugues" },
  "História": { senha: "654321", url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...historia" },
  "Geografia": { senha: "111111", url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...geografia" },
  "Matemática": { senha: "222222", url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...matematica" },
  "Finanças": { senha: "333333", url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...financas" },
  "Inglês": { senha: "444444", url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...ingles" },
  "Física": { senha: "555555", url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...fisica" },
  "Filosofia": { senha: "666666", url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...filosofia" },
  "Biologia": { senha: "777777", url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...biologia" },
  "Química": { senha: "888888", url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...quimica" },
  "Artes": { senha: "999999", url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...artes" }
};

let simuladoSelecionado = null;

document.querySelectorAll('.btn-simulado').forEach(btn => {
  btn.addEventListener('click', () => {
    simuladoSelecionado = btn.textContent;
    document.getElementById('modalSenha').style.display = 'flex';
    document.getElementById('senhaInput').value = "";
    document.getElementById('mensagemErro').style.display = 'none';
  });
});

document.getElementById('confirmarSenha')?.addEventListener('click', () => {
  const senhaDigitada = document.getElementById('senhaInput').value;
  const info = linksSimulados[simuladoSelecionado];

  if (info && senhaDigitada === info.senha) {
    window.location.href = info.url;
  } else {
    document.getElementById('mensagemErro').style.display = 'block';
  }
});

document.getElementById('cancelarSenha')?.addEventListener('click', () => {
  document.getElementById('modalSenha').style.display = 'none';
});
