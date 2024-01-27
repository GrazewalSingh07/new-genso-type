const app = require("./index")
const PORT=process.env.PORT || 4000
 const db= require("./config/db")
app.listen(PORT,async()=>{
   await  db()
    console.log("localhost listening")
})