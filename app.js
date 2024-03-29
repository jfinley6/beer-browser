let scrollPosition = 0;
let pageNumber = 1;
let colorMode = "light";

const navBar = document.querySelector("#navBar");
const buttons = document.querySelector("#pageButtons");
const contentArea = document.querySelector("#beerBrowse");
const checkBox = document.querySelector("#checkbox");

document.addEventListener("DOMContentLoaded", () => {
  checkStorage();
  callBeer();
});

addEventListener("DOMContentLoaded", (event) => {
  document.body.style.backgroundImage = "none";
  fetch("https://phase-1-project.onrender.com/favorites").then((res) => {
    if (res.status === 200) {
      document.querySelector("#heroku").style.display = "none";
      document.querySelector("#container").style.display = "";
      document.body.style.backgroundImage =
        "url(https://envato-shoebox-0.imgix.net/f309/08f0-c751-4da9-ba9f-62c7a94fd21f/_K4A7247.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=700&s=371111811ab3e03a5f6dbedd0969929f)";
    }
  });
});

contentArea.addEventListener("scroll", function (event) {
  if (contentArea.scrollTop === 0) {
    document.querySelector("#topButton").style.display = "none";
  } else {
    if (
      contentArea.scrollHeight -
        contentArea.scrollTop -
        contentArea.clientHeight <
      3000
    ) {
      document.querySelector("#topButton").style.display = "block";
      document.querySelector("#topButton").style.visibility = "visible";
    }
    if (
      contentArea.scrollHeight -
        contentArea.scrollTop -
        contentArea.clientHeight >
      3000
    ) {
      document.querySelector("#topButton").style.display = "none";
    }
  }
});

function checkStorage() {
  if (localStorage.getItem("color") === null) {
    navBar.style.backgroundColor = navBar.style.backgroundColor;
  } else {
    let refreshColor = localStorage.getItem("color");
    document.documentElement.style.setProperty("--button", refreshColor);
    document.documentElement.style.setProperty(
      "--theme-background",
      refreshColor
    );
    document.querySelector("#favcolor").value = refreshColor;
    console.log(document.querySelector("#favcolor").value);
  }
  if (localStorage.getItem("shade") === "dark") {
    document.querySelector("#switch").click();
  } else {
    return;
  }
}

function callBeer(page = 1) {
  const beerClass = document.querySelectorAll(".beerContent");
  if (beerClass.length > 0) {
    beerClass.forEach((beer) => {
      beer.remove();
    });
  }
  fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=27`)
    .then((res) => res.json())
    .then((beerArr) => renderBeer(beerArr));
}

function searchByAbv(e) {
  e.preventDefault();
  let searchInput = document.querySelector("#search-bar").value;
  if (searchInput === "") {
    return;
  }
  fetch(`https://api.punkapi.com/v2/beers?abv_gt=${searchInput}`)
    .then((res) => res.json())
    .then((beersArr) => {
      console.log(beersArr);
      if (beersArr.statusCode === 400) {
        document.querySelector("#search-form").reset();
        alert("That's not a number!");
        return;
      }
      const beerClass = document.querySelectorAll(".beerContent");
      if (beerClass.length > 0) {
        beerClass.forEach((beer) => {
          beer.remove();
          // document.querySelector("#backButton").style.display = "block" uncomment to add the back button
        });
      }
      document.querySelector("#beerBrowse").scrollTop = 0;
      document.querySelector("#backButton").style.display = "block";
      document.querySelector("#backButton").setAttribute("filter", "abv");
      document.querySelector("#pageButtons").style.display = "";
      document.querySelector("#nextButton").style.display = "none";
      document.querySelector("#previousButton").style.display = "none";
      document.querySelector("#pageIndex").style.display = "none";
      document.querySelector("#filters").style.display = "none";
      document.querySelector("#container").style.gridTemplateRows =
        "0.1fr 0.1fr 1fr";
      document.querySelector("#search-form").reset();
      renderBeer(beersArr);
    });
}

