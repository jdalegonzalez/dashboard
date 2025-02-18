'use client';

import React from 'react';
import colors from '@/tailwindcss/colors.tailwind';
import Card, { CardBody, CardHeader, CardHeaderChild, CardTitle } from '@/components/ui/Card';
import { IChartOptions } from '@/interface/chart.interface';
import Chart from '@/components/Chart';
import Icon from '@/components/icon/Icon';
import useSWR from 'swr';
import fetch from '@/app/lib/fetch';
import { ScanSummaryAPIResults } from '@/app/api/agent/scans/route';
import { AgentAPIResults } from '@/app/api/agent/route';
import AnimatedDots from '@/components/utils/AnimatedDotsTail';
import useAgentOverview from '@/hooks/useAgentOverview';
import themeConfig from '@/config/theme.config';
import { zinc } from 'tailwindcss/colors';

const truncateLeft = (path: any, maxLength = 20) => {
	if (typeof path != 'string') return String(path);
	return (path && path.length > maxLength) ? "..." + path.slice(-maxLength) : path
}

const discoveryChart = (data?:ScanSummaryAPIResults) => {
	const chartColors = data ? [colors.sky[900], colors.red[800]] : [colors.rose[50], colors.slate[50]];
	const series = data ? data.series : [ { name: ' Errors', data: [0, 10, 30] },{ name:' Discoveries', data: [100, 300, 500] }];
	const categories = (
		data ? data.agents : ['...', '...', '...']
	);
	const res:IChartOptions = {
		series: series,
		options: {
			chart: { stacked: true },
			colors: chartColors,
			plotOptions: {
				bar: {
					borderRadius: 2,
					borderRadiusApplication: 'end' as const, // 'around', 'end'
					borderRadiusWhenStacked: 'all' as const, // 'all', 'last'
					horizontal: true,
					barHeight: '70%',
				},
			},
			dataLabels: {
				enabled: false
			},
			stroke: { width: 1, colors: ["#fff"] },
			grid: {
			  xaxis: { lines: { show: false } }
			},
			yaxis: { stepSize: 1, labels: { formatter: (val:any) => truncateLeft(val) }},
			tooltip: {
				shared: false,
				y: { formatter: (val: number) => String(Math.abs(val)) }
			},
			title: { text: 'Discoveries by Agent' },
			xaxis: {
				categories: categories,
				title: { text: '' },
			}
		},
	};

	return res;
}

const secondsToString = (seconds: number) => {
	const secs = Number(seconds);
	const d = Math.floor(secs / (3600*24));
	const h = Math.floor(secs % (3600*24) / 3600);
	const m = Math.floor(secs % 3600 / 60);
	const s = Math.floor(secs % 60);
	
	const dSpace = (h + m + s > 0) ? ", " : "";
	const dBr    = (h + m + s > 0) ? <br/> : undefined;
	const hSpace = (m + s > 0) ? ", " : "";
	const hBr    = (h + m + s > 0) ? <br/> : undefined;
	const mSpace = (s > 0) ? ", " : ""
	const mBr    = (h + m + s > 0) ? <br/> : undefined;
	return (
		<div>
			{d > 0 
			? (<><span className='text-2xl'>{d}</span><span className="text-xl text-zinc-500">{(d == 1 ? " day" : " days")}{dSpace}</span>{dBr}</>)
			: undefined}
			{h > 0 
			? (<><span className='text-2xl'>{h}</span><span className="text-xl text-zinc-500">{(h == 1 ? " hour" : " hours")}{hSpace}</span>{hBr}</>) 
			: undefined}
			{m > 0 
			? (<><span className='text-2xl'>{m}</span><span className="text-xl text-zinc-500">{(m == 1 ? " minute" : " minutes")}{mSpace}</span>{mBr}</>) 
			: undefined}
			{s > 0 ? (<><span className='text-2xl'>{s}</span><span className="text-xl text-zinc-500">{(s == 1 ? " second" : " seconds")}</span></>) 
			: undefined}
		</div>
	)
}

const arrayAverage = (arr:number[]) => {
	return arr.reduce((acc, v) => acc + v, 0) || 0 / arr.length || 1;
}

const durationValue = (data?:ScanSummaryAPIResults ) => {
	if (!data) return <AnimatedDots className='mt-4 bg-zinc-500' size={1} />
	const average = arrayAverage(data.durations);
	return secondsToString(average);
}

const findingsChart = (data?: AgentAPIResults) => {
	
	const totalFiles = data?.totalFilesCount??0;
	const cuiFiles = data?.warningCount??0;
	const nonCuiFiles = data?.dedupedFilesCount??0 - cuiFiles;
	const unsupported = data?.unsupportedFilesCount??0;
	const dupeFiles = totalFiles - unsupported - nonCuiFiles - cuiFiles;
	
	const labels = ['CUI', 'Non-CUI', 'Unsupported', 'Duplicate'];

	const res:IChartOptions = {
		series: [ cuiFiles, nonCuiFiles, unsupported, dupeFiles ],
		options: {
			chart: {
				dropShadow: {
					enabled: true,
					enabledOnSeries: undefined,
					top: 0,
					left: 0,
					blur: 6,
					color: colors['zinc']['100'],
					opacity: 0.95
				}
			},		
			legend: {
				show: false,
			},
			tooltip: {
				enabled: false
			},
			colors: [
				colors[themeConfig.warningColor]['800'],
				colors[themeConfig.themeColor]['800'],
				colors[themeConfig.errorColor]['800'],
				colors['slate']['700'] 
			],
			plotOptions: {
				pie: {
					donut: {
						size: '65%',
						labels: {
							show: true,
							name: { fontSize: '1rem', },
							value: { fontSize: '1rem', color: 'white'},
							total: {
								color: colors['zinc']['500'],
								show: true,
								label: "Total"
							},
						},
					},
				}
			},
			stroke: {
				show: false,
				lineCap: 'round',
			},
			labels: labels,
		},
	};

	return res;
}

const ScanSummaryPartial = () => {
	const { data } = useSWR<ScanSummaryAPIResults>('/api/agent/scans', fetch);
	const { agentInfo } = useAgentOverview();
	
	const state = findingsChart(agentInfo);
	const discoveryChartDef = discoveryChart(data);
	const averageDuraction = durationValue(data);
	return (
		<Card className='h-full'>
			<CardHeader>
				<CardHeaderChild>
					<CardTitle>Scan Results</CardTitle>
				</CardHeaderChild>
			</CardHeader>
			<CardBody>
				<div className='-mx-4 flex h-full gap-y-4 divide-x divide-dashed divide-zinc-500/25 max-md:flex-wrap'>
					<div className='flex-shrink-0 px-4 max-md:w-full max-md:justify-center md:max-w-[220px]'>
						<Card className='border border-zinc-500/25 dark:border-zinc-500/50'>
							<CardHeader>
								<CardHeaderChild className='text-zinc-500'>Average Duration</CardHeaderChild>
							</CardHeader>
							<CardBody>
								<div className='flex items-center gap-2'>
									<span className='text-4xl'>{averageDuraction}</span>
									<Icon icon='HeroClock' className='ml-5 bg-' size='text-5xl' color='sky' colorIntensity='900' />
								</div>
							</CardBody>
						</Card>
						<div className='text-zinc-500 mt-8 pb-4'>Files by Category</div>
						<Chart
							series={state.series}
							options={state.options}
							type='donut'
							height={220}
						/>
					</div>
					<div className='grow px-4'>
						<Chart
							series={discoveryChartDef.series}
							options={discoveryChartDef.options}
							type='bar'
							height={390}
						/>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default ScanSummaryPartial;
