const dropdown = document.getElementById('dropdown-select');
const closeIcon = document.querySelector('.main__dropdown-close');
const searchInput = document.getElementById('search-input');
const searchCloseIcon = document.querySelector('.main__search-close');
const themeToggle = document.querySelector('.header__mode');


async function getCountry() {
try {
const response = await fetch("https://restcountries.com/v3.1/all");
if (!response.ok) throw new Error('Network response was not ok');

const allCountries = await response.json();

displayCountries(allCountries);

dropdown.addEventListener('change', function handleRegionChange() {
const selectedRegion = dropdown.value;
displayCountries(allCountries, selectedRegion);
closeIcon.style.visibility = 'visible';
});


closeIcon.addEventListener('click', function resetSelection() {
dropdown.selectedIndex = 0; 
closeIcon.style.visibility = 'hidden';
displayCountries(allCountries);
});

searchInput.addEventListener('input', function handleSearch() {
const searchTerm = searchInput.value;
const filteredCountries = allCountries.filter(country =>
country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
);

searchCloseIcon.style.visibility = searchTerm ? 'visible' : 'hidden';
displayCountries(filteredCountries);
});

searchCloseIcon.addEventListener('click', function resetSearch() {
searchInput.value = '';
searchCloseIcon.style.visibility = 'hidden';
displayCountries(allCountries);
});

themeToggle.addEventListener('click', function toggleTheme() {
const isDarkTheme = document.body.classList.toggle('dark-theme');
updateTheme(isDarkTheme);
const moonEmpty = document.querySelector('.theme__moon-empty');
const moonFill = document.querySelector('.theme__moon-fill');

moonEmpty.style.visibility = isDarkTheme ? 'hidden' : 'visible';
moonFill.style.visibility = isDarkTheme ? 'visible' : 'hidden';
});

} catch (error) {
console.error('Error fetching', error);
  }
}


function displayCountries(data, region = '') {
const container = document.querySelector('.main__cards');
container.innerHTML = '';

const filteredData = region ? data.filter(country => country.region === region) : data;

filteredData.sort((a, b) => a.name.common.localeCompare(b.name.common));

const cards = filteredData.map(createCountryCard).join('');
container.innerHTML = cards;
updateTheme(document.body.classList.contains('dark-theme'));
}


function createCountryCard(elem) {
const capital = elem.capital ? elem.capital[0] : 'N/A';
return `
<div class="card">
<img class="img" src="${elem.flags.svg}">
<div class="card-info">
<h3 class="country-name">${elem.name.common}</h3>
<p class="population"><b>Population:</b> ${elem.population}</p>
<p class="region"><b>Region:</b> ${elem.region}</p>
<p class="capital"><b>Capital:</b> ${capital}</p>
</div>
</div>`;
}


function updateTheme(isDarkTheme) {
const cards = document.querySelectorAll('.card');
const inputs = document.querySelectorAll('input, select');
const body = document.body; 


body.style.backgroundColor = isDarkTheme ? '#222' : '#f5f5f5';
cards.forEach(card => {
card.style.backgroundColor = isDarkTheme ? '#555' : '#fff';
card.style.borderColor = isDarkTheme ? '#777' : '#000'; 
card.querySelector('.card-info').style.color = isDarkTheme ? '#fff' : '#000';
});
inputs.forEach(input => {
input.style.backgroundColor = isDarkTheme ? '#333' : '#fff';
input.style.color = isDarkTheme ? '#fff' : '#000';
input.style.border = 'none';
});
}

getCountry();