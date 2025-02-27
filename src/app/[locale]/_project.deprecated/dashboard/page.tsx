import React from 'react';
import ProjectDashboardClient from '@/app/[locale]/_project.deprecated/dashboard/client';
import TranslationsProvider from '@/components/TranslationsProvider';

const i18nNamespaces = ['translation'];
const ProjectDashboardPage = async (props: { params: Promise<{ locale: string }> }) => {
    const params = await props.params;

    const { locale } = params;

    return (
        <TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
            <ProjectDashboardClient />
        </TranslationsProvider>
    );

};

export default ProjectDashboardPage;
