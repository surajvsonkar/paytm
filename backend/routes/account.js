const express = require('express')
const authMiddleware = require('../middlewares/auth')
const { User, Account } = require('../db')
const { mongo, default: mongoose } = require('mongoose')

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

router.post('/transfer', authMiddleware, async(req,res)=> {
    const session = await mongoose.startSession()
    session.startTransaction();
    const {amount, to} = req.body

    const account = await Account.findOne({
        userId: req.userId
    }).session(session)

    if(!account || account.balance < amount){
        await session.abortTransaction()
        return res.status(400).json({
            message: "insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session)

    if(!toAccount){
        await session.abortTransaction()
        return res.status(400).json({
            message: "receiver doesn't exist."
        })
    }

    await Account.updateOne({ userId: req.userId}, { $inc: { balance: -amount}}).session(session)
    await Account.updateOne({userId: to}, { $inc: { balance: amount}}).session(session)

    await session.commitTransaction();

    const updatedAccount = await Account.findOne({
        userId: req.userId
    })
    res.json({
        message: "Transfer Successful",
        "your current balance is ": updatedAccount.balance
    })

})

module.exports = router