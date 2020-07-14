const BASE_URL = 'http://localhost:3000'

window.addEventListener('load', () => {
    getCountries()
})

function getCountries(){
     clearForm()
     const main = document.querySelector('#main')
     main.innerHTML = ""
     fetch(BASE_URL+"/countries")
     .then(resp => resp.json())
     .then(countries => {
         main.innerHTML += countries.map(country => `
            <li>
                <a href="#" data-id="${country.id}">${country.name}</a>
            </li>
         `).join('')

         addClickToLinks()
     })
}

function clearForm(){
    const countryFormDiv = document.getElementById('country-form')
    countryFormDiv.innerHTML = ""
}

function addClickToLinks(){
    const countriesLinks = document.querySelectorAll('li a')
    countriesLinks.forEach(link => {
        link.addEventListener('click', displayCountry)
    })

    document.getElementById('country-form').addEventListener('click', displayCountryForm)
    document.getElementById('countries').addEventListener('click', getCountries)
}

function displayCountry(){

}

function displayCountryForm(){

}