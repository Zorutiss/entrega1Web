import './MyList.css'

export default function MyList({ myList, removeFromList }) {
  return (
    <div className="list-container">

      <h2 className="Lista">Mi Lista</h2>

      {myList.length === 0 && <p>No has añadido ninguna serie aún.</p>}

      <div className="list-panel">
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
      </div>

      <div className="end-list">
        <h2></h2>
      </div>

    </div>
  );
}
