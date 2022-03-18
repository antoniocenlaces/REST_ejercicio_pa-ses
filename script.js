// const h1 = document.querySelector("h1");
// console.log(h1, `prueba`);
// setTimeout(function () {
//   h1.textContent = "Hola Mundo";
// }, 5000);

// alert("Texto modificado");
// h1.style.color = "red";
// h1.style.backgroundColor = "yellow";

// https://restcountries.com/v3.1/alpha/esp

const countryContainer = document.querySelector(".countries");

const getCountryNeighbour = (code) => {
  const request = new XMLHttpRequest();
  const requestType = "GET";
  const url = `https://restcountries.com/v3.1/alpha/${code}`;
  request.open(requestType, url);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    renderData(data, "neighbour");
  });
};

const renderData = (data, optionalClass = "") => {
  const {
    name,
    region,
    population: poblacion,
    languages,
    currencies,
    flag: bandera,
  } = data;
  console.log(name);
  //const [, , nombre] = altSpellings;
  //console.log(nombre);
  const [nombreIngles] = Object.values(name);
  const { common: nombreOriginal } = Object.values(Object.values(name)[1])[0];
  console.log(nombreIngles);
  console.log(nombreOriginal);
  console.log(region);
  console.log(poblacion);
  const [idioma] = Object.values(languages);
  console.log(idioma);
  const { name: moneda, symbol: simbolo } = Object.values(currencies)[0];
  console.log(moneda);
  console.log(simbolo);
  console.log(bandera);

  // hecho en clase
  const country = data.name.common;
  //const {name: {common: country}}} = data;
  const flag = data.flags.svg;
  const { region: region1, population } = data;
  const [language] = Object.values(languages);
  const [currency] = Object.values(data.currencies);
  console.log(`Language: ${language}`);
  console.log(`currency: ${currency.name}`);
  const html = `<article class="country ${optionalClass}">
          <img class="country__img" src="${flag}" />
          <div class="country__data">
            <h3 class="country__name">${country}</h3>
            <h4 class="country__region">${region1}</h4>
            <p class="country__row">${population}</p>
            <p class="country__row">${language}</p>
            <p class="country__row">${currency.name}</p>
          </div>
        </article>`;
  console.log(countryContainer);
  countryContainer.innerHTML += html;
};
const getCountryData = (country) => {
  const request = new XMLHttpRequest();
  const requestType = "GET";
  const url = `https://restcountries.com/v3.1/name/${country}`;
  request.open(requestType, url);
  request.send();

  request.addEventListener("load", function () {
    // const data = JSON.parse(this.responseText)[0]; [0] proque inicialmente recibía un array con todos los países que tienen una moneda
    const [data] = JSON.parse(this.responseText);
    renderData(data);
    for (const neighbour of data.borders) {
      getCountryNeighbour(neighbour);
    }
  });
};
getCountryData("luxembourg");
// getCountryData("brazil");
// getCountryData("switzerland");
// const request = new XMLHttpRequest();
// const requestType = "GET";
// const url = "https://restcountries.com/v3.1/name/spain";
// request.open(requestType, url);
// request.send();

// request.addEventListener("load", function () {
//   // const data = JSON.parse(this.responseText)[0];
//   const [data] = JSON.parse(this.responseText)[0];
//   console.log(data);
// });

// Tarea 1
// Obtener de data el nombre del país, región, población
// idioma, moneda y bandera. Mostrar por cónsola

// Tarea 2
// insertar los datos del html
