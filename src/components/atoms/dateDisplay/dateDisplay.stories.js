import React from 'react';
import { storiesOf } from '@storybook/react';
import DateDisplay from './dateDisplay';

storiesOf('Atoms/DateDisplay', module)
  .add('Normal', () => <DateDisplay>Thu Jun 20 2019</DateDisplay>);