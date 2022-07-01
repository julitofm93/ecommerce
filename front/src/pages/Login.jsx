import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { mobile } from '../responsive'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from "react-redux";
import { login } from '../redux/actions/UserActions';
import { useNavigate, useLocation } from 'react-router-dom';

//HORA 3:26
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

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const userLogin = useSelector((state) => state.userLogin)
    const { error, loading, userInfo } = userLogin;
    
    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
      if(userInfo) {
        navigate(redirect)
      }
    }, [userInfo, redirect])

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, password))
      console.log(userLogin.product)
      if(userInfo){
        let path = "/"; 
      navigate(path);
      }
    }
   return (
    <div>
      <Announcement/>
      <Navbar/>
      <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={submitHandler}>
          <Input
             type="email"
             placeholder="Email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
          />
            
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Button type="submit">
            LOGIN
          </Button>
          {error && <Error>Something went wrong...</Error>}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link >CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
      </Container>
    </div>
  );
};

export default Login;