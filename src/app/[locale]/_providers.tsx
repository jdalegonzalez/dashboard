'use client';

import React, { ReactNode } from 'react';
import { ThemeContextProvider } from '@/context/themeContext';
//import NextAuthProvider from '@/components/NextAuthProvider';

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<ThemeContextProvider>
			{/* <NextAuthProvider>{children}</NextAuthProvider> */}
			{children}
		</ThemeContextProvider>
	);
};

export default Providers;
