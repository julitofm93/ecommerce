import { useEffect, useState } from "react"
import styled from "styled-components"
import { popularProducts } from "../data"
import Product from "./Product"
import { useDispatch, useSelector } from "react-redux"
import { listProduct } from "../redux/actions/ProductActions";
import { mobile } from '../responsive.js';

const Container = styled.div`
    padding: 20px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Title = styled.h2`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobile({ fontSize: "50px" })}
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);


  return (
    <Container>
      <Title>
        Productos
      </Title>
      <Wrapper>
      {products.map((product) => (
        <Product key={product._id} product={product} />
        ))
      }
      </Wrapper>
    </Container>

  );
};

export default Products
