const buscar = document.getElementById('buscar');
const textoBuscar = document.getElementById('textoBuscar');
const formBuscar = document.getElementById('formBuscar');


function asignarURL() {
    const textoBuscarr = textoBuscar.value;
    if(!textoBuscarr){
        formBuscar.classList.remove("formBuscar")
        formBuscar.classList.add("faltanDatos")
        textoBuscar.placeholder = 'Ingresa un texto'
        setTimeout(() => {
            formBuscar.classList.remove("faltanDatos")
            formBuscar.classList.add("formBuscar")
            textoBuscar.placeholder = 'Buscar'
        }, 2000);
    }else{
      buscar.href = '/busqueda/' + textoBuscarr;
    }

}

buscar.addEventListener('click', asignarURL);

textoBuscar.addEventListener("keydown", function(event) {

    if (event.keyCode == 13) {
        buscar.click();
    }
});