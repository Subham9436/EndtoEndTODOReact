import { useState, useEffect } from "react";
import "./App.css";
import { TodoForm } from "./components/CreateToDo";
import { TodoList } from "./components/ToDoList";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todo, setTodo] = useState([]);

  // Fetch existing todos from the backend when the component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTodo(data); // Assuming the API returns an array of todos
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput(title)) return;

    const newTodo = createTodo(title, description);

    // Post new todo to the backend
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const savedTodo = await response.json(); // Assuming the API returns the saved todo
      setTodo((prevTodos) => addToDo(prevTodos, savedTodo));
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to delete todo");
      }

      setTodo((prevTodos) => prevTodos.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error.message);
      // Optionally show error to user
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="todo-app">
      <h1>React TO-DO App</h1>
      <TodoForm
        title={title}
        description={description}
        onTitleChange={(e) => setTitle(e.target.value)}
        onDescriptionChange={(e) => setDescription(e.target.value)}
        onSubmit={handleSubmit}
      />
      <TodoList todos={todo} onDelete={handleDelete} />
    </div>
  );
}

function createTodo(title, description) {
  return {
    _id: Date.now(),
    title: title.trim(),
    description: description.trim(),
  };
}

function addToDo(todo, newTodo) {
  return [...todo, newTodo];
}

function validateInput(title) {
  return title.trim() !== "";
}

export default App;
