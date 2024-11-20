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
  getForecast(response.data.city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "fac344c0db5f6d5ctc9743db656e4obf";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metrics`;
  axios(apiURL).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatDay(day.time)}</div>
    <div >
    <img class="weather-forecast-icon" src="${day.condition.icon_url}" />
    </div>
    <div class="weather-forecast-temperatures">
      <div class="weather-forecast-temperature">
        <strong>${Math.round(day.temperature.maximum)}°</strong>
      </div>
      <div class="weather-forecast-temperature">${Math.round(
        day.temperature.minimum
      )}°</div>
    </div>
  </div>
`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let button = document.querySelector("#search-bar-search");
button.addEventListener("click", pressButton);

searchCity("New York");
