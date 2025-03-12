import React from 'react';
import AgentDetails from '@/app/[locale]/teramis/agent/[slug]/client';
import TranslationsProvider from '@/components/TranslationsProvider';

const i18nNamespaces = ['translation'];

const AgentPage = async (props: { params: Promise<{ locale: string }> }) => {
    const params = await props.params;

    const {
        locale
    } = params;

    return (
		<TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
			<AgentDetails />
		</TranslationsProvider>
	);
};

export default AgentPage;
