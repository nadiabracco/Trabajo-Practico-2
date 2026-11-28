
// SELECCIONAR ELEMENTOS

let botones = document.querySelectorAll(".av-boton");
let piezas = document.querySelectorAll(".av-item");
let mensajeVacio = document.getElementById("av-vacio");


// FILTROS DE LA GALERIA

for (let i = 0; i < botones.length; i++) {

    botones[i].addEventListener("click", function() {

        // Quitar la clase activo de todos los botones

        for (let j = 0; j < botones.length; j++) {
            botones[j].classList.remove("activo");
        }

        // Activar el boton seleccionado

        this.classList.add("activo");

        // Obtener la categoria seleccionada

        let categoria = this.getAttribute("data-filtro");

        let cantidadVisible = 0;

        // Recorrer todas las piezas

        for (let k = 0; k < piezas.length; k++) {

            let tipo = piezas[k].getAttribute("data-categoria");

            // Mostrar todas o solamente la categoria elegida

            if (categoria == "todos" || categoria == tipo) {

                piezas[k].style.display = "block";
                cantidadVisible++;

            } else {

                piezas[k].style.display = "none";

            }

        }

        // Comprobar si hay resultados

        if (cantidadVisible == 0) {

            mensajeVacio.hidden = false;

        } else {

            mensajeVacio.hidden = true;

        }

    });

}


// ACTIVAR VENObOX

let visor = new VenoBox({

    selector: ".venobox",

    numeration: true,

    infinigall: true,

    share: false,

    spinner: "circle"

});
