const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://rickandmortyapi.com/api/character/";
var next_fetch;
var prev_fetch;

const getData = api => {
  let URL;
  if (next_fetch) {
    // 2.2 valida que exista un valor en 'next_fetch' o regresa el primer llamado de la API.
    URL = localStorage.getItem("next_fetch"); // 2.1 Obten los datos almacenados en localStorage
  } else {
    URL = API;
  }
  fetch(URL)
    .then(response => response.json())
    .then(response => {
      next_fetch = response.info.next;
      prev_fetch = response.info.prev;
      localStorage.setItem("next_fetch", next_fetch); // 1.1 y 1.2 Guarda en localStorage la URL

      const characters = response.results;
      let output = characters
        .map(character => {
          return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
        </article>
    `;
        })
        .join("");
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
};

const loadData = async function() {
  // 2.3 Actualiza la función loadData() a Async/Await.
  await getData(API);
};

function noMoreDataToLoadAction() {
  // 4.1 Implementar mensaje: "Ya no hay personajes...".
  const newItem = document.createElement("section");
  newItem.classList.add("Items");
  newItem.innerHTML = "<h1>Ya no hay personajes...</h1>";
  $app.appendChild(newItem);
  // 4.2 Deja de observar el elemento "observe"
  intersectionObserver.unobserve($observe);
}

const intersectionObserver = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      if (prev_fetch && next_fetch === "") {
        noMoreDataToLoadAction();
      } else {
        loadData();
      }
    }
  },
  {
    rootMargin: "0px 0px 100% 0px"
  }
);

intersectionObserver.observe($observe);

/* 
OTRAS APIs PROBADAS
// const API = 'https://rickandmortyapi.com/api/character/';
// const API2 = "https://randomuser.me/api/?results=20";
// const API3 = "https://uinames.com/api/?ext&amount=20";
// const API = "https://us-central1-escuelajs-api.cloudfunctions.net/characters";
// const URLend = "https://us-central1-escuelajs-api.cloudfunctions.net/characters3";


Para API 2
          // <img src="${character.image}" />
          // <h2>${character.name}<span>${character.species}</span></h2>
para API3

      const characters = response;
      let output = characters
        .map(character => {
          return `
      <article class="Card">
        <img src="${character.photo}" />
        <h2>${character.name} ${character.surname}<span>${character.region}</span></h2>
*/

/*
DOCS
https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/unobserve
*/
