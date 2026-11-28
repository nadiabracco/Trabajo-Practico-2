
// js/contacto.js — validación del formulario de contacto
 
const form = document.getElementById("form-contacto");
 
const COLOR_NORMAL = "#d9c2ff";
const COLOR_ERROR = "#c0152f";
 
// Muestra el mensaje de error de un campo (y pinta el borde si el campo tiene)
function mostrarError(idError, texto, campo) {
  const error = document.getElementById(idError);
  error.textContent = texto;
  error.style.display = "block";
  if (campo) {
    campo.style.borderColor = COLOR_ERROR;
  }
}
 
// Oculta el mensaje de error y deja el borde como estaba
function limpiarError(idError, campo) {
  const error = document.getElementById(idError);
  error.textContent = "";
  error.style.display = "none";
  if (campo) {
    campo.style.borderColor = COLOR_NORMAL;
  }
}
 
// Cada función devuelve true si el campo está bien y false si hay error
 
function validarNombre() {
  const campo = document.getElementById("nombre");
  const valor = campo.value.trim();
 
  if (valor.length < 2) {
    mostrarError("error-nombre", "Ingresá un nombre o alias de al menos 2 caracteres.", campo);
    return false;
  }
  limpiarError("error-nombre", campo);
  return true;
}
 
function validarEmail() {
  const campo = document.getElementById("email");
  const valor = campo.value.trim();
 
  if (valor === "") {
    mostrarError("error-email", "Ingresá tu correo electrónico.", campo);
    return false;
  }
 
  // Revisa que haya algo antes del @, y un punto después del @ que no sea el último caracter
  const posicionArroba = valor.indexOf("@");
  const posicionPunto = valor.lastIndexOf(".");
 
  if (posicionArroba < 1 || posicionPunto < posicionArroba + 2 || posicionPunto === valor.length - 1) {
    mostrarError("error-email", "El correo no es válido. Ejemplo: nombre@dominio.com", campo);
    return false;
  }
  limpiarError("error-email", campo);
  return true;
}
 
function validarTema() {
  const campo = document.getElementById("tema");
 
  if (campo.value === "") {
    mostrarError("error-tema", "Elegí sobre qué querés escribir.", campo);
    return false;
  }
  limpiarError("error-tema", campo);
  return true;
}
 
function validarSeccion() {
  const opciones = document.getElementsByName("seccion");
  let hayUnaElegida = false;
 
  for (let i = 0; i < opciones.length; i++) {
    if (opciones[i].checked) {
      hayUnaElegida = true;
    }
  }
 
  if (!hayUnaElegida) {
    mostrarError("error-seccion", "Elegí la sección que más exploraste.", null);
    return false;
  }
  limpiarError("error-seccion", null);
  return true;
}
 
function validarMensaje() {
  const campo = document.getElementById("mensaje");
  const valor = campo.value.trim();
 
  if (valor.length < 10) {
    mostrarError("error-mensaje", "El mensaje debe tener al menos 10 caracteres.", campo);
    return false;
  }
  limpiarError("error-mensaje", campo);
  return true;
}
 
function validarAcepto() {
  const campo = document.getElementById("acepto");
 
  if (!campo.checked) {
    mostrarError("error-acepto", "Tenés que aceptar para poder enviar el mensaje.", null);
    return false;
  }
  limpiarError("error-acepto", null);
  return true;
}
 
// Al enviar: se validan todos los campos juntos para mostrar todos los errores a la vez
form.addEventListener("submit", function (evento) {
  evento.preventDefault();
 
  const exito = document.getElementById("mensaje-exito");
  exito.style.display = "none";
 
  const nombreOk = validarNombre();
  const emailOk = validarEmail();
  const temaOk = validarTema();
  const seccionOk = validarSeccion();
  const mensajeOk = validarMensaje();
  const aceptoOk = validarAcepto();
 
  if (nombreOk && emailOk && temaOk && seccionOk && mensajeOk && aceptoOk) {
    // Acá iría el envío real. Para el TP se simula:
    exito.style.display = "block";
    form.reset();
  }
});
 