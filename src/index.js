function currentTemp(response) {
  let currentTemp = document.querySelector("#current-temp");
let temperature = response.data.temperature.current;
  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.city;
  currentTemp.innerHTML = Math.round(temperature);
}

function searchCity(city) {
  let apiKey = "fac344c0db5f6d5ctc9743db656e4obf";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metrics`;
  axios.get(apiURL).then(currentTemp);
}

function pressButton(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar-input");
  
  searchCity(city.value);
}

let button = document.querySelector("#search-bar-search");
button.addEventListener("click", pressButton);

searchCity("New York");