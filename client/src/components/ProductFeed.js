import React, { useState, useEffect} from "react";
import styled from "styled-components";
import { Link, useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { currentUser } from "./Login";

const ProductFeed = ({ items }) => {
  const [status, setStatus] = useState("loading");

  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [lowPrice, setLowPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(0);
  const history = useHistory();
  const search = useLocation().search.toLowerCase();
  const match = useRouteMatch("/products/:page");
  const page = match ? Number(match.params.page) : 1;

  console.log(currentUser);

  useEffect(() => {
    history.push(`/products${search}`);
  }, [lowPrice, highPrice]);

  const filteredItems = items
    .filter((item) =>
      search ? item.name.toLowerCase().includes(search.slice(8)) : item
    )
    .filter((item) =>
      lowPrice && lowPrice > 0 ? Number(item.price.slice(1)) > lowPrice : item
    )
    .filter((item) =>
      highPrice && highPrice > 0 && highPrice > lowPrice
        ? Number(item.price.slice(1)) <= highPrice
        : item
    );

  const totalItems = filteredItems.length;
  const maxPage = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  const display = filteredItems.slice(startIndex, endIndex);

  const handlePageSelect = (event) => {
    event.preventDefault();
    if (event.target.input.value < 2) event.target.input.value = "";
    if (event.target.input.value >= maxPage) event.target.input.value = maxPage;
    history.push(`/products/${event.target.input.value}${search}`);
    event.target.input.value = "";
  };

  const handleItemsPerPageChange = (event) => {
    if (Number(event.target.value) === totalItems) {
      history.push(`/products${search}`);
    } else if (page > Math.ceil(totalItems / Number(event.target.value))) {
      history.push(
        `/products/${Math.ceil(
          totalItems / Number(event.target.value)
        )}${search}`
      );
    }
    setItemsPerPage(Number(event.target.value));
  };

  const dispatch = useDispatch();

  return (
    <FeedWrapper>
      {filteredItems.length > 0 ? (
        <>
          <PageNav>
            <PageNavLeft>
              <form onSubmit={(ev) => handlePageSelect(ev)} autoComplete="off">
                <span>Page </span>
                <Input name="input" placeholder={page} />
                <PageInfo>
                  products {startIndex + 1}-
                  {page === maxPage ? totalItems : endIndex} of {totalItems}
                </PageInfo>
              </form>
              {page !== 1 && (
                <PreviousLink
                  to={`/products/${page === 2 ? "" : page - 1}${search}`}
                >
                  Previous
                </PreviousLink>
              )}
              {page !== maxPage && (
                <NextLink to={`/products/${page + 1}${search}`}>Next</NextLink>
              )}
            </PageNavLeft>
            <PageNavRight>
              <label htmlFor="numItems">Items per page:</label>
              <select
                name="numItems"
                defaultValue="24"
                onChange={(ev) => handleItemsPerPageChange(ev)}
              >
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="48">48</option>
                <option value={`${totalItems}`}>all</option>
              </select>
              <PriceFilter>
                <form>
                  Price range: ${" "}
                  <PriceInput
                    value={lowPrice === 0 ? "" : lowPrice}
                    type="number"
                    onChange={(ev) => setLowPrice(ev.target.value)}
                  />{" "}
                  to ${" "}
                  <PriceInput
                    value={highPrice === 0 ? "" : highPrice}
                    type="number"
                    onChange={(ev) => setHighPrice(ev.target.value)}
                  />
                </form>
              </PriceFilter>
            </PageNavRight>
          </PageNav>
          {search && (
            <SearchInfo>
              <h2>
                {filteredItems.length} products found matching "
                {search.slice(8)}"
              </h2>
              <ClearButton onClick={() => history.push("/products")}>
                X
              </ClearButton>
            </SearchInfo>
          )}
        </>
      ) : (
        (search && (
          <SearchInfo>
            <h2>No products found matching "{search.slice(8)}"</h2>
            <ClearButton onClick={() => history.push("/products")}>
              X
            </ClearButton>
          </SearchInfo>
        )) || <h2>No products found in that price range</h2>
      )}

      <ProductGrid>
        {display
          .filter((item) =>
            search ? item.name.toLowerCase().includes(search.slice(8)) : item
          )
          .map((item) =>
            item.numInStock > 0 ? (
              <ItemWrapper key={item.id}>
                <Image src={item.imageSrc} />
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price}</ItemPrice>
                <Button onClick={() => dispatch(addItem(item))}>
                  Add to cart
                </Button>
              </ItemWrapper>
            ) : (
              <ItemWrapper key={item.id}>
                <Image src={item.imageSrc} />
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price}</ItemPrice>
                <OOSButton>Out of Stock</OOSButton>
              </ItemWrapper>
            )
          )}
      </ProductGrid>
    </FeedWrapper>
  );
};

const FeedWrapper = styled.div`
font-family: sans-serif;
`;

const PriceFilter = styled.div``;

const PriceInput = styled.input`
  width: 40px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const PageNav = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PageNavLeft = styled.div``;

const PageNavRight = styled.div`
  align-items: right;
  justify-content: right;
  text-align: right;
`;

const Input = styled.input`
  width: 25px;
`;

const PageInfo = styled.span`
  color: gray;
  font-size: 0.7em;
  margin-left: 4px;
`;

const SearchInfo = styled.div`
  display: flex;
`;

const PreviousLink = styled(Link)`
  display: inline;
  margin-right: 20px;
  color: #3c3c3c;
`;

const NextLink = styled(Link)`
  display: inline;
  color: #3c3c3c;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
`;

const ProductGrid = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(50% / 4 + 90px);
  height: 300px;
  margin: 1rem;
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
  font-size: 14px;
  max-width: 70%;
`;

const ItemPrice = styled.span`
  display: inline-block;
`;

const Button = styled.button`
  background-color: #3c3c3c;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  margin-top: 5px;
`;

const OOSButton = styled.button`
  background-color: darkblue;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  margin-top: 5px;
`;

export default ProductFeed;
