const express = require('express')
const z = require('zod')
const { User } = require('../db')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../config')
const authMiddleware = require('../middlewares/auth')

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
        username: req.body.username
    })

    if(userExists) {
        res.json({
            msg: "user already exists"
        })
        return;
    } else {
        try {
            const user = await User.create({
                username,
                password,
                firstName,
                lastName
        
            })
    
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET)
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

userRouter.get('/signin',authMiddleware, async(req,res)=> {
    // const result = userSchema.safeParse(req.body)
    // if(!result.success){
    //     return res.status(400).json(result.error.errors)
    // }

    // const {username, password} = result.data

    
    //     const validUser = await User.findOne({
    //         username,
    //         password
    //     })

    //     if(validUser){
    //         res.status(200).json({
    //             msg: "user Signedin Successfully"
    //         })
    //     } else {

    //         res.status(404).json({
    //             msg: "wrong inputs"
    //         })
    //     }

    res.json({
        msg:"successfully signed in"
    })
})

userRouter.put('/', authMiddleware, async(req,res)=> {
    

    if(req.body.username){
        return res.status(403).json({
            msg: "we cannot update the username"
        })
    }
    if(req.body.password) password = req.body.password
    if(req.body.firstName) firstName = req.body.firstName
    if(req.body.lastName) lastName = req.body.lastName

    try {
        const infoUpdated = await User.updateOne({
            _id: req.userId
        }, {
            password, firstName, lastName
        })
        
        if(infoUpdated){
            res.status(200).json({
                msg: "data updated successfully"
            })
        }
    } catch (error) {
        res.status(500).json({error})
    }
})

module.exports = userRouter