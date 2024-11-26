// Simular una operación asíncrona con una promesa
function obtenerDatos() {
    return new Promise((resolver, rechazar) => {
        setTimeout(() => {
            const exito = true; // Cambia a false para simular un error
            if (exito) {
                resolver("Datos cargados correctamente");
            } else {
                rechazar("Error al cargar los datos");
            }
        }, 1000); // Simular 1 segundo de retraso
    });
}

// Usar la promesa
obtenerDatos()
    .then((resultado) => {
        console.log(resultado); // Si se resuelve
    })
    .catch((error) => {
        console.error(error); // Si se rechaza
    });
