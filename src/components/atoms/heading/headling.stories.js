import React from 'react';
import { storiesOf } from '@storybook/react';
import Heading from './heading';

storiesOf('Atoms/Heading', module)
  .add('Normal', () => <Heading>Heading</Heading>);