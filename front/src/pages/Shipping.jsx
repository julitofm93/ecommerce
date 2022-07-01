import React, { useState } from 'react'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import { mobile } from '../responsive'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { saveShippingAddress } from "../redux/actions/CartActions";

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
    ${mobile({ width: "75%"})}
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
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

const Shipping = () => {

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    console.log(shippingAddress)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        let path = "/placeorder"; 
        navigate(path);
    }

  return (
    <div>
      <Announcement/>
      <Navbar/>
      <Container>
      <Wrapper>
        <Title>DELIVERY ADDRESS</Title>
        <Form  onSubmit={submitHandler} >
        <Input
             type="text"
             placeholder="Enter Address"
             value={address}
             onChange={(e) => setAddress(e.target.value)} 
             required
          />
            
        <Input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)} 
            required
          />

        <Input
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)} 
            required
        />

        <Input
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)} 
            required
        />
          
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

export default Shipping
