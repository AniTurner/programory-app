const express = require('express')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')


//Signup - POST /auth/signup
authRouter.post('/signup', (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        //Does the username already exist
        if(user) {
            res.status(400)
            return next(new Error("That username already exsists!"))
        }
        //Create user
        const newUser = new User(req.body)
        newUser.save(err, savedUser) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            //Create token
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(201).send({user: savedUser.withoutPassword(), token})
        }
    })
})


//Login POST
authRouter.post('/login', (req, res, next) => {
    //find the user by that username 
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        if(!user) {
            res.status(403)
            return next(new Error("Username or password are incorrect!"))
        }
        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            if(!isMatch) {
                res.status(401)
                return next(new Error("Username or password are incorrect!"))
            }
            //Create token
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(200).send({user: user.withoutPassword(), token})
        })
    })
})

module.exports = authRouter