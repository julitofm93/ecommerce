import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createError } from "../utils/error.js";
import { userService } from "../services/services.js";
import { cartService } from '../services/services.js';

//REGISTER
export const register = async (req,res)=>{
    
    try {
        const user = await userService.getBy({ email: req.body.email });
        if(user){ return res.status(400).json("User already exists") }
        const cart = await cartService.save({products:[]})
        const newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            password: bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10)).toString(),
            cart: cart._id
        };
        console.log(newUser)

        
        const savedUser = await userService.save(newUser);
        
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error);
        }
    };


export const login = async (req, res, next) => {
    try {
    const user = await userService.getBy({ email: req.body.email });
    if (!user) return res.status(401).json("User not found");

    const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
        
    if(!isValidPassword){
        return res.status(401).json("Wrong credentials")
    }

    const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SEC
      );
        console.log(user)
    
    const { password, isAdmin, ...others } = user;
    
        res
        .cookie("sessionCookie", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ ...others, isAdmin, token });
        console.log(user)
    } catch (err) {
      res.status(500).json(error);
    }
  };
