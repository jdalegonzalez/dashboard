import React from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import Icon from '@/components/icon/Icon';
import themeConfig from '@/config/theme.config';
import AnimatedDots from '@/components/utils/AnimatedDotsTail';
import useAgentOverview from '@/hooks/useAgentOverview';

const MiniAgentErrors = () => {
	const { agentInfo } = useAgentOverview();
	return (
		<Card className='h-full'>
			<CardBody>
				<div className='flex items-center gap-4'>
					<div className='flex-shrink-0'>
						<div className='relative rounded-full bg-stone-950/50 p-4'>
							<Icon
								icon='DuoFolderError'
								size='text-5xl'
								color={themeConfig.errorColor}
								colorIntensity={themeConfig.errorColorShade}
							/>
						</div>
					</div>
					<div className='flex grow items-center'>
						<div>
							<div className='text-zinc-500'>Agent Errors</div>
							<div className='text-3xl font-semibold'>{ agentInfo? agentInfo.errorCount : <AnimatedDots className='mt-4 bg-zinc-500' size={1} />}</div>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default MiniAgentErrors;
