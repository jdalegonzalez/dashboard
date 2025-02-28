import React from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import Icon from '@/components/icon/Icon';
import themeConfig from '@/config/theme.config';
import {loadingOrProperty} from '@/components/LoaderDots.common';
import {AgentAPIResults} from '@/app/lib/fetch';

import useAgentOverview from '@/hooks/useAgent';
import useDarkMode from '@/hooks/useDarkMode';
import Link from 'next/link';

const MiniAgent = () => {
	const { agentInfo } = useAgentOverview();
	const {isDarkTheme} = useDarkMode();

	const circleColor = isDarkTheme ? 'bg-stone-950/50' : 'bg-sky-800'; 
	const iconIntensity = isDarkTheme ? '500' : '100';
	
	return (
		<Card className='h-full'>
			<CardBody>
				<div className='flex items-center gap-4'>
					<div className='flex-shrink-0'>
						<div className={`rounded-full ${circleColor} p-4`}>
							<Link href='/teramis/agent/list'>
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
						<div>
							<div className='text-zinc-500'>Total Agents</div>
							<div className='text-3xl font-semibold'>
								{ loadingOrProperty<AgentAPIResults>(agentInfo, 'agentCount', 'mt-4 mb-3') }
							</div>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default MiniAgent;
