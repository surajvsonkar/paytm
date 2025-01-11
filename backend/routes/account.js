const express = require('express')
const authMiddleware = require('../middlewares/auth')
const { User, Account } = require('../db')

const router = express.Router()

router.get('/balance', authMiddleware, async(req,res)=> {
    const account = await Account.findOne({
        userId: req.userId
    })

    try {
        res.status(200).json({
            "account balance": account.balance
        })
        
    } catch (error) {
        res.status(400).json({
            error
        })
    }
})

module.exports = router