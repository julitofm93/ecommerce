import Order from '../models/Order.js'
import GenericQueries from './genericQueries.js'

export default class OrderService extends GenericQueries{
    constructor(dao){
        super(dao,Order.model);
    }
    getByWithPopulate = async(params) =>{
        let result = await this.dao.models[Order.model].findOne(params).populate("user", "first_name last_name email")
        return result;
    }
}