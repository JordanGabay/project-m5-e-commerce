import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Searchbar = () => {
  const history = useHistory();

  const handleSearch = (event) => {
    event.preventDefault();
    if (event.target.search.value === "") {
      event.target.search.placeholder = "Search";
    } else {
      history.push(`/products?search=${event.target.search.value}`);
      event.target.search.value = "";
      event.target.search.placeholder = "Search";
    }
  };

  return (
    <Wrapper>
      <form onSubmit={(e) => handleSearch(e)}>
        <Input name="search" placeholder="Search" />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 50px;
  text-align: center;
  padding-top: 12px;
`;

const Input = styled.input`
  width: 150px;
`;

export default Searchbar;
