import React from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import Icon from '@/components/icon/Icon';
import themeConfig from '@/config/theme.config';
import AnimatedDots from '@/components/utils/AnimatedDotsTail';
import useAgentOverview from '@/hooks/useAgentOverview';

const MiniUniqueFiles = () => {
	const { agentInfo } = useAgentOverview();
	return (
		<Card className='h-full'>
			<CardBody>
				<div className='flex items-center gap-4'>
					<div className='flex-shrink-0'>
						<div className='rounded-full bg-stone-950/50 p-4'>
							<Icon
								icon='DuoDifference'
								size='text-5xl'
								color={themeConfig.themeColor}
							/>
						</div>
					</div>
					<div className='flex grow items-center'>
						<div>
							<div className='text-zinc-500'>Unique Files</div>
							<div className='text-3xl font-semibold'>{ agentInfo? agentInfo.dedupedFilesCount : <AnimatedDots className='mt-4 bg-zinc-500' size={1} /> }</div>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default MiniUniqueFiles;
