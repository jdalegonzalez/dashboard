'use client';

import React, { useState } from 'react';
import PageWrapper from '@/components/layouts/PageWrapper/PageWrapper';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import useSaveBtn from '@/hooks/useSaveBtn';
import Subheader, {
	SubheaderLeft,
	// SubheaderRight,
	SubheaderSeparator,
} from '@/components/layouts/Subheader/Subheader';
import Link from 'next/link';
import { appPages } from '@/config/pages.config';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Container from '@/components/layouts/Container/Container';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '@/components/ui/Card';
import themeConfig from '@/config/theme.config';
import Label from '@/components/form/Label';
import Input from '@/components/form/Input';
import Icon from '@/components/icon/Icon';
import Checkbox from '@/components/form/Checkbox';
import dayjs from 'dayjs';
import { useAgent } from '@/hooks/useAgent';
import { statusToColor } from '@/utils/dataDisplay.util';
import useDarkMode from '@/hooks/useDarkMode';
import { TColorIntensity } from '@/types/colorIntensities.type';
import Skeleton from '@/components/utils/ThemedSkeleton';
import LoaderDotsCommon from '@/components/LoaderDots.common';
import FindingsListPartial from '../../dashboard/_partial/FindingsList.partial';
import CrawlErrorList from '../../dashboard/_partial/CrawlErrorList.partial';
import ScanErrorList from '../../dashboard/_partial/ScanErrorList.partial';
import CrawlResults from '../../dashboard/_partial/CrawlResultsList.partial';

const TABS: {
	[key in 'SCANRESULTS' | 'SCANERRORS' | 'CRAWLRESULTS' | 'CRAWLERRORS']: 
	'Scan Results' | 'Scan Errors' | 'Crawl Results' | 'Crawl Errors';
} = {
	SCANRESULTS: 'Scan Results',
	SCANERRORS: 'Scan Errors',
	CRAWLRESULTS: 'Crawl Results',
	CRAWLERRORS: 'Crawl Errors',
};

