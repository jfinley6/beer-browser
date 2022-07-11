fetch("https://api.punkapi.com/v2/beers?page=1&per_page=27")
.then(res => res.json())
.then(data => console.log(data))

