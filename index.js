let link = [
    kievLink = "https://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f&units=metric",
    londonLink = "https://api.openweathermap.org/data/2.5/weather?id=2643743&appid=bf35cac91880cb98375230fb443a116f&units=metric",
    newYorkLink = "https://api.openweathermap.org/data/2.5/weather?id=5128638&appid=bf35cac91880cb98375230fb443a116f&units=metric",
]
let dailyLink = {
    Kyiv: "https://api.openweathermap.org/data/2.5/forecast?q=Kyiv&appid=ee6e6f1c8c4fb651379b1c6860d3cb27",
    London: "https://api.openweathermap.org/data/2.5/forecast?q=London&appid=b644f05b948b65eda83251ab3f18331f",
    New_York: "https://api.openweathermap.org/data/2.5/forecast?q=New%20York&appid=6bdb396f1f21e5657c3e9bf5df995f7f"
};

document.querySelector("#currentDate").innerHTML = new Date().toLocaleDateString();

class Forecast {
    constructor() {
        this.main = document.querySelector("main");
        this.city = document.createElement("div");
        this.blockForecust = document.createElement("div");
        this.dailyForecast = document.createElement("button");
        this.dailyForecastBlock = document.createElement("div");
        this.dailyForecastBlock.classList.add("dailyForecastBlock");
        this.degreesBlock = document.createElement("div");
        this.degree = document.createElement("div");
        this.feelsLike = document.createElement("div");
        this.btnCelsius = document.createElement("button");
        this.skyBlock = document.createElement("div");
        this.sky = document.createElement("img");
        this.skyDeskription = document.createElement("div");
        this.btnDetail = document.createElement("button");
        this.blockDetail = document.createElement("div");
        this.sunRise = document.createElement("div");
        this.sunSet = document.createElement("div");
        this.pressure = document.createElement("div");
        this.humidity = document.createElement("div");
        this.visibility = document.createElement("div");
        this.speed = document.createElement("div");
    }
    createForecast(link) {
        fetch(link)
            .then(response => response.json())
            .then(json => {
                this.createCityBlock()
                this.city.innerHTML = json.name;
                let arr = []
                json.name.split("").forEach(el =>
                { if (el === " ") el = "_"; arr.push(el) })
                this.dailyForecast.dataset.city = this.dailyForecastBlock.dataset.city = arr.join("");             
                this.dailyForecast.addEventListener("click", (e) => { 
                    if(this.blockDetail.style.display == "flex"){this.blockDetail.style.display = "none"}        
                    if (this.dailyForecastBlock.style.display == "none" && this.dailyForecastBlock.children.length == 0) {
                        this.dailyForecastBlock.style.display = "flex";
                        let dailyForecasts = new DailyForecast();
                        let nameLink = e.target.dataset.city;
                        for (let [key, value] of Object.entries(dailyLink)) {
                            if (`${key}` == nameLink) {
                                dailyForecasts.createDailyForecast(`${value}`)
                            }
                        }
                    }else if (this.dailyForecastBlock.children && this.dailyForecastBlock.style.display == "flex") {
                        this.dailyForecastBlock.style.display = "none";
                    }else if (this.dailyForecastBlock.children && this.dailyForecastBlock.style.display == "none"){
                        this.dailyForecastBlock.style.display = "flex";
                    }
                })

                this.createDegreesBlock();
                this.degree.innerHTML = Math.round(json.main.temp) + "C";
                this.feelsLike.innerHTML = "fels like " + Math.round(json.main.feels_like) + "C";
                this.btnCelsius.addEventListener("click", () => this.showInCelsius(json));
                this.createSkyBlock();
                this.sky.src = "http://openweathermap.org/img/wn/" + json.weather[0]['icon'] + "@2x.png";
                this.skyDeskription.innerHTML = json.weather[0].description;
                this.sunRise.innerHTML = "Sunrise: " + new Date(+(`${json.sys.sunrise}` + "000")).toLocaleTimeString();
                this.sunSet.innerHTML = "Sunset: " + new Date(+(`${json.sys.sunset}` + "000")).toLocaleTimeString();
                this.humidity.innerHTML = "Humidity: " + json.main.humidity + "%";
                this.pressure.innerHTML = "Atmospheric pressure: " + json.main.pressure + " hPa";
                this.visibility.innerHTML = "Visibility: " + json.visibility + " meter";
                this.speed.innerHTML = " Wind speed: " + json.wind.speed + " metre/sec";
                this.createDetailBlock();
                this.btnDetail.addEventListener("click", () => this.showDetailForecast())
            })
    }; 

