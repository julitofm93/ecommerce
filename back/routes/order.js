import {
    verifyToken,
    verifyUser,
    verifyAdmin,
  } from "../utils/verifyToken.js";
  import { 
    getOrders,
    createOrder,
    getOrderById,
    getOrdersByUserId,
    orderPaid,
    
 } from '../controllers/Order.js';
  import express from "express";
  
  const router = express.Router();
  
  //CREATE
  router.post("/", createOrder);
  
  //GET ALL USER ORDERS
  router.get("/list/:uid", getOrdersByUserId)
  
  //GET ORDER BY ID
  router.get("/:oid", getOrderById);
  
  //ORDER IS PAID
  router.put("/:oid/pay", orderPaid)
  
  export default router;
/* const router = require("express").Router()
const Order = require("../models/Order")
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifytoken")

router.post("/", async (req,res)=>{
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
            $set: req.body
        },
        { new:true }
        );
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/find/:userId",  verifyTokenAndAuthorization,  async (req,res)=>{
    try {
        const orders = await Order.find({userId: req.params.userId})
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get("/",  verifyTokenAndAdmin, async (req,res)=>{
    try {
        const orders = await Order.find()
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get("/income",  verifyTokenAndAdmin,  async (req,res)=>{
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))

    try {
        const income = await Order.aggregate([
          { $match: { 
              createdAt: { $gte: previousMonth },
                ...(productId && {
                    products: {$elemMatch: { productId } },
                }),
             },
            },
          {
            $project: {
              month: { $month: "$createdAt" },
              sales: "$amount",
            },
          },
          {
            $group: {
              _id: "$month",
              total: { $sum: "$sales" },
            },
          },
        ]);
        res.status(200).json(income);
      } catch (err) {
        res.status(500).json(err);
      }
})


module.exports = router; */