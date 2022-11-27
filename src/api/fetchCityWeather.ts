import axios from 'axios'

type TCityWeatherData = {
  id: number,
  name: string,
  temp: number,
  main: string,
  description: string,
  icon: string
}

export default async function fetchCityWeather({ lat, long }:{ lat:number, long:number }) {
  let data:TCityWeatherData = {
    id: 0,
    name: "",
    temp: 0,
    main: "",
    description: "",
    icon: ""
  }

  await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    .then(res => {
      data = {
        id: res.data.id,
        name: res.data.name,
        temp: res.data.main.temp,
        main: res.data.weather[0].main,
        description: res.data.weather[0].description,
        icon: res.data.weather[0].icon
      }
    })

  return data
}