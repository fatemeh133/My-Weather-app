function forcast(response) {
  let forcast = document.querySelector(".forcast");
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let html = `<div class="row">`;
  forecast.forEach(function (day, index) {
    if (index < 5) {
      html =
        html +
        `<div class="col-2 mx-2">
            <div class="forcast-date">${formatDay(day.time)}</div>
            <div>
              <img
                src="${day.condition.icon_url}"
                alt=""
                class="forcast-img"
              />
              <div class="forecast-temp">
                <span class="forcast-max">${Math.round(
                  day.temperature.maximum
                )}</span>°
                <span class="forcast-min"> ${Math.round(
                  day.temperature.minimum
                )}°</span>
              </div>
          </div>
        </div>`;
    }
  });

  html = html + `</div>`;
  forcast.innerHTML = html;
}

function getForcast(city) {
  let APIKey = "dfe65tb0afb4b600dd45b2f7o23f463d";
  let APIURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${APIKey}`;
  axios.get(APIURL).then(forcast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

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
  pic.alt = response.data.condition.icon;
  date.innerHTML = formatDate(response.data.time * 1000);
}
function submit(event) {
  event.preventDefault();
  let formInput = document.querySelector(".form-control");
  search(formInput.value);
}

function search(city) {
  let APIKey = "dfe65tb0afb4b600dd45b2f7o23f463d";
  let APIURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${APIKey}&units=metric`;
  axios.get(APIURL).then(Weather);
  getForcast(city);
}

search("Tehran");

let form = document.querySelector("#sesarchForm");
form.addEventListener("submit", submit);

forcast();
