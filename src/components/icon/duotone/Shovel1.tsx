import React, { SVGProps } from 'react';

const SvgShovel1 = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' className='svg-icon' {...props}>
			<g fill='none' fillRule='evenodd'>
				<path d='M0 0h24v24H0z' />
				<path
					d='M8.525 14.56l1.414 1.415a1 1 0 010 1.414l-4.95 4.95a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 010-1.415l4.95-4.95a1 1 0 011.414 0z'
					fill='currentColor'
					opacity={0.3}
				/>
				<path
					d='M11.354 11.732L9.232 9.611a2 2 0 010-2.829l4.243-4.242a2 2 0 012.828 0l5.657 5.657a2 2 0 010 2.828l-4.242 4.243a2 2 0 01-2.829 0l-2.121-2.122-2.122 2.122-1.414-1.414 2.122-2.122zm3.889-7.424L11 8.55l.707.707 4.243-4.242-.707-.707zm2.121 2.12l-4.243 4.244.707.707 4.243-4.243-.707-.707zm2.121 2.122l-4.242 4.243.707.707 4.242-4.243-.707-.707z'
					fill='currentColor'
				/>
			</g>
		</svg>
	);
};

export default SvgShovel1;
