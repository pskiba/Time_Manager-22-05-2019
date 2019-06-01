import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme/mainTheme';
import GlobalStyled from '../../theme/globalStyle';
import SideBar from '../../components/organisms/sidebar/sidebar';

const MainTemplate = ({children}) => {
  return (
    <div>
      <GlobalStyled/>
      <ThemeProvider theme={theme}>
        <>
          <SideBar/>
          {children}
        </>
      </ThemeProvider>
    </div>
  )
};

export default MainTemplate;
