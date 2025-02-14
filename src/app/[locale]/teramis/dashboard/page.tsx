import React from 'react';
import TeramisDashboardClient from '@/app/[locale]/teramis/dashboard/client';
import TranslationsProvider from '@/components/TranslationsProvider';
import PageFallbackTemplate from '@/templates/PageFallback.template';

const i18nNamespaces = ['translation'];

const TeramisDashboardPage = async (props: { params: Promise<{ locale: string }> }) => {
    const params = await props.params;

    const {
        locale
    } = params;

    return (
		<TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}	
            fallback={<PageFallbackTemplate />}>
			<TeramisDashboardClient />
		</TranslationsProvider>
	);
};

export default TeramisDashboardPage;
