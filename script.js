document.addEventListener('DOMContentLoaded', function() {
  // Menu Mobile
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  
  menuToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('show');
    
    // Adiciona overlay quando o menu está aberto
    if (!isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Fechar menu ao clicar em um link
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
  const itemWidth = carrosselItems[0].offsetWidth;
  const gap = 24; // gap definido no CSS (1.5rem)
  
  // Atualizar dots
  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  // Mover para um slide específico
  function goToSlide(index) {
    currentIndex = index;
    const scrollPosition = index * (itemWidth + gap);
    carrossel.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    updateDots();
  }
  
  // Event listeners para os dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  // Botões de navegação
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + carrosselItems.length) % carrosselItems.length;
    goToSlide(currentIndex);
  });
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % carrosselItems.length;
    goToSlide(currentIndex);
  });
  
  // Carrossel automático
  let autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % carrosselItems.length;
    goToSlide(currentIndex);
  }, 5000);
  
  // Pausar no hover
  carrossel.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });
  
  carrossel.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % carrosselItems.length;
      goToSlide(currentIndex);
    }, 5000);
  });
  
  // Contador para eventos
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
  
  // Atualizar contador imediatamente e a cada minuto
  atualizarContador();
  setInterval(atualizarContador, 60000);
  
  // Simulados - Exemplo de funcionalidade
  document.querySelectorAll('.btn-simulado').forEach(btn => {
    btn.addEventListener('click', function() {
      const materia = this.textContent;
      alert(`Simulado de ${materia} será aberto em uma nova página!`);
      // Na implementação real, aqui você abriria o simulado correspondente
    });
  });
  
  // Eventos - Exemplo de funcionalidade
  document.querySelectorAll('.btn-evento').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const evento = this.closest('.evento-card').querySelector('h3').textContent;
      alert(`Você será redirecionado para mais informações sobre: ${evento}`);
      // Na implementação real, aqui você redirecionaria para a página do evento
    });
  });
  
  // Avisos - Exemplo de funcionalidade
  document.querySelectorAll('.btn-saiba-mais').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const aviso = this.closest('.aviso-card').querySelector('h3').textContent;
      alert(`Você será redirecionado para mais informações sobre: ${aviso}`);
      // Na implementação real, aqui você redirecionaria para a página completa do aviso
    });
  });
});
// Modal de Aviso
document.addEventListener('DOMContentLoaded', function() {
  const avisoModal = document.getElementById('avisoModal');
  const fecharAviso = document.getElementById('fecharAviso');
  
  // Verifica se o usuário já fechou o aviso antes
  const avisoFechado = localStorage.getItem('avisoFechado');
  
  if (!avisoFechado) {
    // Mostra o aviso após 1 segundo (pode ajustar este tempo)
    setTimeout(() => {
      avisoModal.style.display = 'flex';
    }, 1000);
  }
  
  // Fechar o aviso quando clicar no X
  fecharAviso.addEventListener('click', function() {
    avisoModal.style.display = 'none';
    // Armazena no localStorage que o usuário fechou o aviso
    localStorage.setItem('avisoFechado', 'true');
  });
  
  // Fechar o aviso quando clicar fora do conteúdo
  avisoModal.addEventListener('click', function(e) {
    if (e.target === avisoModal) {
      avisoModal.style.display = 'none';
      localStorage.setItem('avisoFechado', 'true');
    }
  });
});
