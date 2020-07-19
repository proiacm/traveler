const BASE_URL = 'http://localhost:3000'

//start program
window.addEventListener('load', () => {
     homePage()
})

function homePage(){
    clearForm()
    clearUL()
    addClickToLinks()
    const home = document.getElementById('home')
    home.innerHTML = "Welcome to Traveler! An app where you can plan and manage your travel bucket list. <br> Start by setting a country and adding cities you'd like to visit. <br> You can return to this page at any time by clicking 'Traveler'."
}

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
    const home = document.querySelector('#home')
    home.innerHTML = ""
}

function addClickToLinks(){
    const countriesLinks = document.querySelectorAll('li a')
    countriesLinks.forEach(link => {
        link.addEventListener('click', displayCountry)
    })
    document.getElementById('home-page').addEventListener('click', homePage)
    document.getElementById('countryForm').addEventListener('click', displayCountryForm)
    document.getElementById('countries').addEventListener('click', getCountries)
    document.querySelectorAll('#delete-country').forEach(country => country.addEventListener('click', deleteCountry))
    document.querySelectorAll('#add-city').forEach(country => country.addEventListener('click', displayCityForm))
    document.querySelectorAll('#update-city').forEach(city => city.addEventListener('click', editCity))
    document.querySelectorAll('#delete-city').forEach(city => city.addEventListener('click', deleteCity))
}