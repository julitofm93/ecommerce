import styled from "styled-components";
import { mobile } from "../responsive";

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    -o-transition: all .5s;
    transition: all .5s;
    ${mobile({ height: "100%" })}
`
const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 80vh;
    position: relative;
    overflow: hidden;
    &:hover ${Image}{
        transform: scale(1.2)
    }
`

const Info = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

`
const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
`
const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color: gray;
    cursor: pointer;
    font-weight: 600;
`

const CategoryItem = ({item}) => {
  return (
    <Container>
        <Image src={item.img}/>
        <Info>
            <Title>{item.title}</Title>
            <Button>Shop now</Button>
        </Info>
    </Container>
  )
}

export default CategoryItem
