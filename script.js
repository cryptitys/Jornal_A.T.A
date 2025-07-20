document.addEventListener('DOMContentLoaded', function() {
  // Menu Mobile
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  menuToggle.addEventListener('click', function() {
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

  // Carrossel de Destaques
  const carrossel = document.querySelector('.carrossel');
  const carrosselItems = document.querySelectorAll('.destaque-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let currentIndex = 0;
  const itemWidth = carrosselItems[0]?.offsetWidth || 0;
  const gap = 24;

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    const scrollPosition = index * (itemWidth + gap);
    carrossel.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
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

  let autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % carrosselItems.length;
    goToSlide(currentIndex);
  }, 5000);

  carrossel?.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  carrossel?.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % carrosselItems.length;
      goToSlide(currentIndex);
    }, 5000);
  });

  // Contador para evento futuro (exemplo: feira de ciências)
  function atualizarContador() {
    const dataEvento = new Date('2025-08-02T00:00:00');
    const agora = new Date();
    const diferenca = dataEvento - agora;

    if (diferenca > 0) {
      const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));

      document.getElementById('contador-dias').textContent = dias.toString().padStart(2, '0');
      document.getElementById('contador-horas').textContent = horas.toString().padStart(2, '0');
      document.getElementById('contador-minutos').textContent = minutos.toString().padStart(2, '0');
    } else {
      document.querySelector('.contador-container').innerHTML = 
        '<p class="contador-texto">A Feira de Ciências 2025 está acontecendo agora! Venha nos visitar!</p>';
    }
  }

  atualizarContador();
  setInterval(atualizarContador, 60000);

  // Simulados
  document.querySelectorAll('.btn-simulado').forEach(btn => {
    btn.addEventListener('click', function() {
      const materia = this.textContent;
      alert(`Simulado de ${materia} será aberto em uma nova página!`);
      // window.open('link-do-simulado', '_blank');
    });
  });

  // Eventos
  document.querySelectorAll('.btn-evento').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const evento = this.closest('.evento-card')?.querySelector('h3')?.textContent || 'evento';
      alert(`Você será redirecionado para mais informações sobre: ${evento}`);
      // window.location.href = this.getAttribute('href');
    });
  });

  // Avisos - redirecionamento com alerta
  document.querySelectorAll('.btn-saiba-mais').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const aviso = this.closest('.aviso-card')?.querySelector('h3')?.textContent || 'aviso';
      const url = this.getAttribute('href');
      alert(`Você será redirecionado para mais informações sobre: ${aviso}`);
      window.location.href = url;
    });
  });
});

// Modal de Aviso
document.addEventListener('DOMContentLoaded', function() {
  const avisoModal = document.getElementById('avisoModal');
  const fecharAviso = document.getElementById('fecharAviso');

  const avisoFechado = localStorage.getItem('avisoFechado');

  if (!avisoFechado && avisoModal) {
    setTimeout(() => {
      avisoModal.style.display = 'flex';
    }, 1000);
  }

  fecharAviso?.addEventListener('click', function() {
    avisoModal.style.display = 'none';
    localStorage.setItem('avisoFechado', 'true');
  });

  avisoModal?.addEventListener('click', function(e) {
    if (e.target === avisoModal) {
      avisoModal.style.display = 'none';
      localStorage.setItem('avisoFechado', 'true');
    }
  });
});
async function enviarMensagem(mensagemUsuario) {
  const resposta = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: mensagemUsuario })
  });

  const data = await resposta.json();
  return data.reply;
}
