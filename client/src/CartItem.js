import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { removeItem } from "./actions";
import { MdRemoveCircleOutline } from "react-icons/md";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  console.log(item);
  return (
    <ItemInfoWrapper>
      <ItemInfo>
        <ItemName>{item.productInfo.name}</ItemName>
        <Image src={item.productInfo.imageSrc} />
        <ItemBody>{item.productInfo.body_location}</ItemBody>
        <ItemPrice>{item.productInfo.price}</ItemPrice>
        <Remove onClick={() => dispatch(removeItem(item.productInfo))}>
          <MdRemoveCircleOutline />
        </Remove>
      </ItemInfo>
      <QuantityDiv>
        <label>Quantity</label>
        <Quantity type="number" value={item.quantity} />
      </QuantityDiv>
    </ItemInfoWrapper>
  );
};

export default CartItem;

const ItemInfoWrapper = styled.ul`
  padding: 0;
`;

const ItemInfo = styled.div``;

const ItemName = styled.h3``;

const Image = styled.img``;

const ItemBody = styled.p``;

const ItemPrice = styled.p``;

const QuantityDiv = styled.div``;

const Quantity = styled.input`
  width: 50px;
  height: 30px;
`;
const Remove = styled.button`
  background: transparent;
  color: black;
  padding: 0.5rem;
  font-size: 1.25rem;
  border: none;
  margin-right: 1rem;
`;
