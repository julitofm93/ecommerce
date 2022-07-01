import User from "../models/User.js";
import { userService } from "../services/services.js"
import jwt from 'jsonwebtoken'

export const updateUser = async(req,res)=>{
  let {uid} = req.params;
  let user = await userService.getBy({_id:uid})
  let content = req.body
  if(user){
    const updatedUser = await userService.update(uid,content)
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC
    );
      console.log(user)
  
      res
      .cookie("sessionCookie", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
      _id: updatedUser._id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      createdAt: updatedUser.createdAt,
      token: token,
    });
  } else {
    res.status(404).send({status:"error",error:"Not found"});
  }
}
  /* let {uid} = req.params;
  let user = await userService.getBy({_id:uid})

  if(user) {
    user.first_name = req.body.first_name || user.first_name;
    user.last_name = req.body.last_name || user.last_name;
    user.email = req.body.email || user.email;
    if(req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await userService.save();
    res.json({
      _id: updatedUser._id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      createdAt: updatedUser.createdAt,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(404).send({status:"error",error:"Not found"});
  }
} */

export const deleteUser = async (req,res,next)=>{
  try {
    await userService.delete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}
export const getUser = async (req,res,next)=>{
  try {
    const user = await userService.getBy({_id : req.params.uid});
    const { password, ...others } = user;
    res.status(200).json(others);
  } catch (err) {
    next(err);
  }
}
export const getUsers = async (req,res,next)=>{
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}