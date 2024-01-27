const express= require('express')
const router =express.Router();
const axios = require('axios');
const exchangeCodeForToken = async (authorizationCode) => {
  const clientId = process.env.clientId
  const clientSecret = process.env.clientSecret
  const redirectUri = process.env.redirectUri

  const url =process.env.url

  const requestBody =new FormData()
  requestBody.append('grant_type', 'authorization_code');
  requestBody.append('code', authorizationCode);
  requestBody.append('client_id', clientId);
  requestBody.append('client_secret', clientSecret);
  requestBody.append('redirect_uri', redirectUri);
axios.post(url, requestBody,{
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
     
  }}).then((response) => {
  console.log(response.data);
}).catch((error) =>{
  console.log(error);
})
  // try {
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     body: JSON.stringify(requestBody),
  //   }) 
  //   // console.log(response);
  //   // if (!response.ok) {
  //   //   throw new Error(`HTTP error! Status: ${response.status}`);

  //   // }

  //   const data = await response.json();
  //   console.log('Access Token:', data.access_token);
  //   console.log('Token Type:', data.token_type);
  //   console.log('Expires In:', data.expires_in);
   

  // } catch (error) {
  //   console.error('Error exchanging code for token:', error.message);
  // }
};
router.post('/', async(req, res)=>{
    try {
       
      exchangeCodeForToken(req.body.code)
      return  res.status(200).send({message:"djh"});
    } catch (error) {
        
    }
});

module.exports = router