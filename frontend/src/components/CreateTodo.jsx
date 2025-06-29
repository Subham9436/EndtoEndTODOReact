
export function TodoForm({
  title,
  description,
  onTitleChange, 
  onDescriptionChange, 
  onSubmit,
}) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="Title"
            onChange={onTitleChange}
            value={title}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Description"
            onChange={onDescriptionChange}
            value={description}
          />
        </div>
        <button type="submit">Add TO-DO</button>
      </form>
    </div>
  );
}
