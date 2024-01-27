const mongoose= require("mongoose");
 const DB = process.env.DB
module.exports=()=>{
    return mongoose.connect(DB)
}
 