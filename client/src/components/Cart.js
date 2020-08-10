import React from "react";
import styled from "styled-components";

const Cart = () => {
  return (
    <ShoppingWrapper>
      <ShoppingCart>Shopping Bag</ShoppingCart>
      {/* <Wrapper2>
                <IPR>Item</IPR>
                <IPR>Price</IPR>
            </Wrapper2> */}
    </ShoppingWrapper>
  );
};

const ShoppingWrapper = styled.div``;

const ShoppingCart = styled.h1``;

export default Cart;
