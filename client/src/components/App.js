import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Globalstyles from "./Globalstyles";
import Navbar from "./Navbar";
import Homepage from './Homepage';
import ProductFeed from "./ProductFeed";
import Login from "./Login";
import Cart from "./Cart";
const App = () => {
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
          <Route exact path="/products">
            {/* Old homepage feed moved here */}
            <ProductFeed />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          {/* <Route>
            Anything else
          </Route> */}
        </Switch>
      </Router>
    </Wrapper>
  );
};
const Wrapper = styled.div``;
export default App;
