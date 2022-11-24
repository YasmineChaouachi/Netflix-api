// IMPORT PACKAGES
const express = require('express')
const app = express();

const port = 8800
const mongoose = require("mongoose")


// IMPORT DB
require("./config/db")

// RUN SERVER
app.listen(port, () => console.log(`🟢 server started on port ${port}`))