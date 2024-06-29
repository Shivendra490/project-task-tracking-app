const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: "*",
  })
);

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const boardRoutes = require("./routes/board");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/board", boardRoutes);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  return res.status(status).json({ message: err.message });
});

app.use((req,res,next)=>{
    res.status(404).json({message:"Page not found"})
})

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running at", port);
    });
  })
  .catch((err) => console.log("DB_ERR"));
