let weather = {
    //"apiKey": [put youre api key from https://openweathermap.org],
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=fr&appid=" + this.apiKey
        ).then((res) => res.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temperature").innerText = Math.round(temp) + "°C";
        document.querySelector(".humidity").innerText = "Taux d'humidité: " + humidity + "%";
        document.querySelector(".wind").innerText = "Vent: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button")
.addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar")
.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Paris");