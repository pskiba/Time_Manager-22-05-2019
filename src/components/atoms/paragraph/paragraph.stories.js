import React from 'react';
import { storiesOf } from '@storybook/react';
import Paragraph from './paragraph';

storiesOf('Atoms/Paragraph', module)
  .add('Normal', () => <Paragraph/>);