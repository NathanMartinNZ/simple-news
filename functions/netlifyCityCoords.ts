import qs from 'qs'
import axios from 'axios'

type TCityCoordsData = {
  lat: string,
  lon: string
}

exports.handler = async (event, context) => {
  const API_PARAMS = qs.parse(event.queryStringParameters)
  let data:TCityCoordsData|undefined
  const city = API_PARAMS.city?.toString()
  if(!city) { return {
    statusCode: 422,
    body: JSON.stringify({ message: "Please include a city" })
  }}
  
  await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    .then(res => data = res.data[0])

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}