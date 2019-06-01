import React from 'react';
import { storiesOf } from '@storybook/react';
import SlideButton from './slideButton';

storiesOf('SlideButton', module)
  .add('Left', () => <SlideButton left/>)
  .add('Right', () => <SlideButton right/>)
