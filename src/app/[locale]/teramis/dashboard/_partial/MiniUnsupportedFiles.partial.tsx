import React from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import Icon from '@/components/icon/Icon';
import themeConfig from '@/config/theme.config';
import AnimatedDots from '@/components/utils/AnimatedDotsTail';
import useAgentOverview from '@/hooks/useAgentOverview';

const MiniUnsupported = () => {
	const { agentInfo } = useAgentOverview()
	return (
		<Card className='h-full'>
			<CardBody>
				<div className='flex items-center gap-4'>
					<div className='flex-shrink-0'>
						<div className='relative rounded-full bg-stone-950/50 p-4'>
							<Icon
                                className='relative -top-1/2'
								icon='DuoWarning2'
								size='text-5xl'
								color={themeConfig.themeColor}
                                colorIntensity = '900'
							/>
						</div>
					</div>
					<div className='flex grow items-center'>
						<div>
							<div className='text-zinc-500'>Unsupported Files</div>
							<div className='text-3xl font-semibold'>{ agentInfo? agentInfo.unsupportedFilesCount : <AnimatedDots className='mt-4 bg-zinc-500' size={1} /> }</div>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default MiniUnsupported;
