import React from 'react';
import { storiesOf } from "@storybook/react";
import Logo from './logo';

storiesOf('Atoms/Logo', module)
  .add('Normal', () => <Logo>Logo</Logo>);