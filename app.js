

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
        favorite.innerHTML = "Add to Favorites 	♡"
        let learnMore = document.createElement("button")
        learnMore.setAttribute("beerIndex", beer.id)
        learnMore.setAttribute("onclick", onclick = "loadLearnMore(event)")
        learnMore.classList.add("learnMore")
        learnMore.innerHTML = "Learn More"

        beerContent.append(name, ibu, abv, tagLine, favorite, learnMore)
    });
}

function loadLearnMore(e) {
    let beerIndex = e.target.attributes[0].textContent;
    fetch(`https://api.punkapi.com/v2/beers/${beerIndex}`)
    .then(res => res.json())
    .then(data => {
        document.querySelector("#backButton").style.display = "block"
        document.querySelector("#nextButton").style.display = "none"
        document.querySelector("#previousButton").style.display = "none"
        document.querySelector("#pageIndex").style.display = "none"
        document.querySelector("#filters").style.display = "none"
        document.querySelector("#container").style.gridTemplateRows = "0.1fr 0.1fr 1fr"
        scrollPosition = document.getElementById("beerBrowse").scrollTop;
        let beerBrowse = document.querySelector("#beerBrowse")
        beerBrowse.style.gridTemplateColumns = "1fr"
        let learnMoreButton = document.querySelector("#learnMore")
        learnMoreButton.style.display = "flex";
        beerContent = document.querySelectorAll(".beerContent")
        beerContent.forEach(beer => {
            beer.style.display = "none"
        })
        document.querySelector("#image").src = data[0].image_url
        document.querySelector("#learnMoreName").innerText = `Name: ${data[0].name}`
        document.querySelector("#learnMoreIbu").innerText = `IBU: ${data[0].ibu}`
        document.querySelector("#learnMoreAbv").innerText = `ABV: ${data[0].abv}`
        document.querySelector("#learnMoreDescription").innerText = data[0].description
        document.querySelector("#learnMoreFoodPairings").innerText = `Great Food Pairings: ${data[0].food_pairing}`
        document.querySelector("#learnMoreFirstBrewed").innerText = `First Brewed: ${data[0].first_brewed}`
    })
    
    
}

function learnMoreBackButton(e) {
    document.querySelector("#backButton").style.display = "none"
    document.querySelector("#nextButton").style.display = ""
    document.querySelector("#previousButton").style.display = ""
    document.querySelector("#pageIndex").style.display = ""
    document.querySelector("#filters").style.display = ""
    document.querySelector("#container").style.gridTemplateRows = "0.1fr 0.1fr 0.1fr 1fr"
    let beerBrowse = document.querySelector("#beerBrowse")
    beerBrowse.style.gridTemplateColumns = "1fr 1fr 1fr"
    let learnMoreButton = document.querySelector("#learnMore")
    learnMoreButton.style.display = "none";
    beerContent = document.querySelectorAll(".beerContent")
    beerContent.forEach(beer => {
        beer.style.display = "grid"
    })
    beerBrowse.scrollTo(0, scrollPosition)
}

function setToFavorites(e) {
    console.log("hello")
}

