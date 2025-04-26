const formElement = document.querySelector('#formulario');
const resultElement = document.querySelector('#resultado');
const paginationElement = document.querySelector('#paginacion');
const inputElement = document.querySelector('#termino');
const STEP = 20;
let totalPages;
let currentPage = 1;

const startApp = async (event) => {
  event.preventDefault();

  if (inputElement.value.trim() === '') {
    showAlert('Agrega un término de búsqueda');
    return;
  };

  currentPage = 1;

  searchImages();
};

const showAlert = (message) => {
  const alert = document.querySelector('.alerta-error');

  if (!alert) {
    const alert = document.createElement('p');
    alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'alerta-error');

    alert.innerHTML = `
      <strong class="font-bold">Error!</strong>
      <span class="block">${message}</span>
    `;

    formElement.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 3000);
  };
};

const searchImages = async () => {
  const key = '43978898-eb71b43492de25e6f0b80dab6';
  const URL = `https://pixabay.com/api/?key=${key}&q=${inputElement.value.trim()}&per_page=${STEP}&page=${currentPage}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    totalPages = calculePages(data.totalHits);
    showImages(data.hits);
  } catch (error) {
    console.log(error, "Error en la busqueda de imagenes");
  };
};

const showImages = (imagenes) => {
  cleanHtml();

  imagenes.forEach(imagen => {
    const { previewURL, likes, views, largeImageURL } = imagen;

    resultElement.innerHTML += `
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

  showPagination();
};

const cleanHtml = () => {
  while (resultElement.firstChild) {
    resultElement.removeChild(resultElement.firstChild);
  };
};

const calculePages = (total) => parseInt(Math.ceil(total / STEP));

const showPagination = () => {
  while (paginationElement.firstChild) {
    paginationElement.removeChild(paginationElement.firstChild);
  };

  for (let i = 1; i <= totalPages; i++) {
    const buttomPagination = document.createElement('a');
    buttomPagination.href = '#';
    buttomPagination.dataset.pagina = i;
    buttomPagination.textContent = i;
    buttomPagination.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'rounded', 'hover:bg-yellow-500', 'hover:text-white');

    buttomPagination.onclick = () => {
      currentPage = i;
      searchImages();
    };

    paginationElement.appendChild(buttomPagination);
  };
};

document.addEventListener('DOMContentLoaded', () => {
  formElement.addEventListener('submit', startApp);
});