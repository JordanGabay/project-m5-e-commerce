import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Searchbar from "./Searchbar";
import logo from "./assets/logo.png";

const Navbar = () => {
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
  justify-content: space-between;
`;

const StyledLogo = styled.img`
  position: absolute;
  left: calc(50vw - 73px);
  top: 24px;
  height: 28px;
  z-index: -5;
  /* margin: 3px 8px 0 0; */
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
  /* position: absolute;
  top: 28px;
  left: 92vw; */
`;

const StyledLink = styled(NavLink)`
  margin: auto 10px;
`;
