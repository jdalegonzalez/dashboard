import React from 'react';
import Header, { HeaderLeft, HeaderRight } from '../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from './_common/DefaultHeaderRight.common';
import DefaultHeaderTitleCommon from './_common/DefaultHeaderTitle.common';
// import SearchPartial from './_partial/Search.partial';

const defaultDesc = 'The results from the agents scanning your system for Controlled Unclassified Information.'

const DefaultHeaderTemplate = ({desc}:{desc?:any}) => {
	const displayDesc = desc ?? defaultDesc
	return (
		<Header>
			<HeaderLeft>
				<div>
					<DefaultHeaderTitleCommon />
					<div className='text-zinc-500 m-0 mt-4'>{displayDesc}</div>			
				</div>
			</HeaderLeft>
			<HeaderRight>
				<DefaultHeaderRightCommon />
			</HeaderRight>
		</Header>
	);
};

export default DefaultHeaderTemplate;
