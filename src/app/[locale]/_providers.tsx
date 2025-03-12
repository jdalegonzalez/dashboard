'use client';

import React, { ReactNode } from 'react';
import { ThemeContextProvider } from '@/context/themeContext';
<<<<<<< HEAD
//import NextAuthProvider from '@/components/NextAuthProvider';
=======
import NextAuthProvider from '@/components/NextAuthProvider';
>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<ThemeContextProvider>
<<<<<<< HEAD
			{/* <NextAuthProvider>{children}</NextAuthProvider> */}
			{children}
=======
			<NextAuthProvider>{children}</NextAuthProvider>
>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)
		</ThemeContextProvider>
	);
};

export default Providers;
