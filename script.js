const container = document.querySelector(".container");
const info = document.querySelector("#info");
const randomButton = document.getElementById("random-button");
const searchButton = document.getElementById("search-button");
const searchNumButton = document.getElementById("search-num-quotes");

function loading() {
  let loading = document.createElement("h3");
  loading.textContent = "Loading....";
  loading.setAttribute("id", "loading");
  container.appendChild(loading);
}

randomButton.addEventListener("click", (event) => {
  container.innerHTML = "";
  info.innerHTML = "";
  loading();
  getRandom();
});

function getRandom() {
  axios
    .get("http://ron-swanson-quotes.herokuapp.com/v2/quotes")
    .then((response) => {
      let loading = document.getElementById("loading");
      loading.remove();
      const random = response.data;
      let p = document.createElement("p");
      p.textContent = random[0];
      container.appendChild(p);
    });
}

searchButton.addEventListener("click", (event) => {
  container.innerHTML = "";
  info.innerHTML = "";
  loading();
  getSearchQuote();
});

function getSearchQuote() {
  console.log("hi");
}

searchNumQuotes.addEventListener("click", (event) => {
  container.innerHTML = "";
  info.innerHTML = "";
  loading();
  getNumQuotes();
});

function getNumQuotes() {
  console.log("hi");
}

function generateInfo() {
  axios
    .get("https://api.tvmaze.com/search/people?q=nick+offerman")
    .then((response) => {
      const json = response.data;
      let name = document.createElement("p");
      name.textContent = json[0].person.name;
      info.appendChild(name);

      let img = document.createElement("img");
      img.src = json[0].person.image.medium;
      info.appendChild(img);
    });
}
generateInfo();

// search the entire show by IMDB num https://api.tvmaze.com/lookup/shows?imdb=tt1266020
// https://api.tvmaze.com/search/people?q=nick+offerman
