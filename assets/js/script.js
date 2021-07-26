const apiKey = "623e9032c9f9cf85d8db90c25579c5ff";
const history = localStorage.getItem("searchHistory") || [];
const currentWeather = (searchInput) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}`;
  $.get(url, function (data) {
    console.log(data);
  });
};

const futureForecast = (searchInput) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${apiKey}`;
  $.get(url, function (data) {
    console.log(data);
  });
};
