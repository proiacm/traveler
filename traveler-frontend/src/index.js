const BASE_URL = 'http://localhost:3000'

//start program
window.addEventListener('load', () => {
    getCountries()
})

function clearForm(){
    const countryFormDiv = document.getElementById('country-form')
    countryFormDiv.innerHTML = ""
    const cityFormDiv = document.getElementById('city-form')
    cityFormDiv.innerHTML = ""
}

function clearUL(){
    const showCountries = document.querySelector('#show-countries ul')
    showCountries.innerHTML = ""
    const showCountry = document.querySelector('#show-country')
    showCountry.innerHTML = ""
}

function addClickToLinks(){
    const countriesLinks = document.querySelectorAll('li a')
    countriesLinks.forEach(link => {
        link.addEventListener('click', displayCountry)
    })
    document.getElementById('countryForm').addEventListener('click', displayCountryForm)
    document.getElementById('countries').addEventListener('click', getCountries)
    document.querySelectorAll('#add-city').forEach(country => country.addEventListener('click', displayCityForm))
    document.querySelectorAll('#delete-country').forEach(country => country.addEventListener('click', deleteCountry))
    document.querySelectorAll('#update-city').forEach(city => city.addEventListener('click', editCity))
}