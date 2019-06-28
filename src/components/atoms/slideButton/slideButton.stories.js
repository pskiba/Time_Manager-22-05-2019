import React from 'react';
import { storiesOf } from '@storybook/react';
import SlideButton from './slideButton';

storiesOf('Atoms/SlideButton', module)
  .add('Left', () => <SlideButton left callBack={(e) => alert('left')}/>)
  .add('Right', () => <SlideButton right callBack={(e) => alert('left')}/>);
