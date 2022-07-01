import { 
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS
} from "../constants/UserConstants";
import axios from "axios";
import { ORDER_LIST_MY_RESET } from "../constants/OrderConstants";

//LOGIN
export const login = (email,password) => async(dispatch) => {
    try {
        dispatch({type:USER_LOGIN_REQUEST});
        
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };

        const { data } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}api/auth/login`,
            { email, password },
            config
            );
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("userInfo", JSON.stringify(data))
        document.location.href = "/"
    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:
            error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
}

//REGISTER
export const register = (first_name, last_name, phone, email, password) => async(dispatch) => {
    try {
        dispatch({type:USER_REGISTER_REQUEST});
        
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };

        const { data } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}api/auth/register`,
            { first_name, last_name, phone, email, password },
            config
            );
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("userInfo", JSON.stringify(data))
        document.location.href = "/"
    } catch (error) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:
            error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
}

//USER DETAILS
export const getUserDetails = (id, first_name, last_name, phone, email, password) => async(dispatch, getState) => {
    try {
        dispatch({type:USER_DETAILS_REQUEST});
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization:`Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}api/users/${id}`, {first_name, last_name, phone, email, password}, config);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    
    } catch (error) {
        const message = 
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        if(message === "You are not authorized!"){
            const logout = localStorage.clear()
            dispatch(logout());
        }
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message,
        })
    }
}

// UPDATE PROFILE
export const updateUserProfile = (id,user) => async(dispatch,getState) => {
    try {
        dispatch({type:USER_UPDATE_PROFILE_REQUEST});
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}api/users/${id}`, user, config);
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
        //dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        const message = 
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        if(message === "You are not authorized!"){
            const logout = localStorage.clear()
            dispatch(logout());
        }
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        })
    }
}


//USER LOGOUT
export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: ORDER_LIST_MY_RESET});
    document.location.href = "/login"
}