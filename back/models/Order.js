import mongoose from "mongoose";
let Schema = mongoose.Schema;

export default class Order {
    constructor(data){
        this.data=data;
    }
    static get model(){
        return "Order";
    }
    static get schema(){
        return{
        user:{ 
            type: mongoose.Schema.Types.ObjectId, 
            //required:true,
            ref:"Users"
        },
        orderItems: [
            {
                title:{type: String, /* required: true */},
                quantity:{type:Number, default: 1, /* required: true */},
                img:{type: String, /* required: true */},
                price:{ type: Number, /* required: true */},
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    //required: true,
                    ref: "Product",
                }
            },
        ],
        shippingAddress:{
            address: { type: String, /* required: true */ },
            city: { type: String, /* required: true */ },
            postalCode: { type: String, /* required: true */ },
            country: { type: String, /* required: true */ },
        },
        paymentMethod:{
            type: String,
            //required: true
        },
        paymentResult:{
            id:{ type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String }
        },/* 
        shippingPrice:{
            type: Number,
            required: true,
            default: 0.0,
        }, 
        shippingPrice:{
            type: Number,
            required: true,
            default: 0.0,
        }, */
        totalPrice:{
            type: Number,
            //required: true,
            default: 0.0,
        },
        isPaid:{
            type: Boolean,
            //required: true,
            default: false,
        },
        paidAt:{
            type: Date
        },
        isDelivered:{
            type: Boolean,
            //required: true,
            default: false,
        },
        deliveredAt:{
            type: Date,
        },
    }
    }
};

