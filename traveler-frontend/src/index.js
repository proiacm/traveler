const BASE_URL = 'http://localhost:3000'

window.addEventListener('load', () => {
    getCountries()
})

function getCountries(){
     clearForm()
     clearUL()
     const showCountries = document.querySelector('#show-countries ul')
    //  showCountries.innerHTML = ""
     fetch(BASE_URL+"/countries")
     .then(resp => resp.json())
     .then(countries => {
         countries.forEach(country => {
            const c = new Country(country)
            showCountries.innerHTML += c.renderCountry() 
            c.renderUL()
        })
         addClickToLinks()
     })
}

function clearForm(){
    const countryFormDiv = document.getElementById('country-form')
    countryFormDiv.innerHTML = ""
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
}

function displayCountry(){
    clearForm()
    clearUL()
    const id = event.target.dataset.id 
    const showCountries = document.getElementById('show-country')
    showCountries.innerHTML = ""
    fetch(BASE_URL+"/countries/"+id)
    .then(resp => resp.json())
    .then(country => {
        showCountries.innerHTML += `
            <h3>${country.name}</h3>
        `
    })
}

function displayCountryForm(){
    const countryFormDiv =  document.getElementById('country-form')
    const html = `
        <form>
            <label>Name:</label>
            <input type="text" id="name">
            <input type="submit">
        </form>
    `
    countryFormDiv.innerHTML = html 
    document.querySelector('form').addEventListener('submit', createCountry)
}

function createCountry(){
    event.preventDefault()
    const country = {
        name: document.getElementById('name').value
    }
    fetch(BASE_URL+"/countries", {
        method: "POST",
        body: JSON.stringify(country),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(country => {
           const c = new Country(country)
           const showCountries = document.querySelector('#show-countries ul')
           showCountries.innerHTML += c.renderCountry() 
           c.renderUL()
           addClickToLinks()
           clearForm()
       })
}

// begin Country class

class Country {
    constructor(country){
        this.id = country.id
        this.name = country.name
        this.cities = country.cities
    }

    renderCountry(){
        return `
        <li id="country-${this.id}">
            <a href="#" data-id="${this.id}">${this.name}</a>
            <ul id="cities">
            </ul>
        </li>
     `
    }

    renderUL(){
        const ul = document.querySelector(`li#country-${this.id} #cities`)
            this.cities.forEach(city => {
                ul.innerHTML += `<li>${city.name} - </li>`
            })
    }
}

