/* ============================================
   JENCO AUTOPARTS - SCRIPT
   Cotizador, WhatsApp, validación, tracking
   ============================================ */

// ===== CAMBIO DE TAB (Vehículo / VIN) =====
function switchTab(button, mode) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    button.classList.add('active');

    const vehicleForm = document.getElementById('vehicle-form');
    const vinForm = document.getElementById('vin-form');

    if (mode === 'vin') {
        vehicleForm.style.display = 'none';
        vinForm.style.display = 'grid';
    } else {
        vehicleForm.style.display = 'grid';
        vinForm.style.display = 'none';
    }
    trackEvent('tab_switch_' + mode);
}

// ===== AUTOCOMPLETAR REFACCIÓN AL CLIC EN CATEGORÍA =====
function setRefaccion(value) {
    const input = document.getElementById('refaccion-input');
    if (input) {
        input.value = value;
        input.focus();
    }
    trackEvent('system_click_' + value);
}

// ===== ENVÍO DE COTIZACIÓN A WEB3FORMS =====
async function sendQuote(event) {
    event.preventDefault();
    const form = event.target;
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    button.disabled = true;
    button.textContent = 'Enviando...';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Construir mensaje legible
    let mensaje = '';
    if (data.vin) {
        mensaje = `VIN: ${data.vin}\n`;
    } else {
        mensaje = `Vehículo: ${data.marca} ${data.modelo} ${data.anio}`;
        if (data.motor) mensaje += ` (${data.motor})`;
        mensaje += '\n';
    }
    mensaje += `Refacción solicitada: ${data.refaccion}\n`;
    mensaje += `Cliente: ${data.nombre}\n`;
    mensaje += `WhatsApp: ${data.telefono}\n`;
    if (data.es_taller) mensaje += `🏢 ES TALLER MECÁNICO (precios mayoreo)\n`;
    formData.append('message', mensaje);

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        if (result.success) {
            showToast('✅ ¡Cotización enviada! Te contactamos en breve por WhatsApp', 'success');
            trackEvent('quote_submitted');

            // Abrir WhatsApp automáticamente con resumen
            setTimeout(() => {
                const waMsg = encodeURIComponent(
                    `Hola JENCO, acabo de enviar una cotización desde su web:\n\n${mensaje}`
                );
                window.open(`https://wa.me/525564530422?text=${waMsg}`, '_blank');
            }, 1500);

            form.reset();
        } else {
            throw new Error(result.message || 'Error al enviar');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('❌ Hubo un error. Intenta por WhatsApp directamente', 'error');
        // Fallback: abrir WhatsApp directo
        setTimeout(() => {
            const waMsg = encodeURIComponent(`Hola JENCO, quiero cotizar:\n\n${mensaje}`);
            window.open(`https://wa.me/525564530422?text=${waMsg}`, '_blank');
        }, 1500);
    } finally {
        button.disabled = false;
        button.textContent = originalText;
    }
}

// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = 'toast show ' + type;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4500);
}

// ===== TRACKING (Google Analytics + Pixel) =====
function trackEvent(eventName, params = {}) {
    // Google Analytics 4
    if (typeof gtag === 'function') {
        gtag('event', eventName, params);
    }
    // Meta Pixel (cuando esté activo)
    if (typeof fbq === 'function') {
        fbq('trackCustom', eventName, params);
    }
}

// ===== VALIDACIÓN VIN BÁSICA =====
document.addEventListener('DOMContentLoaded', () => {
    const vinInput = document.querySelector('input[name="vin"]');
    if (vinInput) {
        vinInput.addEventListener('input', (e) => {
            // Solo letras y números, sin I, O, Q
            e.target.value = e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');
        });
    }

    // Validar formato teléfono México (10 dígitos)
    document.querySelectorAll('input[name="telefono"]').forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9\s]/g, '');
        });
    });

    // Tracking de scroll profundo (engagement)
    let scrolled50 = false, scrolled90 = false;
    window.addEventListener('scroll', () => {
        const percent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (percent > 50 && !scrolled50) { scrolled50 = true; trackEvent('scroll_50'); }
        if (percent > 90 && !scrolled90) { scrolled90 = true; trackEvent('scroll_90'); }
    });

    // Tracking de tiempo en página (engagement)
    setTimeout(() => trackEvent('engaged_30s'), 30000);
    setTimeout(() => trackEvent('engaged_60s'), 60000);

    console.log('%c🔧 JENCO Autoparts', 'color:#ff6b00;font-size:20px;font-weight:bold');
    console.log('%cwww.jencoautoparts.com', 'color:#0a2540;font-size:14px');
});

// ===== SMOOTH SCROLL para anclas internas =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80; // Compensar header sticky
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});
