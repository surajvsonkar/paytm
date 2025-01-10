const express = require('express')

const userRouter = express.Router()

userRouter.get('/', (req,res)=> {
    res.send("hello i am user")
})

module.exports = userRouter