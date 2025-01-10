const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../config')

const authMiddleware = (req,res,next)=> {
    const header = req.headers.authorization
    const token = header.split(" ")[1]
    try {
        const validUser = jwt.verify(token, JWT_SECRET)
        if(validUser){
            res.status(200).json({
                msg: "user signed in successfully"
            })
            next()
        }
    } catch (error) {
        res.json({
            msg: "wrong inputs"
        })
    }
    
}

module.exports = authMiddleware