import './MyList.css'
export default function MyList({ myList, removeFromList }) {
  return (
    <div className="list-panel">
      <h2>Mi Lista</h2>

      {myList.length === 0 && <p>No has añadido ninguna serie aún.</p>}

      {myList.map(show => (
        <div key={show.id} className="list-item">
          
          {show.image && (
            <img src={show.image.medium} alt={show.name} />
          )}

          <div>
            <h3>{show.name}</h3>
            <button onClick={() => removeFromList(show.id)}>
              Eliminar
            </button>
          </div>
        </div>
        
      ))}
      <div className="end-list">
                <h2></h2>
            </div>
    </div>
    
  );
}
