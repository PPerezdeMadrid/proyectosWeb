async function esperarImprimir() {
    console.log("Esperando información...");
    
    // Simular la espera de datos con una promesa
    const info = await new Promise((resolver) => {
        let contador = 0;
        const intervalo = setInterval(() => {
            console.log("Hola");
            contador++;
            // Simula recibir la información después de 5 "Hola"
            if (contador === 5) {
                clearInterval(intervalo); // Detener "Hola"
                resolver("¡Información recibida!");
            }
        }, 1000); //  cada segundo
    });

    console.log(info);
}


esperarImprimir();
