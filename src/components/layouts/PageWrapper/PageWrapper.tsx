'use client';

import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
// import { redirect, usePathname } from 'next/navigation';
// import purePathnameUtil from '@/utils/purePathname.util';
// import { useSession } from 'next-auth/react';

interface IPageWrapperProps {
	children: ReactNode;
	className?: string;
}
const PageWrapper: FC<IPageWrapperProps> = (props) => {
	const { children, className = undefined, ...rest } = props;

	// TODO: For right now, getting to the box means you're 
	// authed.
	// const pathname = usePathname();
	// const purePath = purePathnameUtil(pathname);
	// const { data: session, status } = useSession({
	// 	required: true,
	// 	onUnauthenticated() {
	// 		if (purePath !== '/login') redirect('/login');
	// 	},
	// });

	return (
		<main
			data-component-name='PageWrapper'
			className={classNames('flex shrink-0 grow flex-col', className)}
			{...rest}>
			{children}
		</main>
	);
};

export default PageWrapper;
