import React from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import Icon from '@/components/icon/Icon';
import themeConfig from '@/config/theme.config';
import useAgentOverview from '@/hooks/useAgent';
import useDarkMode from '@/hooks/useDarkMode';
import { loadingOrProperty } from '@/components/LoaderDots.common';
import { AgentAPIResults } from '@/app/lib/fetch';

const MiniCUIWarnings = () => {
	const { agentInfo } = useAgentOverview();
	const {isDarkTheme} = useDarkMode();

	const circleColor = isDarkTheme ? 'bg-stone-950/50' : 'bg-amber-800'; 
	const iconIntensity = isDarkTheme ? '500' : '100';
	
	return (
		<Card className='h-full'>
			<CardBody>
				<div className='flex items-center gap-4'>
					<div className='flex-shrink-0'>
						<div className={`relative rounded-full ${circleColor} p-4`}>
							<Icon
								icon='DuoShieldProtected'
								size='text-5xl'
								color={themeConfig.warningColor}
								colorIntensity={iconIntensity}
							/>
						</div>
					</div>
					<div className='flex grow items-center'>
						<div>
							<div className='text-zinc-500'>Unique Files with CUI</div>
							<div className='text-3xl font-semibold'>
								{ loadingOrProperty<AgentAPIResults>(agentInfo, 'warningCount', 'mt-4 mb-3') }
							</div>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default MiniCUIWarnings;
