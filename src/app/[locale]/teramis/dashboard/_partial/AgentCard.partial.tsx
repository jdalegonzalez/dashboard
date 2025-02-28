'use client';

import React, {FC} from 'react';
import { getAgentDetails } from '@prisma/client/sql';

import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '@/components/ui/Card';

import themeConfig from '@/config/theme.config';
import useDarkMode from '@/hooks/useDarkMode';

import colors from '@/tailwindcss/colors.tailwind';
import textColorUtil from '@/utils/textColor.util';

import { plural, formatDate, statusToColor, bytesToGigs, bytesToGigRatio } from '@/utils/dataDisplay.util';

import Badge from '@/components/ui/Badge';
import Chart from '@/components/Chart';
import { loadingOrProperty } from '@/components/LoaderDots.common';
import Icon from '@/components/icon/Icon';
import Skeleton from '@/components/utils/ThemedSkeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { TAllColors } from '@/types/colors.type';
import { TColorIntensity } from '@/types/colorIntensities.type';
import Link from 'next/link';

const monsterThroughput = 2 * bytesToGigRatio;

const speedometer = (agent: getAgentDetails.Result) => {
    const v1 = (agent.throughput / monsterThroughput) * 100;
    const v2 = 100 - v1;
    return ({
        series: [v1, v2],
        options: {
            chart:   { type: 'donut' as const },
			legend:  { show: false },
			tooltip: { enabled: false },
            states:  { hover: { filter: {type: 'none'} } },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 10,
                    donut: {
						labels: {
							show: true,
							name: {
                                color: colors['zinc']['500'],
                                formatter: (val: string) => "Gbps",
                                offsetY: 5,
                                fontSize: ".75em"
                            },
							value: { 
                                fontSize: '1rem', 
                                color: 'white',
                                formatter: (val: string) => bytesToGigs(agent.throughput, ""),
                                offsetY: -30,
                            },
							total: {
								color: colors['zinc']['500'],
								show: true,
                                formatter: (val: string) => bytesToGigs(agent.throughput, ""),
								label: "Gbps",
                                fontSize: ".75em"
							},
						},
                    },
                    track: {
                        background: "#000",
                        opacity: .5,
                        strokeWidth: '50%',
                        margin: 0, // margin is in pixels
                    },
                }
            },
            grid: {
                padding: {
                    top: -10
                }
            },
            fill: {
                type: 'gradient',
                colors: [colors['sky']['800'], colors['slate']['700'] ],
                opacity: .4,
                gradient: {
                    shade: 'dark',
                    shadeIntensity: 0.15,
                    inverseColors: false,
                    opacityFrom: .5,
                    opacityTo: .8,
                    stops: [0, 50, 65, 91]
                },
            },
			stroke: {
				show: true,
				width: 1,
				colors: [colors['sky']['800'], colors['zinc']['800']],
				lineCap: 'square' as const,
			},
            labels: ['Throughput'],
        }
    });
}

const skelClass = 'bg-opacity-5'

interface IAgentItemProps {
	agent: getAgentDetails.Result;
    className?: string;
}

const statStyle = (color: TAllColors, intensity: TColorIntensity) => {
    return `flex items-center gap-2 mr-4 ${textColorUtil(color, intensity)}`
}

