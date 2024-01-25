const express = require('express')

const app=express()
app.use(express.json())
var cors = require('cors');
app.use(cors())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const sketchfab_login = require('./controller/sketchfab.controller')
app.use("/sketchfab_login",sketchfab_login)

module.exports =app