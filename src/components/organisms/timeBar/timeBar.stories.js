import React from 'react';
import { storiesOf } from '@storybook/react';
import TimeBar from './timeBar';

storiesOf('Time Bar', module)
  .add('To Do', () => <TimeBar todo/>)
