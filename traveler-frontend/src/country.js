//display list of all countries
function getCountries(){
    clearForm()
    clearUL()
    const showCountries = document.querySelector('#show-countries ul')
    fetch(BASE_URL+"/countries")
    .then(resp => resp.json())
    .then(countries => {
        countries.forEach(country => {
           let c = new Country(country)
           showCountries.innerHTML += c.renderCountry() 
           c.renderUL()
       })
        addClickToLinks()
    })
}

// display instance of country
function displayCountry(){
    clearForm()
    clearUL()
    const id = event.target.dataset.id 
    const showCountry = document.getElementById('show-country')
    // console.log(id)
    fetch(BASE_URL+"/countries/"+id)
    .then(resp => resp.json())
    .then(country => {
        let c = new Country(country)
        showCountry.innerHTML += c.renderCountry() 
        c.renderUL()
        addClickToLinks()
    })
    
}

// render country form on page
function displayCountryForm(){
    clearUL()
    const countryFormDiv =  document.getElementById('country-form')
    const html = `
        <form>
            <label>Name:</label>
            <input type="text" id="name">
            <input type="submit" class="button">
        </form><br>
    `
    countryFormDiv.innerHTML = html 
    document.querySelector('form').addEventListener('submit', createCountry)
}

// creates instance of country from form data
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
           let c = new Country(country)
           const showCountries = document.querySelector('#show-countries ul')
           showCountries.innerHTML += c.renderCountry() 
           c.renderUL()
           addClickToLinks()
           clearForm()
       })
}

// deletes instance of country
function deleteCountry(){
    clearForm()
    // console.log(event.target.parentElement)
    const id = event.target.dataset.id
    fetch(BASE_URL+`/countries/${id}`, {
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
            <a href="#" id="display-country" data-id="${this.id}">${this.name}</a> &#10518; 
            <a href="#" id="add-city" data-id="${this.id}">Add City</a> | 
            <a href="#" id="delete-country" data-id="${this.id}">Delete Country</a>
            <ul id="cities">
            </ul>
        </li>
     `
    }

    renderUL(){
        const ul = document.querySelector(`li#country-${this.id} #cities`)
            this.cities.forEach(city => {
                ul.innerHTML += `<br><li id="city-${city.id}">${city.name} | Must see: ${city.must_see} |
                ${city.visited ? "Visited" : "Not Visited Yet"} 
                <a href="#" id="update-city" data-id="${city.id}">Edit</a> |
                <a href="#" id="delete-city" data-id="${city.id}">Delete</a>
                </li>`
            })
            ul.innerHTML += '<hr><br>'
    }
}