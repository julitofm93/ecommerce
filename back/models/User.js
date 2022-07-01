import mongoose from "mongoose";
let Schema = mongoose.Schema;

export default class User {
    constructor(data){
        this.data=data;
    }
    static get model(){
        return "Users";
    }
    static get schema(){
        return{
        first_name:{
            type: String,
            required: true,
        },
        last_name:{
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        cart:{
            type:Schema.Types.ObjectId,
            ref:"Carts"
        },
    }
    }
};