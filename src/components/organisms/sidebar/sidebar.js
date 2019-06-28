import React from 'react';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Logo from '../../atoms/logo/logo';
import { routes } from '../../../routes';
import logOutAct from '../../../_redux/actions/logOutAct';

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

const Sidebar = ({loginStatus, logOutAct}) => {
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
            {
              loginStatus === 'log in' ? <NavLink to={routes.logIn} activeclass="active" onClick={logOutAct}>Log out</NavLink> : <NavLink to={routes.logIn} activeclass="active">Log in</NavLink>
            }
          </NavItem>
        </StyledNavList>
      </nav>
    </StyledWrapper>
  )
};

const mapStateToProps = (state) => {
  return {
    loginStatus: state.loginStatus
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOutAct: () => logOutAct(dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);