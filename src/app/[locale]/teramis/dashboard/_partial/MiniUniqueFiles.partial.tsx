import React from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import Icon from '@/components/icon/Icon';
import themeConfig from '@/config/theme.config';
import useAgentOverview from '@/hooks/useAgentOverview';
import useDarkMode from '@/hooks/useDarkMode';
import { loadingOrProperty } from '@/components/LoaderDots.common';
import { AgentAPIResults } from '@/app/api/agent/route';
const MiniUniqueFiles = () => {
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
							<Icon
								icon='DuoDifference'
								size='text-5xl'
								color={themeConfig.themeColor}
								colorIntensity={iconIntensity}
							/>
						</div>
					</div>
					<div className='flex grow items-center'>
						<div>
							<div className='text-zinc-500'>Unique Files</div>
							<div className='text-3xl font-semibold'>
								{ loadingOrProperty<AgentAPIResults>(agentInfo, 'dedupedFilesCount', 'mt-4 mb-3') }
							</div>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default MiniUniqueFiles;
