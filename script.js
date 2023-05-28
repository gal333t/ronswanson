const container = document.querySelector(".container");
const info = document.querySelector("#info");
const randomButton = document.getElementById("random-button");
const searchButton = document.getElementById("search-button");
const searchNumButton = document.getElementById("search-num-quotes");

function loading() {
  let loading = document.createElement("h3");
  let loadingImg = document.createElement("img");
  loadingImg.src =
    "https://media2.giphy.com/media/XW7QL1Oj14vuKNrcgo/giphy.gif?cid=ecf05e4759rhzu3exw45c756nfjon7f0j33kr8tmat2xqjwu&ep=v1_gifs_related&rid=giphy.gif&ct=g";
  loading.textContent = "Loading....";
  loadingImg.setAttribute("id", "loading");
  container.appendChild(loading);
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

searchNumButton.addEventListener("click", (event) => {
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
