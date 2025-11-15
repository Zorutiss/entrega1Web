import {useState} from 'react'
import './Navbar.css'
import MyList from './MyList.jsx'
export default function Navbar({onSearch, onToggleList}){

    //React vigila cuando cambia
    const [textoBusqueda, setTextoBusqueda] = useState("");

    //Funcion que maneja el evento cuando el usuario mete inputs en la barra de busqueda
    const handleChange = (event) => {
        setTextoBusqueda(event.target.value);
    }

    //Funcion que maneja el envio del formulario
    const handleSubmit = (event) => {

        //Bloqueamos que el navegador actualice la pagina
        event.preventDefault();
        
        //Mostramos por consola la busqueda
        console.log("Texto buscado:", textoBusqueda);
        //Evitamos busquedas que provoquen problemas
        if (textoBusqueda.trim() !== ""){
            onSearch(textoBusqueda);
        }
    }

    return(
    <nav>
        <div className = "logoNavBar">
            <h1>TV Maze</h1>
            
        </div>
        
        <div className = "listaButton">
            <button onClick = {onToggleList}>Mi Lista</button>
        </div>

        <form className = "busqueda" onSubmit={handleSubmit}>
        <input
            type = "text"
            placeholder = "Nombre de serie"
            value = {textoBusqueda}
            onChange = {handleChange}
        />
        <button type = "submit">Buscar</button>
        </form>

    </nav>  
    )
}