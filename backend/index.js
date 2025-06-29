require('dotenv').config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.post("/todo", async function (req, res) {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You have given wrong inputs",
    });
    return;
  }
  const newTodo=await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });
  res.json({
    msg:"TO-DO Created",
    newTodo
  });
});

app.get("/todos", async function (req, res) {
  const todos = await todo.find({});
  res.json(todos);
});

app.put("/complete", async function (req, res) {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You have given wrong inputs",
    });
    return;
  }
  await todo.update(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );
  res.json({
    msg: "TO-DO Updated",
  });
});
// DELETE a TO-DO
app.delete("/todo/:id", async function (req, res) {// here we are passing the id as a URL parameter so that we can use req.params.id or req.params
  try {
    const { id } = req.params;
    
    // Use MongoDB's ObjectId properly
    const result = await todo.findByIdAndDelete(id);
    
    if (!result) {
      return res.status(404).json({ msg: "TO-DO not found" });
    }
    
    res.json({ msg: "TO-DO deleted successfully" });
  } catch (error) {
    console.error("Error deleting TO-DO:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`The port is running on ${port}`);
});
