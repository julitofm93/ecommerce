import React, { useEffect, useState } from 'react'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import { mobile } from '../responsive'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { saveShippingAddress } from "../redux/actions/CartActions";
import { createOrder, getOrderDetails, payOrder } from "../redux/actions/OrderActions"
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalShipping from '@mui/icons-material/LocalShipping'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Alert from '@mui/material/Alert';
import { ORDER_CREATE_RESET } from '../redux/constants/OrderConstants'
import Loading from '../components/Loading'
import moment from 'moment'
import { PayPalButton } from 'react-paypal-button-v2'
import { ariaHidden } from '@mui/material'
import axios from 'axios'

const Container = styled.div`
`
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`

const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 6px;
    line-height: 1.2;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled {
    color: gray;
    cursor: not-allowed;
  }
`
const Link = styled.a`
    margin: 5px 0px;
    font-style: 12px;
    text-decoration: underline;
    cursor: pointer;
`
const Error = styled.span`
    color: red;
    `;

const OrderData = styled.div`
  width: 75%;
  padding: 20px;
  text-align: center;
  background-color: #9cd1d1;
  display: flex;
  align-items: start;
  flex-direction: wrap;
  justify-content: space-between;
`

const Message = styled.p`
  font-size: 18px;
  margin-bottom: 6px;
`

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  margin-bottom: 5px;
  cursor: pointer;
  border: none;
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "#007EB5"};
  width: 100%;
  color: white;
`;

const Data = styled.div`
  display: flex;
  flex-direction: wrap;
  flex: 1;
`
const DataIcon = styled.div`
    margin: 0px 25px 0px 0px;
`
const DataInfo = styled.div`
    text-align: left;
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 75%;
  padding: 20px;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
  margin-left: 0px;
`;

const Product = styled.a`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  flex-direction: wrap;
  align-items: center;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 100px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
    font-size: 14px;
    width: 170px;
`;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  flex-direction: column;
`;

const ProductAmount = styled.div`
  font-size: 16px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 16px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  margin-left: 50px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Order = () => {

  const [sdkReady, setSdkReady] = useState(false);
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  
  const orderDetails = useSelector((state) => state.orderDetails);
  const {order, loading, error} = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const {loading: loadingPay, success: successPay} = orderPay;
  

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    };
    if(!order || successPay) {
      dispatch({type: ORDER_CREATE_RESET})
      dispatch(getOrderDetails(orderId));
    } 
    else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
    }, [dispatch, orderId, successPay, order]);

    const successPaymentHandler = (paymentResult) => {
      console.log(paymentResult);
      dispatch(payOrder(orderId, paymentResult));
    }

  console.log(order)
  return (
    <Container>
        <Announcement/>
        <Navbar/>
        
              {
                loading ? (<Loading/>) : 
                (
                  <>
                  <Wrapper style={{display:"flex", justifyContent:"center"}}>
                  <OrderData>
                <Data>
                    <DataIcon>
                        <PersonIcon style={{fontSize:"60px", color:"teal"}}/>
                    </DataIcon>
                    <DataInfo>
                        <Title>Costumer</Title>
                        <Message>{order.user.first_name} {order.user.last_name}</Message>
                        <Message>{order.user.email}</Message>
                    </DataInfo>
                </Data>
                <Data>
                    <DataIcon>
                        <LocalShipping style={{fontSize:"50px", color:"teal"}}/>
                    </DataIcon>
                    <DataInfo>
                        <Title>Order info</Title>
                        <Message>Shipping: {order.shippingAddress.country}</Message>
                        <Message>Pay Method: {order.paymentMethod}</Message>
                        {
                          order.isPaid ? (
                            <Alert variant="filled" severity="success">Paid on: {moment(order.created_at).calendar()}</Alert>
                          ) : (
                            <Alert variant="filled" severity="error">Not Paid</Alert>
                          )
                        }
                    </DataInfo>
                </Data>
                <Data>
                    <DataIcon>
                        <LocationOnIcon style={{fontSize:"50px", color:"teal"}}/>
                    </DataIcon>
                    <DataInfo>
                        <Title>Deliver to</Title>
                        <Message>Address: {order.shippingAddress.address}, {order.shippingAddress.city}</Message>
                        <Message>{order.shippingAddress.postalCode}</Message>
                        {
                          order.isDelivered ? (
                            <Alert variant="filled" severity="success">Delivered on: {moment(order.created_at).calendar()}</Alert>
                          ) : (
                            <Alert variant="filled" severity="info">Not Delivered</Alert>
                          )
                        }
                    </DataInfo>
                </Data>
              </OrderData>
                  </Wrapper>
                  <Wrapper style={{display:"flex", justifyContent:"center"}}>
                  <Bottom>
              <Info>
                  {order.orderItems.map((item, index) =>(
<>
                    <Product key={index}>
                    <ProductDetail>
                      <Image src={item.img}/>
                        <ProductName>
                          <b>{item.title}</b> 
                        </ProductName>
                        <ProductAmountContainer>
                        <ProductAmount>Quantity</ProductAmount>
                        <ProductAmount>{item.quantity}</ProductAmount>
                        </ProductAmountContainer>
                        <ProductAmountContainer>
                        <ProductAmount>Subtotal</ProductAmount>
                        <ProductAmount>${item.quantity * item.price}</ProductAmount>
                        </ProductAmountContainer>
                        <DeleteOutlineOutlinedIcon 
                        style={{marginLeft:"10px"}}                       
                        />
                    </ProductDetail>
                    </Product>
                    <Hr />
                    </>
                  ))}
                    </Info>
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>${order.totalPrice}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>${order.totalPrice}</SummaryItemPrice>
                </SummaryItem>
                {!order.isPaid && (
                  <>
                  {loadingPay && <Loading/>}
                  {
                    !sdkReady ? (
                      <Loading/>
                    )
                    :(
                      <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                    )
                  }
                  </>
                )}
               {/*  <TopButton type="submit">CHECKOUT NOW</TopButton>
                <TopButton>Mercado Pago</TopButton> */}
              </Summary>          
            </Bottom>
                  </Wrapper>
                  </>
                )
              }
      </Container>
  )
}

export default Order
