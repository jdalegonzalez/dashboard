import React from 'react';
import TargetDetails from '@/app/[locale]/teramis/target/[slug]/client';
import TranslationsProvider from '@/components/TranslationsProvider';

const i18nNamespaces = ['translation'];

const LocationPage = async (props: { params: Promise<{ locale: string }> }) => {
    const params = await props.params;

    const {
        locale
    } = params;

    return (
		<TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
			<TargetDetails />
		</TranslationsProvider>
	);
};

export default LocationPage;
