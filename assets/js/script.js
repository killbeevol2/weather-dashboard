const apiKey = "623e9032c9f9cf85d8db90c25579c5ff";
const history = localStorage.getItem("searchHistory") || [];
// 5 day forecast
api.openweathermap.org/data/2.5/forecast?q={city name}&appid=623e9032c9f9cf85d8db90c25579c5ff 
 
// current
api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}