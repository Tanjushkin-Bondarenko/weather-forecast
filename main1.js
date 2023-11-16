let link = [
    kievLink = "http://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f&units=metric",
    londonLink = "http://api.openweathermap.org/data/2.5/weather?id=2643743&appid=bf35cac91880cb98375230fb443a116f&units=metric",
    newYorkLink = "http://api.openweathermap.org/data/2.5/weather?id=5128638&appid=bf35cac91880cb98375230fb443a116f&units=metric",
    
    kievTreeDays = "http://api.openweathermap.org/data/2.5/forecast?q=Kyiv&appid=ee6e6f1c8c4fb651379b1c6860d3cb27",
    londonTreeDays = "http://api.openweathermap.org/data/2.5/forecast?q=London&appid=b644f05b948b65eda83251ab3f18331f",
    newYorkTreeDays = "http://api.openweathermap.org/data/2.5/forecast?q=New%20York&appid=6bdb396f1f21e5657c3e9bf5df995f7f"

]

class Forecast {
    constructor() {
        this.main = document.querySelector("main")
        this.city = document.createElement("div")
        this.blockForecust = document.createElement("div")
        this.degreesBlock = document.createElement("div")
        this.degree = document.createElement("div")
        this.feelsLike = document.createElement("div")
        this.btnCelsius = document.createElement("button")
        this.skyBlock = document.createElement("div")
        this.sky = document.createElement("img")
        this.skyDeskription = document.createElement("div")
        this.btnDetail = document.createElement("button")
        this.blockDetail = document.createElement("div")
        this.sunRise = document.createElement("div")
        this.sunSet = document.createElement("div")
        this.pressure = document.createElement("div")
        this.humidity = document.createElement("div")
        this.visibility = document.createElement("div")
        this.gust = document.createElement("div")
        this.speed = document.createElement("div")
    }
    createForecast(link) {
        fetch(link)
            .then(response => response.json())
            .then(json => {
                this.createCityBlock()
                this.city.innerHTML = json.name;
                this.createDegreesBlock()
                this.degree.innerHTML = Math.round(json.main.temp) + " C";
                this.feelsLike.innerHTML = "fels like" + Math.round(json.main.feels_like) + " C";
                this.btnCelsius.addEventListener("click", () => this.showInCelsius(json))
              this.createSkyBlock()
                this.sky.src = "http://openweathermap.org/img/wn/" + json.weather[0]['icon'] + "@2x.png";
                this.skyDeskription.innerHTML = json.weather[0].description;
                this.sunRise.innerHTML = "Sunrise: " + new Date(+(`${json.sys.sunrise}` + "000")).toLocaleTimeString();
                this.sunSet.innerHTML = "Sunset: " + new Date(+(`${json.sys.sunset}` + "000")).toLocaleTimeString()
                this.humidity.innerHTML = "Humidity: " + json.main.humidity + "%";
                this.pressure.innerHTML = "Atmospheric pressure: " + json.main.pressure + " hPa";
                this.visibility.innerHTML = "Visibility: " + json.visibility + " meter";
                this.gust.innerHTML = "Wind gust: " + json.wind.gust + " meter/sec";
                this.speed.innerHTML = " Wind speed: " + json.wind.speed + " meter/sec";
                this.createDetailBlock()
                this.btnDetail.addEventListener("click", () => this.showDetailForecast())
            })
    }; 
    createCityBlock() {
        this.city.classList.add("name")
        this.blockForecust.classList.add("city")
        this.divNameCity = document.createElement("div")
        this.divNameCity.classList.add("city_name_block")
        this.btnFourDays = document.createElement("button")
        this.btnFourDays.classList.add("btn_three_days")
        this.btnFourDays.innerHTML = "forecast for 3 days"
        this.divNameCity.append(this.city)
        this.divNameCity.append(this.btnFourDays)
        this.blockForecust.append(this.divNameCity)
    };
    createDegreesBlock() {
        this.degreesBlock.classList.add("degrees_block")
        this.degree.classList.add("degrees")
        this.feelsLike.classList.add("feels_like")
        this.btnCelsius.classList.add("btn_in_celsius")
        this.btnCelsius.innerHTML = "in Fahrenheit"
        this.degreesBlock.append(this.degree)
        this.degreesBlock.append(this.feelsLike)
        this.degreesBlock.append(this.btnCelsius)
        this.blockForecust.append(this.degreesBlock)
    };
    createSkyBlock() {
        this.skyBlock.classList.add("sky_block")
        this.sky.classList.add("sky")
        this.skyDeskription.classList.add("sky_description")
        this.btnDetail.classList.add("btn_in_detail")
        this.btnDetail.textContent = "detailed forecast"
        this.skyBlock.append(this.sky)
        this.skyBlock.append(this.skyDeskription)
        this.skyBlock.append(this.btnDetail)
        this.blockForecust.append(this.skyBlock)
    };
    createDetailBlock() {
        this.blockDetail.classList.add("block_detail")
        this.blockDetail.innerHTML = "Detail forecast"
        this.blockDetail.style.display = "none"
        this.blockDetail.append(this.sunRise)
        this.blockDetail.append(this.sunSet)
        this.blockDetail.append(this.humidity);
        this.blockDetail.append(this.pressure);
        this.blockDetail.append(this.visibility);
        this.blockDetail.append(this.speed);
        this.main.append(this.blockForecust)
        this.main.append(this.blockDetail)
    };
    showInCelsius(data) {
        if (this.btnCelsius.innerHTML == "in Fahrenheit") {
            this.degree.innerHTML = Math.round(data.main.temp + 273.15) + " F";
            this.btnCelsius.innerHTML = "in Celsius"
            this.feelsLike.innerHTML = "feels like" + Math.round(data.main.feels_like + 273.15) + " F";
        } else {
            this.btnCelsius.innerHTML = "in Fahrenheit";
            this.degree.innerHTML = Math.round(data.main.temp) + " C";
            this.feelsLike.innerHTML = "feels like" + Math.round(data.main.feels_like) + " C";
        }
    };
    showDetailForecast() {
        if (this.blockDetail.style.display == "none") {
            this.blockDetail.style.display = "block"
        } else { this.blockDetail.style.display = "none" }
    }
    
}


let kievWeatherForecast = new Forecast();
kievWeatherForecast.createForecast(kievLink);
let londonWeatherForecast = new Forecast();
londonWeatherForecast.createForecast(londonLink);
let newYorkWeatherForecast = new Forecast();
newYorkWeatherForecast.createForecast(newYorkLink);



