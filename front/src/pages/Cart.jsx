import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/CartActions';


const Container = styled.div`
${mobile({ backgroundColor: "red" })}
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  ${mobile({  color: "red" })}
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  width: ${(props) =>
    props.type === "filled" && "100%"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  ${mobile({  color: "red" })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.a`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

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
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
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
  height: 100%;
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

const SummaryItemPrice = styled.span`
${mobile({  color: "red" })}
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Empty = styled.div`
  width: 70%;
  padding: 20px;
  text-align: center;
  background-color: teal;
  display: flex;
  align-items: center;
  flex-direction: wrap;
  justify-content: space-between;
`

const EmptyMessage = styled.p`
  font-size: 20px;
`

const Cart = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart
  const total = cartItems.reduce((a,i) => a + i.quantity * i.price, 0).toFixed(2);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity])

  const removeFromCartHandle = (id) => {
    dispatch(removeFromCart(id))
  }

  const continueShop = () =>{ 
    let path = "/"; 
    navigate(path);
  };

  const checkOut = () =>{ 
    let path = "/payment"; 
    navigate(path);
  };
  
  return (
    <Container>
      <Navbar />
      <Announcement />
      
          { cartItems.length === 0 ? (
            <>
              <Wrapper style={{display:"flex", justifyContent:"center"}}>
              <Empty>
                <EmptyMessage>Your Cart is Empty</EmptyMessage>
                <TopButton  onClick={continueShop} style={{backgroundColor:"white"}}>START SHOPPING</TopButton>
              </Empty>
              </Wrapper>
            </>
            ) : (
              <>
              <Wrapper>
              <Title>YOUR BAG</Title>
              <Top>
              <TopButton onClick={continueShop}>CONTINUE SHOPPING</TopButton>
              <TopTexts>
                <TopText>Shopping Bag({cartItems.length})</TopText>
                <TopText>Your Wishlist (0)</TopText>
              </TopTexts>            
            </Top>

            <Bottom>
              <Info>
                  
                    {cartItems.map((item) => (
                    <Product>
                    <ProductDetail>
                      <Image src={item.img} alt={item.title}/>
                      <Details>
                        <ProductName>
                          <b>Product: {item.title}</b> 
                        </ProductName>
                        <ProductId>
                          <b>ID: {item.product}</b> 
                        </ProductId>
                        <ProductColor />
                        <ProductSize>
                          <b>Size:</b> 
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <AddIcon />
                        <ProductAmount>{item.quantity}</ProductAmount>
                        <RemoveIcon />
                        <DeleteOutlineOutlinedIcon 
                        style={{marginLeft:"10px"}}
                        onClick={() => removeFromCartHandle(item.product)}
                        />
                      </ProductAmountContainer>
                      <ProductPrice>
                        $ {item.price * item.quantity}
                      </ProductPrice>
                    </PriceDetail>
                    </Product>
                    ))}
                  
                            <Hr />
              </Info>
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>$ {total}</SummaryItemPrice>
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
                  <SummaryItemPrice>$ {total}</SummaryItemPrice>
                </SummaryItem>
                <TopButton type="filled" onClick={checkOut}>CHECKOUT NOW</TopButton>
              </Summary>          
            </Bottom>
            </Wrapper>
            </>
            )}
      <Footer />
    </Container>
    
  );
};

export default Cart;