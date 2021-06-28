//Requiring the installed packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const morgan = require("morgan");

//Requiring the different routes created
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

//Configuring dotenv to access the .env file
dotenv.config();

//Establishing DB connection using mongoose and connecting to MongoDB Atlas using the URL stored in .env file
mongoose.connect(process.env.mongo_url, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log("Connected to MongoDB");
});

//Using the apps
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts",postRoute);

//Configuring the node app to listen to the port number: 8800
app.listen(8800,()=>{
    console.log("Backend server is running");
})