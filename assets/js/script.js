const apiKey = "623e9032c9f9cf85d8db90c25579c5ff";
const history = localStorage.getItem("searchHistory") || [];
if (history.length > 0) {
  renderHistory();
}

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
    renderForecast(data);
  });
};

const handleSearch = (event) => {
  event.preventDefault();
  const search = $(".search-input").val().trim();
  currentWeather(search);
  futureForecast(search);
  renderButton(search);
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
                <h2 class="cityName display-5">${data.name}</h2>
                <p>Temp: ${data.main.temp}°F</p>
                <p>Wind: ${data.wind.speed} MPH</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>UV Index: <span class="${color}">${data.current.uvi}</span></p>
              </div>
    `);
};

const renderForecast = (data) => {
  $(".forecast").empty();
  for (let i = 0; i < data.list.length; i += 8) {
    $(".forecast").append(`
      <div class="card col text-white">
              <p><strong>${data.list[i].dt_txt
                .split(" ")[0]
                .replace(/[-]/g, "/")}</strong></p>
              <img src="http://openweathermap.org/img/wn/${
                data.list[i].weather[0].icon
              }@2x.png" />
              <p>Temp: ${data.list[i].main.temp}°F</p>
              <p>Wind: ${data.list[i].wind.speed} MPH</p>
              <p>Humidity: ${data.list[i].main.humidity}%</p>
            </div>
      `);
  }
};

const renderHistory = (data) => {
  $(".searchHistory").empty();
  data.forEach((history) => {
    const button = $("<button>")
      .addClass("btn btn-secondary my-1 history")
      .text(history);
    $(".searchHistory").append(button);
  });
  localStorage.setItem("searchHistory", JSON.stringify(history));
};

const renderButton = (data) => {
  history.unshift(data);
  renderHistory(history);
};

const handleHistorySearch = (event) => {
  event.preventDefault();
  const search = $(event.target).text();
  currentWeather(search);
  futureForecast(search);
};

$(document).on("click", ".history", handleHistorySearch);
