const express= require('express')
const router =express.Router();
 
const sketchfabApiUrl = 'https://sketchfab.com/oauth2/token/';
const clientId = 'bD02sfpDP8LLXkxW9foJ32HplNZOXKuWGgj0L99m';
const clientSecret = '4qhif8NTPqUbdsZcHeOpZOfdrVxjAipex2GMo4Ow089WpsO8A2lqxWkdOszHOIf37jQc4rIVhcxp3FG5IhWr4lEp3BApa7zG1VP9pw8xVoMA8eYb4W7RgC2PXped2VfD';
 const sketchfabLogin=({email,password})=>{
  
const basicAuthHeader = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
const formData = {
  'grant_type': 'password',
  'username': email,
  'password': password
};
 

fetch(sketchfabApiUrl, {
  method: 'POST',
  headers: {
    'Authorization': basicAuthHeader,
    'Content-Type': 'application/json',
  },
  body: formData,
})
  .then(response => {
      console.log(response);
    // if (!response.ok) {
    //   throw new Error(`Server Error: ${response.status} - ${response.statusText}`);
    // }
    // return response.json();
  })
  .then(data => {
    console.log({data})
    // const newToken = data.access_token;
    // setToken(newToken);
    // setError(null);
  })
  .catch(error => {
    // Handle errors
    
  });
 }
router.post('/', async(req, res)=>{
    try {
       
     let x=  await sketchfabLogin(req.body)
      return  res.status(200).send({message:x});
    } catch (error) {
        
    }
});

module.exports = router