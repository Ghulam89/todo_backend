const todoModel = require("../models/Todo");
const fs = require("fs");
class TodoList {
  async create(req, res) {
    const info = {
      name: req.body.name,
    };

    console.log(info);

    try {
      const todo = await todoModel.create(info);

      return res
        .status(201)
        .json({ message: "todo list add  successfully!", todo });
    } catch (error) {
      return res.status(500).json({ message: "internal server error!" });
    }
  }

  async allTodo(req, res) {
    try {
      const todo = await todoModel.find({});
      console.log(todo);

      return res.status(200).json({ todo });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Server internal error!");
    }
  }

  async fetchTodo(req, res) {
    const { id } = req.params;

    try {
      const response = await todoModel.find({ _id: id });
      return res.status(201).json({ todo: response });
    } catch (error) {
      console.log(error.message);
    }
  }

  async updateTodo(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      await todoModel.updateOne({ _id: id }, { $set: { name: name } });
      return res
        .status(200)
        .json({ message: "todo list  updated successfully!" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Server internal error!");
    }
  }

  async deleteTodo(req, res) {
    const { id } = req.params;
    try {
      await todoModel.deleteOne({ _id: id });
      return res
        .status(200)
        .json({ message: "Todo List  deleted successfully!" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Server internal error!");
    }
  }
}

module.exports = new TodoList();
