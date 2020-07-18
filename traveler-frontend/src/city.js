// render city form on page 
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

// creates instance of city from form data
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
           c.renderCity()
           addClickToLinks()
           clearForm()
       })
    
}

//render edit form on page
function editCity(){
    event.preventDefault()
    clearForm()
    const id = event.target.dataset.id
    fetch(BASE_URL+`/cities/${id}`)
    .then(resp => resp.json())
    .then(city => {
        // console.log(city.country.id)
        const cityFormDiv = document.getElementById('city-form')
        const html = `
        <form data-id="${id}">
            <label>Name:</label>
            <input type="text" id="name" value="${city.name}">
            <label>Must see:</label>
            <input type="text" id="must_see" value="${city.must_see}">
            <label>Visited?</label>
            <input type="checkbox" id="visited">
            <input type="hidden" id="country_id" value="${city.country.id}">
            <input type="submit">
        </form>
        `
        cityFormDiv.innerHTML = html 
        document.querySelector('form').addEventListener('submit', updateCity)
    })
}

// update instance of city
function updateCity(){
    event.preventDefault()
    const city = {
        name: document.getElementById('name').value,
        must_see: document.getElementById('must_see').value,
        visited: document.getElementById('visited').checked,
        country_id: document.getElementById('country_id').value
    }
    const id = event.target.dataset.id
    // console.log(id)
    fetch(BASE_URL+`/cities/${id}`, {
        method: "PATCH",
        body: JSON.stringify(city),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(city => {
           const c = new City(city)
           
           document.querySelector(`li#country-${city.country.id} #cities li#city-${city.id}`).innerHTML = c.renderCity()
           addClickToLinks()
           clearForm()
       })
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

    renderCity(){
        return `
            <li id="city-${this.id}">${this.name} - ${this.must_see} - 
            ${this.visited ? "Visited" : "Not Visited Yet"} 
            <button id="update-city" data-id="${this.id}">Edit</button>
            </li>
        `
    }
}