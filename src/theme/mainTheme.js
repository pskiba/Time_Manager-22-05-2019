import checkMark from '../assets/checkmarkIcon.svg';
import edit from '../assets/editIcon.svg';
import trash from '../assets/trashIcon.svg';
import notebook from '../assets/notebook.png';
import notebookActive from '../assets/notebook-active.png';
import reminder from '../assets/reminder.png';
import reminderActive from '../assets/reminder-active.png';

export const theme = {
  color: {
    black: '#000000',
    red: '#ff0000',
    white: '#ffffff',
    aqua: 'aqua',
    steelBlue: 'SteelBlue',
    lightSteelBlue : 'LightSteelBlue',
    darkgray: 'darkgray',
		lightGray: 'lightgray',
    cornsilk: '#FFF8DC',
    transparentBlack: 'rgba(0,0,0,0.2)'
  },
  fontSize: {
		xs: '0.8rem',
    s: '1rem',
    m: '1.2rem',
    l: '1.6rem',
    xl: '2rem',
    xxl: '2.4rem'
  },
  fontWeight: {
    light: 300,
    regular: 400,
    bold: 600
  },
	img: {
		notebook: notebook,
		notebookActive: notebookActive,
		reminder: reminder,
		reminderActive: reminderActive
	},
	wrapperWidth: 920
};