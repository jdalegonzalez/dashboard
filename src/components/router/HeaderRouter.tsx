'use client';

import { usePathname } from 'next/navigation';
import purePathnameUtil from '@/utils/purePathname.util';
import headerRoutes from '../../routes/headerRoutes';

const HeaderRouter = () => {
	const pathname = usePathname();
	const purePath = purePathnameUtil(pathname);

	const PAGE = headerRoutes.find((key) => {
		return key.path.substring(key.path?.length - 2) === '/*'
			? purePath.includes(key.path.substring(0, key.path?.length - 2))
			: key.path === purePath;
	});

	return PAGE?.element;
};

export default HeaderRouter;
