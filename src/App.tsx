import React from 'react'
import { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import ConfigOverlay from './components/ConfigOverlay'
import Weather from './components/Weather'
import SubredditContainer from './components/SubredditContainer'


function App() {
  const [ subreddits, setSubreddits ] = useState<string[]>([])
  const [ loaded, setLoaded ] = useState(false)
  const [ showConfig, setShowConfig ] = useState(false)

  useEffect(() => {
    const storedData = window.localStorage.getItem("subreddits")
    if(storedData) {
      setSubreddits(storedData.split("|"))
    }
    setLoaded(true)
  }, [])

  const handleToggleConfig = () => {
    setShowConfig(!showConfig)
  }

  const setStoredData = (newSubreddits:string[]) => {
    window.localStorage.setItem("subreddits", newSubreddits.join("|"))
    setSubreddits(newSubreddits)
  }

  return (
    <div className="App">
      <div className="container">
        <header className="d-flex flex-wrap justify-content-between py-3 mb-4 border-bottom">
          <a href="/" className="d-flex align-items-center mb-md-0 me-md-auto text-dark text-decoration-none">
            <h1 className="h1 m-0">Simple News</h1>
          </a>
          <span className="d-flex align-items-center" onClick={() => handleToggleConfig()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
            </svg>
          </span>
        </header>
      </div>
      <div className="container">
        <Weather />
        {loaded && subreddits.length > 0 && (
          <div>
            {subreddits.map((subreddit) => (
              <SubredditContainer key={subreddit} subreddit={subreddit} />
            ))}
          </div>
        )}
        {loaded && !subreddits.length && (
          <div className="d-flex justify-content-center align-items-center">
            <div className="">
              <button className="btn btn-primary" onClick={() => handleToggleConfig()}>Add first subreddit</button>
            </div>
          </div>
        )}
        <Modal show={showConfig} onHide={handleToggleConfig} centered className="px-3">
          <ConfigOverlay subreddits={subreddits} setStoredData={setStoredData} handleToggleConfig={handleToggleConfig} />
        </Modal>
      </div>
    </div>
  );
}

export default App;
