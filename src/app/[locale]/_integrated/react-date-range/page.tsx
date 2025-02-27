import React from 'react';
import ReactDateRangeClient from '@/app/[locale]/_integrated/react-date-range/client';
import TranslationsProvider from '@/components/TranslationsProvider';

const i18nNamespaces = ['translation'];

const ReactDateRangePage = async (props: { params: Promise<{ locale: string }> }) => {
    const params = await props.params;

    const {
        locale
    } = params;

    return (
		<TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
			<ReactDateRangeClient />
		</TranslationsProvider>
	);
};

export default ReactDateRangePage;
