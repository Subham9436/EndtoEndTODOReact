const mongoose = require("mongoose");

const mongoURI = process.env.DB_URL; // Access the MongoDB URI from the .env file
   mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => console.log("MongoDB connected"))
       .catch(err => console.error("MongoDB connection error:", err));
const TODO = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});
const todo = mongoose.model("TODO", TODO);
module.exports = {
  todo,
};
