import React, { SVGProps } from 'react';

const SvgProtectedFile = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' className='svg-icon' {...props}>
			<g fill='none' fillRule='evenodd'>
				<path d='M0 0h24v24H0z' />
				<path
					d='M5.857 2h7.88a1.5 1.5 0 01.968.355l4.764 4.029A1.5 1.5 0 0120 7.529v12.554c0 1.79-.02 1.917-1.857 1.917H5.857C4.02 22 4 21.874 4 20.083V3.917C4 2.127 4.02 2 5.857 2z'
					fill='currentColor'
					opacity={0.3}
				/>
				<path
					d='M14.5 12a1 1 0 011 1v3a1 1 0 01-1 1h-5a1 1 0 01-1-1v-3a1 1 0 011-1v-.5a2.5 2.5 0 115 0v.5zM12 10a1.5 1.5 0 00-1.5 1.5v.5h3v-.5A1.5 1.5 0 0012 10z'
					fill='currentColor'
				/>
			</g>
		</svg>
	);
};

export default SvgProtectedFile;
