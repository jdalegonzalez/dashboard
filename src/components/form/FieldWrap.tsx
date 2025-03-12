import React, {
	cloneElement,
	forwardRef,
	HTMLAttributes,
	ReactElement,
	ReactNode,
	useRef,
} from 'react';
import classNames from 'classnames';
import useDir from '@/hooks/useDir';
import useDomRect from '@/hooks/useDomRect';
import { IValidationBaseProps } from '@/components/form/Validation';

interface IFieldWrapProps extends HTMLAttributes<HTMLDivElement>, Partial<IValidationBaseProps> {
	children: ReactElement;
	className?: string;
	firstSuffix?: ReactNode;
	lastSuffix?: ReactNode;
}
const FieldWrap = forwardRef<HTMLDivElement, IFieldWrapProps>((props, ref) => {
	const {
		children,

		className,

		firstSuffix,

		lastSuffix,
<<<<<<< HEAD
			isValidMessage,
=======
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		isValidMessage,
>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)

		isValid,

		isTouched,

		invalidFeedback,
<<<<<<< HEAD
			validFeedback,
=======
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		validFeedback,
>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)
		...rest
	} = props;

	const sharedClasses = classNames(
		'absolute top-[2px] bottom-[2px] flex justify-center items-center px-1 rounded',
	);

	const divFirstRef = useRef<HTMLDivElement>(null);
<<<<<<< HEAD
	// @ts-expect-error This is fine
	const [domFirstRect] = useDomRect(divFirstRef);

	const divLastRef = useRef<HTMLDivElement>(null);
	// @ts-expect-error This is fine
=======
	// @ts-ignore
	const [domFirstRect] = useDomRect(divFirstRef);

	const divLastRef = useRef<HTMLDivElement>(null);
	// @ts-ignore
>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)
	const [domLastRect] = useDomRect(divLastRef);

	const { isLTR } = useDir();

	return (
		<div
			ref={ref}
			data-component-name='FieldWrap'
			className={classNames('relative', className)}
			{...rest}>
			{firstSuffix && (
				<div ref={divFirstRef} className={classNames(sharedClasses, 'start-px')}>
					{firstSuffix}
				</div>
			)}
			{cloneElement(children, {
<<<<<<< HEAD
				// @ts-expect-error This is fine
=======
				// @ts-ignore
>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)
				isValid,
				isTouched,
				invalidFeedback,
				style: {
					paddingLeft:
						(firstSuffix && isLTR && domFirstRect?.width) ||
						(lastSuffix && !isLTR && domLastRect?.width),
					paddingRight:
						(firstSuffix && !isLTR && domFirstRect?.width) ||
						(lastSuffix && isLTR && domLastRect?.width),
				},
			})}
			{lastSuffix && (
				<div ref={divLastRef} className={classNames(sharedClasses, 'end-px')}>
					{lastSuffix}
				</div>
			)}
		</div>
	);
});
FieldWrap.displayName = 'FieldWrap';

export default FieldWrap;
