import React from 'react';
import Header, { HeaderLeft, HeaderRight } from '../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from './_common/DefaultHeaderRight.common';
import DefaultHeaderTitleCommon from './_common/DefaultHeaderTitle.common';
import useAsideStatus from '@/hooks/useAsideStatus';
import Visible from '@/components/utils/Visible';
import Link from 'next/link';
import LogoTemplate from '../Logo/Logo.template';
// import SearchPartial from './_partial/Search.partial'; Bring back if we want to support searching

const defaultDesc = 'The results from the agents scanning your system for Controlled Unclassified Information.'

const DefaultHeaderTemplate = ({desc,companyName}:{desc?:string, companyName?:string}) => {
	const displayDesc = desc ?? defaultDesc
	const { asideStatus } = useAsideStatus();
	return (
		<Header>
			<HeaderLeft className='!gap-0'>
				<Visible is={!asideStatus}>
					<div className='-ml-2' >
					<Link href='/' aria-label='Logo'>
						<LogoTemplate className='-ml-10' />
					</Link>
					</div>
				</Visible>
				<div>
					<DefaultHeaderTitleCommon companyName={companyName}/>
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
