import create from 'zustand'


type TStore = {
  weather: TCityWeather|undefined,
  setWeatherState: (weatherRes:TCityWeatherData|undefined) => void
}

type TCityWeather = {
  id: number,
  name: string,
  temp: number,
  main: string,
  description: string,
  icon: string
}

type TCityWeatherData = {
  id: number,
  name: string,
  temp: number,
  main: string,
  description: string,
  icon: string
}

const useStore = create<TStore>((set) => ({
  weather: undefined,

  setWeatherState: (weatherRes) => {
    if(weatherRes === undefined) { window.localStorage.removeItem("coords") }
    set(() => ({ weather: weatherRes }))
  }


}))

export { useStore }