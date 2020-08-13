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
        <Image src={item.productInfo.imageSrc} />
        <InfoWrapper>
          <RemoveWrapper>
            <ItemName>{item.productInfo.name}</ItemName>
            <Remove onClick={() => dispatch(removeItem(item.productInfo))}>
              <MdRemoveCircleOutline />
            </Remove>
          </RemoveWrapper>
          <Wrapper2>
            <ItemPrice>{item.productInfo.price}</ItemPrice>
          </Wrapper2>
        </InfoWrapper>
      </ItemInfo>
      <QuantityDiv>
        <label>Quantity</label>
        <Quantity type="number" value={item.quantity} />
      </QuantityDiv>
    </ItemInfoWrapper>
  );
};

export default CartItem;

const RemoveWrapper = styled.div`
display: flex;

`

const InfoWrapper = styled.div`
display: flex;
flex-direction: column;

`

const ItemInfoWrapper = styled.ul`
  padding: 0;
`;

const ItemInfo = styled.div`
display:flex;
`;

const ItemName = styled.h3`
font-size: 20px;
margin-left: 10px;
padding-top: 2%;
`;

const Image = styled.img`
float: left;
width: 10%;
`;

const Wrapper2 = styled.div`
  display: flex;
  margin-left: 10px;
  margin-top: 20px;
`;

const ItemBody = styled.p`
display: flex;
font-size: 15px;
`;

const ItemPrice = styled.p`
display: flex;
margin-left: 10px;
font-size: 15px;
`;

const QuantityDiv = styled.div``;

const Quantity = styled.input`
  width: 50px;
  height: 30px;
`;

const Remove = styled.button`
  background: transparent;
  color: black;
  font-size: 1.25rem;
  border: none;
  margin-left: 10px;
`;