function searchByIbu(e) {
  e.preventDefault();
  let searchInput = document.querySelector("#searchIbu-bar").value;
  if (searchInput === "") {
    return;
  }
  fetch(`https://api.punkapi.com/v2/beers?ibu_gt=${searchInput}`)
    .then((res) => res.json())
    .then((beersArr) => {
      if (beersArr.statusCode === 400) {
        document.querySelector("#searchIbu-form").reset();
        alert("That's not a number!");
        return;
      }
      const beerClass = document.querySelectorAll(".beerContent");
      if (beerClass.length > 0) {
        beerClass.forEach((beer) => {
          beer.remove();
          // document.querySelector("#backButton").style.display = "block" uncomment to add the back button
        });
      }
      document.querySelector("#beerBrowse").scrollTop = 0;
      document.querySelector("#backButton").style.display = "block";
      document.querySelector("#backButton").setAttribute("filter", "ibu");
      document.querySelector("#pageButtons").style.display = "";
      document.querySelector("#nextButton").style.display = "none";
      document.querySelector("#previousButton").style.display = "none";
      document.querySelector("#pageIndex").style.display = "none";
      document.querySelector("#filters").style.display = "none";
      document.querySelector("#container").style.gridTemplateRows =
        "0.1fr 0.1fr 1fr";
      document.querySelector("#searchIbu-form").reset();
      renderBeer(beersArr);
    });
}

function getRandomBeer() {
  fetch("https://api.punkapi.com/v2/beers/random")
    .then((res) => res.json())
    .then((randomBeer) => {
      let beerIndex = randomBeer[0].id;
      document.querySelector("#backButton").style.display = "block";
      document.querySelector("#nextButton").style.display = "none";
      document.querySelector("#previousButton").style.display = "none";
      document.querySelector("#pageIndex").style.display = "none";
      document.querySelector("#filters").style.display = "none";
      document.querySelector("#container").style.gridTemplateRows =
        "0.1fr 0.1fr 1fr";
      scrollPosition = document.getElementById("beerBrowse").scrollTop;
      let beerBrowse = document.querySelector("#beerBrowse");
      beerBrowse.style.gridTemplateColumns = "1fr";
      beerBrowse.style.overflowY = "hidden";
      let learnMoreButton = document.querySelector("#learnMore");
      learnMoreButton.style.display = "flex";
      beerContent = document.querySelectorAll(".beerContent");
      beerContent.forEach((beer) => {
        beer.style.display = "none";
      });
      document.querySelector(
        "#learnMoreName"
      ).innerText = `${randomBeer[0].name}`;
      document.querySelector(
        "#learnMoreIbu"
      ).innerText = `IBU: ${randomBeer[0].ibu}`;
      document.querySelector(
        "#learnMoreAbv"
      ).innerText = `ABV: ${randomBeer[0].abv}`;
      document.querySelector("#learnMoreDescription").innerText =
        randomBeer[0].description;
      document.querySelector(
        "#learnMoreFoodPairings"
      ).innerText = `Great Food Pairings: ${randomBeer[0].food_pairing}`;
      document.querySelector(
        "#learnMoreFirstBrewed"
      ).innerText = `First Brewed: ${randomBeer[0].first_brewed}`;
      document
        .querySelector("#addToFavorites")
        .setAttribute("index", randomBeer[0].id);
      if (randomBeer[0].image_url === null) {
        document.querySelector("#image").src =
          "https://images.punkapi.com/v2/keg.png";
        console.log("hello");
      } else {
        document.querySelector("#image").src = randomBeer[0].image_url;
      }

      fetch(`https://phase-1-project.onrender.com/favorites/${beerIndex}`)
        .then((res) => res.json())
        .then((favoriteData) => {
          if (favoriteData.heart === true) {
            document.querySelector("#favoriteButton").textContent =
              "Remove From Favorites ♥";
          } else {
            document.querySelector("#favoriteButton").textContent =
              "Add to Favorites ♡";
          }
        });
    });
}

function searchByName(e) {
  e.preventDefault();
  let searchInput = document.querySelector("#searchName-bar").value;
  if (searchInput === "") {
    return;
  }
  fetch(`https://api.punkapi.com/v2/beers?beer_name=${searchInput}`)
    .then((res) => res.json())
    .then((beersArr) => {
      if (beersArr.length === 0) {
        document.querySelector("#searchName-form").reset();
        alert("No Names Found");
        return;
      }
      const beerClass = document.querySelectorAll(".beerContent");
      if (beerClass.length > 0) {
        beerClass.forEach((beer) => {
          beer.remove();
        });
      }
      document.querySelector("#beerBrowse").scrollTop = 0;
      document.querySelector("#backButton").style.display = "block";
      document.querySelector("#backButton").setAttribute("filter", "name");
      document.querySelector("#pageButtons").style.display = "";
      document.querySelector("#nextButton").style.display = "none";
      document.querySelector("#previousButton").style.display = "none";
      document.querySelector("#pageIndex").style.display = "none";
      document.querySelector("#filters").style.display = "none";
      document.querySelector("#container").style.gridTemplateRows =
        "0.1fr 0.1fr 1fr";
      document.querySelector("#searchName-form").reset();
      renderBeer(beersArr);
    });
}

