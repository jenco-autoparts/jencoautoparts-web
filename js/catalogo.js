/* ============================================
   COTIZADOR → WHATSAPP
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const WHATSAPP_NUMBER = '525564530422'; // Tu número JENCO

  const form = document.getElementById('quoteForm');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const marca     = data.get('marca');
    const modelo    = data.get('modelo');
    const anio      = data.get('anio');
    const motor     = data.get('motor') || 'No especificado';
    const refaccion = data.get('refaccion');
    const nombre    = data.get('nombre');
    const telefono  = data.get('telefono');
    const esTaller  = data.get('es_taller') ? 'Sí ✅' : 'No';

    // Mensaje formateado para WhatsApp
    const mensaje =
`🔧 *NUEVA COTIZACIÓN - JENCO*

👤 *Cliente:* ${nombre}
📱 *WhatsApp:* ${telefono}

🚗 *Vehículo:*
• Marca: ${marca}
• Modelo: ${modelo}
• Año: ${anio}
• Motor: ${motor}

🔩 *Refacción solicitada:*
${refaccion}

🏢 *¿Es taller?* ${esTaller}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  });

});