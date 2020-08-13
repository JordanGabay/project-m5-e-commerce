import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { currentUser } from "./Login";
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const Homepage = () => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("idle");
  }, []);

  console.log(currentUser);

  return status === "idle" ? (
    <HomeWrapper>
      <WelcomeDiv>
        Welcome to our website! Here at "JORDAC", we pride ourselves on having a
        vast amount of wearable tech that covers the needs of any current and
        future clients. You'll recognize some of the brands we sell such as
        Garmin, Sony, Jawbone and many more... Feel free to take a look!
      </WelcomeDiv>
      <Brands>Some of our brands:</Brands>
        <StyledLink to={"/products"}>Browse our products</StyledLink>
    </HomeWrapper>
  ) : (
    <CircularProgress />
  );
};

const WelcomeDiv = styled.div`
margin-top: 50px;
`

const HomeWrapper = styled.div`
font-style: sans-serif;
`

const StyledLink = styled(NavLink)`
  font-weight: bold;
  
`;

const Brands = styled.p`
margin-bottom: 100px;
margin-top: 20px;
`



export default Homepage;
