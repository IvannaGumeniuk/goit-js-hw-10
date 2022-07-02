import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = {
  inputCountry: document.querySelector('#search-box'),
  countryContainer: document.querySelector(".country-info"),
  countryList: document.querySelector(".country-list"),
}

refs.inputCountry.addEventListener('input', debounce(OnInput, DEBOUNCE_DELAY));

function OnInput(event) {
  const inputValue = event.target.value.trim();
  if (!inputValue) {
    clearInterface();
    return;
  }

  fetchCountries(inputValue)
    .then(countries => {
      if (countries.length > 10) {
        clearInterface();
        return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
      } else if (countries.length < 10 && countries.length > 1) {
        return renderListCountry(countries);
      } else {
        countryCardsMarkup(countries);
      }
    })
    .catch(onFetchError);
  
  if (inputValue === "russia") {
    return Notiflix.Notify.warning('russian warship, fuck you!!!');
  }
}

function renderListCountry(countries) {
  const countryInfo = countries
    .map(({ name, flags }) => {
      return `
      <li class="country-list__item">
        <img src="${flags.svg}" alt="${name.official}" width="25px"> <span>${name.official}</span>
      </li>
      `;
    })
    .join('');
  refs.countryContainer.innerHTML = '';
  refs.countryList.innerHTML = countryInfo;
}

function countryCardsMarkup(countries) {
  const markup = countries
    .map(({ name, capital, population, languages, flags }) => {
      const languagesList = Object.values(languages);
      return `
<div class="country-cards-tamplate">

<div class="card-img-top">
  <img src="${flags.svg}" class="country-img" alt="${name.official}" width="25px" 
  <span class="card-title"><b>${ name.official.toUpperCase() }</b></span>
</div>

<div class="card-body">

  <p class="card-text"><b>Столиця:</b> ${capital}</p>
  <p class="card-text"><b>Населення:</b> ${population}</p>
  <p class="card-text"><b>Масив мов:</b> ${languagesList}</p>

</div>
</div>
    `
    }).join('');
  refs.countryList.innerHTML = '';
  refs.countryContainer.innerHTML = markup;
}

function clearInterface() {
    refs.countryList.innerHTML = '';
    refs.countryContainer.innerHTML = '';
}

function onFetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
  clearInterface();
}