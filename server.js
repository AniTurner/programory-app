const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const morgan = require('morgan')
const expressJwt = require('express-jwt')
const path = require('path')
const PORT = process.env.PORT || 7000


//Middlewares that fire on every request
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "build")))

//data base connect
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/programory', {useNewUrlParser: true}, () => {
    console.log("[+] Connected to the DB")
})

//Routes
app.use("/auth", require("./routes/authRouter.js"))
// Make the app use the express-jwt authentication middleware on anything starting with "/api"
app.use("/api", expressJwt({secret: process.env.SECRET}));


//Global Error Handler
app.use((err, req, res, next) => {
    console.error(err)
    if(err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

// For Heroku
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

//Server Listen
app.listen(PORT, () => {
    console.log(`[o] Server is running on Port ${PORT}`)
})