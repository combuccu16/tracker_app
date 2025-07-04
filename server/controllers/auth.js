const User = require("../models/userModel")
const bcrypt = require("bcrypt")
async function checkUser(req , res){
    const {email , password} = req.body 
    const user = await User.findOne({email})
    if(!(user)){
        return res.status(404).json({msg : "user not found"})
    }
    const doesMatch = await bcrypt.compare(password , user.password)
    if(!(doesMatch)){
        return res.status(401).json({msg : "wrong credentials"})
    }
    const safeUser = {id : user._id , name : user.name , lastname : user.lastname}
    return res.statis(200).json({msg : "authentificated successfully" , user : safeUser})
}

async function addUser(req , res){
    const {name , lastname , email , password} = req.body
    if(!name || !lastname || !email || !password){
        return res.status(400).json({msg : "all fields are required"})
    }
    const user = await User.findOne({email})
    if(user){
        return res.status(409).json({msg : "email already exists"})
    }
    try{
        await User.save({name , lastname , email , password})
    }catch(err){
        console.log("something went wrong when adding the user")
    }   
}

module.export = {checkUser , addUser}
