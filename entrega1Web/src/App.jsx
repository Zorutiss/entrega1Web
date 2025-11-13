import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/Navbar.jsx'

function App() {

  //Para almacenar el resultado de la API
  const [results, setResults] = useState([]);
  const [selectedShow, setSelectedShow] = useSTate(null);
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

  

  return (
      <div>
        <Navbar/>
        </div>
  )
}

export default App