    createCityBlock() {
        this.city.classList.add("name");
        this.blockForecust.classList.add("city");
        this.divNameCity = document.createElement("div");
        this.divNameCity.classList.add("city_name_block");
        this.dailyForecast.classList.add("dailyForecast");
        this.dailyForecast.innerHTML = "forecast for 5 days";
        this.divNameCity.append(this.city);
        this.divNameCity.append(this.dailyForecast);
        this.blockForecust.append(this.divNameCity);
    };

    createDegreesBlock() {
        this.degreesBlock.classList.add("degrees_block");
        this.degree.classList.add("degrees");
        this.feelsLike.classList.add("feels_like");
        this.btnCelsius.classList.add("btn_in_celsius");
        this.btnCelsius.innerHTML = "in Fahrenheit";
        this.degreesBlock.append(this.degree);
        this.degreesBlock.append(this.feelsLike);
        this.degreesBlock.append(this.btnCelsius);
        this.blockForecust.append(this.degreesBlock);
    };

    createSkyBlock() {
        this.skyBlock.classList.add("sky_block");
        this.sky.classList.add("sky");
        this.skyDeskription.classList.add("sky_description");
        this.btnDetail.classList.add("btn_in_detail");
        this.btnDetail.textContent = "detailed forecast";
        this.skyBlock.append(this.sky);
        this.skyBlock.append(this.skyDeskription);
        this.skyBlock.append(this.btnDetail);
        this.blockForecust.append(this.skyBlock);
    };

    createDetailBlock() {
        this.blockDetail.classList.add("block_detail");
        this.dailyForecastBlock.style.display = "none";
        this.blockDetail.style.display = "none";
        this.blockDetail.append(this.sunRise);
        this.blockDetail.append(this.sunSet);
        this.blockDetail.append(this.humidity);
        this.blockDetail.append(this.pressure);
        this.blockDetail.append(this.visibility);
        this.blockDetail.append(this.speed);
        this.main.append(this.blockForecust);
        this.main.append(this.blockDetail);
        this.blockForecust.after(this.dailyForecastBlock)
    };

    showInCelsius(data) {
        if (this.btnCelsius.innerHTML == "in Fahrenheit") {
            this.degree.innerHTML = Math.round(data.main.temp + 273.15) + "F";
            this.btnCelsius.innerHTML = "in Celsius";
            this.feelsLike.innerHTML = "feels like " + Math.round(data.main.feels_like + 273.15) + "F";
        } else {
            this.btnCelsius.innerHTML = "in Fahrenheit";
            this.degree.innerHTML = Math.round(data.main.temp) + "C";
            this.feelsLike.innerHTML = "feels like " + Math.round(data.main.feels_like) + " C";
        }
    };

    showDetailForecast() {
        if (this.blockDetail.style.display == "none") {
            if(this.dailyForecastBlock.style.display == "flex"){this.dailyForecastBlock.style.display = "none"};
            this.blockDetail.style.display = "flex";
        } else { this.blockDetail.style.display = "none" }
    }
}

let kievWeatherForecast = new Forecast();
kievWeatherForecast.createForecast(kievLink);
let londonWeatherForecast = new Forecast();
londonWeatherForecast.createForecast(londonLink);
let newYorkWeatherForecast = new Forecast();
newYorkWeatherForecast.createForecast(newYorkLink);

