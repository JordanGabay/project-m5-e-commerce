import React, { useState, useEffect } from 'react'
import styled from 'styled-components'


const ProductFeed = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch('/api/items')
            .then(res => res.json())
            .then(data => setItems(data))
    }, [])


    
    return (
      <ProductGrid>
        {items.map((item) => (
          <ItemWrapper>
              <Image src={item.imageSrc} />
            <ItemName>{item.name}</ItemName>
            <ItemBody>{item.body_location}</ItemBody>
            <ItemPrice>{item.price}</ItemPrice>
          </ItemWrapper>
        ))}
      </ProductGrid>
    );
}

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(80% / 4);
  margin: 0.5rem 1rem;
  box-sizing: border-box;
`;

const Image = styled.img`
  height: 200px;
  border-radius: 20px;
`;

const ItemName = styled.span`
font-weight:bold;
text-align: center;
padding: 5px;
font-size: 15px;
`

const ItemPrice = styled.span`
font-size: 13px;
`

const ItemBody = styled.span`
font-size: 13px;
`



export default ProductFeed