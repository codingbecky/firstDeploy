const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

const uri = process.env.DATABASE_URI;
mongoose.connect(uri, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//require the route file
const exerciseRouter = require("./routes/exercises");

app.use("/exercises", exerciseRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
