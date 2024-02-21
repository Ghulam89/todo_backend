const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors");
const connect = require("./config/db");
const bodyParser = require("body-parser");

// database connection

connect();
app.use(bodyParser.json());
app.use("/Images", express.static("Images"));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ msg: "welcome to ecommerce" });
});

// add middleware
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// app.use(errorMiddleware())

const port = 5000;

app.listen(port, () => {
  console.log(`your server is running at port number ${port}`);
});
