/* ============================================
   JENCO AUTOPARTS - JAVASCRIPT PRINCIPAL
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  
  // ====== Menú hamburguesa (mobile) ======
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('is-open');
      
      // Cambiar ícono
      const icon = menuToggle.querySelector('i');
      if (mainNav.classList.contains('is-open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    // Cerrar menú al hacer click en un link
    const navLinks = mainNav.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }
  
  console.log('🔥 JENCO AUTOPARTS - Sitio cargado correctamente');
});
