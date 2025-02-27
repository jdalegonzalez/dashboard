import React, { FC, HTMLAttributes } from 'react';

import Image from 'next/image';
import logo from '@/assets/icons/cape_logo_white.png'
type ILogoTemplateProps = HTMLAttributes<HTMLOrSVGElement>;
const LogoTemplate: FC<ILogoTemplateProps> = () => {
	//const { ...rest } = props;
	return (
		<Image src={logo} alt="Teramis CUI" width="160" priority />
	);
};

export default LogoTemplate;
