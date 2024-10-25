// ==UserScript==
// @name         Paloma PML
// @namespace    http://tampermonkey.net/
// @version      2024-10-22
// @description  Cambiar anuncio
// @author       Paloma
// @match        https://www.abc.es/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=abc.es
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Selecciona el elemento por su clase
    const adContainer = document.querySelector('.voc-container-fw.voc-container--bg-color.voc-container--bdr-bottom');
    // Verifica si el elemento existe
    if (adContainer) {
        // Reemplaza el contenido HTML del elemento
        adContainer.innerHTML = `
            <div style="text-align: center; padding: 20px; background-color: #f9f9f9; border: 2px solid #ddd;">
                <h2>Contenido reemplazado</h2>
                <p>Este espacio publicitario ha sido reemplazado por un script de Paloma.</p>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
                <i class="fas fa-dove" style="font-size: 80px; margin-top: 2%;"></i>
            </div>
        `;
    }
})();