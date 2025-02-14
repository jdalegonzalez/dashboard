import React from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import Icon from '@/components/icon/Icon';
import themeConfig from '@/config/theme.config';
import useSWR from 'swr';
import fetch from '@/app/lib/fetch';
import AnimatedDots from '@/components/utils/AnimatedDotsTail';

const MiniAgent = () => {
	const { data } = useSWR<{agentCount: number}>('/api/agent', fetch)
	console.log(data)
	return (
		<Card className='h-full'>
			<CardBody>
				<div className='flex items-center gap-4'>
					<div className='flex-shrink-0'>
						<div className='rounded-full bg-blue-500/10 p-4'>
							<Icon
								icon='HeroUserGroup'
								size='text-5xl'
								color={themeConfig.themeColor}
							/>
						</div>
					</div>
					<div className='flex grow items-center'>
						<div>
							<div className='text-zinc-500'>Total Agents</div>
							<div className='text-3xl font-semibold'>{ data? data.agentCount : <AnimatedDots className='mt-4 bg-zinc-500' size={1} /> }</div>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default MiniAgent;
