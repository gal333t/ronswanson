const container = document.querySelector(".container");
const info = document.querySelector("#info");
const randomButton = document.getElementById("random-button");
const searchButton = document.getElementById("search-button");
const searchNumButton = document.getElementById("search-num-button");
let numberOfQuotes = document.getElementById("search-num-quotes");
let searchWord = document.getElementById("search-quote");

function loading() {
  let loadingImg = document.createElement("img");
  loadingImg.src = "https://i.giphy.com/media/uLMxqxVvVtuVO/giphy.webp";
  loadingImg.setAttribute("id", "loading");
  container.appendChild(loadingImg);
}

randomButton.addEventListener("click", (event) => {
  container.innerHTML = "";
  info.innerHTML = "";
  loading();
  getRandom();
});

function getRandom() {
  axios
    .get("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
    .then((response) => {
      let loading = document.getElementById("loading");
      loading.remove();
      const random = response.data;
      let p = document.createElement("p");
      p.classList.add("quote");
      p.textContent = random[0];
      container.appendChild(p);
    });
}

searchButton.addEventListener("click", (event) => {
  container.innerHTML = "";
  info.innerHTML = "";
  loading();
  getSearchQuote(searchWord.value);
});

function getSearchQuote(searchTerm) {
  axios
    .get(
      `https://ron-swanson-quotes.herokuapp.com/v2/quotes/search/${searchTerm}`
    )
    .then((response) => {
      let loading = document.getElementById("loading");
      loading.remove();
      let searchResults = response.data;
      if (searchResults.length !== 0) {
        for (search of searchResults) {
          let p = document.createElement("p");
          p.classList.add("quote");
          p.textContent = `"${search}"`;
          container.appendChild(p);
        }
      } else {
        let p = document.createElement("p");
        p.textContent = `Quote not found. Search for a different term`;
        container.appendChild(p);
      }
    });
}

searchNumButton.addEventListener("click", (event) => {
  container.innerHTML = "";
  info.innerHTML = "";
  loading();
  getNumQuotes(numberOfQuotes.value);
});

function getNumQuotes(num_of_q) {
  axios
    .get(`https://ron-swanson-quotes.herokuapp.com/v2/quotes/${num_of_q}`)
    .then((response) => {
      let loading = document.getElementById("loading");
      loading.remove();
      const random = response.data;
      console.log(random);

      for (quote of random) {
        let p = document.createElement("p");
        p.classList.add("quote");
        p.textContent = `"${quote}"`;
        container.appendChild(p);
      }
    });
  console.log("hi" + num_of_q + "bye");
}

function generateInfo() {
  axios.get("https://api.tvmaze.com/shows/174/cast").then((response) => {
    const json = response.data;
    let name = document.createElement("p");
    name.textContent = "Actor: " + json[1].person.name;
    info.appendChild(name);

    let character = document.createElement("p");
    character.textContent = "Character: " + json[1].character.name;
    info.appendChild(character);

    let img = document.createElement("img");
    img.src = json[0].character.image.original;
    info.appendChild(img);
  });
}
