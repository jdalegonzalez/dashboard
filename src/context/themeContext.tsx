'use client';

import React, {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
} from 'react';
import theme from 'tailwindcss/defaultTheme';
// import { useTranslation } from 'react-i18next';
// import dayjs from 'dayjs';
import { TDarkMode } from '@/types/darkMode.type';
// import { TLang } from '@/types/lang.type';
import { TLang } from '@/types/lang.type';
import DARK_MODE from '../constants/darkMode.constant';
import themeConfig from '../config/theme.config';
import useDeviceScreen from '../hooks/useDeviceScreen';

export interface IThemeContextProps {
	isDarkTheme: boolean;
	darkModeStatus: TDarkMode | null;
	setDarkModeStatus: Dispatch<SetStateAction<TDarkMode | null>>;
	asideStatus: boolean;
	setAsideStatus: Dispatch<SetStateAction<boolean>>;
	fontSize: number;
	setFontSize: Dispatch<SetStateAction<number>>;
	language: TLang;
	setLanguage: Dispatch<SetStateAction<TLang>>;
	dir: string;
	setDir: Dispatch<SetStateAction<string>>;
}
export const ThemeContext = createContext<IThemeContextProps>({} as IThemeContextProps);

interface IThemeContextProviderProps {
	children: ReactNode;
}
export const ThemeContextProvider: FC<IThemeContextProviderProps> = ({ children }) => {
	/**
	 * Language
	 */
	const [language, setLanguage] = useState<TLang>(
		(typeof window !== 'undefined' && (localStorage.getItem('teramis_language') as TLang)) ||
			themeConfig.language,
	);

	const [dir, setDir] = useState<string>(
		(typeof window !== 'undefined' && (localStorage.getItem('teramis_dir') as string)) || 'ltr',
	);

	/**
	 * Dark Mode
	 */
	const [darkModeStatus, setDarkModeStatus] = useState<TDarkMode | null>(
		((typeof window !== 'undefined' && localStorage.getItem('theme')) ||
			themeConfig.theme) as TDarkMode,
	);
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(darkModeStatus === DARK_MODE.DARK);
	useLayoutEffect(() => {
		localStorage.setItem('theme', darkModeStatus as string);

		if (
			localStorage.getItem('theme') === DARK_MODE.LIGHT ||
			(localStorage.getItem('theme') === DARK_MODE.SYSTEM &&
				window.matchMedia(`(prefers-color-scheme: ${DARK_MODE.LIGHT})`).matches)
		) {
			document.documentElement.classList.remove(DARK_MODE.DARK);
			setIsDarkTheme(false);
		} else {
			document.documentElement.classList.add(DARK_MODE.DARK);
			setIsDarkTheme(true);
		}
	}, [darkModeStatus]);

	/**
	 * Aside Status
	 */
	const { width } = useDeviceScreen();
	const [asideStatus, setAsideStatus] = useState(
		typeof window !== 'undefined' && localStorage.getItem('teramis_asideStatus')
			? localStorage.getItem('teramis_asideStatus') === 'true'
			: true,
	);
	useLayoutEffect(() => {
		if (Number(theme.screens.md.replace('px', '')) <= Number(width))
			localStorage.setItem('teramis_asideStatus', asideStatus?.toString());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [asideStatus]);
	useEffect(() => {
		if (Number(theme.screens.md.replace('px', '')) > Number(width)) setAsideStatus(false);
		return () => {
			setAsideStatus(
				localStorage.getItem('teramis_asideStatus')
					? localStorage.getItem('teramis_asideStatus') === 'true'
					: true,
			);
		};
	}, [width]);

	/**
	 * Font Size
	 */
	const [fontSize, setFontSize] = useState<number>(
		typeof window !== 'undefined' && Number(localStorage.getItem('teramis_fontSize'))
			? Number(localStorage.getItem('teramis_fontSize'))
			: themeConfig.fontSize,
	);
	useLayoutEffect(() => {
		localStorage.setItem('teramis_fontSize', fontSize?.toString());
	}, [fontSize]);

	const values: IThemeContextProps = useMemo(
		() => ({
			isDarkTheme,
			darkModeStatus,
			setDarkModeStatus,
			asideStatus,
			setAsideStatus,
			fontSize,
			setFontSize,
			language,
			setLanguage,
			dir,
			setDir,
		}),
		[isDarkTheme, darkModeStatus, asideStatus, fontSize, language, dir],
	);

	return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
};
