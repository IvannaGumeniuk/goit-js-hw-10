import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('#search-box');
const countruContainer = document.querySelector(".country-info");
inputCountry.addEventListener('input', event => {
    event.preventDefault();

   fetchCountries(event.target.value).then(country => {
        countruContainer.innerHTML = countryCardsMarkup(country);
        console.log(countryCardsMarkup(country));
        // countryCardsMarkup(country);
    });
    
});


function countryCardsMarkup({name, flags, capital, population, languages }) {
    return `
            <div class="country-cards-tamplate">
<div class="card-img-top">
  <img src="${flags}" alt="${name}">
</div>

<div class="card-body">
  <h2 class="card-title">Повна назва країни: ${name}</h2>
  <p class="card-text">Столиця: ${capital}</p>
  <p class="card-text">Населення: ${population}</p>
  
  <p class="card-text">Масив мов:</p>
  
  <ul>
  {{#each languages}}
<li class="languages-list">${{languages}}</li>
    {{#each}}
  </ul>

</div>
</div>
    `
};
    
