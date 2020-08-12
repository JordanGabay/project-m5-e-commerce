import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CartItem from "../CartItem";
import { useSelector } from "react-redux";
import { getStoreItemArray } from "../reducers";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getCurrentUser } from "./Login";

const Cart = () => {
  const [status, setStatus] = useState("loading");
  const storeItems = useSelector(getStoreItemArray);

  useEffect(() => {
    setStatus("idle");
  }, []);

  getCurrentUser();

  return status === "idle" ? (
    <>
      <ShoppingWrapper>
        <ShoppingCart>Shopping Bag</ShoppingCart>
        <Wrapper2>
          <IPR>Item</IPR>
          <IPR>Price</IPR>
          <IPR>Remove</IPR>
        </Wrapper2>
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
        <EmailTextBox input type="email" id="email" name="email"></EmailTextBox>
        <CheckoutBox>PROCEED TO CHECKOUT</CheckoutBox>
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

const Wrapper2 = styled.div`
  word-spacing: 20px;
  color: blue;
`;

const IPR = styled.span``;

const EmailWrapper = styled.div``;

const Checkout = styled.h3``;

const EmailSpan = styled.p``;

const EnterEmail = styled.p``;

const EmailTextBox = styled.input``;

const CheckoutBox = styled.button`
  margin-left: 10px;
  color: white;
  background-color: black;
`;

export default Cart;
