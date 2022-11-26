import axios from 'axios'

type TCityData = {
  lat: number,
  lon: number
}

export default async function fetchCityCoords(city:string) {
  let data:TCityData = {
    lat: 0,
    lon: 0
  }

  await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=8fc4b4a184853a9401cf6545be8578b3`)
    .then(res => data = res.data[0])

  return data
}