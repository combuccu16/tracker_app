const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const { initOnLogin } = require("../helpers/initiUserHistory")
const {validateEmail , isValidName , validatePassword} = require("../helpers/validate")
async function checkUser(req , res){
    try{

        const {email , password} = req.body 
        const {valid : isValidEmail, email : sanitizedEmail} = validateEmail(email)
        // const {valid : isValidPassword ,errors :  errors} = validatePassword(password)
        if(!isValidEmail){
            return res.status(404).json({msg: "invalid email"})
        }
        // if(!(isValidPassword)){
        //     return res.status(404).json({msg: "invalid password"})
        // }
        const user = await User.findOne({email : sanitizedEmail})
        if(!(user)){
            return res.status(404).json({msg : "user not found" })
        }
        const doesMatch = await bcrypt.compare(password , user.password)
        if(!(doesMatch)){
            return res.status(401).json({msg : "wrong credentials" })
        }
        const safeUser = {id : user._id , name : user.name , lastname : user.lastname}
        req.session.userId = user._id
        req.session.userName = user.name
        req.session.userLastname = user.lastname
        console.log("after logging in session " ,req.session)
        await initOnLogin(user._id)
        return res.status(200).json({msg : "authentificated successfully" , user : safeUser})
    }catch(err){
        console.log("something went wrong when checking the user")
        return res.status(500).json({msg : "internal server error"})
    }
}

async function addUser(req , res){
    const {name , lastname , email , password} = req.body
    const {valid : isValidEmail, email : sanitizedEmail} = validateEmail(email)
    const {valid : isValidPassword ,errors :  errors} = validatePassword(password)
    if(!isValidEmail){
        return res.status(401).json({msg:"email not valid"})
    }
    if(!isValidPassword){
        return res.status(401).json({msg:"password not valid" , errors})
    }
    const {sanitized : sanitizedname , errors : nameErrors} = isValidName(name); const {sanitized : sanitizedLastname , errors : lastnameErrors} = isValidName(lastname) ; 
    if(!sanitizedname && !sanitizedLastname ){
        return res.status(400).json({msg : "all fields are required" ,  nameErrors : nameErrors , lastnameErrors : lastnameErrors})
    }
    const user = await User.findOne({email : sanitizedEmail})
    if(user){
        return res.status(409).json({msg : "email already exists"})
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({name : sanitizedname , lastname :  sanitizedLastname ,email :  sanitizedEmail , password : hashedPassword})
        return res.status(201).json({msg : "user created successfully"})
    }catch(err){
        console.log("something went wrong when adding the user")
        return res.status(500).json({msg : "internal server error"})
    }   
}

module.exports = {checkUser , addUser}
