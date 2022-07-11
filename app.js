document.addEventListener("DOMContentLoaded", () => {
    callBeer()
})

function callBeer() {
    fetch("https://api.punkapi.com/v2/beers?page=1&per_page=27")
        .then(res => res.json())
        .then(beerArr => renderBeer(beerArr))
}

function renderBeer(beerArr) {
    beerArr.forEach(beer => {
        let beerContent = document.createElement("div");
        beerContent.classList.add("beerContent");
        document.querySelector("#beerBrowse").appendChild(beerContent);
        let name = document.createElement("div")
        name.classList.add("name")
        name.textContent = beer.name
        let ibu = document.createElement("div")
        ibu.classList.add("ibu")
        ibu.textContent = beer.ibu
        let abv = document.createElement('div')
        abv.classList.add("abv")
        abv.textContent = beer.abv
        let tagLine = document.createElement("div")
        tagLine.classList.add("tagLine")
        tagLine.textContent = beer.tagline
        let description = document.createElement("div")
        description.classList.add("description")
        description.textContent = beer.description
        let learnMore = document.createElement("button")
        learnMore.classList.add("learnMore")
        learnMore.textContent = "Learn More"

        beerContent.append(name,ibu,abv,tagLine, description, learnMore)
    });
}