const AgentDetails = () => {
	const [activeTab, setActiveTab] = useState(TABS.SCANRESULTS);
	const { slug: id } = useParams();
	const { i18n } = useTranslation();
	const { isDarkTheme } = useDarkMode();

	const agentId: string | undefined = Array.isArray(id) ? id[0] : id

	const [isSaving, setIsSaving] = useState<boolean>(false);
	const { data: agent, isLoading, performUpdate } = useAgent(agentId, setIsSaving);
	const scanId = isLoading ? '' : agent.scans[0]?.id;
	const crawlId = isLoading ? '' : agent.crawls[0]?.id;

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: agent?.name,
			path: agent?.path,
			use_history: agent?.use_history,
			location: agent?.location,
		},
		onSubmit: (values) => { performUpdate(values); },
	});

	const isNewItem = agentId === 'new';
	const { saveBtnText, saveBtnColor, saveBtnDisable } = useSaveBtn({
		isNewItem,
		isSaving,
		isDirty: formik.dirty,
	});

	const { color, intensity } = statusToColor(agent?.status)
	const circleColor = isDarkTheme ? 'bg-stone-950/50' : 'bg-sky-800'; 
	const iconIntensity: TColorIntensity = isDarkTheme ? '500' : '100';

	return (
		<PageWrapper>
			<Subheader>
				<SubheaderLeft>
					<Link
						href={`${appPages.teramisAppPages.subPages.agentPage.subPages.listPage.to}`}>
						<Button icon='HeroArrowLeft' className='!px-0'>
							Back to List
						</Button>
					</Link>
					<SubheaderSeparator />
					{isNewItem ? (
						'Add New Agent'
					) : (
						<>
							{}
							{`${agent?.name}`}{' '}
							<Badge
								color='blue'
								variant='outline'
								rounded='rounded-full'
								className='border-transparent'>
								Edit Agent
							</Badge>
						</>
					)}
				</SubheaderLeft>
			</Subheader>
			<Container className='flex shrink-0 grow basis-auto flex-col pb-0'>
				<div className='flex h-full flex-wrap content-start'>
					<div className='mb-4 grid w-full grid-cols-12 gap-4'>
						<div className='col-span-12 flex flex-col gap-4'>
							<Card>
								<CardBody>
									<div className='flex w-full gap-4'>
										<div className='flex-shrink-0'>
											<div className={`rounded-full ${circleColor} p-4`}>
												<Icon
													icon='DuoLte1'
													size='text-5xl'
													color={themeConfig.themeColor}
													colorIntensity={iconIntensity}
												/>
											</div>
										</div>
										<div className='flex grow items-center'>
											<div>
												<div className='w-full text-2xl font-semibold'>
													{!isLoading ? agent?.name : <Skeleton />}
												</div>
												<div className='w-full text-zinc-500'>
													{!isLoading ? agent?.path : <Skeleton />}
												</div>
											</div>
										</div>
										<div className='flex-shrink-0'>
											{isLoading ? 
											<Skeleton />
											:	
											<Badge 
												variant='outline' 
												borderWidth='border' 
												rounded='rounded' 
												color={color} 
												colorIntensity={intensity}>{agent?.status}
											</Badge>
											}
										</div>
									</div>
								</CardBody>
							</Card>
							<Card>
								<CardHeader>
									<CardHeaderChild>
										<CardTitle>
											<div>
												<div>Agent Settings</div>
												<div className='text-lg font-normal text-zinc-500'>
													Here you can change user account information
												</div>
											</div>
										</CardTitle>
									</CardHeaderChild>
								</CardHeader>
								<CardBody>
									<div className='grid grid-cols-12 gap-4'>
										<div className='col-span-12 lg:col-span-6'>
											<Label htmlFor='name'>Name</Label>
											<Input
												id='name'
												name='name'
												onChange={formik.handleChange}
												value={formik.values.name}
												autoComplete='agentname'
											/>
										</div>
										<div className='col-span-12 lg:col-span-6'>
											<Label htmlFor='path'>Path</Label>
											<Input
												id='path'
												name='path'
												onChange={formik.handleChange}
												value={formik.values.path}
												autoComplete='email'
											/>
										</div>
										<div className='col-span-12 lg:col-span-6'>
											<Label htmlFor='location'>Location</Label>
											<Input
												id='location'
												name='location'
												onChange={formik.handleChange}
												value={formik.values.location}
												autoComplete='location'
											/>
										</div>
										<div className='col-span-12 lg:col-span-6 relative'>
											<Checkbox
												id='use_history'
												name='use_history'
												label='Use History'
												className='absolute bottom-0'
												onChange={formik.handleChange}
												checked={formik.values.use_history}
											/>
										</div>
									</div>
								</CardBody>
								<CardFooter>
									<CardFooterChild className='mt-12'>
										{isNewItem && (
											<div className='flex items-center gap-2 text-amber-500'>
												<Icon
													icon='HeroExclamationTriangle'
													size='text-2xl'
												/>
												<span>Not saved yet</span>
											</div>
										)}
										{!isNewItem && (
											<div className='flex items-center gap-2'>
												<Icon icon='HeroDocumentCheck' size='text-2xl' />
												<span className='text-zinc-500'>Last saved:</span>
												<b>{isLoading ? <LoaderDotsCommon /> : dayjs(agent?.updated_at).locale(i18n.language).format('LLL')}</b>
											</div>
										)}
									</CardFooterChild>
									<CardFooterChild>
										<Button
											icon='HeroServer'
											variant='solid'
											color={saveBtnColor}
											isDisable={saveBtnDisable}
											onClick={() => formik.handleSubmit()}>
											{saveBtnText}
										</Button>
									</CardFooterChild>
								</CardFooter>
							</Card>
						</div>
					</div>
					<div className='w-full col-span-12 flex flex-col gap-4 '>
						<Card>
							<CardHeader>
								<CardHeaderChild>
									{Object.values(TABS).map((i) => (
										<Button
											key={i}
											className='!p-0'
											isActive={i === activeTab}
											onClick={() => setActiveTab(i)}>
											{i}
										</Button>
									))}
								</CardHeaderChild>
							</CardHeader>
							<CardBody>
								<div className='w-full'>
								{activeTab === TABS.SCANRESULTS && !isLoading && (
									<FindingsListPartial showTitle={false} scanId={scanId} allResults={true} />
								)}
								{activeTab === TABS.SCANERRORS && !isLoading && (
									<ScanErrorList showTitle={false} scanId={scanId} />
								)}
								{activeTab === TABS.CRAWLRESULTS && !isLoading && (
									<CrawlResults showTitle={false} crawlId={crawlId} />
								)}
								{activeTab === TABS.CRAWLERRORS && !isLoading && (
									<CrawlErrorList showTitle={false} crawlId={crawlId} />
								)}
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Container>
		</PageWrapper>
	);
};

export default AgentDetails;
