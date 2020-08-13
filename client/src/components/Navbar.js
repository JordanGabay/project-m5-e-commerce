import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Searchbar from "./Searchbar";
import logo from "./assets/logo.png";

const Navbar = () => {
  console.log(logo);
  return (
    <NavWrapper>
      <NavbarLeft>
        <NavItem>
          <StyledLink to="/products">Products</StyledLink>
        </NavItem>
        <Searchbar />
      </NavbarLeft>
      <li>
        <StyledLink exact to="/">
          <StyledLogo src={logo} alt="logo" />
        </StyledLink>
      </li>
      <NavbarRight>
        <NavItem>
          <StyledLink exact to="/login">
            Account
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink exact to="/cart">
            Cart
          </StyledLink>
        </NavItem>
      </NavbarRight>
    </NavWrapper>
  );
};

export default Navbar;

const NavWrapper = styled.nav`
  display: flex;
  margin: 12px;
  justify-content: space-between;
`;

const StyledLogo = styled.img`
  height: 28px;
  margin: 12px 124px 0 0;
`;

const NavItem = styled.li`
  .active {
    font-weight: bold;
  }
  &:hover {
    text-decoration: underline;
  }
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 28px;
  left: 92vw;
`;

const StyledLink = styled(NavLink)`
  margin: auto 10px;
`;
