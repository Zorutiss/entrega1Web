import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/Navbar.jsx'

function App() {

  //Para almacenar el resultado de la API
  const [results, setResults] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const handleSearch = async (query) => {
      const apiRes = await fetch(`http://api.tvmaze.com/search/shows?q=${query}`);

        //Comprobamnos que se puede conectar
        if(!apiRes.ok){
          throw new Error("ERROR AL CONECTARSE A LA API"); 
        }

      //Hacemos un try catch para asegurarnos de que
      // funciona la API
      try{
        const data = await apiRes.json();
        console.log(data);
        setResults(data.map(item => item.show))
      }catch{
        console.Error("ERROR AL RECIBIR RESPUESTA DE LA API", error);
      }
  };

  const handleCloseModal = () => selectedShow(null);
  

  return (
      <div className = "App">
        <Navbar onSearch = {handleSearch}/>
        <div className = "Results">
          {results.map(show => (
            <div key={show.id} className='show-card'>
                
                {show.image && <img src={show.image.medium} alt={show.name} />}
                <h2>{show.name}</h2>
                <p>{show.summary?.replace(/<[^>]*>/g, "")}</p>
                
            </div>
          ))}
        </div>
      </div>
      
  )
}

export default App
