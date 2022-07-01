import {
  verifyToken,
  verifyUser,
  verifyAdmin,
} from "../utils/verifyToken.js";
import { 
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts } from '../controllers/Product.js';
import express from "express";

const router = express.Router();

//CREATE

router.post("/", addProduct);

//UPDATE
/* router.put("/:id", updateProduct); */
router.put('/:pid', updateProduct)

//DELETE
router.delete("/:id", deleteProduct);

//GET PRODUCT
router.get("/find/:pid", getProduct);

//GET ALL PRODUCTS
router.get("/", getAllProducts);

export default router;