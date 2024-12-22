import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Navigation from './Navigation';

const Wrapper = styled.div`
  @media (min-width: 700px) {
    display: flex;
    top: 64px;
    position: relative;
    height: calc(100% - 64px);
    width: 100%;
    flex: auto;
    flex-direction: column;
  }
`;

const Main = styled.main`
  position: fixed;
  height: calc(100% - 64px);
  width: 100%;
  padding: 1em;
  overflow-y: scroll;

  @media (max-width: 700px) {
    margin-left: ${({ isCollapsed }) => (isCollapsed ? '90px' : '180px')};
    width: ${({ isCollapsed }) => (isCollapsed ? 'calc(100% - 90px)' : 'calc(100% - 180px)')};
    transition: margin-left 0.3s ease, width 0.3s ease;
    top: 64px;
  }

  @media (min-width: 700px) {
    flex: 1;
    margin-left: ${({ isCollapsed }) => (isCollapsed ? '90px' : '220px')};
    height: calc(100% - 64px);
    width: ${({ isCollapsed }) => (isCollapsed ? 'calc(100% - 90px)' : 'calc(100% - 220px)')};
    transition: margin-left 0.3s ease, width 0.3s ease;
  }
`;

const Layout = ({ children, isCollapsed }) => {
  return (
    <React.Fragment>
      <Header />
      <Wrapper>
        <Navigation isCollapsed={isCollapsed} />
        <Main isCollapsed={isCollapsed}>{children}</Main>
      </Wrapper>
    </React.Fragment>
  );
};

export default Layout;
