const auth = "563492ad6f91700001000001e006713990f24f83a3060b9ee15ea20e"; //ADD THE AUTH KEY
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;

//Eventlsteners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json", Authorization: auth },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const gallerryImage = document.createElement("div");
    gallerryImage.classList.add("gallery-img");
    gallerryImage.innerHTML = `
    <div class = gallery-info>
    <p>${photo.photographer}</p>
    <a href =${photo.src.original}>Download</a>
    </div>
    <img src= ${photo.src.large}></img>`;
    gallery.appendChild(gallerryImage);
  });
}

async function curatedPhotos() {
  const data = await fetchApi("https://api.pexels.com/v1/curated?per_page=1");
  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${query}+query&per_page=1`
  );
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}
curatedPhotos();
