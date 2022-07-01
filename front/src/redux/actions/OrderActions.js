import { CART_CLEAR_ITEMS } from "../constants/CartConstants";
import { 
    ORDER_CREATE_FAIL, 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_DETAILS_FAIL, 
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS
} from "../constants/OrderConstants";
import axios from "axios";
import { logout } from "./UserActions"

// CREATE ORDER
export const createOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}api/orders`, order, config);
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
        dispatch({ type: CART_CLEAR_ITEMS, payload: data });
        
        localStorage.removeItem("cartItems");
    } catch (error) {
        const message = 
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        if(message === "You are not authorized!"){
            dispatch(logout());
        }
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: message,
        })
    }
}

// ORDER DETAILS
export const getOrderDetails = (id) => async(dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });
        
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization:`Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}api/orders/${id}`, config);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message = 
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        if(message === "You are not authorized!"){
            dispatch(logout());
        }
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message,
        })
    }
}

// USER ORDERS LIST
export const listMyOrders = (id) => async(dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_MY_REQUEST });
        
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization:`Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}api/orders/list/${id}`, config);
        dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
    } catch (error) {
        const message = 
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        if(message === "You are not authorized!"){
            dispatch(logout());
        }
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: message,
        })
    }
}

// CREATE ORDER
export const payOrder = (orderId, paymentResult) => async(dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}api/orders/${orderId}/pay`, paymentResult, config);
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
        const message = 
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        if(message === "You are not authorized!"){
            dispatch(logout());
        }
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: message,
        })
    }
}