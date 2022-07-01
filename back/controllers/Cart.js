import { cartService, productService} from "../services/services.js";

const getCartById = async(req,res) =>{
    let id = req.params.cid;
    let cart = await cartService.getByWithPopulate({_id:id})
    res.send({status:"success",payload:cart})
}

const addProduct = async(req,res)=>{
    let quantityChanged = false;
    let {cid,pid} = req.params;
    let {quantity} = req.body;//3
    //Check if product exists
    let product = await productService.getBy({_id:pid});
    if(!product) return res.status(404).send({status:"error",error:"Product not found"});
    //check if cart exists
    let cart = await cartService.getBy({_id:cid});
    if(!cart) return res.status(404).send({status:"error",error:"Cart not found"});
    //Check product stock
    if(product.stock===0) return res.status(400).send({status:"error",error:"No stock"});
    //Check if requested quantity is greater than product stock
    if(product.stock<quantity){
        quantity=product.stock//3  -> 1
        quantityChanged=true;
    }
    //Remove stock
    product.stock = product.stock - quantity;
    if(product.stock===0)
        product.status="unavailable"
    await productService.update(pid,product);
    //Add product to cart
    cart.products.push({product:pid,quantity});
    await cartService.update(cid,cart);
    res.send({status:"success",quantityChanged,newQuantity:quantity,message:"Product added"})
}

const deleteProductFromCart = async(req,res)=>{
    let {pid,cid} = req.params;
    console.log(pid);
    //Check if cart exists.
    let cart = await cartService.getByWithPopulate({_id:cid});
    if(!cart)  return res.status(404).send({status:"error",error:"Can't find cart"});
    //Check if product exists in the cart
    if(cart.products.some(element=>element.product._id.toString()===pid)){
        //Get product with pid
        let product = await productService.getBy({_id:pid});
        if(!product) return res.status(404).send({status:"error",error:"Product not found"});
        //Get associated product on Cart
        let productInCart = cart.products.find(element=>element.product._id.toString()===pid);
        //Restock actual quantity
        product.stock = product.stock + productInCart.quantity;
        await productService.update(pid,product);
        //Delete product from cart
        cart.products = cart.products.filter(element=>element.product._id.toString()!==pid);
        await cartService.update(cid,cart);
        res.send({status:"success",message:"Product deleted"})
    }else{
        res.status(400).send({error:"Product not found in the cart"})
    }
}

export default {
    getCartById,
    addProduct,
    deleteProductFromCart
}