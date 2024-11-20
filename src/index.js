function currentTemp(response) {
  let currentTemp = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  let h1 = document.querySelector("#city");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#weather-now-emoji");

  h1.innerHTML = response.data.city;
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = response.data.wind.speed;
  description.innerHTML = response.data.condition.description;
  currentTemp.innerHTML = Math.round(temperature);
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-emoji" />`;
}

function formateDescription(emoji) {
  if (description === "broken clouds") {
    let emoji = document.querySelector("#weather-now-emoji");
    emoji.innerHTML = url(
      "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
    );
  }
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
