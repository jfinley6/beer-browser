let pageNumber = 1

const navBar = document.querySelector("#navBar")
const buttons = document.querySelector("#pageButtons")

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('colo') === null) {
        navBar.style.backgroundColor = navBar.style.backgroundColor
    } else {
        navBar.style.backgroundColor = localStorage.getItem('color')
    }
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

function searchByAbv(e) {
    e.preventDefault()
    let searchInput = document.querySelector("#search-bar").value
    fetch(`https://api.punkapi.com/v2/beers?abv_gt=${searchInput}`)
        .then(res => res.json())
        .then(beersArr => {
            const beerClass = document.querySelectorAll(".beerContent")
            if (beerClass.length > 0) {
                beerClass.forEach(beer => {
                    beer.remove()
                    // document.querySelector("#backButton").style.display = "block" uncomment to add the back button 
                })
            }
            document.querySelector("#backButton").style.display = "block"
            document.querySelector("#backButton").setAttribute("filter", "abv")
            document.querySelector("#pageButtons").style.display = ""
            document.querySelector("#nextButton").style.display = "none"
            document.querySelector("#previousButton").style.display = "none"
            document.querySelector("#pageIndex").style.display = "none"
            document.querySelector("#filters").style.display = "none"
            document.querySelector("#container").style.gridTemplateRows = "0.1fr 0.1fr 1fr"
            document.querySelector("#search-form").reset()
            renderBeer(beersArr)

        }
        )
}

function searchByIbu(e) {
    e.preventDefault()
    let searchInput = document.querySelector("#searchIbu-bar").value
    fetch(`https://api.punkapi.com/v2/beers?ibu_gt=${searchInput}`)
        .then(res => res.json())
        .then(beersArr => {
            const beerClass = document.querySelectorAll(".beerContent")
            if (beerClass.length > 0) {
                beerClass.forEach(beer => {
                    beer.remove()
                    // document.querySelector("#backButton").style.display = "block" uncomment to add the back button 
                })
            }
            document.querySelector("#backButton").style.display = "block"
            document.querySelector("#backButton").setAttribute("filter", "ibu")
            document.querySelector("#pageButtons").style.display = ""
            document.querySelector("#nextButton").style.display = "none"
            document.querySelector("#previousButton").style.display = "none"
            document.querySelector("#pageIndex").style.display = "none"
            document.querySelector("#filters").style.display = "none"
            document.querySelector("#container").style.gridTemplateRows = "0.1fr 0.1fr 1fr"
            document.querySelector("#searchIbu-form").reset()
            renderBeer(beersArr)

        }
        )
}

function getRandomBeer() {
    fetch('https://api.punkapi.com/v2/beers/random')
        .then(res => res.json())
        .then(randomBeer => {
            let beerIndex = randomBeer[0].id
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

            fetch(`http://localhost:3000/favorites/${beerIndex}`)
                .then(res => res.json())
                .then(favoriteData => {
                    if (favoriteData.heart === true) {
                        document.querySelector("#favoriteButton").textContent = "Add to Favorites ♥"
                    } else {
                        document.querySelector("#favoriteButton").textContent = "Add to Favorites ♡"
                    }
                })
        })

}

function searchByName(e) {
    e.preventDefault()
    let searchInput = document.querySelector("#searchName-bar").value
    fetch(`https://api.punkapi.com/v2/beers?beer_name=${searchInput}`)
        .then(res => res.json())
        .then(beersArr => {
            const beerClass = document.querySelectorAll(".beerContent")
            if (beerClass.length > 0) {
                beerClass.forEach(beer => {
                    beer.remove()
                    // document.querySelector("#backButton").style.display = "block" uncomment to add the back button 
                })
            }
            document.querySelector("#backButton").style.display = "block"
            document.querySelector("#backButton").setAttribute("filter", "name")
            document.querySelector("#pageButtons").style.display = ""
            document.querySelector("#nextButton").style.display = "none"
            document.querySelector("#previousButton").style.display = "none"
            document.querySelector("#pageIndex").style.display = "none"
            document.querySelector("#filters").style.display = "none"
            document.querySelector("#container").style.gridTemplateRows = "0.1fr 0.1fr 1fr"
            document.querySelector("#searchName-form").reset()
            renderBeer(beersArr)

        }
        )
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

        let learnMore = document.createElement("button")
        learnMore.setAttribute("beerIndex", beer.id)
        learnMore.setAttribute("onclick", onclick = "loadLearnMore(event)")
        learnMore.classList.add("learnMore")
        learnMore.innerHTML = "Learn More"

        beerContent.append(name, ibu, abv, tagLine, learnMore)
    });
}

function loadLearnMore(e) {
    document.querySelector("#favoritesTab").style.display = "none"

    let beerIndex = e.target.attributes[0].textContent;
    fetch(`https://api.punkapi.com/v2/beers/${beerIndex}`)
        .then(res => res.json())
        .then(data => {
            document.querySelector("#pageButtons").style.display = ""
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
            document.querySelector("#addToFavorites").setAttribute("index", data[0].id)

            fetch(`http://localhost:3000/favorites/${beerIndex}`)
                .then(res => res.json())
                .then(favoriteData => {
                    if (favoriteData.heart === true) {
                        document.querySelector("#favoriteButton").textContent = "Add to Favorites ♥"
                    } else {
                        document.querySelector("#favoriteButton").textContent = "Add to Favorites ♡"
                    }
                })

        })


}

