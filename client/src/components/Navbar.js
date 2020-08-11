import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { ReactComponent as Logo } from "./assets/logo.svg";

const Navbar = () => {
  return (
    <NavWrapper>
      <li>
        <NavLink exact to="/">
          <StyledLogo />
        </NavLink>
      </li>
      <NavItem>
        <NavLink exact to="/products">
          Products
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink exact to="/login">
          Account
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink exact to="/cart">
          Cart
        </NavLink>
      </NavItem>
    </NavWrapper>
  );
};

export default Navbar;

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogo = styled(Logo)`
  height: 60px;
`;

const NavItem = styled.li`
  .active {
    color: red;
  }
  &:hover {
    text-decoration: underline;
  }
`;
