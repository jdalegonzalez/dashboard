import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';
import {useAgentAndTarget} from '@/hooks/useAgent';

import AgentDetails from './AgentCard.partial';
import NewAgentButton from './NewAgentButton.partial';
import { getAgentAndTarget } from '@/prisma-client/sql';

const detailsClass = 'col-span-12 lg:col-span-6 2xl:col-span-4';
const AgentsPartial: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
	const { className, ...rest } = props;
    const { data } = useAgentAndTarget();
    const cname = classNames('grid grid-cols-12 gap-4', className);
	return (
		<div data-component-name='AgentsPart' className={cname} {...rest}>
			{
                data 
                ? data.map(
                    (agent:getAgentAndTarget.Result) => 
                    <AgentDetails className={detailsClass} key={agent.agent_id} agent={agent} />)
                :
                ''
            }
            <NewAgentButton size='5em' className='absolute bottom-5 right-5'/>
		</div>
	);
};

export default AgentsPartial;
