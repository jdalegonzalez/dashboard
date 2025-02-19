'use client';

import React, { useState } from 'react';
import dayjs from 'dayjs';
import PageWrapper from '@/components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft, SubheaderRight } from '@/components/layouts/Subheader/Subheader';
import Button from '@/components/ui/Button';
import Dropdown, { DropdownMenu, DropdownToggle } from '@/components/ui/Dropdown';
import { DateRangePicker } from 'react-date-range';
import colors from '@/tailwindcss/colors.tailwind';
import themeConfig from '@/config/theme.config';
import Container from '@/components/layouts/Container/Container';
import MiniAgent from '@/app/[locale]/teramis/dashboard/_partial/MiniAgent.partial';
import MiniCUIWarnings from '@/app/[locale]/teramis/dashboard/_partial/MiniCUIWarnings.partial';
import MiniAgentErrors from '@/app/[locale]/teramis/dashboard/_partial/MiniAgentErrors.partial';
import MiniTotalFiles from '@/app/[locale]/teramis/dashboard/_partial/MiniTotalFiles.partial';
import MiniUniqueFiles from '@/app/[locale]/teramis/dashboard/_partial/MiniUniqueFiles.partial';
import MiniUnsupporedFiles from '@/app/[locale]/teramis/dashboard/_partial/MiniUnsupportedFiles.partial';
import MapPartial from '@/app/[locale]/teramis/dashboard/_partial/Map.partial';
import ScanSummaryPartial from '@/app/[locale]/teramis/dashboard/_partial/ScanSummary.partial';
import ErrorListPartial from '@/app/[locale]/teramis/dashboard/_partial/ErrorList.partial';
import FindingsListPartial from '@/app/[locale]/teramis/dashboard/_partial/FindingsList.partial';
import CalendarPartial from '@/app/[locale]/teramis/dashboard/_partial/Calendar.partial';
import { useTranslation } from 'react-i18next';
import useLocale from '@/hooks/useLocale';

const TABS: {
	[key in 'OVERVIEW' | 'ACTIVE_AGENTS' | 'TASKS']: 'Overview' | 'Active Agents' | 'Tasks';
} = {
	OVERVIEW: 'Overview',
	ACTIVE_AGENTS: 'Active Agents',
	TASKS: 'Tasks',
};

const TeramisDashboardClient = () => {
	const [activeTab, setActiveTab] = useState(TABS.OVERVIEW);
	const [state, setState] = useState({
		selection: {
			startDate: dayjs().startOf('week').add(-1, 'week').toDate(),
			endDate: dayjs().endOf('week').toDate(),
			key: 'selection',
		},
		selection2: {
			startDate: dayjs().startOf('week').add(-1, 'week').add(2, 'day').toDate(),
			endDate: dayjs().endOf('week').add(-4, 'day').toDate(),
			key: 'selection2',
		},
		selection3: {
			startDate: dayjs().startOf('week').add(2, 'week').add(2, 'day').toDate(),
			endDate: dayjs().startOf('week').add(3, 'week').add(5, 'day').toDate(),
			key: 'selection3',
		},
	});

	const { i18n } = useTranslation();

	const activeLocale = useLocale();

	return (
		<PageWrapper>
			<Subheader>
				<SubheaderLeft>
					{Object.values(TABS).map((i) => (
						<Button
							key={i}
							className='!p-0'
							isActive={i === activeTab}
							onClick={() => setActiveTab(i)}>
							{i}
						</Button>
					))}
				</SubheaderLeft>
				<SubheaderRight>
					&nbsp;
					{/* TODO: Bring back date filtering
						<Dropdown>
						<DropdownToggle>
							<Button icon='HeroCalendarDays'>{`${dayjs(state.selection.startDate)
								.locale(i18n.language)
								.format('LL')} - ${dayjs(state.selection3.endDate).format(
								'LL',
							)}`}</Button>
						</DropdownToggle>
						<DropdownMenu className='!p-0'>
							<DateRangePicker
								onChange={(item) =>
									setState({
										...state,
										...item,
									})
								}
								moveRangeOnFirstSelection={false}
								retainEndDateOnFirstSelection={false}
								months={2}
								ranges={Object.values(state)}
								direction='horizontal'
								rangeColors={[
									colors[themeConfig.themeColor][themeConfig.themeColorShade],
									colors.emerald[themeConfig.themeColorShade],
									colors.amber[themeConfig.themeColorShade],
								]}
								locale={activeLocale}
							/>
						</DropdownMenu>
					</Dropdown> */}
				</SubheaderRight>
			</Subheader>
			<Container breakpoint={null} className='h-full w-full'>
				{activeTab === TABS.OVERVIEW && (
					<div className='grid grid-cols-12 gap-4'>
						<div className='col-span-12 sm:col-span-6 2xl:col-span-2'>
							<MiniAgent />
						</div>
						<div className='col-span-12 sm:col-span-6 2xl:col-span-2'>
							<MiniTotalFiles />
						</div>
						<div className='col-span-12 sm:col-span-6 2xl:col-span-2'>
							<MiniUniqueFiles />
						</div>
						<div className='col-span-12 sm:col-span-6 2xl:col-span-2'>
							<MiniUnsupporedFiles />
						</div>
						<div className='col-span-12 sm:col-span-6 2xl:col-span-2'>
							<MiniCUIWarnings />
						</div>
						<div className='col-span-12 sm:col-span-6 2xl:col-span-2'>
							<MiniAgentErrors />
						</div>

						<div className='col-span-12 2xl:col-span-6'>
							<ScanSummaryPartial />
						</div>
						<div className='col-span-12 2xl:col-span-6'>
							<FindingsListPartial />
						</div>

						<div className='col-span-12 2xl:col-span-6'>
							<ErrorListPartial />
						</div>
						<div className='col-span-12 2xl:col-span-6'>
							<CalendarPartial />
						</div>
					</div>
				)}
				{activeTab === TABS.ACTIVE_AGENTS && (
					<div className='grid grid-cols-12 gap-4'>
						<div className='col-span-12'>
							<MapPartial composableMapClassName='aspect-[2/1]' />
						</div>
					</div>
				)}
				{activeTab === TABS.TASKS && (
					<div className='grid h-full grid-cols-12 gap-4'>
						<div className='col-span-12 h-full'>
							<CalendarPartial height='100%' />
						</div>
					</div>
				)}
			</Container>
		</PageWrapper>
	);
};

export default TeramisDashboardClient;
