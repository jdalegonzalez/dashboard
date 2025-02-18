import React from 'react';
import Header, { HeaderLeft, HeaderRight } from '../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from './_common/DefaultHeaderRight.common';
// import SearchPartial from './_partial/Search.partial';

const coName = () => {
	const txt = process.env?.NEXT_PUBLIC_COMPANY_NAME ?? "";
	return txt ? " - " + txt : "";
}
const DefaultHeaderTemplate = () => {
	return (
		<Header>
			<HeaderLeft>
				<div>
					<h2 className='mb-2'>Teramis CUI Dashboard<span className='text-zinc-500 text-2xl font-normal'>{coName()}</span></h2>
					{/* <h5 className='!text-zinc-300'>{coName}</h5> */}
					<div className='text-zinc-500 m-0 mt-4'>Overview of the results from the agents scanning your system for Controlled Unclassified Information.</div>			
				</div>
			</HeaderLeft>
			<HeaderRight>
				<DefaultHeaderRightCommon />
			</HeaderRight>
		</Header>
	);
};

export default DefaultHeaderTemplate;
