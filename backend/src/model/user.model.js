const mongoose= require("mongoose");
const bcrypt=require("bcrypt")
const userSchema=new mongoose.Schema({
    username:{type:String, required:false},
    email:{type:String,required:true, unique:true},
    password:{type:String, required:true},
    access_token:{type:String, required:false, unique:true},
    expires_in:{type:String, required:false, unique:true},
    token_type:{type:String, required:false, unique:true},
    scope: {type:String, required:false, unique:true},
    refresh_token: {type:String, required:false, unique:true},
   

},{
    timestamps:true
})


userSchema.pre("save" ,function(next){ 
    const hash= bcrypt.hashSync(this.password, 8);
    this.password=hash
    return next()
})
 
 
userSchema.methods.checkPassword=function(password){
    return bcrypt.compareSync(password, this.password)
}
const User= mongoose.model("user", userSchema)
module.exports= User