import React, { useEffect } from 'react';
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import { mobile } from '../responsive'
import ProfileForm from '../components/ProfileForm';
import Orders from '../components/Orders';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from './../redux/actions/UserActions';
import { listMyOrders } from '../redux/actions/OrderActions';

//HORA 4:18

 const Container = styled.div`
    flex: 3;
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

const Profile = () => {

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;

  console.log(userInfo._id)
  useEffect(() => {
    dispatch(listMyOrders(userInfo._id))
    dispatch(getUserDetails(userInfo._id))
  }, [dispatch])
  return (
    <>
    <Announcement/>
    <Navbar/>
    <ProfileForm/>
    <Orders orders={orders} loading={loading} error={error}/>
    </>
  );
};

export default Profile;