import React, { SVGProps } from 'react';

const SvgExport = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' className='svg-icon' {...props}>
			<g fill='none' fillRule='evenodd'>
				<path d='M0 0h24v24H0z' />
				<path
					d='M17 8a1 1 0 010-2h1a4 4 0 014 4v8a4 4 0 01-4 4H6a4 4 0 01-4-4V9.993a4 4 0 014-4h1a1 1 0 110 2H6a2 2 0 00-2 2V18a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1z'
					fill='currentColor'
					opacity={0.3}
				/>
				<rect
					fill='currentColor'
					opacity={0.3}
					transform='matrix(-1 0 0 1 24 0)'
					x={11}
					y={2}
					width={2}
					height={12}
					rx={1}
				/>
				<path
					d='M12 2.414l2.293 2.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L12 2.414z'
					fill='currentColor'
				/>
			</g>
		</svg>
	);
};

export default SvgExport;
