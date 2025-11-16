import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import MyList from './components/MyList.jsx'

function App() {

  //Para almacenar el resultado de la API
  const [results, setResults] = useState([]);
  //Necesario para usar el overlay para mostrar la información de la serie al hacer click
  const [selectedShow, setSelectedShow] = useState(null);

  
  
  //Mostrar u ocultar el panel Mi Lista
  const [showListPanel, setShowListPanel] = useState(false);


  //Creación de la lista
  const [myList, setMyList] = useState(() => {
    const stored = localStorage.getItem("myList");
    return stored ? JSON.parse(stored) : [];
    });

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

            {show.image && <img src={show.image.medium} alt={show.name} 
            //Para poder ver la info de la serie
            onClick={() => setSelectedShow(show)}
            />}
            <h2>{show.name}</h2>
          </div> 
        ))}
      </div>
      


    {selectedShow && (
  <div className="modal-overlay" onClick={() => setSelectedShow(null)}>
    <div className="modal" onClick={(event) => event.stopPropagation()}>
      <h2>{selectedShow.name}</h2>

      {selectedShow.image && (
        <img src={selectedShow.image.medium} alt={selectedShow.name} />
      )}

      {selectedShow.summary && (
        <div className="summary" dangerouslySetInnerHTML={{ __html: selectedShow.summary }} />
      )}

      <div className="modal-buttons">
        <button onClick={() => addToList(selectedShow)}>Añadir a Mi Lista</button>
        <button onClick={() => setSelectedShow(null)}>Cerrar</button>
      </div>
    </div>
  </div>
)}

  

    </div>
  )
}

export default App