function renderBeer(beerArr) {
  beerArr.forEach((beer) => {
    let beerContent = document.createElement("div");
    beerContent.classList.add("beerContent");
    document.querySelector("#beerBrowse").appendChild(beerContent);
    let name = document.createElement("div");
    name.classList.add("name");
    name.textContent = beer.name;
    let ibu = document.createElement("div");
    ibu.classList.add("ibu");
    ibu.innerHTML = `IBU:<br><br>${beer.ibu}`;
    let abv = document.createElement("div");
    abv.classList.add("abv");
    abv.innerHTML = `ABV:<br><br>${beer.abv}%`;
    let tagLine = document.createElement("div");
    tagLine.classList.add("tagLine");
    tagLine.innerHTML = `<i>"${beer.tagline}"</i>`;

    let learnMore = document.createElement("button");
    learnMore.setAttribute("beerIndex", beer.id);
    learnMore.setAttribute("onclick", (onclick = "loadLearnMore(event)"));
    learnMore.classList.add("learnMore");
    learnMore.innerHTML = "Learn More";

    beerContent.append(name, ibu, abv, tagLine, learnMore);
  });
}

function loadLearnMore(e) {
  document.querySelector("#favoritesTab").style.display = "none";

  let beerIndex = e.target.attributes[0].textContent;
  fetch(`https://api.punkapi.com/v2/beers/${beerIndex}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data[0]);
      document.querySelector("#pageButtons").style.display = "";
      document.querySelector("#backButton").style.display = "block";
      document.querySelector("#nextButton").style.display = "none";
      document.querySelector("#previousButton").style.display = "none";
      document.querySelector("#pageIndex").style.display = "none";
      document.querySelector("#filters").style.display = "none";
      document.querySelector("#container").style.gridTemplateRows =
        "0.1fr 0.1fr 1fr";
      scrollPosition = document.getElementById("beerBrowse").scrollTop;
      let beerBrowse = document.querySelector("#beerBrowse");
      beerBrowse.style.gridTemplateColumns = "1fr";
      beerBrowse.style.overflowY = "hidden";
      let learnMoreButton = document.querySelector("#learnMore");
      learnMoreButton.style.display = "flex";
      beerContent = document.querySelectorAll(".beerContent");
      beerContent.forEach((beer) => {
        beer.style.display = "none";
      });
      if (data[0].image_url === null) {
        document.querySelector("#image").src =
          "https://images.punkapi.com/v2/keg.png";
      } else {
        document.querySelector("#image").src = data[0].image_url;
      }
      document.querySelector("#learnMoreName").innerText = `${data[0].name}`;
      document.querySelector("#learnMoreIbu").innerText = `IBU: ${data[0].ibu}`;
      document.querySelector("#learnMoreAbv").innerText = `ABV: ${data[0].abv}`;
      document.querySelector("#learnMoreDescription").innerText =
        data[0].description;
      document.querySelector(
        "#learnMoreFoodPairings"
      ).innerText = `Great Food Pairings: ${data[0].food_pairing}`;
      document.querySelector(
        "#learnMoreFirstBrewed"
      ).innerText = `First Brewed: ${data[0].first_brewed}`;
      document
        .querySelector("#addToFavorites")
        .setAttribute("index", data[0].id);

      fetch(`https://phase-1-project.onrender.com/favorites/${beerIndex}`)
        .then((res) => res.json())
        .then((favoriteData) => {
          if (favoriteData.heart === true) {
            document.querySelector("#favoriteButton").textContent =
              "Remove From Favorites ♥";
          } else {
            document.querySelector("#favoriteButton").textContent =
              "Add to Favorites ♡";
          }
        });
    });
}

function learnMoreBackButton(e, scrollPosition = 0) {
  document.querySelector("#beerBrowse").style.scrollBehavior = "auto";
  const backButton = document.querySelector("#backButton");
  if (
    backButton.getAttribute("filter") === "abv" ||
    backButton.getAttribute("filter") === "ibu" ||
    backButton.getAttribute("filter") === "name"
  ) {
    callBeer();
  }
  backButton.style.display = "none";
  document.querySelector("#nextButton").style.display = "";
  document.querySelector("#previousButton").style.display = "";
  document.querySelector("#pageIndex").style.display = "";
  document.querySelector("#filters").style.display = "";
  document.querySelector("#container").style.gridTemplateRows =
    "0.1fr 0.1fr 0.1fr 1fr";
  let beerBrowse = document.querySelector("#beerBrowse");
  beerBrowse.style.gridTemplateColumns = "1fr 1fr 1fr";
  beerBrowse.style.overflowY = "scroll";
  let learnMoreButton = document.querySelector("#learnMore");
  learnMoreButton.style.display = "none";
  beerContent = document.querySelectorAll(".beerContent");
  beerContent.forEach((beer) => {
    beer.style.display = "grid";
  });
  beerBrowse.scrollTo(0, scrollPosition);
  document.querySelector("#beerBrowse").style.scrollBehavior = "smooth";
}

