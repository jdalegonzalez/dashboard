import React from 'react';
import TranslationsProvider from '@/components/TranslationsProvider';
import HomeClient from '@/app/[locale]/_sales.deprecated/dashboard/client.deprecated';
import PageFallbackTemplate from '@/templates/PageFallback.template';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]';

const i18nNamespaces = ['translation'];

const Home = async (props: { params: Promise<{ locale: string }> }) => {
    const params = await props.params;

    const {
        locale
    } = params;

    // const session = await getServerSession(authOptions);
    // console.log(session);

    return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			fallback={<PageFallbackTemplate />}>
			<HomeClient />
		</TranslationsProvider>
	);
};

export default Home;
