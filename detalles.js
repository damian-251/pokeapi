'use strict'

let url = window.location.href;
let variable = "url-detalles="; 
let referencia = url.search(variable);
let swapi = url.slice(referencia + variable.length);


let loading = loadingAnimation();
let divContainer = document.getElementsByClassName("container-fluid")[0];
divContainer.appendChild(loading);

fetch(swapi)
.then(respuesta=>respuesta.json())
.then(respuestaJson=>{
    let header1 = document.getElementsByTagName("h1")[0];
    header1.innerText = respuestaJson.name + " - Detalles";
    document.title = "Detalles de " + respuestaJson.name;
    let imagen = document.createElement("img");
    imagen.setAttribute('src', respuestaJson.sprites.other["official-artwork"]["front_default"]);
    imagen.setAttribute('alt', respuestaJson.name + " artwork oficial");

    let divImg = document.getElementById("pk-image");
    divImg.appendChild(imagen);

    let divDatos = document.getElementById("pk-data");

    divDatos.children[0].innerText = "Número: " + respuestaJson.id;
    divDatos.children[1].setAttribute('class', 'text-capitalize');
    divDatos.children[1].innerText = "Nombre: " + respuestaJson.name;
    divDatos.children[2].innerText = "Altura: " + respuestaJson.height/10 + "m";
    divDatos.children[3].innerText = "Peso: " + respuestaJson.weight/10 + "kg";

    fetch(respuestaJson.abilities[0].ability.url) //Nos metemos en la url de la primera habilidad
    .then(response=>response.json())
    .then(jsonHabilidad=>{
        for (let habilidad of jsonHabilidad.names) {
            if(habilidad.language.name == "es") {
                divDatos.children[4].innerText = "Habilidad: " + habilidad.name;
            }
            //console.log(habilidad.language.name);
        }
    })
    return respuestaJson.species.url;
})
.then((urlDetails=>fetch(urlDetails)))
.then(respuesta=>respuesta.json())
.then(respuestaJsonDetails=>{
    let insertado = false;
    for (let dato of respuestaJsonDetails.flavor_text_entries) {
        if(dato.language.name=="es" && insertado == false) {
            let divDesc = document.getElementById("pk-desc");
            divDesc.innerText = dato.flavor_text;
            insertado = true;
        }
    }
    //Una vez se ha cargado todo ya quitamos la animación de loading
    loading.style.display = "none";
})
