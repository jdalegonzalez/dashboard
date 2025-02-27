import React, { forwardRef, HTMLAttributes, memo, ReactNode } from 'react';
import classNames from 'classnames';
import pascalcase from 'pascalcase';
import * as SvgIcon from './svg-icons';
import * as DuoToneIcon from './duotone';
import * as HeroIcon from './heroicons';
import { TIcons } from '@/types/icons.type';
import { TColors } from '@/types/colors.type';
import { TColorIntensity } from '@/types/colorIntensities.type';
import { textColor } from '@/utils/textColor.util';
import { TFontSizes } from '@/types/fontSizes.type';

interface IRefWrapperProps extends Record<string, any> {
	children: ReactNode;
}
const RefWrapper = forwardRef<HTMLSpanElement, IRefWrapperProps>(({ children }, ref) => {
	if (ref) {
		return (
			<span ref={ref} data-only-ref='true'>
				{children}
			</span>
		);
	}
	return children;
});
RefWrapper.displayName = 'RefWrapper';

export interface IIconProps extends HTMLAttributes<HTMLSpanElement> {
	icon: TIcons;
	className?: string;
	color?: TColors;
	colorIntensity?: TColorIntensity;
	size?: TFontSizes;
}
const Icon = forwardRef<HTMLSpanElement, IIconProps>((props, ref) => {
	const { icon, className, color, colorIntensity, size, ...rest } = props;
	const IconName = pascalcase(icon);

	// @ts-expect-error This is fine
	const SvgIconWrapper = SvgIcon[IconName];
	// @ts-expect-error This is fine
	const DuoToneWrapper = DuoToneIcon[IconName];
	// @ts-expect-error This is fine
	const HeroWrapper = HeroIcon[IconName];

	const CLASS_NAMES = classNames(
		'svg-icon',
		{ [`${size as TFontSizes}`]: typeof size !== 'undefined' },
		textColor(color, colorIntensity),
		className,
	);

	if (typeof SvgIconWrapper === 'function') {
		return (
			<RefWrapper ref={ref}>
				<SvgIconWrapper
					data-component-name='Icon-A'
					data-name={`SvgIcon--${IconName}`}
					className={CLASS_NAMES}
					{...rest}
				/>
			</RefWrapper>
		);
	}
	if (typeof DuoToneWrapper === 'function') {
		return (
			<RefWrapper ref={ref}>
				<DuoToneWrapper
					data-component-name='Icon-B'
					data-name={`Duotone--${icon}`}
					className={CLASS_NAMES}
					{...rest}
				/>
			</RefWrapper>
		);
	}
	if (typeof HeroWrapper === 'function') {
		return (
			<RefWrapper ref={ref}>
				<HeroWrapper
					data-component-name='Icon-C'
					data-name={`Hero--${icon}`}
					className={CLASS_NAMES}
					{...rest}
				/>
			</RefWrapper>
		);
	}
	return null;
});
Icon.displayName = 'Icon';

export default memo(Icon);
