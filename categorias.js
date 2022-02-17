'use strict'

function loadingAnimation(){
    let loading = document.createElement("img");
        loading.setAttribute('src', "./loading.gif");
        loading.setAttribute('alt', "Cargando...");
        loading.style.width = "2rem"; 
    return loading;
}

let loading = loadingAnimation();

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let nombreTipo = urlParams.get('nombre')
let swapi = urlParams.get('url-categoria');
let lista = document.getElementsByTagName("ul")[0];

let h1 = document.getElementsByTagName("h1")[0];
h1.innerText = "Pokémon de tipo " + nombreTipo;

document.body.appendChild(loading);

fetch(swapi)
.then(respuesta=>respuesta.json())
.then((respuestaJson)=>{
    console.log(respuestaJson.pokemon);
    document.title = "Tipo " + nombreTipo;
    loading.style.display = "none";
    for (let objeto of respuestaJson.pokemon) {
        console.log(objeto.pokemon.name);
        //console.log(objeto.pokemon.url);
        let elementoLista = document.createElement("li");
        elementoLista.setAttribute('class', 'list-group-item text-center');
        let anchor = document.createElement("a");
        anchor.setAttribute('href', 'detalles.html?url-detalles=' + objeto.pokemon.url);
        anchor.innerText = objeto.pokemon.name;
        elementoLista.appendChild(anchor);
        anchor.setAttribute('class', 'list-group-item list-group-item-action text-capitalize');
        lista.appendChild(elementoLista);
    }
})



