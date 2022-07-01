import mongoose from 'mongoose';

let Schema = mongoose.Schema;

export default class Product {
    constructor(data){
        this.data = data;
    }

    static get model(){
        return "Products";
    }

    static get schema(){
        return{
        title:{ type:String, required:true, unique:true},
        desc:{ type:String, required:true},
        img: { type: String, required:true},
        categories: { type: Array },
        size: { type: Array },
        color: { type: Array },
        price: { type: Number, required:true},
    }
}
};

