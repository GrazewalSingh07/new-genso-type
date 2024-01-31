const express = require('express')
const router= express.Router();
const User=require("./model/user.model")
const jwt = require('jsonwebtoken');
require("dotenv").config()
const {body, validationResult}=require("express-validator")
 
const axios = require('axios');
 
const authenticate = require('./middleware/authenticate');
 
const app=express()
app.use(express.json())

var cors = require('cors');
app.use(cors())

const whitelist = [
    '*'
  ];
  
app.use((req, res, next) => {
    console.log("first")
    const origin = req.get('referer');
    const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
    if (isWhitelisted) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
      res.setHeader('Access-Control-Allow-Credentials', true);
    }
    // Pass to next layer of middleware
    if (req.method === 'OPTIONS') res.sendStatus(200);
    else next();
  });

  function ignoreFavicon(req, res, next) {
    if (req.originalUrl.includes('favicon.ico')) {
      res.status(204).end()
    }
    next();
  }
 
app.use(ignoreFavicon);
const setContext = (req, res, next) => {
    if (!req.context) req.context = {};
    next();
  };
app.use(setContext);
 
app.get('/',(req,res)=>{
    return res.send("Hello! Gensians")
})



// const sketchfab_login = require('./controller/sketchfab.controller')
// // const userController = require('./controller/user.controller')
// app.use("/sketchfab_login",sketchfab_login)
// // app.use("/user",userController)

 
const newToken=(user)=>{
    return jwt.sign({user},process.env.SECRET_KEY)
}


app.post("/register",

    body("username").not().isEmpty().withMessage("Please Enter Username"),
    
body("email").not().isEmpty().withMessage("Please enter email").isEmail().withMessage("Please enter valid email").custom(async(value)=>{
    let user= await User.findOne({email:value}).lean().exec()
    console.log(user)
    if(user){
       throw new Error("Email already exists")
    }
    return true
    
   }),
body("password").not().isEmpty().withMessage("Please enter password").custom((value)=>{
    
    let regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(!value.match(regex)||value.length<8){
                throw new Error("Password must be strong");
            }
         return true;
    
}), 
async(req,res)=>{
    try {
       
        const errors= validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).send({error:errors.array()})
        }
      
    
            const curr=await User.create(req.body)
            const token=newToken(curr)
            console.log(token)
            return res.status(200).send({curr,token})
        
        
       
    } catch (error) {
        if(error.code===11000){
           return res.status(500).send("Register successful please login")
        }
        return res.status(400).send(error)
        
    }
})


app.post("/login",
 body("email").not().isEmpty().withMessage("Please enter email").isEmail().withMessage("Please enter valid email")
 .custom(async(value)=>{
    let user= await User.findOne({email:value}).lean().exec()
    
    if(!user){
        throw new Error("User doesnot exist, Please register")
    }
    return true
 }).bail(),
 body("password").not().isEmpty().bail(),

 async(req,res)=>{
     try {
        const errors=validationResult(req)
         
        if(!errors.isEmpty()){
           return res.status(400).json({error:errors.array()})
        }


       let user= await User.findOne({email:req.body.email}).exec()
       
       const match=user.checkPassword(req.body.password)

       if(!match){
           return  res.status(400).send("Email or password incorrect")
       }

       const token=newToken(user)

       return res.status(200).send({user,token})
     } catch (error) {
        return res.status(500).send({error:error.message})
     }
     
 })




const exchangeCodeForToken = async (authorizationCode) => {
  const clientId = process.env.clientId
  const clientSecret = process.env.clientSecret
  const redirectUri = process.env.redirectUri

  const url =process.env.url

  const requestBody ={
    'grant_type':'authorization_code',
    'code': authorizationCode,
    'client_id': clientId,
    'client_secret': clientSecret,
    'redirect_uri': redirectUri
  }
//   requestBody.append('grant_type', 'authorization_code');
//   requestBody.append('code', authorizationCode);
//   requestBody.append('client_id', clientId);
//   requestBody.append('client_secret', clientSecret);
//   requestBody.append('redirect_uri', redirectUri);
// console.log({requestBody})
try {
  const response = await axios.post(
    url,
    new URLSearchParams(requestBody), // Use URLSearchParams to encode the request body
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  
  return response.data;
} catch (error) {
  return error
}
   
  };
  app.post('/', authenticate, async (req, res) => {
    try {
     
       
      const tokenExchangeResult = await  exchangeCodeForToken(req.body.code); // Wait for the promise to resolve
  
  const update = {
    access_token: tokenExchangeResult.access_token,
    expires_in: tokenExchangeResult.expires_in,
    token_type: tokenExchangeResult.token_type,
    scope: tokenExchangeResult.scope,
    refresh_token: tokenExchangeResult.refresh_token,
  };

  // Update and fetch the user in a single operation
  const updatedUser = await User.findByIdAndUpdate(
    req.body.userId,
    update,
    { new: true } // Return the updated document
  );

  

  // Send the updated user in the response
  return res.status(200).send({ message: 'User updated', user: updatedUser });
} catch (error) {
  // console.error('Error:', error);
  return res.status(500).send({ error: 'Internal Server Error' });
}
  });
module.exports =app