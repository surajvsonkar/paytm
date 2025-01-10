const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    } ,
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }

})

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}