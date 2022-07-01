import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import ToastError from './ToastError'
import { toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../redux/actions/UserActions'

//HORA 4:18

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
    text-align: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`
const Button = styled.button`
    flex: 1;
    min-width: 40%;
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

const ProfileForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [id, setId] = useState("");
  const toastId = React.useRef(null);

  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfile

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setPhone(user.phone);
      setId(user._id)
    }
  }, [dispatch, user])


  const submitHandler = (e) =>{
    e.preventDefault();
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("password does not match", Toastobjects);
      }
    } else {
      
      dispatch(updateUserProfile(id,{firstName,lastName,phone, email,password}));
      console.log(firstName)
      console.log(user)
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("profile updated", Toastobjects);
      }
    }
  }
  

return (
<Container>
  <ToastError/>
      <Wrapper>
        <Title>USER DATA</Title>
        <Form  onSubmit={submitHandler} >
          <Input
             type="text"
             placeholder="First NAme"
             value={firstName}
             onChange={(e) => setFirstName(e.target.value)}
             required
          />
          <Input
             type="text"
             placeholder="Last Name"
             value={lastName}
             onChange={(e) => setLastName(e.target.value)}
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
             type="text"
             placeholder="Phone"
             value={phone}
             onChange={(e) => setPhone(e.target.value)}
          />  
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button>
            UPDATE
          </Button>
{/*           {error && <Error>Something went wrong...</Error>}
 */}
        </Form>
      </Wrapper>
      </Container>


  )
}

export default ProfileForm