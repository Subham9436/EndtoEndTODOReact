export function TodoList({ todos, onDelete }) { 
  return (
    <div>
      {todos.map((t) => ( 
        <div key={t.id}>
          <h3>{t.title}</h3>
           <p>{t.description}</p>
          <button className="delete-btn" onClick={() => onDelete(t._id)}> 
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}


