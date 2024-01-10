
class DailyForecast{
    constructor() {
        
        this.dailyForecastBlock = document.querySelectorAll(".dailyForecastBlock")
        this.dailyFeelLike = document.createElement("div")
        this.maxTemparature = document.createElement("div")
        this.minTemparature = document.createElement("div")
        this.maxTemparature = document.createElement("div")
        this.dailyVind = document.createElement("div")
        this.dailyPressure = document.createElement("div")
        this.dailyHumidity = document.createElement("div")
        this.block
        this.dayBlock
    }
    
    createDailyForecast(link) {
        this.findCallingBlockName(link)
        let newDate;
        let dateArr = []
        let date = new Date();
        fetch(link)
            .then(response => response.json())
            .then(json => {
                let list = json.list
                list.forEach(el => {
                    let elDate = new Date(+(`${el.dt}` + "000")).toLocaleDateString()
                    if (date.toLocaleDateString() === elDate) {
                        return
                    } else {
                        dateArr.push(elDate)
                    }
                })
                let newDate = new Set(dateArr)
                this.createDayBlock(newDate)
                let days = document.querySelectorAll(".day_block")
                    list.forEach(element => {
                        for (let day of days) {
                            if(day.parentElement.dataset.city == this.block){
                            console.log(day)
                        if (day.dataset.date == (new Date(+(`${element.dt}` + "000")).toLocaleDateString()) && (new Date(+(`${element.dt}` + "000")).toLocaleTimeString()) == "02:00:00") {
                        this.createCurrentDay()
                        this.dailySky.src = "http://openweathermap.org/img/wn/" + element.weather[0]['icon'] + "@2x.png"
                        this.dailyDescription.innerHTML = element.weather[0].description
                        this.dailyTemp.innerHTML = Math.round(element.main.temp - 273.15) + "C"
                        day.append(this.dailySky)
                        day.append(this.dailyDescription)
                        day.append(this.dailyTemp)
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
                        this.dayDiv =document.createElement("div")
                        this.dayDiv.classList.add("dayDiv")

                        this.dayBlock.dataset.date = el
                        this.dayDiv.innerHTML = el
                        this.dayBlock.append(this.dayDiv)
                        element.append(this.dayBlock)
                       


                    })
                }
            }
        }
        
       
        
        
    }
     createCurrentDay(){
                        this.dailySky = document.createElement("img")
                        this.dailyDescription = document.createElement("div")
                        this.dailyTemp = document.createElement("div")
                        this.dailySky.classList.add("dailySky")
                        this.dailyDescription.classList.add("dailyDescription")
                        this.dailyTemp.classList.add("dailyTemp") 
                    
     }
}
