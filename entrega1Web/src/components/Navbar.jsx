import {useState} from 'react'
import './Navbar.css'
export default function Navbar(){

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
        
        console.log("Texto buscado:", textoBusqueda);
    }

    return(
    <nav>
        <div className = "logoNavBar">
            <h1>TV Maze</h1>
        </div>
        

        <form className = "busqueda" onSubmit={handleSubmit}>
        <input
            type = "text"
            placeholder = "Nombre de película"
            value = {textoBusqueda}
            onChange = {handleChange}
        />
        <button type = "submit">Buscar</button>
        </form>

    </nav>  
    )
}