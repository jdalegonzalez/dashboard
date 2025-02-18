import '@/app/styles/index.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '@/app/styles/vendors.css';

import React, { ReactNode } from 'react';
import type { Metadata } from 'next';
import AppWrapper from '@/app/[locale]/_app';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { dir } from 'i18next';
import AsideRouter from '@/components/router/AsideRouter';
import HeaderRouter from '@/components/router/HeaderRouter';
import FooterRouter from '@/components/router/FooterRouter';
import Wrapper from '@/components/layouts/Wrapper/Wrapper';
import { Poppins } from 'next/font/google';
import Providers from '@/app/[locale]/_providers';
import i18nConfig from '../../../i18nConfig';

const poppins = Poppins({
	display: 'swap',
	preload: false,
	style: ['normal', 'italic'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
	title: 'Teramis Agent Status and Results',
	description: 'Displays files determined to contain CUI discovered by running Teramis agents, shows the currently deployed agents and their status. ',
};

export function generateStaticParams() {
	return i18nConfig.locales.map((locale) => ({ locale }));
}

const RootLayout = async (
    props: {
        children: ReactNode;
        params: Promise<{ locale: string }>;
    }
) => {
    const params = await props.params;

    const {
        locale
    } = params;

    const {
        children
    } = props;

    dayjs.extend(localizedFormat);

	return (
		<Providers>
			<html suppressHydrationWarning lang={locale} dir={dir(locale)}>
				<body className={`${poppins.className} bg-zinc-800`}>
					<div id='root'>
						<div data-component-name='App' className='flex grow flex-col'>
							<AsideRouter />
							<Wrapper>
								<HeaderRouter />
								<AppWrapper>{children}</AppWrapper>
								<FooterRouter />
							</Wrapper>
						</div>
					</div>
					<div id='portal-root' />
				</body>
			</html>
		</Providers>
	);
};

export default RootLayout;
