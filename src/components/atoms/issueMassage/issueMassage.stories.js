import React from 'react';
import { storiesOf } from '@storybook/react';
import IssueMassage from './issueMassage';

storiesOf('Atoms/IssueMassage', module)
  .add('Normal', () => <IssueMassage>issue message</IssueMassage>)