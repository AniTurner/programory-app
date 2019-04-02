const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
const PORT = process.env.PORT || 7000


//Middlewares that fire on every request
app.use(express.json())
app.use(morgan('dev'))

//data base connect
mongoose.connect('mongodb://localhost:27017/programory', {useNewUrlParser: true}, () => {
    console.log("[+] Connected to the DB")
})

//Routes
app.use("/auth", require("./routes/authRouter.js"))
app.use('/api', expressJwt({secret: process.env.SECRET}))

//Global Error Handler
app.use((err, req, res, next) => {
    console.error(err)
    if(err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})


//Server Listen
app.listen(PORT, () => {
    console.log(`[o] Server is running on Port ${PORT}`)
})