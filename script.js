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
  fun// Contador para evento futuro (exemplo: feira de ciências)
function atualizarContador() {
  const dataEvento = new Date('2025-08-01T00:00:00');
  const agora = new Date();
  const diferenca = dataEvento - agora;

  if (diferenca > 0) {
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));

    const elDias = document.getElementById('contador-dias');
    const elHoras = document.getElementById('contador-horas');
    const elMinutos = document.getElementById('contador-minutos');

    if (elDias && elHoras && elMinutos) {
      elDias.textContent = dias.toString().padStart(2, '0');
      elHoras.textContent = horas.toString().padStart(2, '0');
      elMinutos.textContent = minutos.toString().padStart(2, '0');
    }
  } else {
    const container = document.querySelector('.contador-container');
    if (container) {
      container.innerHTML = '<p class="contador-texto">Volta às aulas pós férias!</p>';
    }
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
const linksSimulados = {
  "Português": {
    senha: "123456",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...portugues"
  },
  "História": {
    senha: "654321",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...historia"
  },
  "Geografia": {
    senha: "111111",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...geografia"
  },
  "Matemática": {
    senha: "222222",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...matematica"
  },
  "Finanças": {
    senha: "333333",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...financas"
  }, 
  "Inglês": {
  senha: "444444",
  url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...ingles"
},
"Física": {
  senha: "555555",
  url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...fisica"
},
"Filosofia": {
  senha: "666666",
  url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...filosofia"
},
"Biologia": {
  senha: "777777",
  url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...biologia"
},
"Química": {
  senha: "888888",
  url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...quimica"
},
"Artes": {
  senha: "999999",
  url: "https://docs.google.com/forms/d/e/1FAIpQLSfX...artes"
}
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

document.getElementById('confirmarSenha').addEventListener('click', () => {
  const senhaDigitada = document.getElementById('senhaInput').value;
  const info = linksSimulados[simuladoSelecionado];

  if (info && senhaDigitada === info.senha) {
    window.location.href = info.url;
  } else {
    document.getElementById('mensagemErro').style.display = 'block';
  }
});

document.getElementById('cancelarSenha').addEventListener('click', () => {
  document.getElementById('modalSenha').style.display = 'none';
});
// Mostra/esconde os botões de simulados ao clicar
document.getElementById('toggleSimulados').addEventListener('click', function () {
  const container = document.getElementById('simuladosContainer');
  container.classList.toggle('hidden');
});
// Impede que a URL fique com '#' em links sem destino
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // impede o comportamento padrão
    history.replaceState(null, null, ' '); // remove o # da URL
  });
});

// Também remove o # se alguém clicar em <a href="#algo"> que não existe
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (!targetElement) {
      e.preventDefault();
      history.replaceState(null, null, ' ');
    }
  });
});
