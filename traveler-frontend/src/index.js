const BASE_URL = 'http://localhost:3000'

document.addEventListener('load', () => {
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

