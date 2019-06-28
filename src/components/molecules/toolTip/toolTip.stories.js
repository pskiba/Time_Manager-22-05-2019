import React from 'react';
import { storiesOf } from '@storybook/react';
import ToolTip from './toolTip';
import { withKnobs, select }from '@storybook/addon-knobs';

storiesOf('Molecules/ToolTip', module)
  .addDecorator(withKnobs)
  .add('Normal', () => {
    const label = 'task';
    const options = {
      task1: {
        title: 'Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing ',
        color: '#ff0000'
      },
      task2: {
        title: 'Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing ',
        color: '#ff0000'
      }
    };
    const defaultValue = options.task1;
    const value = select(label, options, defaultValue);
    return <ToolTip task={value}/>
  });