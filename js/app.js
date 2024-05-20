// Selectores
const formularioElement = document.querySelector('#formulario');
const resultadoioElement = document.querySelector('#resultado');

// Inicializar la aplicación
const init = (e) => {
  e.preventDefault();

  const terminoDeBusqueda = document.querySelector('#termino').value.trim();

  if (terminoDeBusqueda === '') {
    console.log('No hay nada que buscar');
    return;
  };

  console.log("Buscando: ", terminoDeBusqueda);
};

// Cargar Eventos
document.addEventListener('DOMContentLoaded', () => {
  formularioElement.addEventListener('submit', init);
});