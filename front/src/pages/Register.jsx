import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import { mobile } from '../responsive'
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/UserActions';



const Container = styled.div`
    width: 100vw;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    border: 1px solid gray;
    background-color: white;
    ${mobile({ width: "75%"})}
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`
const Agreement = styled.span`
    font-style: 12px;
    margin: 20px 0px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`
const Error = styled.span`
    color: red;
    `;

const Register = () => {
    const [email, setEmail] = useState("");
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const userRegister = useSelector((state) => state.userRegister)
    const { error, loading, userInfo } = userRegister;
    
    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
      if(userInfo) {
        navigate(redirect)
      }
    }, [userInfo, redirect])

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(register(first_name, last_name, phone, email, password))
    }

    const routeChange = () =>{ 
        let path = "/login"; 
        navigate(path);
        }
    
  return (
    <div>
    <Announcement/>
    <Navbar/>
    <Container>
        <Wrapper>
            <Title>Create an account</Title>
            {error && <Error>{error}</Error>}
            <Form onSubmit={submitHandler}>
                <Input 
                    name="first_name"
                    placeholder='Name'
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />

                <Input 
                name="last_name"
                placeholder='Last Name'
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
                />

                <Input 
                    name="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

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

                <Input 
                    placeholder="Confirm Password"
                />
                <Agreement>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quidem consequatur, amet repellendus quo accusantium unde sint nemo magnam explicabo saepe animi facilis quae. Delectus beatae nisi facere repellendus aspernatur.</Agreement>
                
                <Button type="submit">CREATE</Button>
                <Button onClick={routeChange}>LOG IN</Button>
            </Form>
            

        </Wrapper>
    </Container>
    </div>
  )
}


export default Register