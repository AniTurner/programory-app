const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    userImg: String,
    nickname: String,
    besttime: {
        react: Number,
        js: Number
    }
})

//User AUTH methods
userSchema.pre("save", function(next) {
    const user = this
    if(!user.isModified("password")) 
    return next()
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) 
        return next(err)
        user.password = hash
        next()
    })
})

//checkPassword method - logging in
userSchema.methods.checkPassword = function(passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err)
        return callback(err)
        callback(null, isMatch)
    })
}

//withoutPassword method
userSchema.methods.withoutPassword = function () {
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model("User", userSchema)