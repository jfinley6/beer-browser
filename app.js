let pageNumber = 1

document.addEventListener("DOMContentLoaded", () => {
    callBeer()
})

function callBeer(page = 1) {
    const beerClass = document.querySelectorAll(".beerContent")
    if (beerClass.length > 0) {
        beerClass.forEach(beer => {
            beer.remove()
        })
    }
    fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=27`)
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

        fetch("http://localhost:3000/favorites")
            .then(res => res.json())
            .then(datas => {
                if (datas[beer.id - 1].heart === true) {
                    // let favorite = document.createElement("button")
                    // favorite.setAttribute("onclick", onclick = "setToFavorites(event)")
                    // favorite.classList.add("favorite")
                    // favorite.innerHTML = "Add to Favorites ♥"
                    // favorite.setAttribute("beerIndex", beer.id)

                    let learnMore = document.createElement("button")
                    learnMore.setAttribute("beerIndex", beer.id)
                    learnMore.setAttribute("onclick", onclick = "loadLearnMore(event)")
                    learnMore.classList.add("learnMore")
                    learnMore.innerHTML = "Learn More"

                    beerContent.append(name, ibu, abv, tagLine, learnMore)
                } else {
                    // let favorite = document.createElement("button")
                    // favorite.setAttribute("onclick", onclick = "setToFavorites(event)")
                    // favorite.classList.add("favorite")
                    // favorite.innerHTML = "Add to Favorites ♡"
                    // favorite.setAttribute("beerIndex", beer.id)

                    let learnMore = document.createElement("button")
                    learnMore.setAttribute("beerIndex", beer.id)
                    learnMore.setAttribute("onclick", onclick = "loadLearnMore(event)")
                    learnMore.classList.add("learnMore")
                    learnMore.innerHTML = "Learn More"

                    beerContent.append(name, ibu, abv, tagLine, learnMore)
                }
            })
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
            beerBrowse.style.overflowY = "hidden"
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
    beerBrowse.style.overflowY = "scroll"
    let learnMoreButton = document.querySelector("#learnMore")
    learnMoreButton.style.display = "none";
    beerContent = document.querySelectorAll(".beerContent")
    beerContent.forEach(beer => {
        beer.style.display = "grid"
    })
    beerBrowse.scrollTo(0, scrollPosition)
}

function setToFavorites(e) {
    const beerIndex = e.target.attributes[2].textContent
    if (e.target.textContent === "Add to Favorites ♡"){
        fetch(`http://localhost:3000/favorites/${beerIndex}`, {
            method: 'PATCH',
            body: JSON.stringify({
                heart: true,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(() => {
            e.target.textContent = "Add to Favorites ♥"
        })
    } else {
        fetch(`http://localhost:3000/favorites/${beerIndex}`, {
            method: 'PATCH',
            body: JSON.stringify({
                heart: false,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(() => {
            e.target.textContent = "Add to Favorites ♡"
        })
    }
}

function setToLearnMoreFavorites(e) {
    const beerIndex = e.target.parentElement.attributes[1].textContent;

    if (e.target.textContent === "Add to Favorites ♡") {
        fetch(`http://localhost:3000/favorites/${beerIndex}`, {
            method: 'PATCH',
            body: JSON.stringify({
                heart: true,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(() => {
            e.target.textContent = "Add to Favorites ♥"
        })
    } else {
        fetch(`http://localhost:3000/favorites/${beerIndex}`, {
            method: 'PATCH',
            body: JSON.stringify({
                heart: false,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(() => {
            e.target.textContent = "Add to Favorites ♡"
        })
    }
}

function loadNextPage(e) {
    const pageIndex = document.querySelector("#pageIndex")
    if (pageNumber === 13) {
        return
    } else {
        pageNumber++
        pageIndex.innerText = `Page ${pageNumber}/13`
    }
    callBeer(pageNumber)
}

function loadPreviousPage(e) {
    const pageIndex = document.querySelector("#pageIndex")
    if (pageNumber === 1) {
        return
    } else {
        pageNumber--
        pageIndex.innerText = `Page ${pageNumber}/13`
    }
    callBeer(pageNumber)
}

function changePageIndex() {
    document.querySelector("#backButton").style.display = "none"
    document.querySelector("#nextButton").style.display = ""
    document.querySelector("#previousButton").style.display = ""
    document.querySelector("#pageIndex").style.display = ""
    document.querySelector("#filters").style.display = ""
    document.querySelector("#container").style.gridTemplateRows = "0.1fr 0.1fr 0.1fr 1fr"
    let beerBrowse = document.querySelector("#beerBrowse")
    beerBrowse.style.gridTemplateColumns = "1fr 1fr 1fr"
    beerBrowse.style.overflowY = "scroll"
    let learnMoreButton = document.querySelector("#learnMore")
    learnMoreButton.style.display = "none";
    beerContent = document.querySelectorAll(".beerContent")
    beerContent.forEach(beer => {
        beer.style.display = "grid"
    })
    document.querySelector("#pageIndex").textContent = "Page 1/13"
    pageNumber = 1
    callBeer()
}

function getRandomBeer() {
    fetch('https://api.punkapi.com/v2/beers/random')
        .then(res => res.json())
        .then(randomBeer => {
            document.querySelector("#backButton").style.display = "block"
            document.querySelector("#nextButton").style.display = "none"
            document.querySelector("#previousButton").style.display = "none"
            document.querySelector("#pageIndex").style.display = "none"
            document.querySelector("#filters").style.display = "none"
            document.querySelector("#container").style.gridTemplateRows = "0.1fr 0.1fr 1fr"
            scrollPosition = document.getElementById("beerBrowse").scrollTop;
            let beerBrowse = document.querySelector("#beerBrowse")
            beerBrowse.style.gridTemplateColumns = "1fr"
            beerBrowse.style.overflowY = "hidden"
            let learnMoreButton = document.querySelector("#learnMore")
            learnMoreButton.style.display = "flex";
            beerContent = document.querySelectorAll(".beerContent")
            beerContent.forEach(beer => {
                beer.style.display = "none"
            })
            document.querySelector("#learnMoreName").innerText = `Name: ${randomBeer[0].name}`
            document.querySelector("#learnMoreIbu").innerText = `IBU: ${randomBeer[0].ibu}`
            document.querySelector("#learnMoreAbv").innerText = `ABV: ${randomBeer[0].abv}`
            document.querySelector("#learnMoreDescription").innerText = randomBeer[0].description
            document.querySelector("#learnMoreFoodPairings").innerText = `Great Food Pairings: ${randomBeer[0].food_pairing}`
            document.querySelector("#learnMoreFirstBrewed").innerText = `First Brewed: ${randomBeer[0].first_brewed}`
            document.querySelector("#addToFavorites").setAttribute("index", randomBeer[0].id)
            if (randomBeer[0].image_url === null) {
                document.querySelector("#image").src = "https://images.punkapi.com/v2/keg.png"
            } else {
                document.querySelector("#image").src = randomBeer[0].image_url
            }
        })
}

document.querySelector("#settings").addEventListener('click', () => {
    localStorage.setItem('color', 'green')
})
