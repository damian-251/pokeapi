'use strict'

function generarCategorias() {
    fetch('https://pokeapi.co/api/v2/type/')
    .then(respuesta=>respuesta.json())
    .then(respuesta=>respuesta.results)
    .then(listaTipos=>{   
        for (let elemento of listaTipos) {
            arrayTipos.push(elemento.url);
        }
        return arrayTipos;
    })
    .then(array=>Promise.all(array.map(urlCategoria=>fetch(urlCategoria))))
    .then(respuesta=>Promise.all(respuesta.map(dato=>dato.json())))
    .then(arrayJson=>{
        for (let elemento of arrayJson) {
            for (let idioma of elemento.names) {
                if(idioma.language.name == "es") {
                    arrayNombres.push(idioma.name);
                }
            }           
        }
    })
    .then(()=> {
        dibujarLista(arrayTipos, arrayNombres);
    })
    .then(()=> {
        loading.style.display = "none";
    })
}

function dibujarLista(arrayUrl, arrayNombres) {

    arrayNombres.forEach((element, index) => {
        let listaLi = document.createElement("li");
        listaLi.setAttribute('class', 'list-group-item text-center'); //Para Bootstrap
        let anchor = document.createElement("a");
        anchor.setAttribute('class', 'list-group-item list-group-item-action'); //Bootstrap
        anchor.setAttribute('href',  'categorias.html?nombre=' + element + '&url-categoria=' + arrayUrl[index]);
        anchor.innerText = element;
        listaLi.appendChild(anchor);
        lista.appendChild(listaLi);
    });

}


let lista = document.getElementsByTagName("ul")[0];
let loading = loadingAnimation();
let arrayTipos = new Array();
let arrayNombres = new Array();
lista.appendChild(loading);
generarCategorias();
