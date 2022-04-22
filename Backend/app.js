const mongoose = require("mongoose");
const express = require("express");
const applicationRunning = require("./router/api.js");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require('./router/Student');
const env = require("dotenv");



const app = express();
const port = 3001;
const hostname = "localhost";
const cookieParser = require("cookie-parser");



app.use(cookieParser());
app.use(express.json());
app.use(cors());
// app.use(require("./router/StudentRoute.js"));
env.config();

const uri = "mongodb+srv://mit1234:Amit*2021@cluster0.66ovh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&ssl=true"

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/api", applicationRunning);
app.use("/api/student",userRoute);

app.listen(process.env.PORT||3001, () => {
  console.log("Server running");
});