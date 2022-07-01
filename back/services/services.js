import Dao from "../models/Dao.js";
import UserService from "./userService.js";
import ProductService from "./productService.js";
import CartService from "./cartService.js"
import OrderService from "./orderService.js"
import config from "../config/config.js";

const dao = new Dao(config.mongo);

export const userService = new UserService(dao);
export const cartService = new CartService(dao)
export const productService = new ProductService(dao);
export const orderService = new OrderService(dao);
