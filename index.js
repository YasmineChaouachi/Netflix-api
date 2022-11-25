// IMPORT PACKAGES
const express = require('express')
const app = express();

const port = 8800
const mongoose = require("mongoose")

// IMPORT CONTROLLERS
const authenController = require("./routes/authenController")

// IMPORT DB
require("./config/db")

app.use(express.json())

// ROUTING
app.use("/api/auth", authenController)

// RUN SERVER
app.listen(port, () => console.log(`🟢 server started on port ${port}`))