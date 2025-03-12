'use client';

import React, { useState } from 'react';
import PageWrapper from '@/components/layouts/PageWrapper/PageWrapper';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import useSaveBtn from '@/hooks/useSaveBtn';
import Subheader, {
    SubheaderLeft,
    SubheaderSeparator,
} from '@/components/layouts/Subheader/Subheader';
import Link from 'next/link';
import { appPages } from '@/config/pages.config';
import Button from '@/components/ui/Button';
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
import Icon from '@/components/icon/Icon';
import dayjs from 'dayjs';
import { useTarget, useTargetDetails } from '@/hooks/useTarget';
import { bytesToGigRatio, bytesToHuman, statusToColor } from '@/utils/dataDisplay.util';
import useDarkMode from '@/hooks/useDarkMode';
import { TColorIntensity } from '@/types/colorIntensities.type';
import Skeleton from '@/components/utils/ThemedSkeleton';
import LoaderDotsCommon from '@/components/LoaderDots.common';
import FindingsListPartial from '@/app/[locale]/teramis/dashboard/_partial/FindingsList.partial';
import CrawlErrorList from '@/app/[locale]/teramis/dashboard/_partial/CrawlErrorList.partial';
import ScanErrorList from '@/app/[locale]/teramis/dashboard/_partial/ScanErrorList.partial';
import CrawlResults from '@/app/[locale]/teramis/dashboard/_partial/CrawlResultsList.partial';

import { useFormik } from 'formik';
import { ITargetResult } from '@/app/lib/fetch';
import Label from '@/components/form/Label';
import Input from '@/components/form/Input';
import Checkbox from '@/components/form/Checkbox';

const TABS: {
    [key in 'SCANRESULTS' | 'SCANERRORS' | 'CRAWLRESULTS' | 'CRAWLERRORS']: 
    'Scan Results' | 'Scan Errors' | 'Crawl Results' | 'Crawl Errors';
} = {
    SCANRESULTS: 'Scan Results',
    SCANERRORS: 'Scan Errors',
    CRAWLRESULTS: 'Crawl Results',
    CRAWLERRORS: 'Crawl Errors',
};

