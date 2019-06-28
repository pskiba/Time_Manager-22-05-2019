import React from 'react';
import { storiesOf } from '@storybook/react';
import ModuleName from './moduleName';

storiesOf('Atoms/ModuleName', module)
  .add('normal', () => () => <ModuleName/>);