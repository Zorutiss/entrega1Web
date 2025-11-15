import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import MyList from './components/MyList.jsx'

function App() {

  //Para almacenar el resultado de la API
  const [results, setResults] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  
  //Creación de la lista
  const [myList, setMyList] = useState([]);
  //Mostrar u ocultar el panel Mi Lista
  const [showListPanel, setShowListPanel] = useState(false);


  //Cargar la lista desde localStorage
  useEffect(() => {
    const storedList = localStorage.getItem("myList");
    if (storedList) {
      setMyList(JSON.parse(storedList));
    }
  }, []);
  //Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList));
  }, [myList]);

  //Conexion a TV Maze
  const handleSearch = async (query) => {
    const apiRes = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
     //Comprobamnos que se puede conectar
    if (!apiRes.ok) {
      throw new Error("ERROR AL CONECTARSE A LA API");
    }
    //Hacemos un try catch para asegurarnos de que
      // funciona la API
    try {
      const data = await apiRes.json();
      setResults(data.map(item => item.show));
    } catch (error) {
      console.error("ERROR AL RECIBIR RESPUESTA DE LA API", error);
    }
  };

  //Añadir serie a la lista
  const addToList = (show) => {
    if (!myList.find(item => item.id === show.id)) {
      setMyList([...myList, show]);
    }
  };

  //Eliminar serie de la lista
  const removeFromList = (id) => {
    setMyList(myList.filter(show => show.id !== id));
  };
 
  return (
    <div className="App">
      <Navbar 
        onSearch={handleSearch} 
        onToggleList={() => setShowListPanel(!showListPanel)}/>

      {showListPanel && (
        <MyList 
          myList={myList}
          removeFromList={removeFromList}/>
      )}

      <div className="Results">
        {results.map(show => (
          <div key={show.id} className='show-card'>

            {show.image && <img src={show.image.medium} alt={show.name} />}
            <h2>{show.name}</h2>
            <button onClick={() => addToList(show)}>Añadir a Mi Lista</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
