import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import FetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};
const fetchCountries = new FetchCountries();

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const userInput = event.target.value.trim();
  fetchCountries.countryName = userInput;
  clearMarkup();
  if (userInput === '') {
    return;
  }
  fetchCountries.fetchInfo().then(addMarkup);
}

function addMarkup(array) {
  if (array.length > 10) {
    Notify.success('Too many countries !');
  } else if (array.length <= 10 && array.length > 1) {
    refs.ul.innerHTML = array.map(addList).join('');
  } else if (array.length === 1) {
    refs.div.innerHTML = addCard(array[0]);
  } else {
    Notify.failure('No countries found !');
  }
}

function addList({ name, flags }) {
  return `
    <li>
        <img src="${flags.svg}" alt="flag of ${name.official}" width="100px">
        <p>${name.official}</p>
    </li>
    `;
}

function addCard({ name, capital, population, flags, language }) {
  return `
    <div class="name">
        <img src="${flags.svg}" alt="flag of ${name.official}" width="100px">
        <p>${name.official}</p>
    </div>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Language: ${language}</p>
  `;
}

function clearMarkup() {
  refs.ul.innerHTML = '';
  refs.div.innerHTML = '';
}
