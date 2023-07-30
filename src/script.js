function forcast() {
  let forcast = document.querySelector(".forcast");

  let html = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    html =
      html +
      `<div class="col-2 px-4">
            <div class="forcast-date">${day}</div>
            <div>
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png"
                alt=""
                class="forcast-img"
              />
              <div class="forecast-temp">
                <span class="forcast-max">18</span>°
                <span class="forcast-min"> 12°</span>
              </div>
          </div>
        </div>`;
  });

  html = html + `</div>`;
  forcast.innerHTML = html;
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
}

search("Tehran");

let form = document.querySelector("#sesarchForm");
form.addEventListener("submit", submit);

forcast();
