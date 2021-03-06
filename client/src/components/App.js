import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Globalstyles from "./Globalstyles";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import Homepage from "./Homepage";
import ProductFeed from "./ProductFeed";
import Login from "./Login";
import Cart from "./Cart";
import Checkout from './Checkout'
import Order from './Order'

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/api/items/page/1`)
      .then((res) => res.json())
      .then((data) => setItems(data));
    fetch(`/api/items`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <Wrapper>
      <Router>
        <Globalstyles />
        <Navbar />
        <Switch>
          <Route exact path="/">
            {/* Changed homepage to a website introduction page */}
            <Homepage />
          </Route>
          <Route path="/products">
            {/* Old homepage feed moved here */}
            <ProductFeed items={items} />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route path='/checkout'>
            <Checkout />
          </Route>
          <Route path='/order'>
            <Order />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  );
};
const Wrapper = styled.div`
`;
export default App;