function learnMoreBackButton(e, scrollPosition = 0) {
    const backButton = document.querySelector("#backButton")
    if (backButton.getAttribute("filter") === "abv" || backButton.getAttribute("filter") === "ibu" || backButton.getAttribute("filter") === "name") {
        callBeer()
    }
    backButton.style.display = "none"
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
    document.querySelector("#settingsTab").style.display = "none"
    document.querySelector("#favoritesTab").style.display = "none"
    document.querySelector("#backButton").style.display = "none"
    document.querySelector("#pageButtons").style.display = ""
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

function loadFavorites() {
    const beerClass = document.querySelectorAll(".beerContent")
    if (beerClass.length > 0) {
        beerClass.forEach(beer => {
            beer.remove()
        })
    }
    const LiClass = document.querySelectorAll(".favoriteLi")
    if (LiClass.length > 0) {
        LiClass.forEach(li => {
            li.remove()
        })
    }

    document.querySelector("#settingsTab").style.display = "none"
    document.querySelector("#beerBrowse").style.gridTemplateColumns = "1fr"
    document.querySelector("#favoritesTab").style.display = "flex"
    document.querySelector("#learnMore").style.display = "none"
    document.querySelector("#backButton").style.display = "none"
    document.querySelector("#pageButtons").style.display = "none"
    document.querySelector("#nextButton").style.display = "none"
    document.querySelector("#previousButton").style.display = "none"
    document.querySelector("#pageIndex").style.display = "none"
    document.querySelector("#filters").style.display = "none"
    document.querySelector("#container").style.gridTemplateRows = "0.1fr 1fr"
    fetch("http://localhost:3000/favorites")
        .then(res => res.json())
        .then(datas => {
            Promise.all(datas.map(favorite => {
                if (favorite.heart === true) {
                    return fetch(`https://api.punkapi.com/v2/beers/${favorite.id}`)
                        .then(response => response.json())
                }
            }))
                .then(([...promises]) => {
                    const favoriteBeers = promises.filter(Boolean).map(fave => fave[0])

                    const sortedFavoriteBeers = favoriteBeers.sort(function (a, b) {
                        return a.name.localeCompare(b.name);
                    });
                    sortedFavoriteBeers.forEach(favorite => {
                        const favoritesList = document.querySelector("#favoritesList")
                        const li = document.createElement("li")
                        li.classList.add("favoriteLi")
                        li.textContent = favorite.name
                        favoritesList.append(li)
                        li.setAttribute("index", favorite.id)
                        li.setAttribute("onclick", "loadFavoriteDetails(event)")
                    })
                    // arr.push(li)
                })
            // for (i = 0; i < datas.length; i++) {
            //     let favoritesArray = []
            //     if (datas[i].heart === true) {
            //         fetch(`https://api.punkapi.com/v2/beers/${datas[i].id}`)
            //             .then(res => res.json())
            //             .then(data => {
            //                 favoritesArray.push(data)
            //                 const favoritesList = document.querySelector("#favoritesList")
            //                 const li = document.createElement("li")
            //                 li.classList.add("favoriteLi")
            //                 li.textContent = data[0].name
            //                 favoritesList.append(li)
            //                 li.setAttribute("index", data[0].id)
            //                 li.setAttribute("onclick", "loadFavoriteDetails(event)")
            //                 // arr.push(li)
            //             })
            //     }
            // }
            // let list = document.querySelector('#favoritesList');
            // let orderedLIs = arr.sort((a, b) =>
            //     a.textContent.localeCompare(b.textContent)
            // );

        })
}

function loadFavoriteDetails(e) {
    document.querySelector("#favoritesTab").style.display = "none"
    let beerIndex = e.target.attributes[1].textContent;
    fetch(`https://api.punkapi.com/v2/beers/${beerIndex}`)
        .then(res => res.json())
        .then(data => {
            document.querySelector("#pageIndex").style.display = "none"
            document.querySelector("#filters").style.display = "none"
            document.querySelector("#container").style.gridTemplateRows = "0.1fr 1fr"
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
            document.querySelector("#addToFavorites").setAttribute("index", data[0].id)

            fetch(`http://localhost:3000/favorites/${beerIndex}`)
                .then(res => res.json())
                .then(favoriteData => {
                    if (favoriteData.heart === true) {
                        document.querySelector("#favoriteButton").textContent = "Add to Favorites ♥"
                    } else {
                        document.querySelector("#favoriteButton").textContent = "Add to Favorites ♡"
                    }
                })

        })
}

function loadSettings() {
    document.querySelector("#pageButtons").style.display = "none"
    document.querySelector("#filters").style.display = "none"
    document.querySelector("#beerBrowse").style.overflowY = "hidden"
    document.querySelector("#beerBrowse").style.gridTemplateColumns = "1fr"
    document.querySelector("#favoritesTab").style.display = "none"
    document.querySelector("#learnMore").style.display = "none"
    document.querySelector("#settingsTab").style.display = "grid"
    document.querySelector("#container").style.gridTemplateRows = "0.1fr 1fr"
    beerContent = document.querySelectorAll(".beerContent")
    beerContent.forEach(beer => {
        beer.style.display = "none"
    })
}

function changeHeaderColor(e) {
    let newColor = e.target.value
    document.documentElement.style.setProperty('--theme-background', newColor);

}


// document.querySelector("#settings").addEventListener('click', () => {
//     localStorage.setItem('color', 'yellow')
//     let color = localStorage.getItem('color')
//     navBar.style.backgroundColor = color
//     buttons.style.backgroundColor = color
// })
