import React from 'react';
import { storiesOf } from '@storybook/react';
import Calendar from './calendar';

storiesOf('Organism/Calendar', module)
  .add('Normal', () => <Calendar/>);