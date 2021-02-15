const auth = "563492ad6f91700001000001e006713990f24f83a3060b9ee15ea20e"; //ADD THE AUTH KEY
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;

async function curatedPhotos() {
  const dataFetch = await fetch(
    "https://api.pexels.com/v1/search?query=nature&per_page=1",
    {
      method: "GET",
      headers: { Accept: "application/json", Authorization: auth },
    }
  );
  const data = await dataFetch.json();
  data.photos.forEach((photo) => {
    const gallerryImage = document.createElement("div");
    gallerryImage.classList.add("gallery-img");
    gallerryImage.innerHTML = `<img src= ${photo.src.large}></img>
    <p>${photo.photographer}</p>`;
    gallery.appendChild(gallerryImage);
  });
}
curatedPhotos();
