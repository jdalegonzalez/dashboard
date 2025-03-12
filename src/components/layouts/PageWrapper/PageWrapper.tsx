'use client';

import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
<<<<<<< HEAD
// import { redirect, usePathname } from 'next/navigation';
// import purePathnameUtil from '@/utils/purePathname.util';
// import { useSession } from 'next-auth/react';
=======
import { redirect, usePathname } from 'next/navigation';
import purePathnameUtil from '@/utils/purePathname.util';
import { useSession } from 'next-auth/react';
>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)

interface IPageWrapperProps {
	children: ReactNode;
	className?: string;
}
const PageWrapper: FC<IPageWrapperProps> = (props) => {
	const { children, className = undefined, ...rest } = props;

<<<<<<< HEAD
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
=======
	const pathname = usePathname();
	const purePath = purePathnameUtil(pathname);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { data: session, status } = useSession({
		required: true,
		onUnauthenticated() {
			if (purePath !== '/login') redirect('/login');
		},
	});
>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)

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
