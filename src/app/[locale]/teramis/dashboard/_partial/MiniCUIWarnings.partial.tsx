import React from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import Icon from '@/components/icon/Icon';
import themeConfig from '@/config/theme.config';
import useSWR from 'swr';
import fetch from '@/app/lib/fetch';
import AnimatedDots from '@/components/utils/AnimatedDotsTail';

const MiniCUIWarnings = () => {
	const { data } = useSWR<AgentAPIResults>('/api/agent', fetch);
	return (
		<Card className='h-full'>
			<CardBody>
				<div className='flex items-center gap-4'>
					<div className='flex-shrink-0'>
						<div className='relative rounded-full bg-stone-950/50 p-4'>
							<Icon
								icon='DuoShieldProtected'
								size='text-5xl'
								color={themeConfig.warningColor}
								colorIntensity={themeConfig.warningColorShade}
							/>
						</div>
					</div>
					<div className='flex grow items-center'>
						<div>
							<div className='text-zinc-500'>Files with CUI</div>
							<div className='text-3xl font-semibold'>{ data? data.warningCount : <AnimatedDots className='mt-4 bg-zinc-500' size={1} />}</div>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default MiniCUIWarnings;
