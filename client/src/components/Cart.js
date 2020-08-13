import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CartItem from "../CartItem";
import { useSelector } from "react-redux";
import { getStoreItemArray } from "../reducers";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from 'react-router-dom'

import { currentUser } from "./Login";

const Cart = () => {
  const [status, setStatus] = useState("loading");
  const storeItems = useSelector(getStoreItemArray);

  useEffect(() => {
    setStatus("idle");
  }, []);

  console.log(currentUser);

  return status === "idle" ? (
    <>
      <ShoppingWrapper>
        <ShoppingCart>Shopping Bag</ShoppingCart>
        {storeItems.map((item) => {
          return <CartItem item={item} />;
        })}
      </ShoppingWrapper>
      <EmailWrapper>
        <Checkout>Checkout</Checkout>
        <EmailSpan>
          Enter your email to login or continue to checkout as a guest.
        </EmailSpan>
        <EnterEmail>Email Address</EnterEmail>
        <CheckoutWrapper>
          <CheckoutBox to="/checkout">PROCEED TO CHECKOUT</CheckoutBox>
        </CheckoutWrapper>
      </EmailWrapper>
    </>
  ) : (
    <CircularProgress />
  );
};

const ShoppingWrapper = styled.div`
  border-bottom: thin solid grey;
  padding: 10px;
  text-align: center;
`;

const ShoppingCart = styled.h3`
  margin-bottom: 20px;
`;

const EmailWrapper = styled.div``;

const Checkout = styled.h3`
  margin-top: 20px;
  margin-left: 10px;
`;

const EmailSpan = styled.p`
  margin-top: 5px;
  margin-left: 10px;
`;

const EnterEmail = styled.p`
  margin-top: 5px;
  margin-left: 10px;
`;

const CheckoutWrapper = styled.div`
margin-top: 10px;

`

const CheckoutBox = styled(Link)`
  background-color: #3c3c3c;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  margin-top: 5px;
  margin-left: 10px;
`;


export default Cart;
