// Selectores
const formularioElement = document.querySelector('#formulario');
const resultadoioElement = document.querySelector('#resultado');
const paginacionlement = document.querySelector('#paginacion');
const REGISTRO_POR_PAGINA = 50;
let totaldePaginas;
let paginaActual = 1;

// Inicializar la aplicación
const init = (e) => {
  e.preventDefault();

  const terminoDeBusqueda = document.querySelector('#termino').value.trim();

  if (terminoDeBusqueda === '') {
    mostrarAlerta('Agrega un término de búsqueda');
    return;
  };

  buscarImagenes(terminoDeBusqueda);
};


// Muestra el mensaje de alerta
const mostrarAlerta = (mensaje) => {
  const alerta = document.querySelector('.alerta-error');

  if (!alerta) {
    const alerta = document.createElement('p');
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'alerta-error');

    alerta.innerHTML = `
      <strong class="font-bold">Error!</strong>
      <span class="block">${mensaje}</span>
    `;

    formularioElement.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  };
};


// Buscar imágenes
const buscarImagenes = () => {
  const terminoDeBusqueda = document.querySelector('#termino').value.trim();

  const key = '43978898-eb71b43492de25e6f0b80dab6';
  const URLAPI = `https://pixabay.com/api/?key=${key}&q=${terminoDeBusqueda}&per_page=${REGISTRO_POR_PAGINA}&page=${paginaActual}`;

  fetch(URLAPI)
    .then(respuesta => respuesta.json())
    .then(resultado => {
      totaldePaginas = calcularPaginas(resultado.totalHits);
      mostrarImagenes(resultado.hits);
    });
}


// Muestra las imagenes
const mostrarImagenes = (imagenes) => {
  // Eliminar las imágenes previas
  while (resultadoioElement.firstChild) {
    resultadoioElement.removeChild(resultadoioElement.firstChild);
  }

  imagenes.forEach(imagen => {
    const { previewURL, likes, views, largeImageURL } = imagen;

    resultadoioElement.innerHTML += `
      <div class="w-full md:w-1/3 lg:w-1/4 p-3 mb-4">
        <div class="bg-white">
          <img class="w-full imagen" src="${previewURL}" alt="Imagen de Pixabay">
          <div class="p-4">
            <p class="font-bold"> ${likes} <span class="font-light">Me gusta</span></p>
            <p class="font-bold"> ${views} <span class="font-light">Vistas</span></p>
            <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase text-center rounded mt-5 p-1" href="${largeImageURL}" target="_blank" rel="noopener noreferrer">Ver Imagen</a>
          </div>
        </div>
      </div>
    `;
  });

  imprimirPaginador();
};


// Calcular el total de páginas
const calcularPaginas = (total) => parseInt(Math.ceil(total / REGISTRO_POR_PAGINA));


// Generar el paginador
function* crearPaginador(total) {
  for (let i = 1; i <= total; i++) {
    yield i;
  }
}


// Muestra la paginación
const imprimirPaginador = () => {
  while (paginacionlement.firstChild) {
    paginacionlement.removeChild(paginacionlement.firstChild);
  }

  const iterador = crearPaginador(totaldePaginas);

  for (let i = 1; i <= totaldePaginas; i++) {
    const { value } = iterador.next();

    const boton = document.createElement('a');
    boton.href = '#';
    boton.dataset.pagina = value;
    boton.textContent = value;
    boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'rounded', 'hover:bg-yellow-500', 'hover:text-white');

    boton.onclick = () => {
      paginaActual = value;

      buscarImagenes();
    }

    paginacionlement.appendChild(boton);
  }
};


// Cargar Eventos
document.addEventListener('DOMContentLoaded', () => {
  formularioElement.addEventListener('submit', init);
});