function setToLearnMoreFavorites(e) {
  const beerIndex = e.target.parentElement.attributes[1].textContent;
  if (e.target.textContent === "Add to Favorites ♡") {
    fetch(`https://phase-1-project.onrender.com/favorites/${beerIndex}`, {
      method: "PATCH",
      body: JSON.stringify({
        heart: true,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      e.target.textContent = "Remove From Favorites ♥";
    });
  } else {
    fetch(`https://phase-1-project.onrender.com/favorites/${beerIndex}`, {
      method: "PATCH",
      body: JSON.stringify({
        heart: false,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      e.target.textContent = "Add to Favorites ♡";
    });
  }
}

function loadNextPage(e) {
  const pageIndex = document.querySelector("#pageIndex");
  if (pageNumber === 13) {
    return;
  } else {
    pageNumber++;
    pageIndex.innerText = `Page ${pageNumber}/13`;
  }
  callBeer(pageNumber);
}

function loadPreviousPage(e) {
  const pageIndex = document.querySelector("#pageIndex");
  if (pageNumber === 1) {
    return;
  } else {
    pageNumber--;
    pageIndex.innerText = `Page ${pageNumber}/13`;
  }
  callBeer(pageNumber);
}

function changePageIndex() {
  document.querySelector("#settingsTab").style.display = "none";
  document.querySelector("#favoritesTab").style.display = "none";
  document.querySelector("#backButton").style.display = "none";
  document.querySelector("#pageButtons").style.display = "";
  document.querySelector("#nextButton").style.display = "";
  document.querySelector("#previousButton").style.display = "";
  document.querySelector("#pageIndex").style.display = "";
  document.querySelector("#filters").style.display = "";
  document.querySelector("#container").style.gridTemplateRows =
    "0.1fr 0.1fr 0.1fr 1fr";
  let beerBrowse = document.querySelector("#beerBrowse");
  beerBrowse.style.gridTemplateColumns = "1fr 1fr 1fr";
  beerBrowse.style.overflowY = "scroll";
  let learnMoreButton = document.querySelector("#learnMore");
  learnMoreButton.style.display = "none";
  beerContent = document.querySelectorAll(".beerContent");
  beerContent.forEach((beer) => {
    beer.style.display = "grid";
  });
  document.querySelector("#pageIndex").textContent = "Page 1/13";
  pageNumber = 1;
  callBeer();
}

function loadFavorites() {
  const beerClass = document.querySelectorAll(".beerContent");
  if (beerClass.length > 0) {
    beerClass.forEach((beer) => {
      beer.remove();
    });
  }
  const LiClass = document.querySelectorAll(".favoriteLi");
  if (LiClass.length > 0) {
    LiClass.forEach((li) => {
      li.remove();
    });
  }

  document.querySelector("#beerBrowse").style.scrollBehavior = "smooth";
  document.querySelector("#beerBrowse").style.overflowY = "hidden";
  document.querySelector("#settingsTab").style.display = "none";
  document.querySelector("#beerBrowse").style.gridTemplateColumns = "1fr";
  document.querySelector("#favoritesTab").style.display = "flex";
  document.querySelector("#learnMore").style.display = "none";
  document.querySelector("#backButton").style.display = "none";
  document.querySelector("#pageButtons").style.display = "none";
  document.querySelector("#nextButton").style.display = "none";
  document.querySelector("#previousButton").style.display = "none";
  document.querySelector("#pageIndex").style.display = "none";
  document.querySelector("#filters").style.display = "none";
  document.querySelector("#container").style.gridTemplateRows = "0.1fr 1fr";
  fetch("https://phase-1-project.onrender.com/favorites")
    .then((res) => res.json())
    .then((datas) => {
      Promise.all(
        datas.map((favorite) => {
          if (favorite.heart === true) {
            return fetch(
              `https://api.punkapi.com/v2/beers/${favorite.id}`
            ).then((response) => response.json());
          }
        })
      ).then(([...promises]) => {
        const favoriteBeers = promises.filter(Boolean).map((fave) => fave[0]);

        const sortedFavoriteBeers = favoriteBeers.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });
        sortedFavoriteBeers.forEach((favorite) => {
          const favoritesList = document.querySelector("#favoritesList");
          const li = document.createElement("li");
          li.classList.add("favoriteLi");
          li.textContent = favorite.name;
          favoritesList.append(li);
          li.setAttribute("index", favorite.id);
          li.setAttribute("onclick", "loadFavoriteDetails(event)");
        });
      });
    });
}

function loadFavoriteDetails(e) {
  document.querySelector("#favoritesTab").style.display = "none";
  let beerIndex = e.target.attributes[1].textContent;
  fetch(`https://api.punkapi.com/v2/beers/${beerIndex}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("#pageIndex").style.display = "none";
      document.querySelector("#filters").style.display = "none";
      document.querySelector("#container").style.gridTemplateRows = "0.1fr 1fr";
      scrollPosition = document.getElementById("beerBrowse").scrollTop;
      let beerBrowse = document.querySelector("#beerBrowse");
      beerBrowse.style.gridTemplateColumns = "1fr";
      beerBrowse.style.overflowY = "hidden";
      let learnMoreButton = document.querySelector("#learnMore");
      learnMoreButton.style.display = "flex";
      beerContent = document.querySelectorAll(".beerContent");
      beerContent.forEach((beer) => {
        beer.style.display = "none";
      });
      if (data[0].image_url === null) {
        document.querySelector("#image").src =
          "https://images.punkapi.com/v2/keg.png";
      } else {
        document.querySelector("#image").src = data[0].image_url;
      }
      document.querySelector(
        "#learnMoreName"
      ).innerText = `Name: ${data[0].name}`;
      document.querySelector("#learnMoreIbu").innerText = `IBU: ${data[0].ibu}`;
      document.querySelector("#learnMoreAbv").innerText = `ABV: ${data[0].abv}`;
      document.querySelector("#learnMoreDescription").innerText =
        data[0].description;
      document.querySelector(
        "#learnMoreFoodPairings"
      ).innerText = `Great Food Pairings: ${data[0].food_pairing}`;
      document.querySelector(
        "#learnMoreFirstBrewed"
      ).innerText = `First Brewed: ${data[0].first_brewed}`;
      document
        .querySelector("#addToFavorites")
        .setAttribute("index", data[0].id);

      fetch(`https://phase-1-project.onrender.com/favorites/${beerIndex}`)
        .then((res) => res.json())
        .then((favoriteData) => {
          if (favoriteData.heart === true) {
            document.querySelector("#favoriteButton").textContent =
              "Remove From Favorites ♥";
          } else {
            document.querySelector("#favoriteButton").textContent =
              "Add to Favorites ♡";
          }
        });
    });
}

function loadSettings() {
  document.querySelector("#beerBrowse").style.scrollBehavior = "smooth";
  document.querySelector("#pageButtons").style.display = "none";
  document.querySelector("#filters").style.display = "none";
  document.querySelector("#beerBrowse").style.overflowY = "hidden";
  document.querySelector("#beerBrowse").style.gridTemplateColumns = "1fr";
  document.querySelector("#favoritesTab").style.display = "none";
  document.querySelector("#learnMore").style.display = "none";
  document.querySelector("#settingsTab").style.display = "grid";
  document.querySelector("#container").style.gridTemplateRows = "0.1fr 1fr";
  beerContent = document.querySelectorAll(".beerContent");
  beerContent.forEach((beer) => {
    beer.style.display = "none";
  });
}

function changeHeaderColor(e) {
  let newColor = e.target.value;

  document.documentElement.style.setProperty("--button", newColor);
  document.documentElement.style.setProperty("--theme-background", newColor);
  localStorage.setItem("color", newColor);
}

function changeLightDark(e) {
  if (colorMode === "light") {
    document.documentElement.style.setProperty("--content-text", "white");
    document.documentElement.style.setProperty(
      "--content-background",
      "#424242"
    );
    colorMode = "dark";
    localStorage.setItem("shade", "dark");
  } else {
    document.documentElement.style.setProperty("--content-text", "black");
    document.documentElement.style.setProperty("--content-background", "white");
    colorMode = "light";
    localStorage.setItem("shade", "light");
  }
}

function returnToTop() {
  document.querySelector("#topButton").style.display = "none";
  document.querySelector("#beerBrowse").scrollTop = 0;
}
