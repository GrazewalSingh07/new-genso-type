const mongoose= require("mongoose");
 const DB = process.env.DB||"mongodb+srv://singhgrazewal2:Grazewal@cluster0.fglisnc.mongodb.net/genso"
module.exports=()=>{
    return mongoose.connect(DB)
}
 