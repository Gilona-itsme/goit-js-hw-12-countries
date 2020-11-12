import '../styles.scss';
import countryCardTpl from '../templates/countries-card.hbs';
import countryListTpl from '../templates/countries-list.hbs';
import API from './api-service';
import getRefs from "./get-refs";
import "@pnotify/core/dist/PNotify.css";
import '@pnotify/core/dist/BrightTheme.css';


const refs = getRefs();
const debounce = require('lodash.debounce');
const  {error}  = require('@pnotify/core');
//renderCountryCard();

refs.searchInput.addEventListener('input', debounce(onSearch, 1000));


 function onSearch(e) {
  e.preventDefault();
  const inputValue = e.target.value;
    
console.log(inputValue);
  API.fetchCountryByName(inputValue).then(data => {
   if (data) {
     if (data.length > 10) {
       error({
         text: 'Too many mathces found. Please enter a more specific query!',
         type: "info"
       });
     } else if (data.length < 2) {
       renderCountryCard(data[0]);
     } else if (data.length >= 2 && data.length <= 10) {
       renderCountryList(data);
     }
     
    }
    
 });
//     .catch(onFetchError)
//     .finally(() => inputValue.reset);
 }



 
function renderCountryCard(country) {
  const markUp = countryCardTpl(country);
  refs.cardContainer.innerHTML = markUp;
}

function renderCountryList(countries) {
  const listUp = countryListTpl(countries);
  refs.cardContainer.innerHTML = listUp;
}

function clear() {
  refs.cardContainer.innerHTML = "";
  
}
// function onFetchError(error) {
//   alert('404');
// }

export default { onSearch };

