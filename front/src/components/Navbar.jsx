import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import {mobile} from "../responsive.js"
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import zIndex from '@mui/material/styles/zIndex';
import { useSelector } from 'react-redux';


const Container = styled.div`
  height: 15vh;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
${mobile({ display: "none" })}
`;

const Language = styled.span`
    ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  margin-left: 25px;
  align-items: center;
  padding: 5px;
  ${mobile({ display: "none" })}
`

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`

const Center = styled.div`
flex: 1;
text-align: center;
`
const Logo = styled.h1`
font-weight: bold;
${mobile({ fontSize: "20px"})}
`

const Right = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({ flex: "2", justifyContent: "right" })}
`

const MenuItem = styled.div`
font-size: 14px;
cursor: pointer;
margin-left: 25px;
${mobile({ fontSize: "12px", marginLeft: "10px" })}
`


const Navbar = () => {
const cart = useSelector((state) => state.cart);
const { cartItems } = cart;
const userLogin = useSelector((state) => state.userLogin)
const { userInfo } = userLogin;
  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input/>
            <SearchIcon style={{color:"gray", fontsize: 16}}/>
          </SearchContainer>
        </Left>
        <Center>
          <Link to={"/"} style={{textDecoration: "none"}}>
            <Logo>LOGO</Logo>
          </Link>
        </Center>
        <Right>
         <Dropdown style={{ zIndex: "100" }} />
{/*          {userInfo ? (
          <>
          <Link to="/register" style={{textDecoration: "none"}}>
          <MenuItem>Register</MenuItem>
          </Link>
          <Link to="/login" style={{textDecoration: "none"}}>
          <MenuItem>Log In</MenuItem>
          </Link>
          </>
          ) : (
          <>
          <Link to="/register" style={{textDecoration: "none"}}>
          <MenuItem>Register</MenuItem>
          </Link>
          <Link to="/login" style={{textDecoration: "none"}}>
          <MenuItem>Log In</MenuItem>
          </Link>
          </>
          )} */}
          <Link to="/cart">
          <MenuItem>
            <Badge badgeContent={cartItems.length} color="primary">
              <ShoppingCartOutlinedIcon color="action" />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar