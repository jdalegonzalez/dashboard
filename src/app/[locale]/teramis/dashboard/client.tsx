'use client';

import React, { useState } from 'react';
import PageWrapper from '@/components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft, SubheaderRight } from '@/components/layouts/Subheader/Subheader';
import Button from '@/components/ui/Button';
import Container from '@/components/layouts/Container/Container';
import MiniAgent from '@/app/[locale]/teramis/dashboard/_partial/MiniAgent.partial';
import MiniCUIWarnings from '@/app/[locale]/teramis/dashboard/_partial/MiniCUIWarnings.partial';
import MiniAgentErrors from '@/app/[locale]/teramis/dashboard/_partial/MiniAgentErrors.partial';
import MiniTotalFiles from '@/app/[locale]/teramis/dashboard/_partial/MiniTotalFiles.partial';
import MiniUniqueFiles from '@/app/[locale]/teramis/dashboard/_partial/MiniUniqueFiles.partial';
import MiniUnsupporedFiles from '@/app/[locale]/teramis/dashboard/_partial/MiniUnsupportedFiles.partial';
import AgentsPartial from '@/app/[locale]/teramis/dashboard/_partial/Agents.partial';
import ScanSummaryPartial from '@/app/[locale]/teramis/dashboard/_partial/ScanSummary.partial';
import ScanErrorListPartial from '@/app/[locale]/teramis/dashboard/_partial/ScanErrorList.partial';
import CrawlErrorListPartial from '@/app/[locale]/teramis/dashboard/_partial/CrawlErrorList.partial';
import FindingsListPartial from '@/app/[locale]/teramis/dashboard/_partial/FindingsList.partial';

const TABS: {
	[key in 'OVERVIEW' | 'AGENTS' ] : 'Overview' | 'Agents';
} = {
	OVERVIEW: 'Overview',
	AGENTS: 'Agents',
};

const TeramisDashboardClient = () => {
	const [activeTab, setActiveTab] = useState(TABS.OVERVIEW);
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
			<Container breakpoint={null} className='relative h-full w-full'>
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
							<ScanErrorListPartial />
						</div>
						<div className='col-span-12 2xl:col-span-6'>
							<CrawlErrorListPartial />
						</div>
					</div>
				)}
				{activeTab === TABS.AGENTS && (
					<AgentsPartial className='w-full'/>
				)}
			</Container>
		</PageWrapper>
	);
};

export default TeramisDashboardClient;
