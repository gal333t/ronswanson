const container = document.querySelector(".container");
const info = document.querySelector("#info");
const randomButton = document.getElementById("random-button");
const searchButton = document.getElementById("search-button");
const searchNumButton = document.getElementById("search-num-button");
let numberOfQuotes = document.getElementById("search-num-quotes");
let searchWord = document.getElementById("search-quote");

function loading() {
  let loading = document.createElement("h3");
  let loadingImg = document.createElement("img");
  loadingImg.src = "https://i.giphy.com/media/uLMxqxVvVtuVO/giphy.webp";
  loading.textContent = "Loading....";
  loading.setAttribute("id", "loading-text");
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
    .get("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
    .then((response) => {
      let loading = document.getElementById("loading");
      let loadingText = document.getElementById("loading-text");
      loadingText.remove();
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
      let searchResutls = response.data;

      if (searchResutls.length !== 0) {
        for (search of searchResutls) {
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
      let loadingText = document.getElementById("loading-text");
      loadingText.remove();
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
