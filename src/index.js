function pressButton(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar-input");
  let h1 = document.querySelector("#name-of-city");
  h1.innerHTML = city.value;
}

let button = document.querySelector("#search-bar-search");
button.addEventListener("click", pressButton);
