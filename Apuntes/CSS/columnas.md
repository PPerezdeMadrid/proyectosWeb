# Columnas en CSS

## HTML Base
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Equipo</title>
</head>
<body>
    <h1>Equipo de Trabajo</h1>
    <div>
        <p><strong>Miembro 1:</strong> Ana García - Líder de Proyecto</p>
        <p><strong>Miembro 2:</strong> Juan Pérez - Desarrollador</p>
        <p><strong>Miembro 3:</strong> María López - Diseñadora UX</p>
        <p><strong>Miembro 4:</strong> Carlos Sánchez - Analista de Datos</p>
    </div>
</body>
</html>
```

## Dividido en 3 columnas:
- `display: grid`: Utilizamos un contenedor de cuadrícula (grid) que organiza automáticamente los elementos dentro de él.
- `grid-template-columns: repeat(3, 1fr)`: Esto crea tres columnas de igual tamaño. Si añades más <p>, se colocarán en filas adicionales de forma automática.
- Espaciado uniforme (gap): Controlamos la separación entre los párrafos con `gap: 10px`.

```html
<style>
    .miembros{
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* Tres columnas de igual tamaño */
        gap: 10px; /* Espacio entre los elementos */
    }
    .miembros p{
        border: 1px solid black;
    }
    </style>
    <h1>Equipo de Trabajo</h1>
    <div class="miembros">
        <p><strong>Miembro 1:</strong> Ana García - Líder de Proyecto</p>
        <p><strong>Miembro 2:</strong> Juan Pérez - Desarrollador</p>
        <p><strong>Miembro 3:</strong> María López - Diseñadora UX</p>
        <p><strong>Miembro 4:</strong> Carlos Sánchez - Analista de Datos</p>
    </div>
```

## Display: **flex**
Se utiliza para alinear elementos en una `dirección principal` (horizontal o vertical), y es ideal cuando deseas crear diseños de una sola fila o columna, con control sobre la alineación y el espaciado. Es más adecuado para contenedores lineales o para diseños con alineaciones específicas.

```html
<style>
        .team-container {
            display: flex;
            flex-wrap: wrap; /* Permite que los elementos pasen a la siguiente línea si no hay espacio */
            gap: 10px; /* Espaciado entre los elementos */
        }
        .team-container p {
            flex: 1 1 calc(33.33% - 10px); /* Tres columnas adaptables */
            background-color: #f9f9f9;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box; /* mirar apuntes */
        }
    </style>
    <h1>Equipo de Trabajo</h1>
    <div class="team-container">
        <p>Miembro 1: Ana García - Líder de Proyecto</p>
        <p>Miembro 2: Juan Pérez - Desarrollador</p>
        <p>Miembro 3: María López - Diseñadora UX</p>
        <p>Miembro 4: Carlos Sánchez - Analista de Datos</p>
        <p>Miembro 5: Sofía Martínez - Marketing</p>
        <p>Miembro 6: Diego Torres - QA Engineer</p>
    </div>
```

- `flex-wrap: wrap`: Los elementos se ajustan a la siguiente fila si no caben en una sola.
- `flex: 1 1 calc(33.33% - 10px)`: Cada párrafo ocupa un tercio del ancho del contenedor menos el espacio del gap. Es flexible.
- Diseño adaptable: Si añades más párrafos, se organizarán automáticamente en filas adicionales.





## Extra: box-sizing & wrap de palabras
### **`box-sizing`**: ¿Qué es?

La propiedad CSS `box-sizing` determina cómo se calculan el ancho y alto de un elemento, teniendo en cuenta su contenido, relleno (`padding`) y bordes (`border`). Esto afecta directamente al tamaño que ocupa un elemento en la página.

---

### **Posibles valores de `box-sizing`**

1. **`content-box`** (valor por defecto):
   - **¿Cómo calcula el tamaño?** 
     El ancho y alto especificados solo incluyen el contenido del elemento. El `padding` y el `border` se suman al tamaño, aumentando las dimensiones totales del elemento.
   - **Ejemplo visual:**
     Si defines un ancho de `100px` y un borde de `10px`, el tamaño total del elemento será:
     ```
     100px (contenido) + 10px (izquierda) + 10px (derecha) = 120px
     ```
   - **Cuándo usarlo:** Ideal si necesitas que el tamaño del contenido sea exactamente el que defines, pero no te importa el tamaño total.

2. **`border-box`**:
   - **¿Cómo calcula el tamaño?**
     El ancho y alto especificados incluyen el contenido, el `padding` y el `border`. Es decir, el tamaño total del elemento permanece constante, y el contenido se ajusta automáticamente si hay `padding` o `border`.
   - **Ejemplo visual:**
     Si defines un ancho de `100px` y un borde de `10px`, el tamaño total del elemento seguirá siendo `100px`, pero el contenido ocupará menos espacio:
     ```
     100px (total) - 10px (izquierda) - 10px (derecha) = 80px (contenido)
     ```
   - **Cuándo usarlo:** Comúnmente usado en diseño moderno porque facilita el control del tamaño total del elemento.

3. **`inherit`**:
   - **¿Cómo calcula el tamaño?**
     Hereda el valor de `box-sizing` del elemento padre.
   - **Cuándo usarlo:** Útil para mantener consistencia en elementos anidados.

---

### **Diferencias clave entre `content-box` y `border-box`**

| Aspecto               | `content-box`                   | `border-box`                 |
|-----------------------|----------------------------------|------------------------------|
| **Dimensiones totales** | **Tamaño total = contenido + padding + borde.** | **Tamaño total = tamaño definido.** |
| **Control del diseño**  | Más difícil calcular dimensiones finales. | Más fácil manejar tamaños totales. |
| **Uso típico**          | Formas sencillas con poco o ningún padding/borde. | Diseño de interfaces y layouts modernos. |

---

### Control de comportamiento del texto en CSS:

1. **Cortar texto:**  
   ```css
   overflow: hidden;
   ```

2. **Extender texto hacia abajo:**  
   ```css
   overflow: visible; /* Valor por defecto */
   ```

3. **Añadir scroll:**  
   ```css
   overflow: scroll; /* Barras siempre visibles */
   overflow: auto;   /* Barras solo si es necesario */
   ```

4. **Cortar con puntos suspensivos:**  
   ```css
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   ```