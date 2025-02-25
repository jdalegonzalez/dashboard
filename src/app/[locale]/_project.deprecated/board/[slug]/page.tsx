import React from 'react';
import ProjectBoardClient from '@/app/[locale]/_project.deprecated/board/[slug]/client';
import TranslationsProvider from '@/components/TranslationsProvider';

const i18nNamespaces = ['translation'];

const ProjectBoardPage = async (props: { params: Promise<{ locale: string }> }) => {
    const params = await props.params;

    const {
        locale
    } = params;

    return (
		<TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
			<ProjectBoardClient />
		</TranslationsProvider>
	);
};

export default ProjectBoardPage;
