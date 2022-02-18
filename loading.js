'use strict'

function loadingAnimation(){
    let loading = document.createElement("img");
        loading.setAttribute('src', "./loading.gif");
        loading.setAttribute('alt', "Cargando...");
        loading.style.width = "2rem"; 
    return loading;
}