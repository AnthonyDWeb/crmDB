const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: "./config.env"});
// connect to MongoDB
mongoose.connect(process.env.DB, {useNewUrlParser: true}).then(console.log("Connected to MongoDB"));

const initialRouters = require('./routers/initial');
const contactRouters = require('./routers/contact');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/", initialRouters);
app.use("/contacts", contactRouters);


// Server Started
app.listen(process.env.PORT, ()=>{console.log("Server listening on port: ", process.env.PORT)});