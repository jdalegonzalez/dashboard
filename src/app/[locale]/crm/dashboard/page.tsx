import React from 'react';
import CustomerDashboardClient from '@/app/[locale]/crm/dashboard/client';
import TranslationsProvider from '@/components/TranslationsProvider';

const i18nNamespaces = ['translation'];

const CustomerDashboardPage = async (props: { params: Promise<{ locale: string }> }) => {
    const params = await props.params;

    const {
        locale
    } = params;

    return (
		<TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
			<CustomerDashboardClient />
		</TranslationsProvider>
	);
};

export default CustomerDashboardPage;
