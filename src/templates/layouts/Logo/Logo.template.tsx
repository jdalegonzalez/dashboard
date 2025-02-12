import React, { FC, HTMLAttributes } from 'react';

import Image from 'next/image';
import logo from '../../../assets/icons/icon4.png'
type ILogoTemplateProps = HTMLAttributes<HTMLOrSVGElement>;
const LogoTemplate: FC<ILogoTemplateProps> = (props) => {
	const { ...rest } = props;
	return (
		<Image src={logo} alt="Teramis CUI" height="90" width="90" priority />
	);
};

export default LogoTemplate;
