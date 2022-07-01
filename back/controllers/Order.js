import Order from "../models/Order.js";
import { orderService } from "../services/services.js"
import jwt from 'jsonwebtoken'
import OrderService from "../services/orderService.js";

const getOrders = async (req,res,next)=>{
  try {
    const orders = await orderService.getAll();
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
}

const createOrder = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        user,
    } = req.body
    
    if(orderItems && orderItems.length === 0) {
        res.status(400).json("Order empty")
    } else {
        const newOrder = {
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            user,
        }
        const savedOrder = await orderService.save(newOrder);
        res.status(200).json(savedOrder);
    }
  }

  const getOrderById = async (req,res) => {
    let id = req.params.oid;
    try{
        let order = await orderService.getByWithPopulate({_id:id})
        if(!order) res.status(404).send({status:"error",error:"Not found"})
        res.status(200).json(order);
    }catch(error){
      res.status(404).send({status:"error",error:"Not found"});
    }
  }


  const getOrdersByUserId = async (req,res) => {
    let user = req.params.uid;
    try{
        let orders = await orderService.getAll({user:user})
        if(!orders) res.status(404).send({status:"error",error:"Not found"})
        res.status(200).json(orders);
    }catch(error){
        console.log(error);
    }
  }

  const orderPaid = async (req,res) => {
    let id = req.params.oid;
    let content = req.body
    try{
        let order = await orderService.getBy({_id:id})
        if(order) {
          order.isPaid = true;
          order.paidAt = Date.now();
          order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
          };
        const updatedOrder = await orderService.update(id,order)
        res.status(200).json(updatedOrder);
        } else {
          res.status(404).send("Product not Found")
        }
    }catch(error){
        console.log(error);
    }
  }

  export {
    getOrders,
    createOrder,
    getOrderById,
    getOrdersByUserId,
    orderPaid
  };