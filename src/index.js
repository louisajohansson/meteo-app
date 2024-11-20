function currentTemp(response) {
  let currentTemp = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.city;

  console.log(response.data);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;

  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = response.data.wind.speed;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  currentTemp.innerHTML = Math.round(temperature);

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
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
