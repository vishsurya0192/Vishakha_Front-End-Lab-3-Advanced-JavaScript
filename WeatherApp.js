const input = document.getElementById("SearchBox");
input.addEventListener("keypress", function(event){
  if(event.key == "Enter") {
    getWeatherResult(event.target.value);
  }
})

const api = {
  url:"https://api.openweathermap.org/data/2.5/weather?q=",
  key:"0ab86dc76f059b71fab8229fa2c3819e"
}

function getWeatherResult(city) {
  fetch(`${api.url}${city}&appid=${api.key}&units=metric`)
  .then((data)=> data.json())
  .then((result)=> displayWeather(result));
}

function displayWeather(result) {
  const city = document.querySelector("#city");
  const date = document.querySelector("#date");
  const temp = document.querySelector("#temperature");
  const weather = document.querySelector("#weather");
  const range = document.querySelector("#hi-low");

  city.innerText = result.name +", "+ result.sys.country;
  date.innerText = buildFormatDate();
  temp.innerText = result.main.temp;
  weather.innerText = result.weather[0].description;
  range.innerText = Math.floor(result.main.temp_min) + "°C / "+ Math.floor(result.main.temp_max) + "°C";

}

function buildFormatDate() {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const currentDate = new Date();
  const day = days[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const date = currentDate.getDate();
  return `${day} ${date} ${month} ${year}`

}
window.onload = getResults('San Francisco');