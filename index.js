const express = require("express");
const routes = require("./routes/genres");
const allMovies = require("./allMovies/allMovies");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use("/api/genres", routes);
app.use("/", allMovies);
mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => {
    console.log("connect to mongodb....");
  })
  .catch((er) => {
    console.log(er.message);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
