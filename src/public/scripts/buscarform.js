
const buscar = document.getElementById('buscar');
const textoBuscar = document.getElementById('textoBuscar');

function asignarURL() {
    const textoBuscarr = textoBuscar.value;
    buscar.href = '/busqueda/' + textoBuscarr;
    showLoader();
}

buscar.addEventListener('click', asignarURL);

textoBuscar.addEventListener("keydown", function(event) {

    if (event.keyCode == 13) {
        buscar.click();
    }
});


