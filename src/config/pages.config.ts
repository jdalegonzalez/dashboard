export const appPages = {
	teramisAppPages: {
		id: 'teramisApp',
		to: '/teramis',
		text: 'Teramis',
		icon: 'HeroUserGroup',
		subPages: {
			teramisDashboardPage: {
				id: 'teramisDashboardPage',
				to: '/teramis/dashboard',
				text: 'Dashboard',
				icon: 'HeroChartPie',
				description: 'An overview of the results from the agents scanning your system for Controlled Unclassified Information.'
			},
			agentPage: {
				id: 'agentPage',
				to: '/teramis/agent',
				text: 'Agents',
				icon: 'HeroSignal',
				subPages: {
					listPage: {
						id: 'agentListPage',
						to: '/teramis/agent/list',
						text: 'Agent List',
						icon: 'HeroSignal',
						description: 'A list of all of the agents currently configured to scan for Controlled Unclassified Information.'
					},
				},
			},
		}
	},
};

