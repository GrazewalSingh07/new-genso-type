const app = require("./index")

 const db= require("./config/db")
app.listen(4000,async()=>{
   await  db()
    console.log("localhost listening")
})