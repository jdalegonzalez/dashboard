import React from 'react';
import Footer, { FooterLeft, FooterRight } from '../../../components/layouts/Footer/Footer';

const DefaultFooterTemplate = () => {
	return (
		<Footer>
			<FooterLeft className='text-zinc-500'>
				<div>Cape Endeavors</div>
			</FooterLeft>
			<FooterRight className='text-zinc-500'>
				<span>
					info@capeendeavors.com
				</span>
			</FooterRight>
		</Footer>
	);
};

export default DefaultFooterTemplate;
