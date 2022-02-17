'use strict'

function loadingAnimation(){
    let loading = document.createElement("img");
        loading.setAttribute('src', "./loading.gif");
        loading.setAttribute('alt', "Cargando...");
        loading.style.width = "2rem"; 
    return loading;
}

let url = window.location.href;
let variable = "url-detalles="; 
let referencia = url.search(variable);
let swapi = url.slice(referencia + variable.length);
let tbody = document.getElementsByTagName("tbody")[0];
let row = document.createElement("tr");


let loading = loadingAnimation();
tbody.appendChild(loading);

//Creamos un array con las columnas de cada fila de la tabla
let arrayTd = [];

for (let index = 0; index < 6; index++) {
    arrayTd[index] = document.createElement("td");
}


fetch(swapi)
.then(respuesta=>respuesta.json())
.then(respuestaJson=>{
    let header1 = document.getElementsByTagName("h1")[0];
    header1.innerText = respuestaJson.name + " - Detalles";
    document.title = "Detalles de " + respuestaJson.name;
    //Número del Pokémon
    arrayTd[0].innerText = respuestaJson.id;
    //Imagen del Pokémon
    let imagen = document.createElement("img");
    imagen.setAttribute('src', respuestaJson.sprites.other["official-artwork"]["front_default"]);
    imagen.setAttribute('alt', respuestaJson.name + " artwork oficial");
    arrayTd[1].appendChild(imagen);
    //Nombre del Pokémon
    arrayTd[2].innerText = respuestaJson.name;
    arrayTd[2].setAttribute('class', 'text-capitalize');
    //Altura del Pokémon
    arrayTd[3].innerText = respuestaJson.height/10 + "m";
    //Peso del Pokémon
    arrayTd[4].innerText = respuestaJson.weight/10 + "kg";
    console.log(arrayTd);
    return respuestaJson.species.url;
})
.then((urlDetails=>fetch(urlDetails)))
.then(respuesta=>respuesta.json())
.then(respuestaJsonDetails=>{
    let insertado = false;
    for (let dato of respuestaJsonDetails.flavor_text_entries) {
        if(dato.language.name=="es" && insertado == false) {
            //Introducimos la primera descripción del Pokémon que está en castellano
            arrayTd[5].innerText = dato.flavor_text;
            insertado = true;
        }
    }
})
.then(()=> {
    //Una vez hemos conseguido todos los datos lo mostramos en le documento
    for (let elementoTd of arrayTd) {
        row.appendChild(elementoTd);
    }
    //Antes de adjuntar la fila quitamos la animación de cargando
    loading.style.display = "none";
    tbody.appendChild(row);
})