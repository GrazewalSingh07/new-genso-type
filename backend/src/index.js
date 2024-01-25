const express = require('express')

const app=express()
app.use(express.json())

const sketchfab_login = require('./controller/sketchfab.controller')
app.use("/sketchfab_login",sketchfab_login)

module.exports =app