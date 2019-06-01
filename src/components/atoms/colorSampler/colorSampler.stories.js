import React from 'react';
import { storiesOf } from '@storybook/react';
import ColorSampler from './colorSampler';

storiesOf('ColorSampler', module)
  .add('Red', () => <ColorSampler color='#ff0000'/>)
  .add('Blue', () => <ColorSampler color='#0000ff'/>)