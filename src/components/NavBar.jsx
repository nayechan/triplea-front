import 'styles/nav-bar.css'

import React from 'react';
import styled from 'styled-components';
import { BrowserRouter } from "react-router-dom";
import navBarItems from 'constants/navBarContent';

// Styled components
const NavbarContainer = styled.nav`
  background-color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center; /* Align items vertically */
  height: 60px;
  font-size: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add shadow effect */
`;

const Logo = styled.div`
  margin-right: 20px; /* Add some spacing between logo and navbar items */
  font-weight: bold;
  color: #237067;
`;

const NavbarList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end; /* Align navbar items to the right */
`;

const NavbarItem = styled.li`
  margin-right: 10px;
`;

const NavbarLink = styled.a`
  text-decoration: none;
  color: #237067;
  &:hover {
    text-decoration: underline;
  }
`;

function NavBar() {
    return (
        <NavbarContainer>
          <Logo>Trip:lener</Logo>
          <NavbarList>
            {navBarItems.map((item, index) => (
              <NavbarItem key={index}>
                <NavbarLink href={item.path}>{item.label}</NavbarLink>
              </NavbarItem>
            ))}
          </NavbarList>
        </NavbarContainer>
      );
}

export default NavBar;
