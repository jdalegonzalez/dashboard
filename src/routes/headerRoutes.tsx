import React from 'react';
//import { appPages, authPages } from '@/config/pages.config';
import { appPages } from '@/config/pages.config';
import { TRoute } from '@/types/route.type';
import DefaultHeaderTemplate from '../templates/layouts/Headers/DefaultHeader.template';

const headerRoutes: TRoute[] = [
	// { path: authPages.loginPage.to, element: null },
	{
		path: appPages.teramisAppPages.subPages.agentPage.subPages.listPage.to,
		element: <DefaultHeaderTemplate desc={appPages.teramisAppPages.subPages.agentPage.subPages.listPage.description}  />,
	},
	{
		path: appPages.teramisAppPages.subPages.teramisDashboardPage.to,
		element: <DefaultHeaderTemplate desc={appPages.teramisAppPages.subPages.teramisDashboardPage.description}  />,
	},
	{
		path: '/',
		element: null,
	},
	{ path: '/*', element: <DefaultHeaderTemplate /> },
];

export default headerRoutes;
