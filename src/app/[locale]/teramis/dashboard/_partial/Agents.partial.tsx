import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';
import useSWR from 'swr';
import fetch from '@/app/lib/fetch';
import { AgentAPIDetailResults } from '@/app/api/agent/route';
import AgentDetails from './AgentCard.partial';
import NewAgentButton from './NewAgentButton.partial';

interface IAgentsPartialProps extends HTMLAttributes<HTMLDivElement> {

}
const AgentsPartial: FC<IAgentsPartialProps> = (props) => {
	const { className, ...rest } = props;
    const { data } = useSWR<AgentAPIDetailResults>('/api/agent?details=true', fetch);
    const cname = classNames('grid grid-cols-12 gap-4', className);
	return (
		<div data-component-name='AgentsPart' className={cname} {...rest}>
			{
                data 
                ? data.map(agent => <AgentDetails className='col-span-12 lg:col-span-6 2xl:col-span-4' key={agent.agent_id} agent={agent} />)
                :
                ''
            }
            <NewAgentButton size='5em' className='absolute bottom-5 right-5'/>
		</div>
	);
};

export default AgentsPartial;
