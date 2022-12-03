import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useStore } from '../store/store'

type TConfigProps  = {
  subreddits: string[],
  setStoredData: (subreddit:string[]) => void,
  handleToggleConfig: () => void
}

type TCityWeather = {
  id: number,
  name: string,
  temp: number,
  main: string,
  description: string,
  icon: string
}

function ConfigOverlay({ subreddits, setStoredData, handleToggleConfig }:TConfigProps) {
  const { setWeatherState } = useStore()
  const weather:TCityWeather|undefined = useStore((state) => state.weather)
  const [ subredditInput, setSubredditInput ] = useState("")

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let newSubreddits = [...subreddits]
    if(subredditInput && subredditInput !== "") {
      newSubreddits.push(subredditInput)
      setStoredData(newSubreddits)
    }
    setSubredditInput("")
  }

  const handleRemoveSubreddit = (subreddit:string) => {
    let newSubreddits = [...subreddits].filter(s => s !== subreddit)
    setStoredData(newSubreddits)
  }

  const handleRemoveCity = () => {
    setWeatherState(undefined)
    handleToggleConfig()
  }

  return (
    <>
      <Modal.Header closeButton>
        <h2>Config</h2>
      </Modal.Header>
      <Modal.Body>
        {weather && (
          <div className="mb-4">
            <h4 className="h4">Weather</h4>
            <button className="btn btn-secondary" onClick={handleRemoveCity}>Remove city</button>
          </div>
        )}
        <h4 className="h4">Subreddits</h4>
        <div className="mb-3">
          {subreddits && subreddits.map((subreddit) => (
            <div key={subreddit} className="d-flex flex-row">
              <div className="mx-2">{subreddit}</div>
              <span onClick={() => handleRemoveSubreddit(subreddit)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16" style={{cursor: "pointer"}}>
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                </svg>
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group pb-2">
            <input
              className="form-control"
              value={subredditInput} 
              onChange={(e) => setSubredditInput(e.target.value)}
              name="subreddit"
              placeholder="e.g. worldnews"
              required
            >
            </input>
            <button className="btn btn-primary" type="submit">Add</button>
          </div>
        </form>
      </Modal.Body>
    </>
  )
}

export default ConfigOverlay