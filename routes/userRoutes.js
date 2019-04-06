const express = require('express')
const userRouter = express.Router()
const User = require('../models/user.js')


//GET all
userRouter.get('/', (req, res) => {
    User.find((err, users) => {
        if(err) {
            res.status(500)
            return res.send(err)
        }
        return res.status(200).send(users)
    })
})

//GET one
userRouter.get('/:_id', (req, res) => {
    User.findOne({_id: req.params._id}, (err, foundUser) => {
        if(err) {
            res.status(500)
            return res.send(err)
        }
        return res.status(200).send(foundUser)
    })
})

//Create new User
userRouter.post('/', (req, res, next) => {
    const newUser = new User(req.body)
    newUser.save((err, newSavedUser) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newSavedUser)
    })
})

userRouter.put('/', (req, res, next) => {
    User.findOneAndUpdate({_id: req.user._id}, req.body, {new: true}, (err, updatedUser) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedUser)
    })
})


userRouter.put('/', (req, res, next) => {
    User.findOneAndUpdate({_id: req.user._id}, req.body, {new: true}, (err, updatedUser) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedUser)
    })
})


//Delete one
userRouter.delete('/:_id', (req, res) => {
    User.findOneAndRemove({_id: req.params._id}, (err, deletedUser) => {
        if(err) {
            res.status(500)
            return res.send(err)
        }
        return res.status(202).send(`Successfully deleted User with ID${req.params._id}`)
    })
})

//PUT
// userRouter.put('/:_id', (req, res) => {
//     console.log(req.body)
//     User.findOneAndUpdate(
//         {_id: req.params._id},
//         req.body,
//         {new: true},
//         (err, updatedUser) => {
//             if(err) {
//                 res.status(500)
//                 return res.send(err)
//             }
//             return res.status(201).send(updatedUser)
//         }
//     )
// })

module.exports = userRouter