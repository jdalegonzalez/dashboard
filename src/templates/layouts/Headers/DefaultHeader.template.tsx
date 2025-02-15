import React from 'react';
import Header, { HeaderLeft, HeaderRight } from '../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from './_common/DefaultHeaderRight.common';
// import SearchPartial from './_partial/Search.partial';

const DefaultHeaderTemplate = () => {
	return (
		<Header>
			<HeaderLeft>
				<div>
					<h1 className='mb-2'>CUI Discovery</h1>
					<div className='text-zinc-500'>Overview of the results from the agents scanning your system for Controlled Unclassified Information.</div>			
				</div>
			</HeaderLeft>
			<HeaderRight>
				<DefaultHeaderRightCommon />
			</HeaderRight>
		</Header>
	);
};

export default DefaultHeaderTemplate;