const AgentDetails: FC<IAgentItemProps> = ({ agent, className }) => {
    const {isDarkTheme} = useDarkMode();

    const circleColor = isDarkTheme ? 'bg-stone-950/50' : 'bg-sky-800'; 
    const iconIntensity: TColorIntensity  = isDarkTheme ? '500' : '100';
    const speedoDef = speedometer(agent);

    const loading = agent.agent_id === 'loading';
    const {color,intensity} = loading ?  {color: circleColor, intensity: iconIntensity } :  statusToColor(agent.status);

    return (
        <div className={className} >
            <Card className='w-full h-full'>
                <CardHeader>
                    <CardHeaderChild>
                        <div className='flex items-center gap-4'>
                            <div className='flex-shrink-0'>
                                <div className={`rounded-full ${circleColor} p-4`}>
                                    <Link href={`/teramis/agent/${agent.agent_id}`}>
                                        <Icon
                                            icon='DuoLte1'
                                            size='text-5xl'
                                            color={themeConfig.themeColor}
                                            colorIntensity={iconIntensity}
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className='flex grow items-center'>
                                <CardTitle>{!loading ? agent.name : <div className='w-96'><Skeleton /></div>}</CardTitle>
                            </div>
                        </div>
                    </CardHeaderChild>
                </CardHeader>
                <CardBody>
                    <div className='flex h-full gap-y-4 divide-x divide-dashed divide-zinc-500/25 max-md:flex-wrap'>
                        <div className='flex-shrink-0 max-md:w-full max-md:justify-center md:max-w-[220px]'>
                            <div className='h-[120px]' >
                                <Chart
                                    series={speedoDef.series}
                                    options={speedoDef.options}
                                    type='donut'
                                    width={180}
                                    height={200}
                                />
                            </div>
                            <div className='mx-auto w-fit'>
                                { !agent ? 
                                <Skeleton
                                    width='60%'
                                    className={`inline-flex items-center justify-center px-2 text-4xl ${skelClass}`}
                                />
                                : <Badge 
                                    variant='outline' 
                                    borderWidth='border' 
                                    rounded='rounded' 
                                    color={color as any} 
                                    colorIntensity={intensity}>{agent.status}
                                </Badge>
                                }                            
                            </div>
                        </div>
                        <div className='grow px-4 text-zinc-500'>
                            <div className='ml-2'>
                                <div className='text-l whitespace-nowrap'>Last Crawl: </div>
                                <div className='mt-2 text-l text-white whitespace-nowrap'>
                                    {loadingOrProperty(agent, 'crawl_end_time', '', formatDate) as string}
                                </div>
                                <div className='mt-2 flex flex-wrap text-sm items-start justify-start gap-1 whitespace-nowrap'>
                                    {!loading ?
                                        <div className={statStyle(themeConfig.themeColor, "500")}>
                                            <Icon icon='Harddrive' /><div>{bytesToGigs(agent.scan_size)}</div>
                                        </div>
                                        : undefined
                                    }
                                    {!loading ?
                                        <div className={statStyle(themeConfig.themeColor, "500")}>
                                            <Icon icon='HeroDocument' /><div>{plural(agent.file_count,"file")}</div>
                                        </div>
                                        :
                                        undefined
                                    }
                                    {!loading ?
                                        <div className={statStyle(themeConfig.errorColor, '500')}>
                                            <Icon icon='HeroExclamationCircle' /><div>{plural(agent.crawl_errors??0,'crawl error')}</div>
                                        </div>
                                        : undefined
                                    }
                                </div> 
                                <div className='mt-8 text-l whitespace-nowrap'>Last Scan: </div>
                                <div className='mt-2 text-l text-white whitespace-nowrap'>
                                    {loadingOrProperty(agent, 'scan_end_time', '', formatDate) as string}
                                </div> 
                                <div className='mt-2 mb-8 flex flex-wrap text-sm items-start justify-start gap-1 whitespace-nowrap'>
                                    {!loading ?
                                        <div className={statStyle(themeConfig.errorColor, '500')}>
                                            <Icon icon='HeroExclamationTriangle' /><div>{plural(agent.scan_errors??0,"scan error")}</div>
                                        </div>
                                        : undefined
                                    }
                                    {!loading ?
                                        <div className={statStyle(themeConfig.warningColor, '500')}>
                                            <Icon icon='HeroShieldExclamation' /><div>{plural(agent.matches,"CUI file")}</div>
                                        </div>
                                        : undefined
                                    }
                                    {!loading ? 
                                        <div className={statStyle(themeConfig.themeColor, '500')}>
                                            <Icon icon='HeroClock' /><div>{plural(agent.timeouts,"timeout")}</div>
                                        </div>
                                        : undefined
                                    }
                                </div> 
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className='text-zinc-500'>
                    <CardFooterChild className='w-full'>
                        <div className='w-full truncate'>{agent.path}</div>
                    </CardFooterChild>
                </CardFooter>
            </Card>
        </div>
	);
};
 export default AgentDetails;