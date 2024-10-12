import {React, useEffect} from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations.jsx'
import LocationEvents from './pages/LocationEvents.jsx'
import Events from './components/Event.jsx'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/echolounge',
      element: <LocationEvents index={1} />
    },
    {
      path: '/houseofblues',
      element: <LocationEvents index={2} />
    },
    {
      path: '/pavilion',
      element: <LocationEvents index={3} />
    },
    {
      path: '/americanairlines',
      element: <LocationEvents index={4} />
    },
    {
      path: '/events',
      element: <Events />
    }
  ])
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/events')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        console.log(data)
      } catch (error) {
        console.error("Could not fetch events:", error)
      }
    };
    fetchEvents();
  }, [])

  return (
    <div className='app'>

      <header className='main-header'>
        <h1>UnityGrid Plaza</h1>

        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          <Link to='/events' role='button'>Events</Link>
        </div>
      </header>

      <main>

      </main>
    </div>
  )
}

export default App