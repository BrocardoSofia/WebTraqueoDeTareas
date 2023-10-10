class Weather{
    constructor(main, description, icon, temp, temp_min, temp_max, humidity){
        this.main = main
        this.description = description
        this.icon = icon
        this.temp = temp
        this.temp_min = temp_min
        this.temp_max = temp_max
        this.humidity = humidity
    } 
}

async function getWeather(){
    const url = ("https://api.openweathermap.org/data/2.5/weather?q=London&appid="+"a39bf665486281158ba6fa28b34147ce")
    const options= {GET}

}