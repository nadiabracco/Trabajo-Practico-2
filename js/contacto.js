// Validación del formulario de newsletter con JavaScript vainilla y expresiones regulares.

const formulario = document.getElementById('form-newsletter');
const exito = document.getElementById('exito');

const campoNombre = document.getElementById('nombre');
const campoEmail = document.getElementById('email');
const checksIntereses = document.querySelectorAll('input[name="intereses"]');
const campoAcepto = document.getElementById('acepto');

// ---------- Expresiones regulares ----------
// Nombre: entre 2 y 50 caracteres; letras (con tildes y ñ), espacios, apóstrofe y guion.
const regexNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]{2,50}$/;
// Correo: algo@dominio.ext (no comprueba que la casilla exista, solo el formato).
const regexEmail = /^[\w.+-]+@[\w-]+(\.[\w-]+)+$/;

// ---------- Normalizar: llevar el dato a un formato esperado ----------
function normalizarNombre(texto) {
  return texto.trim().replace(/\s+/g, ' '); // saca espacios de los extremos y unifica los del medio
}
function normalizarEmail(texto) {
  return texto.trim().toLowerCase();
}

// ---------- Mostrar u ocultar errores ----------
// Los campos de texto usan las clases is-valid / is-invalid de Bootstrap.
function marcarCampo(campo, error, idError) {
  document.getElementById(idError).textContent = error;
  campo.classList.toggle('is-invalid', error !== '');
  campo.classList.toggle('is-valid', error === '');
  campo.setAttribute('aria-invalid', error !== '');
  return error === '';
}

// ---------- Validaciones de cada campo (devuelven true si es válido) ----------
function validarNombre() {
  const valor = normalizarNombre(campoNombre.value);
  let error = '';
  if (valor === '') error = 'Escribí tu nombre.';
  else if (valor.length < 2) error = 'El nombre debe tener al menos 2 caracteres.';
  else if (!regexNombre.test(valor)) error = 'El nombre solo puede tener letras y espacios (máximo 50).';
  return marcarCampo(campoNombre, error, 'error-nombre');
}

function validarEmail() {
  const valor = normalizarEmail(campoEmail.value);
  let error = '';
  if (valor === '') error = 'Escribí tu correo electrónico.';
  else if (!regexEmail.test(valor)) error = 'El correo no tiene un formato válido (por ejemplo: nombre@correo.com).';
  return marcarCampo(campoEmail, error, 'error-email');
}

function validarIntereses() {
  const algunoElegido = [...checksIntereses].some((check) => check.checked);
  const contenedor = document.getElementById('error-intereses');
  contenedor.textContent = algunoElegido ? '' : 'Elegí al menos un tema para recibir novedades.';
  contenedor.classList.toggle('d-block', !algunoElegido); // este error no está junto a un input, se muestra a mano
  checksIntereses.forEach((check) => check.classList.toggle('is-invalid', !algunoElegido));
  return algunoElegido;
}

function validarAcepto() {
  const error = campoAcepto.checked ? '' : 'Tenés que aceptar para poder suscribirte.';
  document.getElementById('error-acepto').textContent = error;
  campoAcepto.classList.toggle('is-invalid', error !== '');
  campoAcepto.setAttribute('aria-invalid', error !== '');
  return error === '';
}

// ---------- Eventos ----------
// Al salir del campo (change) se valida; si ya tenía error, se revalida mientras escribe (input).
campoNombre.addEventListener('change', validarNombre);
campoNombre.addEventListener('input', () => { if (campoNombre.classList.contains('is-invalid')) validarNombre(); });

campoEmail.addEventListener('change', validarEmail);
campoEmail.addEventListener('input', () => { if (campoEmail.classList.contains('is-invalid')) validarEmail(); });

checksIntereses.forEach((check) => check.addEventListener('change', validarIntereses));
campoAcepto.addEventListener('change', validarAcepto);

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault(); // evita el envío automático para validar primero
  exito.classList.add('d-none');

  // Se ejecutan todas (sin cortar en la primera) para mostrar todos los errores juntos
  const resultados = [validarNombre(), validarEmail(), validarIntereses(), validarAcepto()];

  if (resultados.includes(false)) {
    // Lleva el foco al primer campo con error
    const primerError = formulario.querySelector('.is-invalid');
    if (primerError) primerError.focus();
    return;
  }

  // Datos ya normalizados
  const nombre = normalizarNombre(campoNombre.value);
  const temas = [...checksIntereses].filter((c) => c.checked).map((c) => c.value);

  // El sitio es estático (GitHub Pages): no hay servidor que reciba los datos.
  // Acá se simula el envío mostrando una confirmación.
  exito.textContent = `¡Gracias, ${nombre}! Te suscribiste para recibir novedades sobre: ${temas.join(', ')}.`;
  exito.classList.remove('d-none');

  formulario.reset();
  formulario.querySelectorAll('.is-valid, .is-invalid').forEach((el) => el.classList.remove('is-valid', 'is-invalid'));
  document.getElementById('error-intereses').classList.remove('d-block');
});