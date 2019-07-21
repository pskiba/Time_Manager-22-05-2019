import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,700&display=swap');
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html {
    font-size: 62.5%;
  }
  body {
    font-size: 1.6rem;
    font-family: 'Montserrat', sans-serif;
  }
  
  @keyframes scaleAnim {
		from {
			transform: scale(0.5);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}
	@keyframes triangleAnim {
		from {
			bottom: 0;
			opacity: 0;
		}
		to {
			bottom: -8px;
			opacity: 1;
		}
	}
	@keyframes heightAnim {
		from {
			height: 0;
			opacity: 0;
		}
		to {
			height: auto;
			opacity: 1;
		}
	}
	
	
 
`;

export default GlobalStyle;