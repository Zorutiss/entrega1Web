import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/Navbar.jsx'

function App() {

  const [results, setResults] = useState([]);
  const [selectedShow, setSelectedShow] = useSTate(null);
  const handleSearch = async (query) => {
    const apiRes = await fetch(`http://api.tvmaze.com/search/shows?q=${query}`)
  };
  return (
      <div>
        <Navbar/>
        </div>
  )
}

export default App
