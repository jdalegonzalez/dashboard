import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';
import {useAgentDetails} from '@/hooks/useAgent';

import AgentDetails from './AgentCard.partial';
import NewAgentButton from './NewAgentButton.partial';
import { getAgentDetails } from '@/prisma-client/sql';

const AgentsPartial: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
	const { className, ...rest } = props;
    const { data } = useAgentDetails();
    const cname = classNames('grid grid-cols-12 gap-4', className);
	return (
		<div data-component-name='AgentsPart' className={cname} {...rest}>
			{
                data 
                ? data.map((agent:getAgentDetails.Result) => <AgentDetails className='col-span-12 lg:col-span-6 2xl:col-span-4' key={agent.agent_id} agent={agent} />)
                :
                ''
            }
            <NewAgentButton size='5em' className='absolute bottom-5 right-5'/>
		</div>
	);
};

export default AgentsPartial;
