// Selectores
const formularioElement = document.querySelector('#formulario');
const resultadoioElement = document.querySelector('#resultado');

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
const buscarImagenes = (termino) => {
  const key = '43978898-eb71b43492de25e6f0b80dab6';
  const URLAPI = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=100`;

  fetch(URLAPI)
    .then(respuesta => respuesta.json())
    .then(resultado => {
      // mostrarImagenes(resultado.hits);
      console.log(resultado.hits);
    });
}


// Cargar Eventos
document.addEventListener('DOMContentLoaded', () => {
  formularioElement.addEventListener('submit', init);
});