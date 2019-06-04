import React from 'react';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import Logo from '../../atoms/logo/logo';
import { routes } from '../../../routes';

const NavItem = styled.li`
  display: inline-block;
  padding: 5px 20px 5px 20px;
  
  a {
    color: ${({theme}) => theme.color.white};
    text-decoration: none;
  }
`;

const StyledNavList = styled.ul`
  padding: 0;
  margin: 0;
`;

const StyledWrapper = styled.div`
  width: 960px;
  margin: 0 auto;
  height: 30px;
  background-color: ${({theme}) => theme.color.darkgray};
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const Sidebar = () => {
  return (
    <StyledWrapper>
      <Logo>LOGO</Logo>
      <nav>
        <StyledNavList>
          <NavItem>
            <NavLink to={routes.home} activeclass="active">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={routes.statistics} activeclass="active">Statistics</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={routes.logIn} activeclass="active">Log in</NavLink>
          </NavItem>
          {/*<NavItem>*/}
          {/*  <NavLink to={routes.logOut} activeclass="active">Log out</NavLink>*/}
          {/*</NavItem>*/}
        </StyledNavList>
      </nav>
    </StyledWrapper>
  )
};

export default Sidebar;