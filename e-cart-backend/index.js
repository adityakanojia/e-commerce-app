const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');
const router = require("./routes/routes");

const port = process.env.PORT || 8000;
const connectionString = process.env.DB_CONNECTION_STRING;

app.use(cors())
app.use(express.json())
app.use("/",router)

mongoose.connect(connectionString).then(() => {
    console.log("connected to db")
    app.listen(port, () => console.log("server started"))
})

