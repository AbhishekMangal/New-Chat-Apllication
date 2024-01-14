
const { genSalt, hash }  = require("bcrypt");
const bcrypt  = require("bcrypt");
const user = require("../model/userModel");
const  jwt  = require("jsonwebtoken");
require('dotenv').config()
module.exports.Register = async(req, res)=>
{
   
    const {username, email , password} = req.body;
    const usernameCheck = await user.findOne({username });
    const emailCheck = await user.findOne({email});
    let success = false;
    if(usernameCheck || emailCheck)
    {
        return res.json({msz: "User Already Exist", success: false});
    }
    try {
        const salt = await genSalt(10);
        const hashPassword = await hash(password,salt);
        const User = await user.create({
           email: email,
           username:  username,
           password: hashPassword,
        })
        delete User.password
        const data = {
            user: {
                id: User.id,
            },

            
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET)

        return res.json({success: true,User, authToken , User: User})
        
    } catch (error) {
        console.error(error.message)
        return res.json({msz: "Internal server error", success: false , error:error})
        
    }
    

}
module.exports.login = async(req, res)=>
{
    const {email, password} = req.body;
    const User = await user.findOne({email});
  
    

    if(!User )
    {

        return res.json({success: false, msz: "Invalid Email Address or Password"})
    }
    const ispassword = bcrypt.compare(password, User.password)
    if(!ispassword)
    {
        return res.json({success: false, msz: "Invalid Email Address or Password"})
    }
    const data = {
         user: {
            id:  User.id
        }
    }
    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    return res.json({success: true, authToken , User: User })
    // const passwordCheck = bcrypt.compare(password, User.password);
    // if(!passwordCheck)
    {
    }
}



module.exports.getUserRoute =  async(req ,res)=>{
  
    try{        
        const userId = req.user.id;
   
        const User = await user.findById(userId).select('-password');
        res.json({success: true ,User});
    }catch(error)
    {
        res.status(500).json({msz: "Internal Server Error", success: false})
        console.error(error.message);
    }
}

module.exports.setAvatar = async(req, res, next)=>
{
    try {
        
        const userId = req.params.id;
        const avtarImage = req.body.image;
        const userData = await user.findByIdAndUpdate(userId, {
            isAvtarImage: true,
            avtarImage: avtarImage
        })
        return res.json({
            isSet: userData.isAvtarImage,
            image: userData.avtarImage
        })
    } catch (error) {
        next(ex);
    }
}

module.exports.getAllUser = async(req,res, next)=>
{
    try {
        const CurrUser = user.findById(req.user.id);
        if(!CurrUser)
        {
            return res.json({success: false, msz: "User Not Found"});
        }
        
        const users = await user.find({_id:{ $ne:req.user.id }}).select([
            "email", "username", "avtarImage",
            "_id",
        ])
        return res.json(users);
    } catch (error) {
        next(ex);
    }
}

