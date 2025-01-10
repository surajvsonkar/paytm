const express = require('express')
const z = require('zod')
const { User } = require('../db')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../config')

const userRouter = express.Router()

const userSchema = z.object({
    username: z.string().min(1, "username is required"), 
    password: z.string().min(6, "password must be atleast 6 characters"), 
    firstName: z.string().min(1, "first name is required"),
    lastName: z.string().min(1, "last name is required")
})

userRouter.get('/', (req,res)=> {
    res.send("hello i am user")
})

userRouter.post('/signup', async (req,res)=> {
    const result = userSchema.safeParse(req.body)

    if(!result.success) {
        return res.status(40).json(result.error.errors)
    }

    const {username, password, firstName, lastName} = result.data

    const userExists = await User.findOne({
        username: username
    })
    console.log(userExists)
    if(userExists) {
        res.json({
            msg: "user already exists"
        })
        return;
    } else {
        try {
            await User.create({
                username,
                password,
                firstName,
                lastName
        
            })
    
            const token = jwt.sign({username}, JWT_SECRET)
            res.json({
                msg: "user is craeted successfully",
                userID: token
            })
        } catch (error) {
            res.json({
                msg: error
            })
        }
    }


})

userRouter.get('/signin', async(req,res)=> {
    const result = userSchema.safeParse(req.body)
    if(!result.success){
        return res.status(400).json(result.error.errors)
    }

    const {username, password} = result.data

    
        const validUser = await User.findOne({
            username,
            password
        })

        if(validUser){
            res.status(200).json({
                msg: "user Signedin Successfully"
            })
        } else {

            res.status(404).json({
                msg: "wrong inputs"
            })
        }
})

module.exports = userRouter