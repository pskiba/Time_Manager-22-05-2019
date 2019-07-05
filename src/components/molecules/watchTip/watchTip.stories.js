import React from 'react';
import { storiesOf } from '@storybook/react';
import WatchTip from './watchTip';

storiesOf('Molecules/WatchTip', module)
  .add('Normal', () => <WatchTip left={200}/>);