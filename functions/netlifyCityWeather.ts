import qs from 'qs'
import axios from 'axios'

type TCityWeatherData = {
  id: number,
  name: string,
  temp: number,
  main: string,
  description: string,
  icon: string
}

exports.handler = async (event, context) => {
  const API_PARAMS = qs.parse(event.queryStringParameters)
  let data:TCityWeatherData|undefined
  const coords = {
    lat: API_PARAMS.lat?.toString(),
    long: API_PARAMS.long?.toString()
  }
  
  API_PARAMS.city?.toString()
  if(!coords.lat || !coords.long) { 
    return {
      statusCode: 422,
      body: JSON.stringify({ message: "Please include coords" })
    }
  }

  await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${coords.lat}&lon=${coords.long}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
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

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}