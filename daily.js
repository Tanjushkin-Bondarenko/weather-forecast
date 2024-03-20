
 class DailyForecast{
    constructor() {
        
        this.dailyForecastBlock = document.querySelectorAll(".dailyForecastBlock")
        this.block
        this.dayBlock
        this.dateNameList = new Object();
        this.namesOfDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sutarday"]
    }
    
    createDailyForecast(link) {
        this.findCallingBlockName(link)
        let dateList = []
        let date = new Date();
        fetch(link)
            .then(response => response.json())
            .then(json => {
                let list = json.list
                list.forEach(el => {
                   
                    let elDate = new Date(+(`${el.dt}` + "000")).toLocaleDateString()
                    let nameOfDay = this.namesOfDay[new Date(+(`${el.dt}` + "000")).getDay()]
                      if (date.toLocaleDateString() === elDate) {
                        return
                    } else {
                          if(dateList.includes(elDate)){
                            return
                          }else{dateList.push(elDate)
                            this.dateNameList[`${elDate}`] = nameOfDay;
                        }
                    }
                })

                let newDate = new Set(dateList)
                this.createDayBlock(newDate)
                let days = document.querySelectorAll(".day_block")
                    list.forEach(element => {
                        for (let day of days) {
                            if(day.parentElement.dataset.city == this.block){
                        if (day.dataset.date == (new Date(+(`${element.dt}` + "000")).toLocaleDateString()) && (new Date(+(`${element.dt}` + "000")).toLocaleTimeString()) == "02:00:00") {
                        this.createCurrentDay();
                        this.dailySkyBlock = document.createElement("div");
                        this.dailySkyBlock.classList.add("dailySkyBlock");

                        this.dailySky.src = "http://openweathermap.org/img/wn/" + element.weather[0]['icon'] + "@2x.png";
                        this.dailyDescription.innerHTML = element.weather[0].description;
                        
                        this.dailyTempBlock = document.createElement("div");
                        this.dailyTempBlock.classList.add("dailyTempBlock");
                        this.dailyTemp.innerHTML = Math.round(element.main.temp - 273.15) + "C";
                        this.dailyFeelLike.innerHTML = "Feels Like " + Math.round(element.main.feels_like - 273.15) + "C";

                        this.dailyRestBlock = document.createElement("div");
                        this.dailyRestBlock.classList.add("dailyRestBlock");

                        this.dailyHumidity.innerHTML = "Humidity " + element.main.humidity + "%";
                        this.dailyPressure.innerHTML = "Atmospheric pressure " + element.main.pressure + "hPA";
                        this.dailyVind.innerHTML = "Wind speed: " + element.wind.speed + "metre/sec";
                        
                        day.append(this.dailySkyBlock);
                        this.dailySkyBlock.append(this.dailySky);
                        this.dailySkyBlock.append(this.dailyDescription);

                        day.append(this.dailyTempBlock);
                        this.dailyTempBlock.append(this.dailyTemp);
                        this.dailyTempBlock.append(this.dailyFeelLike);

                        day.append(this.dailyRestBlock);
                        this.dailyRestBlock.append(this.dailyHumidity);
                        this.dailyRestBlock.append(this.dailyPressure);
                        this.dailyRestBlock.append(this.dailyVind);
                        }}
                    }  
            }) 
        })        
     }
    findCallingBlockName(data) {
        for (let [key, value] of Object.entries(dailyLink)) {
            if (data == `${value}`) {
                this.block = `${key}`
            }
        }    
    }
    createDayBlock(data) {
        for (let element of this.dailyForecastBlock) {
            if (element.dataset.city == this.block) {
                if (document.querySelector("day_block")) {
                    return
                } else {
                    data.forEach(el => {
                        this.dayBlock = document.createElement("div")
                        this.dayBlock.classList.add("day_block")
                        this.dayDiv = document.createElement("div")
                        this.nameOfDayP = document.createElement("p")
                        this.nameOfDayP.innerHTML = this.dateNameList[el]
                        
                        this.dayDiv.classList.add("dayDiv")
                        this.dayBlock.dataset.date = el
                        this.dayDiv.innerHTML = el
                        this.dayBlock.append(this.dayDiv)
                        element.append(this.dayBlock)
                        this.dayDiv.append(this.nameOfDayP)
            
                    })
                }
            }
        }
    }
     createCurrentDay(){
    this.dailySky = document.createElement("img");
    this.dailyDescription = document.createElement("div");
    this.dailyTemp = document.createElement("div");
    this.dailyTemp.classList.add("dailyTemp"); 

    this.dailySkyDesciptBlock = document.createElement("div");
    this.dailySkyDesciptBlock.classList.add = "dailySkyDesciptBlock";

    this.dailySky.classList.add("dailySky");
    this.dailyDescription.classList.add("dailyDescription");
    
    this.dailyFeelLike = document.createElement("div");
    this.dailyFeelLike.classList.add("dailyFeelLike")

    this.dailyRestBlock = document.createElement("div");
    this.dailyRestBlock.classList.add("dailyRestBlock"); 
    this.dailyVind = document.createElement("div");
    this.dailyPressure = document.createElement("div");
    this.dailyHumidity = document.createElement("div");           
     }
}
