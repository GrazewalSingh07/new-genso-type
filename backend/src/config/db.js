const mongoose= require("mongoose");
 
module.exports=()=>{
    return mongoose.connect("mongodb+srv://singhgrazewal2:Grazewal@cluster0.fglisnc.mongodb.net/genso")
}
 