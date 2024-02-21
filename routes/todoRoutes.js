const express = require("express");
const router = express.Router();
const TodoList  = require("../controllers/todoController")
router.post("/create",TodoList.create);
router.get("/getAll", TodoList.allTodo);
router.get("/get/:id", TodoList.fetchTodo);
router.put("/update/:id",TodoList.updateTodo);
router.delete("/delete/:id", TodoList.deleteTodo);

module.exports = router;