const TargetDetails = () => {

    const [activeTab, setActiveTab] = useState(TABS.SCANRESULTS);
    const { slug: id } = useParams();
    const { i18n } = useTranslation();
    const { isDarkTheme } = useDarkMode();
    const targetId: string | undefined = Array.isArray(id) ? id[0] : id
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const { data: target, isLoading: targetLoading, performUpdate } = useTarget(targetId, setIsSaving);
    const { data: details, isLoading: detailsLoading } = useTargetDetails(targetId);

    const scanId = targetLoading  ? '' : target.scans[0]?.id;
    const crawlId = targetLoading ? '' : target.crawls[0]?.id;
    
    console.log(target) 
	const formik = useFormik<Partial<ITargetResult>>({
		initialValues: {
            name: target.name,
            use_history: target.use_history,
            default_timeout: target.default_timeout
        },
        enableReinitialize: true,
        onSubmit: (data) => performUpdate(data),
	});

    const { saveBtnColor, saveBtnText, saveBtnDisable } = useSaveBtn({
        isNewItem: false,
        isSaving,
        isDirty: formik.dirty,
    });

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
                    <>
                        {}
                        {`${target?.name}`}{' '}
                    </>
                </SubheaderLeft>                
            </Subheader>
            <Container className='flex shrink-0 grow basis-auto flex-col pb-0'>
                <div className='flex h-full flex-wrap content-start'>
                    <div className='mb-4 grid w-full grid-cols-12 gap-4'>
                        <div className='col-span-12 flex flex-col gap-4'>
                            <Card>
                                <CardBody>
                                    <div className='flex w-full gap-4'>
                                        <div className='flex grow items-center'>
                                            <div className='flex-shrink-0 mr-4'>
                                                <div className={`rounded-full ${circleColor} p-4`}>
                                                    <Icon
                                                        icon='DuoFolder'
                                                        size='text-5xl'
                                                        color={themeConfig.themeColor}
                                                        colorIntensity={iconIntensity}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex grow items-center'>
                                                <div className='w-full text-2xl font-semibold'>
                                                    { 
                                                        !targetLoading ? 
                                                        <>
                                                        <span>{target.name}</span>
                                                        <span className='text-zinc-500 text-xl'>&nbsp;&mdash;&nbsp;{target.root}</span>
                                                        </>
                                                        : 
                                                        <Skeleton />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                            <div className='grid grid-cols-12 gap-4'>
                                <Card className='col-span-12 lg:col-span-6 xl:col-span-4'>
                                    <CardHeader>
                                        <CardHeaderChild>
                                            <CardTitle>
                                                <div>Target Details</div>
                                            </CardTitle>
                                        </CardHeaderChild>
                                    </CardHeader>
                                    <CardBody>
                                        <div className='col-span-12 lg:col-span-6 p-4'>
                                            <Label htmlFor='name'>
                                                <div className='text-xl font-semibold'>
                                                    Name
                                                </div>
                                            </Label>
                                            <Input
                                                id='name'
                                                name='name'
                                                onChange={formik.handleChange}
                                                value={formik.values.name}
                                            />
                                        </div>
                                        <div className='col-span-12 lg:col-span-6 p-4'>
                                            <div className='flex grow items-center'>
                                                <Label htmlFor='use_history' className='!mb-0'>
                                                    <div className='text-xl font-semibold'>
                                                        Use History
                                                    </div>
                                                    <div className='text-zinc-500'>
                                                        Use the previous results for any file already scanned.
                                                    </div>
                                                </Label>
                                            </div>
                                            <div className='flex flex-shrink-0 items-center'>
                                                <Checkbox
                                                    variant='switch'
                                                    id='use_history'
                                                    name='use_history'
                                                    onChange={formik.handleChange}
                                                    checked={formik.values.use_history}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-span-12 lg:col-span-6 p-4'>
                                            <Label htmlFor='default_timeout'>
                                                <div className='text-xl font-semibold'>
                                                    Max Timeout
                                                </div>
                                                <div className='text-zinc-500'>
                                                    Number of seconds to try opening a file before giving up. &quot;0&quot; means wait as long as it takes.
                                                </div>
                                            </Label>
                                            <Input
                                                type='number'
                                                id='default_timeout'
                                                name='default_timeout'
                                                onChange={formik.handleChange}
                                                value={formik.values.default_timeout}
                                                min={0}
                                                max={360}
                                            />
                                        </div>                    
                                    </CardBody>
                                    <CardFooter>
                                        <CardFooterChild className='mt-12'>
                                            <div className='flex items-center gap-2'>
                                                <span className='text-zinc-500'>Last saved:</span>
                                                {targetLoading ? <LoaderDotsCommon /> : dayjs(target.updated_at).locale(i18n.language).format('LLL')}
                                            </div>
                                        </CardFooterChild>
                                        <CardFooterChild>
                                            <Button
                                                icon='DuoSave'
                                                variant='solid'
                                                color={saveBtnColor}
                                                isDisable={saveBtnDisable}
                                                onClick={() => formik.handleSubmit()}>
                                                {saveBtnText}
                                            </Button>
                                        </CardFooterChild>
                                    </CardFooter>
                                </Card>
                                <Card className='col-span-12 lg:col-span-6 xl:col-span-4'>
                                    <CardHeader>
                                        <CardHeaderChild>
                                            <CardTitle>
                                                <div>
                                                    <div>Crawl Details</div>
                                                    <div className='text-sm text-zinc-500 pt-4'>
                                                        {!detailsLoading ?
                                                        <>
                                                        {dayjs(details[0]?.crawl_start_time).locale(i18n.language).format('LLL')}
                                                        &nbsp;&mdash;&nbsp;
                                                        {dayjs(details[0]?.crawl_start_time).locale(i18n.language).format('LLL')}
                                                        </>
                                                        :
                                                        <Skeleton />
                                                        }
                                                    </div>
                                                </div>
                                            </CardTitle>
                                        </CardHeaderChild>
                                    </CardHeader>
                                    <CardBody>
                                        <div className='col-span-1 flex-shrink-0 flex items-center gap-2 p-2 pb-0 pt-4'>
                                            <Icon icon='DuoFolder' className='text-sky-800' size='text-2xl' />
                                            <span className='text-zinc-500'>Path</span>
                                        </div>
                                        <div className='col-span-1 flex-grow-1 p-2 pb-8 truncate text-nowrap'>
                                            {!detailsLoading && details[0]?.scan_root_path}
                                        </div>
                                        <div className='col-span-1 flex-shrink-0 flex items-center gap-2 p-2 pb-0'>
                                            <Icon icon='DuoFolderCloud' size='text-2xl' color='sky' colorIntensity='500' />
                                            <span className='text-zinc-500'>Results</span>
                                        </div>
                                        {!detailsLoading && details.length ?
                                        <div className='col-span-1 flex-shrink-0 flex items-center gap-2 p-4 pt-0 pb-8'>
                                            <span>{details[0].dir_count}</span><span className='text-zinc-500'>Directories, </span>
                                            <span>{details[0].file_count} </span><span className='text-zinc-500'>Files, </span> 
                                            <span>{bytesToHuman(details[0].total_size)} </span><span className='text-zinc-500'>Crawled</span> 
                                        </div>
                                        :
                                        <Skeleton />
                                        }
                                        <div className='col-span-1 flex-shrink-0 flex items-center gap-2 p-2 pb-0'>
                                            <Icon icon='DuoTimer' className='text-sky-500' size='text-2xl' />
                                            <span className='text-zinc-500'>Performance</span>
                                        </div>
                                        <div className='col-span-1 flex-grow-1 p-2 text-zin'>
                                            {bytesToHuman(details[0]?.throughput )}<span className='text-zinc-500'>&nbsp;per second,</span> 
                                            <span>&nbsp;{details[0]?.crawl_errors} </span><span className='text-zinc-500'>Errors</span> 
                                        </div>
                                    </CardBody>
                                    <CardFooter>
                                        <CardFooterChild className='mt-12'>
                                            <div className='flex items-center gap-2'>
                                                <Icon icon='HeroDocumentCheck' size='text-2xl' />
                                                <span className='text-zinc-500'>Last crawl:</span>
                                                {detailsLoading ? <LoaderDotsCommon /> : dayjs(details[0]?.crawl_end_time).locale(i18n.language).format('LLL')}
                                            </div>
                                        </CardFooterChild>
                                    </CardFooter>
                                </Card>
                                <Card className='col-span-12 lg:col-span-6 xl:col-span-4'>
                                    <CardHeader>
                                        <CardHeaderChild>
                                            <CardTitle>
                                                <div>
                                                    <div>Scan Details</div>
                                                    <div className='text-sm text-zinc-500 pt-4'>
                                                        {!detailsLoading ?
                                                        <>
                                                        {dayjs(details[0]?.scan_start_time).locale(i18n.language).format('LLL')}
                                                        &nbsp;&mdash;&nbsp;
                                                        {dayjs(details[0]?.scan_start_time).locale(i18n.language).format('LLL')}
                                                        </>
                                                        :
                                                        <Skeleton />
                                                        }
                                                    </div>
                                                </div>
                                            </CardTitle>
                                        </CardHeaderChild>
                                    </CardHeader>
                                    <CardBody>
                                        <div className='col-span-1 flex-shrink-0 flex items-center gap-2 p-2 pb-0 pt-4'>
                                            <Icon icon='DuoFolder' className='text-sky-800' size='text-2xl' />
                                            <span className='text-zinc-500'>Path</span>
                                        </div>
                                        <div className='col-span-1 flex-grow-1 p-2 pb-8 truncate text-nowrap'>
                                            {!detailsLoading && details[0]?.scan_root_path}
                                        </div>
                                        <div className='col-span-1 flex-shrink-0 flex items-center gap-2 p-2 pb-0'>
                                            <Icon icon='DuoShieldProtected' size='text-2xl' color='amber' colorIntensity='500' />
                                            <span className='text-zinc-500'>Discovery</span>
                                        </div>
                                        {!detailsLoading && details.length ?
                                        <div className='col-span-1 flex-shrink-0 flex items-center gap-2 p-2 pt-0 pb-8 pl-3'>
                                            <span>{details[0].matches}</span><span className='text-zinc-500'>Files with CUI, </span>
                                            <span>{bytesToHuman(details[0].crawl_scan_size)} </span><span className='text-zinc-500'>Scanned</span> 
                                        </div>
                                        :
                                        <Skeleton />
                                        }
                                        <div className='col-span-1 flex-shrink-0 flex items-center gap-2 p-2 pb-0'>
                                            <Icon icon='DuoTimer' className='text-sky-500' size='text-2xl' />
                                            <span className='text-zinc-500'>Performance</span>
                                        </div>
                                        <div className='col-span-1 flex-grow-1 p-2 text-zin'>
                                            {bytesToHuman(details[0]?.gigs_per_second * bytesToGigRatio )}<span className='text-zinc-500'>&nbsp;per second,</span> 
                                            <span>&nbsp;{details[0]?.timeouts} </span><span className='text-zinc-500'>Timeouts</span> 
                                        </div>
                                    </CardBody>
                                    <CardFooter>
                                        <CardFooterChild className='mt-12'>
                                            <div className='flex items-center gap-2'>
                                                <Icon icon='HeroDocumentCheck' size='text-2xl' />
                                                <span className='text-zinc-500'>Last scan:</span>
                                                {detailsLoading ? <LoaderDotsCommon /> : dayjs(details[0]?.scan_end_time).locale(i18n.language).format('LLL')}
                                            </div>
                                        </CardFooterChild>
                                    </CardFooter>
                                </Card>
                            </div>
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
                                {activeTab === TABS.SCANRESULTS && !targetLoading && (
                                    <FindingsListPartial showTitle={false} scanId={scanId} allResults={true} />
                                )}
                                {activeTab === TABS.SCANERRORS && !targetLoading && (
                                    <ScanErrorList showTitle={false} scanId={scanId} />
                                )}
                                {activeTab === TABS.CRAWLRESULTS && !targetLoading && (
                                    <CrawlResults showTitle={false} crawlId={crawlId} />
                                )}
                                {activeTab === TABS.CRAWLERRORS && !targetLoading && (
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

export default TargetDetails;
