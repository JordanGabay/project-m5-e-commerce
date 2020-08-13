import React, { useState, useEffect } from "react";
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
            {page !== 1 && (
              <Link to={`/products/${page === 2 ? "" : page - 1}${search}`}>
                previous
              </Link>
            )}
            <form onSubmit={(ev) => handlePageSelect(ev)} autoComplete="off">
              <Input name="input" placeholder={page} />
              <PageInfo>
                products {startIndex + 1}-
                {page === maxPage ? totalItems : endIndex} of {totalItems}
              </PageInfo>
            </form>
            {page !== maxPage && (
              <div>
                <Link to={`/products/${page + 1}${search}`}>next</Link>
              </div>
            )}
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
            <h2>no products found matching "{search.slice(8)}"</h2>
            <ClearButton onClick={() => history.push("/products")}>
              X
            </ClearButton>
          </SearchInfo>
        )) || <h2>no products found in that price range</h2>
      )}

      <PriceFilter>
        <form>
          Price range:{" "}
          <PriceInput
            value={lowPrice === 0 ? "" : lowPrice}
            type="number"
            onChange={(ev) => setLowPrice(ev.target.value)}
          />{" "}
          to{" "}
          <PriceInput
            value={highPrice === 0 ? "" : highPrice}
            type="number"
            onChange={(ev) => setHighPrice(ev.target.value)}
          />
        </form>
      </PriceFilter>

      <ProductGrid>
        {display
          .filter((item) =>
            search ? item.name.toLowerCase().includes(search.slice(8)) : item
          )
          .map((item) => (
            <ItemWrapper key={item.id}>
              <Image src={item.imageSrc} />
              <ItemName>{item.name}</ItemName>
              <ItemBody>{item.body_location}</ItemBody>
              <Button onClick={() => dispatch(addItem(item))}>
                Add to Cart - {item.price}
              </Button>
            </ItemWrapper>
          ))}
      </ProductGrid>
    </FeedWrapper>
  );
};

const FeedWrapper = styled.div`
  .webkit-scrollbar {
    display: none;
  }
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

const PageNav = styled.div``;

const Input = styled.input`
  width: 25px;
`;

const PageInfo = styled.span`
  color: gray;
  font-size: 0.7em;
`;

const SearchInfo = styled.div`
  display: flex;
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

const ItemBody = styled.span`
  font-size: 13px;
`;

const Button = styled.button``;

export default ProductFeed;
