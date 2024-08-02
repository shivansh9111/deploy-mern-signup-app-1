const UserModel = require("../Models/Users");
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')

const signup = async (req,res)=>{
  try {
    const {name,email,password} = req.body;
    const user = await UserModel.findOne({email});
    if (user) {
     return res.status(409)
      .json({message:"user already exist , you cant login", success: false});
    }
    const userModel = new UserModel ({name,email,password});
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    return res.status(201)
    .json({message:"signup successfully",
       success: true
    })

  } catch (error) {
    return res.status(500)
    .json({message: "internal server error", success: false})
  }
}



const login = async(req,res) => {
  try {
    const {email,password} = req.body
    const user = await UserModel.findOne({email})
    
    if(!user){
      res.status(401)
      .json({message:"auth failed email or password is wrong", success: false})
    }
    const isPassEqual = await bcrypt.compare(password, user.password)
   if(!isPassEqual){
    res.status(403)
    .json({message:"password is incorrect",success: false})
   }
   const jwtToken = jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_SECRET,
    {expiresIn: '24h'}
  )

return res.status(200)
.json({
  message:"login successfully",
  success:true,
  jwtToken,
  email,
  name:user.name
})

  } catch (error) {
   return res.status(501)
    .json({message:"internal server error",success: false})
  }
}

module.exports={signup, login}
