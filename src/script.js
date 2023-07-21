let APIKey = "dfe65tb0afb4b600dd45b2f7o23f463d";
let city = "Tehran";
let APIURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${APIKey}&units=metric`;

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[day]} ${hours}:${minutes}`;
}

function Weather(response) {
  console.log(response.data);
  let temperature = document.querySelector(".temperature");
  let description = document.querySelector(".weather-desc");
  let city = document.querySelector("#city");
  let Humidity = document.querySelector(".Humidity-num");
  let wind = document.querySelector(".wind-num");
  let pic = document.querySelector(".pic");
  let date = document.querySelector("#date");

  temperature.innerHTML = Math.round(response.data.temperature.current);
  description.innerHTML = response.data.condition.description;
  city.innerHTML = response.data.city;
  Humidity.innerHTML = Math.round(response.data.temperature.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  pic.src = response.data.condition.icon_url;
  date.innerHTML = formatDate(response.data.time * 1000);
}

axios.get(APIURL).then(Weather);
