const express = require("express");
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const router = require('./routes')

app.use(cors())
app.use(express.json())
app.use('/api/v1', router)


app.listen(3000, ()=> {
    console.log("server is running")
})
