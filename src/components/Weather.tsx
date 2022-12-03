import { useState, useEffect, useRef } from 'react'
import { useStore } from '../store/store'
import axios from 'axios'

type TCoords = {
  lat: string|undefined,
  long: string|undefined
}

type TCityWeather = {
  id: number,
  name: string,
  temp: number,
  main: string,
  description: string,
  icon: string
}

function Weather() {
  const { setWeatherState } = useStore()
  const weather:TCityWeather|undefined = useStore((state) => state.weather)
  const [ loaded, setLoaded ] = useState(false)
  const cityRef = useRef<HTMLInputElement>(null)

  const weatherFetch = async (coords:TCoords) => {
    const weatherRes = await axios.get(`/.netlify/functions/netlifyCityWeather?lat=${coords.lat}&long=${coords.long}`)
    setWeatherState(weatherRes.data)
  }

  useEffect(() => {
    const init = async () => {
      const storedCityData = window.localStorage.getItem("coords")
      if(storedCityData) {
        await weatherFetch(JSON.parse(storedCityData))
      }
      setLoaded(true)
    }
    init()
  }, [])

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      if(lat && long) {
        const coordsObj = {
          lat: lat.toString(), 
          long: long.toString()
        }
        
        window.localStorage.setItem("coords", JSON.stringify(coordsObj))
        weatherFetch(coordsObj)
      }
    })
  }

  const handleChooseCity = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!cityRef.current) { return }
    const city = cityRef.current.value
    const coordsRes = await axios.get(`/.netlify/functions/netlifyCityCoords?city=${city}`)
    const coordsObj:TCoords = { 
      lat: coordsRes.data.lat, 
      long: coordsRes.data.lon 
    }
    
    window.localStorage.setItem("coords", JSON.stringify(coordsObj))
    cityRef.current.value = ""
    weatherFetch(coordsObj)
  }

  return (
    <>
    {loaded && !weather && (
      <div className="d-flex justify-content-center align-items-center mb-3">
        <div className="row mb-3">
          <div className="col-12 col-md-5 d-flex justify-content-center align-items-center">
            <button className="col btn btn-secondary" onClick={handleGetLocation}>Get location for weather</button>
          </div>
          <div className="col-12 col-md-2 py-3 py-md-0 d-flex justify-content-center align-items-center">or</div>
          <div className="col-12 col-md-5 d-flex justify-content-center align-items-center">
            <form className="col" onSubmit={handleChooseCity}>
              <div className="input-group">
                <input
                  className="form-control"
                  ref={cityRef} 
                  name="subreddit"
                  placeholder="Auckland,NZ"
                  required
                >
                </input>
                <button className="btn btn-secondary" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
    {loaded && weather && (
      <div className="d-flex align-items-center mb-3">
        <div className="row">
          <div className="col-sm-auto">
            <img width={50} src={`https://openweathermap.org/img/w/${weather.icon}.png`} />
          </div>
          <span className="col d-flex align-items-center">{weather.temp}° {weather.description} in {weather.name}</span>
        </div>
      </div>
    )}
    </>
  )
}

export default Weather