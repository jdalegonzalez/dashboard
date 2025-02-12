import tailwindcssColors from 'tailwindcss/colors';
import { SupportedColors } from 'tailwindcss/types/generated/colors';

const supportedColors:any = tailwindcssColors
delete supportedColors['lightBlue']
delete supportedColors['warmGray']
delete supportedColors['blueGray']
delete supportedColors['coolGray']
delete supportedColors['trueGray']

interface AllColor extends SupportedColors {
	customColor: {
		'50': '#eff6ff';
		'100': '#dbeafe';
		'200': '#bfdbfe';
		'300': '#93c5fd';
		'400': '#60a5fa';
		'500': '#3b82f6';
		'600': '#2563eb';
		'700': '#1d4ed8';
		'800': '#1e40af';
		'900': '#1e3a8a';
		'950': '#172554';
	};
}

const colors: AllColor = {
	...supportedColors,
	customColor: {
		50: '#eff6ff',
		100: '#dbeafe',
		200: '#bfdbfe',
		300: '#93c5fd',
		400: '#60a5fa',
		500: '#3b82f6',
		600: '#2563eb',
		700: '#1d4ed8',
		800: '#1e40af',
		900: '#1e3a8a',
		950: '#172554',
	},
};

export default colors;
