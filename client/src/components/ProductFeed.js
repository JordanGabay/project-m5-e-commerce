import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom'

const ProductFeed = ({ items }) => {
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const history = useHistory()
  const search = useLocation().search.toLowerCase()
  const match = useRouteMatch('/products/:page')
  const page = match ? Number(match.params.page) : 1

  const filteredItems = items.filter(item => search ? item.name.toLowerCase().includes(search.slice(8)) : item)
  const totalItems = filteredItems.length
  const maxPage = Math.ceil(totalItems/itemsPerPage)

  const startIndex = (page-1)*itemsPerPage
  const endIndex = page*itemsPerPage
  const display = filteredItems.slice(startIndex, endIndex)

  

  const handlePageSelect = (event) => {
    event.preventDefault()
    if (event.target.input.value < 2) event.target.input.value = ''
    if (event.target.input.value >= maxPage) event.target.input.value = maxPage
    history.push(`/products/${event.target.input.value}${search}`)
    event.target.input.value = ''
  }

  const handleItemsPerPageChange = (event) => {
    if (Number(event.target.value) === totalItems) {
      history.push(`/products${search}`)
    } else if (page > Math.ceil(totalItems/Number(event.target.value))) {
      history.push(`/products/${Math.ceil(totalItems/Number(event.target.value))}${search}`)
    }
    setItemsPerPage(Number(event.target.value))
    
  }


  return (<>
    {filteredItems.length > 0 
    ? <><PageNav>
      {page !== 1 && <Link to={`/products/${page === 2 ? '' : page-1}${search}`}>previous</Link>}
      <form onSubmit={(ev) => handlePageSelect(ev)} autocomplete='off' >
        <Input name='input' placeholder={page} />
        <PageInfo>products {startIndex + 1}-{page === maxPage ? totalItems : endIndex} of {totalItems}</PageInfo>
      </form>
      {page !== maxPage && <div><Link to={`/products/${page+1}${search}`}>next</Link></div>}
      <label for='numItems'>Items per page:</label>
        <select name='numItems' onChange={(ev) => handleItemsPerPageChange(ev)}>
          <option value='12'>12</option>
          <option selected='selected' value='24'>24</option>
          <option value='48'>48</option>
          <option value={`${totalItems}`}>all</option>
        </select>
    </PageNav>
    <h2>{filteredItems.length} products found matching "{search.slice(8)}"</h2></>
    : <h2>no products found</h2>}
    
    <ProductGrid>
      {display.filter(item => search ? item.name.toLowerCase().includes(search.slice(8)) : item ).map((item) => (
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
