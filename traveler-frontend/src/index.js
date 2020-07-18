const BASE_URL = 'http://localhost:3000'

//start program
window.addEventListener('load', () => {
    getCountries()
})

//display list of all countries
function getCountries(){
     clearForm()
     clearUL()
     const showCountries = document.querySelector('#show-countries ul')
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
    document.querySelectorAll('#delete-city').forEach(city => city.addEventListener('click', deleteCity))
    document.querySelectorAll('#update-city').forEach(city => city.addEventListener('click', editCity))
}

// display instance of country
function displayCountry(){
    clearForm()
    clearUL()
    const id = event.target.dataset.id 
    const showCountry = document.getElementById('show-country')
    fetch(BASE_URL+"/countries/"+id)
    .then(resp => resp.json())
    .then(country => {
        const c = new Country(country)
        showCountry.innerHTML += c.renderCountry() 
        c.renderUL()
        addClickToLinks()
    })
    
}

// put country form on page
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

// put city form on page 
function displayCityForm(){
    const cityFormDiv =  document.getElementById('city-form')
    const countryId = Number(event.target.dataset.id)
    console.log(countryId)
    const html = `
        <form>
            <label>Name:</label>
            <input type="text" id="name">
            <label>Must see:</label>
            <input type="text" id="must_see">
            <label>Visited?</label>
            <input type="checkbox" id="visited">
            <input type="hidden" id="country_id" value="${countryId}">
            <input type="submit">
        </form>
    `
    cityFormDiv.innerHTML = html 
    document.querySelector('form').addEventListener('submit', createCity)

}

// creates instance of country from form
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

// creates instance of city from form
function createCity(){
    event.preventDefault()
    const city = {
        name: document.getElementById('name').value,
        must_see: document.getElementById('must_see').value,
        visited: document.getElementById('visited').checked,
        country_id: document.getElementById('country_id').value
    }
    console.log(city)
    fetch(BASE_URL+"/cities", {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(city => {
           const c = new City(city)
           console.log(c)
           addClickToLinks()
           clearForm()
       })
    
}

//put edit form on page
function editCity(){
    event.preventDefault()
    clearForm()
    const id = event.target.dataset.id
    fetch(BASE_URL+`/cities/${id}`)
    .then(resp => resp.json())
    .then(city => {
        const cityFormDiv = document.getElementById('city-form')
        const html = `
        <form data-id="${id}">
            <label>Name:</label>
            <input type="text" id="name" value="${city.name}">
            <label>Must see:</label>
            <input type="text" id="must_see" value="${city.must_see}">
            <label>Visited?</label>
            <input type="checkbox" id="visited">
            <input type="hidden" id="country_id" value="${id}">
            <input type="submit">
        </form>
        `
        cityFormDiv.innerHTML = html 
        document.querySelector('form').addEventListener('submit', updateCity)
    })
}

// update instance of city
function updateCity(){

}

// deletes instance of city
function deleteCity(){
    event.preventDefault()
    clearForm()
    fetch(BASE_URL+`/cities/${event.target.dataset.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(event.target.parentElement.remove())
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
            <button id="add-city" data-id="${this.id}">Add City</button>
            <ul id="cities">
            </ul>
        </li>
     `
    }

    renderUL(){
        const ul = document.querySelector(`li#country-${this.id} #cities`)
            this.cities.forEach(city => {
                ul.innerHTML += `<li>${city.name} - ${city.must_see} - 
                ${city.visited ? "Visited" : "Not Visited Yet"} 
                <button id="delete-city" data-id="${city.id}">Delete</button>
                <button id="update-city" data-id="${city.id}">Edit</button>
                </li>`
            })
    }
}

// begin City class
class City {
    constructor(city){
    this.id = city.id
    this.name = city.name
    this.must_see = city.must_see
    this.visited = city.visited
    this.country_id = city.country_id
    }
}