import {useState} from 'react'

export default function Navbar(){

    
    const [textoBusqueda, setTextoBusqueda] = useState("");

    const handleChange = (event) => {
        setTextoBusqueda(event.target.value);
    }

    const handleSubmit = (event) => {
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
            placeholder = "Introduce el nombre de una película"
            value = {textoBusqueda}
            onChange = {handleChange}
        />
        <button type = "submit">Buscar</button>
        </form>

    </nav>  
    )
}