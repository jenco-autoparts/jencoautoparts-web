/* ============================================
   CARRUSEL DE PRODUCTOS DESTACADOS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.products-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const cards = carousel.querySelectorAll('.product-card');
  const btnPrev = carousel.querySelector('.carousel-btn--prev');
  const btnNext = carousel.querySelector('.carousel-btn--next');
  const dotsContainer = carousel.querySelector('.carousel-dots');

  let currentIndex = 0;
  let cardsPerView = 3;
  let autoplayInterval;

  // Detectar cuántas cards mostrar según ancho
  const getCardsPerView = () => {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  };

  // Calcular el máximo índice posible
  const getMaxIndex = () => Math.max(0, cards.length - cardsPerView);

  // Mover el carrusel a un índice específico
  const goToIndex = (index) => {
    cardsPerView = getCardsPerView();
    const maxIndex = getMaxIndex();

    if (index < 0) index = maxIndex;        // 🔁 Loop al final
    if (index > maxIndex) index = 0;        // 🔁 Loop al inicio
    
    currentIndex = index;

    const card = cards[0];
    const cardWidth = card.offsetWidth;
    const gap = parseInt(getComputedStyle(track).gap) || 16;
    const offset = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;
    updateDots();
  };

  // Crear puntitos
  const createDots = () => {
    dotsContainer.innerHTML = '';
    const totalDots = getMaxIndex() + 1;
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (i === currentIndex) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToIndex(i);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  };

  // Actualizar puntitos activos
  const updateDots = () => {
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  };

  // Autoplay (desliza solo cada 4 segundos)
  const startAutoplay = () => {
    autoplayInterval = setInterval(() => {
      goToIndex(currentIndex + 1);
    }, 10000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayInterval);
    startAutoplay();
  };

  // Eventos botones
  btnPrev.addEventListener('click', () => {
    goToIndex(currentIndex - 1);
    resetAutoplay();
  });

  btnNext.addEventListener('click', () => {
    goToIndex(currentIndex + 1);
    resetAutoplay();
  });

  // Pausar autoplay al pasar mouse
  carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  carousel.addEventListener('mouseleave', startAutoplay);

  // Recalcular en resize
  window.addEventListener('resize', () => {
    cardsPerView = getCardsPerView();
    createDots();
    goToIndex(0);
  });

  // Inicializar
  createDots();
  goToIndex(0);
  startAutoplay();
});
