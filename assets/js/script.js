const apiKey = "623e9032c9f9cf85d8db90c25579c5ff";
const history = localStorage.getItem("searchHistory") || [];

const currentWeather = (searchInput) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=imperial`;
  $.get(url, function (data) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`;
    $.get(url, function (data2) {
      const fullData = { ...data, ...data2 };
      renderWeather(fullData);
    });
  });
};

const futureForecast = (searchInput) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${apiKey}&units=imperial`;
  $.get(url, function (data) {
    // console.log(data);
  });
};

const handleSearch = (event) => {
  event.preventDefault();
  const search = $(".search-input").val().trim();
  currentWeather(search);
  futureForecast(search);
};
$(".searchBtn").on("click", handleSearch);

const renderWeather = (data) => {
  const uvi = parseInt(data.current.uvi);
  let color = "";
  switch (true) {
    case uvi < 3:
      color = "green";
      break;
    case uvi < 6:
      color = "yellow";
      break;
    case uvi < 8:
      color = "orange";
      break;
    case uvi <= 10:
      color = "red";
      break;
  }
  $(".mainResult").html(`
    <div class="mainResult container">
                <h2 class="cityName display-5">City Name</h2>
                <p>Temp: ${data.main.temp}</p>
                <p>Wind: ${data.wind.speed} MPH</p>
                <p>Humidity: ${data.main.humidity}</p>
                <p>UV Index: <span class="${color}">${data.current.uvi}</span></p>
              </div>
    `);
};

const renderForecast = (data) => {};
// every 8
