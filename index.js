 const express = require("express");

const { connectMongoDB } = require("./connection");
const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares");

const app = express();
const PORT = 8000;

// Connection
connectMongoDB("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(logReqRes("log.txt"));

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});