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
        name.innerHTML = `Name:<br><br>${beer.name}`
        let ibu = document.createElement("div")
        ibu.classList.add("ibu")
        ibu.innerHTML = `IBU:<br><br>${beer.ibu}`
        let abv = document.createElement('div')
        abv.classList.add("abv")
        abv.innerHTML = `ABV:<br><br>${beer.abv}%`
        let tagLine = document.createElement("div")
        tagLine.classList.add("tagLine")
        tagLine.innerHTML = `Tagline:<br><br>'${beer.tagline}'`
        let favorite = document.createElement("button")
        favorite.setAttribute("onclick", onclick = "setToFavorites(event)")
        favorite.classList.add("favorite")
        favorite.innerHTML = "Add to Favorites ♥"
        let learnMore = document.createElement("button")
        learnMore.setAttribute("onclick", onclick = "loadLearnMore(event)")
        learnMore.classList.add("learnMore")
        learnMore.innerHTML = "Learn More"

        beerContent.append(name,ibu,abv,tagLine, favorite, learnMore)
    });
}

function loadLearnMore(e) {
    let learnMoreButton = document.querySelector("#learnMore")
    learnMoreButton.style.display = "grid";
    beerContent = document.querySelectorAll(".beerContent")
    beerContent.forEach(beer => {
        beer.style.display = "none"
    })
}

function learnMoreBackButton(e) {
    let learnMoreButton = document.querySelector("#learnMore")
    learnMoreButton.style.display = "none";
    beerContent = document.querySelectorAll(".beerContent")
    beerContent.forEach(beer => {
        beer.style.display = "grid"  
})
}

function setToFavorites(e){
    console.log("hello")
}

