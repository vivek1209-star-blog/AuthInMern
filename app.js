const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = require("./routes/user-routes");
app.use(express.json());
app.use("/api", router);
mongoose
  .connect(
    `mongodb+srv://vivek1209:mLLd6DdnoEeJ55Zy@cluster0.nojb4cx.mongodb.net/mern-auth?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
    console.log("Database is connected! Listening to localhost 5000");
  })
  .catch((err) => console.log(err));

