import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useRouteMatch, useHistory } from 'react-router-dom'

const ProductFeed = ({ items }) => {
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const history = useHistory()
  const match = useRouteMatch('/products/:page')
  const page = match ? Number(match.params.page) : 1

  const startIndex = (page-1)*itemsPerPage
  const endIndex = page*itemsPerPage
  const maxPage = Math.ceil(348/itemsPerPage)
  const display = items.slice(startIndex, endIndex)


  const handlePageSelect = (event) => {
    event.preventDefault()
    if (event.target.input.value < 2) event.target.input.value = ''
    if (event.target.input.value >= maxPage) event.target.input.value = maxPage
    history.push(`/products/${event.target.input.value}`)
    event.target.input.value = ''
  }

  const handleItemsPerPageChange = (event) => {
    if (page > Math.ceil(348/Number(event.target.value))) {
      history.push(`/products/${Math.ceil(348/Number(event.target.value))}`)
    }
    setItemsPerPage(Number(event.target.value))
    
  }


  return (<>
    <PageNav>
      {page !== 1 && <Link to={`/products/${page === 2 ? '' : page-1}`}>previous</Link>}
      <form onSubmit={(ev) => handlePageSelect(ev)} autocomplete='off' >
        <Input name='input' placeholder={page} />
        <PageInfo>products {startIndex + 1}-{page === maxPage ? 348 : endIndex} of 348</PageInfo>
      </form>
      {page !== maxPage && <div><Link to={`/products/${page+1}`}>next</Link></div>}
      <label for='numItems'>Items per page:</label>
        <select name='numItems' onChange={(ev) => handleItemsPerPageChange(ev)}>
          <option value='12'>12</option>
          <option selected='selected' value='24'>24</option>
          <option value='48'>48</option>
          <option value='348'>all</option>
        </select>
    </PageNav>
    
    <ProductGrid>
      {display.map((item) => (
        <ItemWrapper>
          <Image src={item.imageSrc} />
          <ItemName>{item.name}</ItemName>
          <ItemBody>{item.body_location}</ItemBody>
          <ItemPrice>{item.price}</ItemPrice>
        </ItemWrapper>
      ))}
    </ProductGrid>
  </>);
};

const PageNav = styled.div`

`

const Input = styled.input`
  width: 25px;
`

const PageInfo = styled.span`
  color: gray;
  font-size: 0.7em;
`

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
  font-weight: bold;
  text-align: center;
  padding: 5px;
  font-size: 15px;
`;

const ItemPrice = styled.span`
  font-size: 13px;
`;

const ItemBody = styled.span`
  font-size: 13px;
`;

export default ProductFeed;
