// Validación del formulario de newsletter con JavaScript vainilla y expresiones regulares.

const formulario = document.getElementById('form-newsletter');
const exito = document.getElementById('exito');

const campoNombre = document.getElementById('nombre');
const campoEmail = document.getElementById('email');
const checksIntereses = document.querySelectorAll('input[name="intereses"]');
const campoAcepto = document.getElementById('acepto');

// ---------- Expresiones regulares ----------
const regexNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]{2,50}$/;
const regexEmail = /^[\w.+-]+@[\w-]+(\.[\w-]+)+$/;

// ---------- Normalizar ----------
function normalizarNombre(texto) {
  return texto.trim().replace(/\s+/g, ' ');
}
function normalizarEmail(texto) {
  return texto.trim().toLowerCase();
}

// ---------- Mostrar u ocultar errores ----------
function marcarCampo(campo, error, idError) {
  document.getElementById(idError).innerText = error;
  if (error !== '') {
    campo.classList.add('invalido');
    campo.classList.remove('valido');
    return false;
  } else {
    campo.classList.add('valido');
    campo.classList.remove('invalido');
    return true;
  }
}

// ---------- Validaciones ----------
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
  let algunoElegido = false;
  checksIntereses.forEach(function (check) {
    if (check.checked) {
      algunoElegido = true;
    }
  });

  const contenedor = document.getElementById('error-intereses');
  if (algunoElegido) {
    contenedor.innerText = '';
    contenedor.classList.remove('visible');
  } else {
    contenedor.innerText = 'Elegí al menos un tema para recibir novedades.';
    contenedor.classList.add('visible');
  }

  checksIntereses.forEach(function (check) {
    if (algunoElegido) check.classList.remove('invalido');
    else check.classList.add('invalido');
  });
  return algunoElegido;
}

function validarAcepto() {
  const errorAcepto = document.getElementById('error-acepto');
  if (campoAcepto.checked) {
    errorAcepto.innerText = '';
    campoAcepto.classList.remove('invalido');
    return true;
  } else {
    errorAcepto.innerText = 'Tenés que aceptar para poder suscribirte.';
    campoAcepto.classList.add('invalido');
    return false;
  }
}

// ---------- Eventos ----------
campoNombre.addEventListener('change', validarNombre);
campoNombre.addEventListener('input', function () {
  if (campoNombre.classList.contains('invalido')) validarNombre();
});

campoEmail.addEventListener('change', validarEmail);
campoEmail.addEventListener('input', function () {
  if (campoEmail.classList.contains('invalido')) validarEmail();
});

checksIntereses.forEach(function (check) {
  check.addEventListener('change', validarIntereses);
});
campoAcepto.addEventListener('change', validarAcepto);

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();
  exito.classList.add('oculto');

  let hayErrores = false;
  if (!validarNombre()) hayErrores = true;
  if (!validarEmail()) hayErrores = true;
  if (!validarIntereses()) hayErrores = true;
  if (!validarAcepto()) hayErrores = true;

  if (hayErrores) return;

  const nombre = normalizarNombre(campoNombre.value);
  const temas = [];
  checksIntereses.forEach(function (check) {
    if (check.checked) temas.push(check.value);
  });

  // El sitio es estático: no hay servidor, se simula el envío con una confirmación.
  exito.innerText = '¡Gracias, ' + nombre + '! Te suscribiste para recibir novedades sobre: ' + temas.join(', ') + '.';
  exito.classList.remove('oculto');

  formulario.reset();
  formulario.querySelectorAll('.valido, .invalido').forEach(function (el) {
    el.classList.remove('valido', 'invalido');
  });
  document.getElementById('error-intereses').classList.remove('visible');
});