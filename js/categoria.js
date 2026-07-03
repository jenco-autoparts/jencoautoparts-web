/* ============================================
   PÁGINA DE CATEGORÍA — INTERACCIONES
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ----- Toggle Grid / Lista -----
  const viewButtons = document.querySelectorAll('.view-toggle');
  const productsGrid = document.getElementById('productsGrid');

  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      viewButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const view = btn.dataset.view;
      if (view === 'list') {
        productsGrid.classList.add('is-list');
      } else {
        productsGrid.classList.remove('is-list');
      }
    });
  });

  // ----- Ordenamiento (demo visual) -----
  const sortBy = document.getElementById('sortBy');
  sortBy?.addEventListener('change', (e) => {
    console.log('Ordenar por:', e.target.value);
    // Aquí iría la lógica real con backend o JS para reordenar
  });

  // ----- Aplicar / Limpiar filtros -----
  const applyBtn = document.getElementById('applyFilters');
  const clearBtn = document.getElementById('clearFilters');
  const selects = document.querySelectorAll('.filters__bar .filter__select');

  applyBtn?.addEventListener('click', () => {
    const filters = {};
    selects.forEach(sel => {
      if (sel.value) filters[sel.id] = sel.value;
    });
    console.log('Filtros aplicados:', filters);
    // Aquí iría el fetch o filtrado real
  });

  clearBtn?.addEventListener('click', () => {
    selects.forEach(sel => (sel.value = ''));
    console.log('Filtros limpiados');
  });

  // ----- Favoritos (toggle visual) -----
  document.querySelectorAll('.product-card__wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const icon = btn.querySelector('i');
      icon.classList.toggle('far');
      icon.classList.toggle('fas');
    });
  });

  // ----- Menú móvil -----
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  menuToggle?.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });

});
