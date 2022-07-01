import React, { useState } from 'react'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { Radio } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../redux/actions/CartActions'

const Container = styled.div`
    width: 100vw;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 25%;
    background-color: white;
    justify-content: center;
    border: 1px solid gray;
    align-items: center;
    ${mobile({ width: "75%"})}
`

const Title = styled.h1`
    margin: 10px 0;
    font-size: 24px;
    font-weight: 300;
    display: flex;
    justify-content: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 0;
    padding: 10px;
`
const Button = styled.button`
    width: 100%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    display: flex;
    justify-content: center;
    margin: 10px 0;
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

const RadioContainer = styled.div`

`

const Label = styled.label``;

const Payment = () => {

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [paymentMethod, setPaymentMethod] = useState("paypal");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(paymentMethod)
        dispatch(savePaymentMethod(paymentMethod))
         let path = "/shipping"; 
        navigate(path);
    }

  return (
    <div>
        <Announcement/>
        <Navbar/>
        <Container>
        <Wrapper>
        
        <Form  onSubmit={submitHandler}>
        <Title>DELIVERY OPTIONS</Title>
        <RadioContainer>        
        
          <Input 
            type="radio" 
            id="Paypal" 
            name="drone" 
            value="paypal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
            />
          <Label for="paypal">Pick up en tienda</Label>     
        </RadioContainer>   
        <RadioContainer>  
        <Input 
            type="radio" 
            id="cash" 
            name="drone" 
            value="cash"
            onChange={(e) => setPaymentMethod(e.target.value)}
            />
          <Label for="cash">Envío a domicilio</Label>
        </RadioContainer>    
          <Button type="submit">
            CONTINUE
          </Button>
{/*           {error && <Error>Something went wrong...</Error>} */}
        </Form>
      </Wrapper>
      </Container>
    </div>
  )
}

export default Payment